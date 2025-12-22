import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BadgeIndianRupee, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const loanTypes = [
  {
    name: 'Turnover < ₹50 Lakhs',
    icon: BadgeIndianRupee,
    amount: 'Annual turnover below ₹50 Lakhs',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    description: 'For micro & small businesses with annual turnover under ₹50 Lakhs.',
    features: [
      'Faster eligibility checks',
      'Minimal documentation required',
      'Working capital / day-to-day expenses',
      'Suitable for early-stage & small setups',
    ],
    ideal: 'Small vendors, home-based businesses, retailers, service providers',
  },
  {
    name: 'Turnover ≥ ₹50 Lakhs',
    icon: TrendingUp,
    amount: 'Annual turnover ₹50 Lakhs and above',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    description: 'For growing businesses with annual turnover ₹50 Lakhs and above.',
    features: [
      'Higher funding suitability',
      'Expansion & scaling support',
      'Equipment & machinery purchase',
      'Inventory & operational growth',
    ],
    ideal: 'Established shops, manufacturers, larger service businesses',
    popular: true,
  },
];

export function LoanTypesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="loan-types" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Loan Categories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="gradient-text">MUDRA Loan</span> Type
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three categories designed to meet the diverse needs of businesses 
            at different stages of their growth journey.
          </p>
        </motion.div>

        {/* Loan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {loanTypes.map((loan, index) => (
            <motion.div
              key={loan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative group w-full"
            >
              {/* Popular Badge */}
              {loan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`h-full rounded-3xl bg-card border-2 ${loan.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col`}>
                {/* Card Header */}
                <div className={`p-8 pb-6 bg-gradient-to-br ${loan.bgColor}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${loan.color} flex items-center justify-center shadow-lg`}
                    >
                      <loan.icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{loan.name}</h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${loan.color} bg-clip-text text-transparent`}>
                        {loan.amount}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{loan.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-8 pt-6 flex flex-col flex-1">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    Key Features
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {loan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${loan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-xl bg-muted/50 mb-6">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Ideal for: </span>
                      {loan.ideal}
                    </p>
                  </div>

                  <Button
                    variant={loan.popular ? 'hero' : 'outline'}
                    className="w-full group/btn mt-auto"
                    onClick={() => scrollToSection('#apply')}
                  >
                    Apply for {loan.name}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
