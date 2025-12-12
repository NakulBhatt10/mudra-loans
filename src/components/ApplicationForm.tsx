import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  User, 
  Briefcase, 
  IndianRupee, 
  Upload, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  TrendingUp,
  FileText,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const steps = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Business Details', icon: Briefcase },
  { id: 3, title: 'Loan Details', icon: IndianRupee },
  { id: 4, title: 'Documents', icon: Upload },
];

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  businessName: string;
  businessType: string;
  businessVintage: string;
  annualTurnover: string;
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  documents: {
    pan: File | null;
    aadhaar: File | null;
    gst: File | null;
    udyam: File | null;
    other: File | null;
  };
}

export function ApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    businessName: '',
    businessType: '',
    businessVintage: '',
    annualTurnover: '',
    loanType: 'kishor',
    loanAmount: '',
    loanPurpose: '',
    documents: {
      pan: null,
      aadhaar: null,
      gst: null,
      udyam: null,
      other: null,
    },
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDocument = (docType: keyof FormData['documents'], file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: keyof FormData['documents']) => {
    const file = e.target.files?.[0] || null;
    updateDocument(docType, file);
  };

  const removeFile = (docType: keyof FormData['documents']) => {
    updateDocument(docType, null);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24-48 hours.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Delhi', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Other'].map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="businessName" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-secondary" />
                Business Name
              </Label>
              <Input
                id="businessName"
                placeholder="Your business or shop name"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-secondary" />
                  Type of Business
                </Label>
                <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessVintage" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  Business Vintage
                </Label>
                <Select value={formData.businessVintage} onValueChange={(value) => updateFormData('businessVintage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How old is your business?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualTurnover" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                Annual Turnover (Approx.)
              </Label>
              <Select value={formData.annualTurnover} onValueChange={(value) => updateFormData('annualTurnover', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select approximate turnover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5l">Up to ₹5 Lakhs</SelectItem>
                  <SelectItem value="5-10l">₹5-10 Lakhs</SelectItem>
                  <SelectItem value="10-25l">₹10-25 Lakhs</SelectItem>
                  <SelectItem value="25-50l">₹25-50 Lakhs</SelectItem>
                  <SelectItem value="50l+">Above ₹50 Lakhs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-accent" />
                Type of MUDRA Loan
              </Label>
              <RadioGroup
                value={formData.loanType}
                onValueChange={(value) => updateFormData('loanType', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { value: 'shishu', label: 'Shishu', desc: 'Up to ₹50,000', color: 'from-emerald-500 to-teal-500' },
                  { value: 'kishor', label: 'Kishor', desc: '₹50,001 - ₹5L', color: 'from-blue-500 to-indigo-500' },
                  { value: 'tarun', label: 'Tarun', desc: '₹5L - ₹10L', color: 'from-purple-500 to-pink-500' },
                ].map((type) => (
                  <Label
                    key={type.value}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.loanType === type.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={type.value} className="sr-only" />
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-2`}>
                      <span className="text-primary-foreground font-bold">{type.label[0]}</span>
                    </div>
                    <span className="font-semibold text-foreground">{type.label}</span>
                    <span className="text-xs text-muted-foreground">{type.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-accent" />
                Required Loan Amount
              </Label>
              <Input
                id="loanAmount"
                placeholder="e.g., ₹2,00,000"
                value={formData.loanAmount}
                onChange={(e) => updateFormData('loanAmount', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanPurpose" className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Purpose of Loan
              </Label>
              <Textarea
                id="loanPurpose"
                placeholder="Briefly describe how you plan to use this loan..."
                value={formData.loanPurpose}
                onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                rows={4}
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground text-sm">
              Upload your documents in PDF, JPG, or PNG format. Maximum file size: 5MB each.
            </p>

            {[
              { key: 'pan' as const, label: 'PAN Card', required: true },
              { key: 'aadhaar' as const, label: 'Aadhaar Card', required: true },
              { key: 'gst' as const, label: 'GST Certificate', required: false },
              { key: 'udyam' as const, label: 'Udyam Registration', required: false },
              { key: 'other' as const, label: 'Other Supporting Document', required: false },
            ].map((doc) => (
              <div key={doc.key} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" />
                  {doc.label}
                  {doc.required && <span className="text-destructive">*</span>}
                  {!doc.required && <span className="text-muted-foreground text-xs">(Optional)</span>}
                </Label>
                {formData.documents[doc.key] ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="flex-1 text-sm truncate">{formData.documents[doc.key]?.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(doc.key)}
                      className="p-1 rounded-full hover:bg-destructive/10 text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, doc.key)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Thank You! <Sparkles className="inline w-8 h-8 text-accent" />
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your MUDRA loan application has been submitted successfully. 
                Our team will review your documents and contact you within 24-48 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Application confirmation will be sent to: <span className="font-semibold">{formData.email}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Apply Online
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Apply for Your <span className="gradient-text">MUDRA Loan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill in the details below and submit your application. 
            We'll get back to you within 24-48 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Steps Indicator */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium hidden md:block ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="p-8 rounded-3xl glass-card border border-border/50">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? 'invisible' : ''}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button variant="hero" onClick={nextStep}>
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="gold"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[160px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                    />
                  ) : (
                    <>
                      Submit Application
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
