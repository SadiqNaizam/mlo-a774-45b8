import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode; // For the main form elements
  footerContent?: React.ReactNode; // For links like "Forgot password?", "Sign up"
  className?: string; // Allow for additional custom styling
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  children,
  footerContent,
  className,
}) => {
  console.log(`AuthFormWrapper loaded for title: ${title}`);

  return (
    <Card className={`w-full max-w-md shadow-lg ${className || ''}`}>
      <CardHeader className="space-y-1 p-6">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-center space-y-2 p-6 pt-0">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormWrapper;