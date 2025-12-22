import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  CreditCard, 
  Fingerprint, 
  Receipt, 
  BadgeCheck, 
  FileText, 
  Image,
  CheckCircle2,
  Info
} from 'lucide-react';

const requiredDocs = [
  {
    icon: CreditCard,
    name: 'PAN Card',
    description: 'Permanent Account Number card for identity and tax verification',
    required: true,
  },

  {
    icon: Fingerprint,
    name: 'Aadhaar Card',
    description: 'Unique Identification for KYC verification',
    required: true,
  },
  {
    icon: Receipt,
    name: 'GST Registration',
    description: 'GST registration number (optional, but helpful if available)',
    required: true,
  },
  {
    icon: BadgeCheck,
    name: 'Udyam Registration',
    description: 'Udyam Registration Number (if applicable for your business)',
    required: true,
  },
    {
    icon: CreditCard,
    name: 'GST Return (3B) of 12 months',
    description: '',
    required: true,
  },

    {
    icon: CreditCard,
    name: 'Bank Statement (Updated 12 months)',
    description: '',
    required: true,
  },

    {
    icon: CreditCard,
    name: 'Last Three Years Complete ITR ',
    description: '',
    required: true,
  },
];

const additionalDocs = [
  { icon: Image, name: 'Passport Size Photos', description: '2-3 recent photographs' },
  { icon: FileText, name: 'Address Proof', description: 'Utility bill, rent agreement, or property documents' },
  { icon: FileText, name: 'Business Proof', description: 'Shop license, trade certificate, or registration' },

];

export function DocumentsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="documents" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Requirements
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Documents <span className="gradient-text">Required</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Keep these documents ready for a smooth and quick loan application process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Primary Documents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Primary Documents</h3>
            </div>

            <div className="space-y-4">
              {requiredDocs.map((doc, index) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group p-5 rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <doc.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{doc.name}</h4>
                        {doc.required ? (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Documents */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Additional Documents</h3>
            </div>

            <div className="space-y-4">
              {additionalDocs.map((doc, index) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: -5 }}
                  className="group p-5 rounded-2xl bg-muted/50 border border-border/50 hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <doc.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Pro Tip:</span> Having all documents ready in 
                  digital format (scanned copies) speeds up your application process significantly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
