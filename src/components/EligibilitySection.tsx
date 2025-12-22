import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Wallet,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

const ccBenefits = [
  {
    icon: Wallet,
    title: 'Withdraw Only What You Need',
    description: 'Use funds as required and pay interest only on the amount you actually use.',
  },
  {
    icon: RefreshCw,
    title: 'Reusable Credit Limit',
    description: 'As you repay, your limit gets restored—so you can borrow again without reapplying.',
  },
  {
    icon: Clock,
    title: 'Quick Access to Working Capital',
    description: 'Instant liquidity for inventory, salaries, rent, and day-to-day business expenses.',
  },
  {
    icon: ShieldCheck,
    title: 'Better Cash Flow Control',
    description: 'Helps manage seasonal demand, delayed payments, and short-term gaps smoothly.',
  },
  {
    icon: TrendingUp,
    title: 'Supports Business Growth',
    description: 'Keep operations running while you scale—without taking a new loan each time.',
  },
  {
    icon: CreditCard,
    title: 'Bank-Linked Facility',
    description: 'A structured credit line that can improve your financial discipline and banking track record.',
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
            CC / OD Explained
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Understand <span className="gradient-text">Cash Credit (CC)</span> Benefits
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            If you apply for a loan as a <span className="font-semibold text-foreground">Cash Credit (CC)</span> facility,
            you get a flexible credit line for your business—use it when needed, repay and reuse it again.
            Below are the key benefits and two short videos to help you understand CC, OD and the difference between them.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ccBenefits.map((point, index) => (
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

        {/* Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Watch & Learn
            </h3>
            <p className="text-muted-foreground mt-2">
              These videos explain what CC & OD are and how they differ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border/50">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  What is CC & OD?
                  <ArrowRight className="w-4 h-4 text-primary" />
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Understand the basics of Cash Credit and Overdraft.
                </p>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/axA8NGmdtC4"
                  title="What is CC & OD?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border/50">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  Difference Between CC & OD
                  <ArrowRight className="w-4 h-4 text-primary" />
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  See how CC and OD differ and which one suits your needs.
                </p>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Dl2wWsMk018"
                  title="Difference Between CC & OD"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 text-center"
        >
          <p className="text-lg text-foreground">
            💡 <span className="font-semibold">Tip:</span> A CC facility is best for businesses that need
            ongoing working capital—because you can withdraw, repay, and reuse the limit anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
