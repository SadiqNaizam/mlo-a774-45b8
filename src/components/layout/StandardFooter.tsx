import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const StandardFooter: React.FC = () => {
  console.log('StandardFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold">AuthPortal</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 md:mb-0">
          <Link to="/static-content?view=terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/static-content?view=privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/static-content?view=contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
        <div>
          <p className="text-center">
            &copy; {currentYear} AuthPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StandardFooter;