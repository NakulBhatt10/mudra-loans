import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export function LoanCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(36);

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = tenure;

    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            EMI Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Calculate Your <span className="gradient-text">Loan EMI</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Plan your finances with our interactive EMI calculator. 
            Adjust the sliders to see instant calculations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Calculator Inputs */}
            <div className="p-8 rounded-3xl glass-card border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Loan Details</h3>
              </div>

              <div className="space-y-8">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      Loan Amount
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-bold">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={10000}
                    max={1000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>₹10,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Percent className="w-4 h-4 text-secondary" />
                      Interest Rate (p.a.)
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-secondary/10 text-secondary font-bold">
                      {interestRate}%
                    </span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={7}
                    max={15}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>7%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      Loan Tenure
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-accent/10 text-accent font-bold">
                      {tenure} months
                    </span>
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value) => setTenure(value[0])}
                    min={6}
                    max={60}
                    step={6}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>6 months</span>
                    <span>60 months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* EMI Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <p className="text-primary-foreground/80 text-sm mb-2">Monthly EMI</p>
                  <motion.p
                    key={calculations.emi}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {formatCurrency(calculations.emi)}
                  </motion.p>
                  <p className="text-primary-foreground/70 text-sm">
                    Estimated monthly payment based on your inputs
                  </p>
                </div>
              </motion.div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl glass-card border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Principal</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(loanAmount)}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl glass-card border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Total Interest</span>
                  </div>
                  <motion.p
                    key={calculations.totalInterest}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold text-foreground"
                  >
                    {formatCurrency(calculations.totalInterest)}
                  </motion.p>
                </motion.div>
              </div>

              {/* Total Amount */}
              <motion.div
                whileHover={{ y: -3 }}
                className="p-6 rounded-2xl bg-accent/10 border border-accent/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Amount Payable</p>
                    <motion.p
                      key={calculations.totalAmount}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {formatCurrency(calculations.totalAmount)}
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Over {tenure} months</p>
                    <p className="text-sm text-accent font-medium">
                      {Math.floor(tenure / 12)} yrs {tenure % 12} mo
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
