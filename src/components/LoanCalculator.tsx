import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export function LoanCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 1) Per-day interest calculator
  const [principal, setPrincipal] = useState(200000);
  const [annualRate, setAnnualRate] = useState(9.5);
  const [days, setDays] = useState(30);

  // 2) Eligibility calculator (Turnover/5)
  const [turnover12m, setTurnover12m] = useState(2500000);

  const dailyInterestCalc = useMemo(() => {
    const P = principal;
    const R = annualRate / 100;
    const perDayInterest = (P * R) / 365;
    const totalInterest = perDayInterest * days;
    const totalPayable = P + totalInterest;

    return {
      perDayInterest: Math.round(perDayInterest),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    };
  }, [principal, annualRate, days]);

  const eligibilityCalc = useMemo(() => {
    const eligible = turnover12m / 5;
    return {
      eligible: Math.round(eligible),
    };
  }, [turnover12m]);

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
            Loan Calculators
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Calculate <span className="gradient-text">Interest</span> &amp; <span className="gradient-text">Eligibility</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use the calculators below to estimate daily interest and check your loan eligibility based on turnover.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-10">
          {/* ========================= */}
          {/* 1) PER DAY INTEREST CALC  */}
          {/* ========================= */}
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
                <div>
                  <h3 className="text-xl font-bold text-foreground">Per Day Interest Calculator</h3>
                  <p className="text-sm text-muted-foreground">Estimate interest per day &amp; total interest for a period</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Principal */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      Principal Amount
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-bold">
                      {formatCurrency(principal)}
                    </span>
                  </div>
                  <Slider
                    value={[principal]}
                    onValueChange={(value) => setPrincipal(value[0])}
                    min={10000}
                    max={20000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>₹10,000</span>
                    <span>₹20000000</span>
                  </div>
                </div>

                {/* Annual Rate */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Percent className="w-4 h-4 text-secondary" />
                      Annual Interest Rate (p.a.)
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-secondary/10 text-secondary font-bold">
                      {annualRate}%
                    </span>
                  </div>
                  <Slider
                    value={[annualRate]}
                    onValueChange={(value) => setAnnualRate(value[0])}
                    min={7}
                    max={18}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>7%</span>
                    <span>18%</span>
                  </div>
                </div>

                {/* Days */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      Number of Days
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-accent/10 text-accent font-bold">
                      {days} days
                    </span>
                  </div>
                  <Slider value={[days]} onValueChange={(value) => setDays(value[0])} min={1} max={365} step={1} className="w-full" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>365 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Per Day Interest Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <p className="text-primary-foreground/80 text-sm mb-2">Interest Per Day</p>
                  <motion.p
                    key={dailyInterestCalc.perDayInterest}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {formatCurrency(dailyInterestCalc.perDayInterest)}
                  </motion.p>
                  <p className="text-primary-foreground/70 text-sm">
                    Based on principal {formatCurrency(principal)} at {annualRate}% p.a.
                  </p>
                </div>
              </motion.div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl glass-card border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Total Interest</span>
                  </div>
                  <motion.p
                    key={dailyInterestCalc.totalInterest}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold text-foreground"
                  >
                    {formatCurrency(dailyInterestCalc.totalInterest)}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">For {days} days</p>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl glass-card border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Payable</span>
                  </div>
                  <motion.p
                    key={dailyInterestCalc.totalPayable}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold text-foreground"
                  >
                    {formatCurrency(dailyInterestCalc.totalPayable)}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">Principal + interest</p>
                </motion.div>
              </div>


            </div>
          </motion.div>

          {/* ========================= */}
          {/* 2) ELIGIBILITY CALCULATOR */}
          {/* ========================= */}
          <motion.div
            id="eligibility-calculator"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Eligibility Inputs */}
            <div className="p-8 rounded-3xl glass-card border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Check Eligibility Calculator</h3>
                  <p className="text-sm text-muted-foreground">Eligibility = Turnover (12 months) / 5</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Turnover 12 months */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <IndianRupee className="w-4 h-4 text-secondary" />
                      Turnover (Last 12 Months)
                    </label>
                    <span className="px-4 py-1.5 rounded-lg bg-secondary/10 text-secondary font-bold">
                      {formatCurrency(turnover12m)}
                    </span>
                  </div>
                  <Slider
                    value={[turnover12m]}
                    onValueChange={(value) => setTurnover12m(value[0])}
                    min={100000} // ₹1,00,000
                    max={100000000} // ₹5,00,00,000
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>₹1,00,000</span>
                    <span>₹10,00,00,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility Result */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-secondary to-primary text-primary-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <p className="text-primary-foreground/80 text-sm mb-2">Estimated Eligibility</p>
                  <motion.p
                    key={eligibilityCalc.eligible}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {formatCurrency(eligibilityCalc.eligible)}
                  </motion.p>
                  <p className="text-primary-foreground/70 text-sm">
                    Based on turnover {formatCurrency(turnover12m)} for the last 12 months
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl glass-card border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <IndianRupee className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Turnover</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(turnover12m)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl glass-card border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Formula</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">÷ 5</p>
                  <p className="text-xs text-muted-foreground mt-1">Eligibility = Turnover/5</p>
                </motion.div>
              </div>

              <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl bg-accent/10 border border-accent/20">
                <p className="text-sm text-muted-foreground">
                  Note: This is an estimate using your provided formula. Final eligibility depends on bank policy and applicant profile.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
