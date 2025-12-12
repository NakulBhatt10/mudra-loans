import { motion } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const quickLinks = [
  { name: 'About MUDRA', href: '#about' },
  { name: 'Loan Types', href: '#loan-types' },
  { name: 'Documents', href: '#documents' },
  { name: 'Calculator', href: '#calculator' },
  { name: 'Apply Now', href: '#apply' },
  { name: 'FAQ', href: '#faq' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-[hsl(215,50%,12%)] to-[hsl(215,60%,8%)] text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">MUDRA Loans</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Empowering micro and small enterprises with easy access to credit 
              under Pradhan Mantri Mudra Yojana.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-secondary transition-colors" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">Email</p>
                  <a href="mailto:myemail@example.com" className="text-sm hover:text-primary transition-colors">
                    myemail@example.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">Phone</p>
                  <a href="tel:+911234567890" className="text-sm hover:text-secondary transition-colors">
                    +91 12345 67890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">Address</p>
                  <p className="text-sm">
                    Business Center, Financial District
                    <br />
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Send a Message</h4>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={3}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="hero" size="sm" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-primary-foreground/50 text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> This is an informational website about MUDRA Loans under Pradhan Mantri Mudra Yojana. 
            Please verify the latest guidelines, terms, and conditions from official bank and government sources before applying. 
            Interest rates and eligibility criteria may vary between different lending institutions.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} MUDRA Loans. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive" /> for Indian Entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
