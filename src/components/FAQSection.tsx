import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is a MUDRA Loan?',
    answer: 'MUDRA (Micro Units Development and Refinance Agency) Loan is a scheme launched by the Government of India under Pradhan Mantri Mudra Yojana (PMMY) to provide loans up to ₹10 lakhs to non-corporate, non-farm small/micro enterprises. These loans are given by Commercial Banks, RRBs, Small Finance Banks, MFIs, and NBFCs.',
  },
  {
    question: 'Who can apply for a MUDRA Loan?',
    answer: 'Any Indian citizen who has a business plan for a non-farm sector income generating activity such as manufacturing, processing, trading, or service sector can apply. The loan is available to individuals, proprietorships, partnerships, and private limited companies for setting up or expanding micro and small enterprises.',
  },
  {
    question: 'What are Shishu, Kishor, and Tarun categories?',
    answer: 'These are the three categories based on loan amount: Shishu covers loans up to ₹50,000 for very early stage businesses; Kishor covers loans from ₹50,001 to ₹5 lakhs for businesses looking to expand; and Tarun covers loans from ₹5 lakhs to ₹10 lakhs for well-established enterprises needing larger capital.',
  },
  {
    question: 'Is collateral required for MUDRA Loans?',
    answer: 'No, MUDRA loans are collateral-free. You do not need to pledge any assets or property to avail a MUDRA loan. This makes it easier for small entrepreneurs who may not have significant assets to access credit.',
  },
,
  {
    question: 'What documents are required?',
    answer: 'The basic documents required are: PAN Card, Aadhaar Card for identity verification, passport size photographs, address proof, business proof (like shop license or registration), and bank statements. GST registration and Udyam registration are optional but helpful if available.',
  },
  {
    question: 'What is the interest rate on MUDRA Loans?',
    answer: 'Interest rates typically range from 9% to 12% per annum, depending on the bank and your credit profile. Rates may vary between different lending institutions, so it\'s advisable to compare rates before applying.',
  },
  {
    question: 'What is the repayment tenure for MUDRA Loans?',
    answer: 'The repayment tenure for MUDRA loans is generally between 3 to 5 years, depending on the loan amount and type. Some banks may offer flexible repayment options based on your business cash flow.',
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about MUDRA loans and the application process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-foreground">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-8">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
