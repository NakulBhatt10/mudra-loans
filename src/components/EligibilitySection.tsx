import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  CheckCircle2, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Banknote,
  TrendingUp,
  Building2
} from 'lucide-react';

const eligibilityPoints = [
  {
    icon: Users,
    title: 'For Non-Farming Businesses',
    description: 'Ideal for micro and small enterprises in non-agricultural sectors',
  },
  {
    icon: Briefcase,
    title: 'Trading, Services & Manufacturing',
    description: 'Applicable across trading, service, and manufacturing industries',
  },
  {
    icon: ShieldCheck,
    title: 'No Collateral Required',
    description: 'Get loans without pledging any assets or property',
  },
  {
    icon: Banknote,
    title: 'Zero Processing Fee',
    description: 'No hidden charges or application processing costs',
  },
  {
    icon: TrendingUp,
    title: 'Flexible Loan Categories',
    description: 'Choose from Shishu, Kishor, or Tarun based on your needs',
  },
  {
    icon: Building2,
    title: 'Government Backed',
    description: 'Secure lending backed by the Government of India',
  },
];

export function EligibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Eligibility & <span className="gradient-text">Benefits</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what makes MUDRA loans the ideal choice for small business owners 
            looking to start or expand their enterprise.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eligibilityPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    {point.title}
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interest Rate Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 text-center"
        >
          <p className="text-lg text-foreground">
            💡 <span className="font-semibold">Interest Rates:</span> Typically ranging from{' '}
            <span className="text-primary font-bold">9% to 10%</span> per annum 
            (varies by bank and applicant profile). Always check the latest rates with your bank.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
