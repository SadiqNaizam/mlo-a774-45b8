import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const MinimalHeader: React.FC = () => {
  console.log('MinimalHeader loaded');

  return (
    <header className="py-4 px-6 bg-background border-b">
      <div className="container mx-auto flex items-center justify-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span>AuthPortal</span>
        </Link>
      </div>
    </header>
  );
};

export default MinimalHeader;