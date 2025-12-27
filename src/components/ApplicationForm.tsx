import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, ChangeEvent, useMemo } from 'react';

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
  X,
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

  // Step 3 (changed)
  loanType: string; // now used as Turnover Category (lt50l / gt50l)
  loanAmount: string;
  loanPurpose: string;

  documents: {
    pan: File | null;
    aadhaar: File | null;
    gst: File | null; // GST Registration
    udyam: File | null; // Udyam Registration
    gst3b12m: File | null; // GST Return (3B) of 12 months
    bankStatement12m: File | null; // Bank Statement (Updated 12 months)
    itr3y: File | null; // Last Three Years Complete ITR
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^\d{10}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(['application/pdf', 'image/jpeg', 'image/png']);

export function ApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formRef = useRef<HTMLFormElement | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    loanType: 'lt50l', // default: Less than 50 Lakhs turnover
    loanAmount: '',
    loanPurpose: '',

    documents: {
      pan: null,
      aadhaar: null,
      gst: null,
      udyam: null,
      gst3b12m: null,
      bankStatement12m: null,
      itr3y: null,
    },
  });

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const updateFormData = (field: keyof Omit<FormData, 'documents'>, value: string) => {
    // enforce digits only for mobile
    if (field === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: digitsOnly }));
      clearFieldError('mobile');
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(String(field));
  };

  const updateDocument = (docType: keyof FormData['documents'], file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file },
    }));
    clearFieldError(`documents.${docType}`);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, docType: keyof FormData['documents']) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      updateDocument(docType, null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'File too large',
        description: 'Max file size is 5MB.',
        variant: 'destructive' as any,
      });
      updateDocument(docType, null);
      return;
    }

    if (!ALLOWED_MIME.has(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Only PDF, JPG, or PNG are allowed.',
        variant: 'destructive' as any,
      });
      updateDocument(docType, null);
      return;
    }

    updateDocument(docType, file);
  };

  const removeFile = (docType: keyof FormData['documents']) => {
    updateDocument(docType, null);
  };

  // ---------- VALIDATION ----------
  const getStepErrors = (step: number): Record<string, string> => {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) e.fullName = 'Full name is required.';
      if (!MOBILE_RE.test(formData.mobile)) e.mobile = 'Mobile must be exactly 10 digits.';
      if (!EMAIL_RE.test(formData.email.trim())) e.email = 'Enter a valid email address.';
      if (!formData.city.trim()) e.city = 'City is required.';
      if (!formData.state) e.state = 'State is required.';
    }

    if (step === 2) {
      if (!formData.businessName.trim()) e.businessName = 'Business name is required.';
      if (!formData.businessType) e.businessType = 'Business type is required.';
      if (!formData.businessVintage) e.businessVintage = 'Business vintage is required.';
      if (!formData.annualTurnover) e.annualTurnover = 'Annual turnover is required.';
    }

    if (step === 3) {
      if (!formData.loanType) e.loanType = 'Please select a turnover category.';
      const amountNum = Number(formData.loanAmount.replace(/[^\d]/g, ''));
      if (!formData.loanAmount.trim() || !Number.isFinite(amountNum) || amountNum <= 0) {
        e.loanAmount = 'Enter a valid loan amount.';
      }
      if (!formData.loanPurpose.trim()) e.loanPurpose = 'Loan purpose is required.';
    }

    // ✅ STEP 4: ALL DOCUMENTS REQUIRED
    if (step === 4) {
      if (!formData.documents.pan) e['documents.pan'] = 'PAN Card is required.';
      if (!formData.documents.aadhaar) e['documents.aadhaar'] = 'Aadhaar Card is required.';
      if (!formData.documents.gst) e['documents.gst'] = 'GST Registration is required.';
      if (!formData.documents.udyam) e['documents.udyam'] = 'Udyam Registration is required.';
      if (!formData.documents.gst3b12m) e['documents.gst3b12m'] = 'GST Return (3B) of 12 months is required.';
      if (!formData.documents.bankStatement12m)
        e['documents.bankStatement12m'] = 'Bank Statement (Updated 12 months) is required.';
      if (!formData.documents.itr3y) e['documents.itr3y'] = 'Last Three Years Complete ITR is required.';
    }

    return e;
  };

  const validateStep = (step: number) => {
    const e = getStepErrors(step);
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  };

  const stepIsValid = useMemo(() => Object.keys(getStepErrors(currentStep)).length === 0, [currentStep, formData]);

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: 'Please fix the errors',
        description: 'Fill all required fields correctly to continue.',
        variant: 'destructive' as any,
      });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const getInputClass = (field: string) => (errors[field] ? 'border-destructive focus-visible:ring-destructive' : '');

  // ---------- MESSAGE ----------
  const message = `
NEW MUDRA LOAN APPLICATION
--------------------------
Full Name: ${formData.fullName}
Mobile: ${formData.mobile}
Email: ${formData.email}
City: ${formData.city}
State: ${formData.state}

Business Name: ${formData.businessName}
Business Type: ${formData.businessType}
Business Vintage: ${formData.businessVintage}
Annual Turnover: ${formData.annualTurnover}

Turnover Category: ${formData.loanType} 
Loan Amount: ${formData.loanAmount}
Loan Purpose: ${formData.loanPurpose}

(Documents)
PAN Selected: ${formData.documents.pan ? formData.documents.pan.name : 'No'}
Aadhaar Selected: ${formData.documents.aadhaar ? formData.documents.aadhaar.name : 'No'}
GST Registration Selected: ${formData.documents.gst ? formData.documents.gst.name : 'No'}
Udyam Selected: ${formData.documents.udyam ? formData.documents.udyam.name : 'No'}
GST Return (3B) 12 Months Selected: ${formData.documents.gst3b12m ? formData.documents.gst3b12m.name : 'No'}
Bank Statement 12 Months Selected: ${formData.documents.bankStatement12m ? formData.documents.bankStatement12m.name : 'No'}
ITR (Last 3 Years) Selected: ${formData.documents.itr3y ? formData.documents.itr3y.name : 'No'}
  `.trim();

  const handleSubmit = async () => {
    // validate all steps (extra safety)
    for (let s = 1; s <= 4; s++) {
      const ok = validateStep(s);
      if (!ok) {
        setCurrentStep(s);
        toast({
          title: 'Please fix the errors',
          description: 'Complete all required fields before submitting.',
          variant: 'destructive' as any,
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const API_URL =
        (import.meta.env.VITE_APPLICATION_API_URL as string) || 'https://api-mudra.onrender.com/apply';

      const fd = new FormData();

      fd.append('fullName', formData.fullName);
      fd.append('mobile', formData.mobile);
      fd.append('email', formData.email);
      fd.append('city', formData.city);
      fd.append('state', formData.state);

      fd.append('businessName', formData.businessName);
      fd.append('businessType', formData.businessType);
      fd.append('businessVintage', formData.businessVintage);
      fd.append('annualTurnover', formData.annualTurnover);

      // Step 3 fields
      fd.append('loanType', formData.loanType); // now turnover category
      fd.append('loanAmount', formData.loanAmount);
      fd.append('loanPurpose', formData.loanPurpose);

      fd.append('message', message);

      // ✅ ALL DOCUMENTS APPEND
      if (formData.documents.pan) fd.append('pan', formData.documents.pan);
      if (formData.documents.aadhaar) fd.append('aadhaar', formData.documents.aadhaar);
      if (formData.documents.gst) fd.append('gst', formData.documents.gst);
      if (formData.documents.udyam) fd.append('udyam', formData.documents.udyam);
      if (formData.documents.gst3b12m) fd.append('gst3b12m', formData.documents.gst3b12m);
      if (formData.documents.bankStatement12m) fd.append('bankStatement12m', formData.documents.bankStatement12m);
      if (formData.documents.itr3y) fd.append('itr3y', formData.documents.itr3y);

      const res = await fetch(API_URL, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        let detail = '';
        try {
          const data = await res.json();
          detail = data?.error ? `: ${data.error}` : '';
        } catch {}
        throw new Error(`Submission failed (${res.status})${detail}`);
      }

      setIsSubmitted(true);
      toast({
        title: 'Application Submitted',
        description: 'We received your application successfully.',
      });
    } catch (err: any) {
      console.error('Submit Error:', err);
      toast({
        title: 'Submission Failed',
        description: String(err?.message || 'Unknown error'),
        variant: 'destructive' as any,
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className={getInputClass('fullName')}
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobile"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  maxLength={10}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                  className={getInputClass('mobile')}
                />
                {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={getInputClass('email')}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className={getInputClass('city')}
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                  <SelectTrigger className={getInputClass('state')}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'Andhra Pradesh',
                      'Karnataka',
                      'Kerala',
                      'Maharashtra',
                      'Tamil Nadu',
                      'Telangana',
                      'Delhi',
                      'Gujarat',
                      'Rajasthan',
                      'Uttar Pradesh',
                      'West Bengal',
                      'Other',
                    ].map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
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
                Business Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Your business or shop name"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                className={getInputClass('businessName')}
              />
              {errors.businessName && <p className="text-xs text-destructive">{errors.businessName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-secondary" />
                  Type of Business <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => updateFormData('businessType', value)}
                >
                  <SelectTrigger className={getInputClass('businessType')}>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-xs text-destructive">{errors.businessType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessVintage" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  Business Vintage <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.businessVintage}
                  onValueChange={(value) => updateFormData('businessVintage', value)}
                >
                  <SelectTrigger className={getInputClass('businessVintage')}>
                    <SelectValue placeholder="How old is your business?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessVintage && <p className="text-xs text-destructive">{errors.businessVintage}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualTurnover" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                Annual Turnover (Approx.) <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.annualTurnover}
                onValueChange={(value) => updateFormData('annualTurnover', value)}
              >
                <SelectTrigger className={getInputClass('annualTurnover')}>
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
              {errors.annualTurnover && <p className="text-xs text-destructive">{errors.annualTurnover}</p>}
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
                Annual Turnover Category <span className="text-destructive">*</span>
              </Label>

              <RadioGroup
                value={formData.loanType}
                onValueChange={(value) => updateFormData('loanType', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { value: 'lt50l', label: 'Less than 50 Lakhs', desc: 'Turnover below ₹50,00,000' },
                  { value: 'gt50l', label: 'More than 50 Lakhs', desc: 'Turnover above ₹50,00,000' },
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
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">{type.label[0]}</span>
                    </div>
                    <span className="font-semibold text-foreground">{type.label}</span>
                    <span className="text-xs text-muted-foreground">{type.desc}</span>
                  </Label>
                ))}
              </RadioGroup>

              {errors.loanType && <p className="text-xs text-destructive">{errors.loanType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-accent" />
                Required Loan Amount <span className="text-destructive">*</span>
              </Label>
              <Input
                id="loanAmount"
                placeholder="e.g., 200000"
                value={formData.loanAmount}
                onChange={(e) => updateFormData('loanAmount', e.target.value)}
                className={getInputClass('loanAmount')}
              />
              {errors.loanAmount && <p className="text-xs text-destructive">{errors.loanAmount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanPurpose" className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Purpose of Loan <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="loanPurpose"
                placeholder="Briefly describe how you plan to use this loan..."
                value={formData.loanPurpose}
                onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                rows={4}
                className={getInputClass('loanPurpose')}
              />
              {errors.loanPurpose && <p className="text-xs text-destructive">{errors.loanPurpose}</p>}
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
              { key: 'gst' as const, label: 'GST Registration', required: true },
              { key: 'udyam' as const, label: 'Udyam Registration', required: true },
              { key: 'gst3b12m' as const, label: 'GST Return (3B) of 12 months', required: true},
              { key: 'bankStatement12m' as const, label: 'Bank Statement (Updated 12 months)', required: true },
              { key: 'itr3y' as const, label: 'Last Three Years Complete ITR', required: true },
            ].map((doc) => {
              const selected = formData.documents[doc.key];

              return (
                <div key={doc.key} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary" />
                    {doc.label}
                    {doc.required && <span className="text-destructive">*</span>}
                    {!doc.required && <span className="text-muted-foreground text-xs">(Optional)</span>}
                  </Label>

                  <div className="relative">
                    <input
                      key={`${doc.key}-${selected?.name || 'empty'}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, doc.key)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />

                    {selected ? (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="flex-1 text-sm truncate">{selected.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(doc.key)}
                          className="p-1 rounded-full hover:bg-destructive/10 text-destructive relative z-20"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed transition-colors ${
                          errors[`documents.${doc.key}`]
                            ? 'border-destructive'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                      </div>
                    )}
                  </div>

                  {errors[`documents.${doc.key}`] && (
                    <p className="text-xs text-destructive">{errors[`documents.${doc.key}`]}</p>
                  )}
                </div>
              );
            })}
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
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Thank You! <Sparkles className="inline w-8 h-8 text-accent" />
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your MUDRA loan application has been submitted successfully. Our team will contact you within 24-48 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
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
            Fill in the details below and submit your application. We'll get back to you within 24-48 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
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
                    {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium hidden md:block ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          <form ref={formRef} encType="multipart/form-data">
            <div className="p-8 rounded-3xl glass-card border border-border/50">
              <textarea name="message" value={message} readOnly className="hidden" />
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

              <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? 'invisible' : ''}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    variant="hero"
                    onClick={nextStep}
                    disabled={!stepIsValid}
                    title={!stepIsValid ? 'Fill all required fields to continue' : undefined}
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="gold"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
          </form>
        </motion.div>
      </div>
    </section>
  );
}
