import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Landmark, 
  Store, 
  Wrench, 
  Factory, 
  CreditCard, 
  Wallet, 
  Building,
  CheckCircle2,
  Percent,
  ShieldCheck
} from 'lucide-react';

const businessTypes = [
  { icon: Store, label: 'Trading', color: 'from-blue-500 to-blue-600' },
  { icon: Wrench, label: 'Services', color: 'from-teal-500 to-teal-600' },
  { icon: Factory, label: 'Manufacturing', color: 'from-indigo-500 to-indigo-600' },
];

const loanTypes = [
  { icon: CreditCard, label: 'Term Loan' },
  { icon: Wallet, label: 'Working Capital' },
  { icon: Building, label: 'Overdraft Limit' },
];

const benefits = [
  { icon: ShieldCheck, title: 'No Collateral', desc: 'Get loans without pledging any asset' },
  { icon: Percent, title: 'Zero Processing Fee', desc: 'No hidden charges or processing costs' },
  { icon: CheckCircle2, title: 'Low Interest', desc: 'Competitive rates around 9-10% p.a.' },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About PMMY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What is{' '}
            <span className="gradient-text">Pradhan Mantri Mudra Yojana?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A flagship government scheme empowering micro and small enterprises 
            with easy access to credit for business growth and entrepreneurship.
          </p>
        </motion.div>

        {/* Government Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl glass-card">
            <Landmark className="w-8 h-8 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Central Government Scheme</p>
              <p className="text-sm text-muted-foreground">Ministry of Finance, Govt. of India</p>
            </div>
          </div>
        </motion.div>

        {/* Business Types */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">
            For Non-Farming Small Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.label}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{type.label}</h4>
                <p className="text-sm text-muted-foreground">
                  Eligible for MUDRA loans to expand and grow your {type.label.toLowerCase()} business.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Loan Forms */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">
            Available Loan Forms
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {loanTypes.map((loan) => (
              <motion.div
                key={loan.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-muted border border-border hover:border-primary/30 transition-all"
              >
                <loan.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{loan.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h4>
              <p className="text-muted-foreground">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
