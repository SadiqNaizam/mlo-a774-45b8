import React from 'react';
import { Button, type ButtonProps } from "@/components/ui/button";
import { Chrome, Facebook, Apple, Github, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

type SocialProvider = 'google' | 'facebook' | 'apple' | 'github';

interface SocialLoginButtonProps extends Omit<ButtonProps, 'onClick'> {
  provider: SocialProvider;
  onClick: (provider: SocialProvider) => void; // Pass provider to onClick
  isLoading?: boolean;
  label?: string; // Optional custom label, e.g., "Sign in with Google"
  // children can be used for more complex content, will override label and default text
}

const providerDetails: Record<SocialProvider, { Icon: React.ElementType; defaultText: string; className: string }> = {
  google: {
    Icon: Chrome,
    defaultText: "Continue with Google",
    className: "bg-white text-[#3c4043] border border-gray-300 hover:bg-gray-50 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600 dark:hover:bg-slate-600",
  },
  facebook: {
    Icon: Facebook,
    defaultText: "Continue with Facebook",
    className: "bg-[#1877F2] text-white hover:bg-[#166FE5] dark:bg-[#1877F2] dark:hover:bg-[#166FE5]",
  },
  apple: {
    Icon: Apple,
    defaultText: "Continue with Apple",
    className: "bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200",
  },
  github: {
    Icon: Github,
    defaultText: "Continue with GitHub",
    className: "bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400",
  },
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  label,
  className,
  children,
  ...props
}) => {
  console.log(`SocialLoginButton loaded for provider: ${provider}, isLoading: ${isLoading}`);

  const details = providerDetails[provider];
  if (!details) {
    console.error(`SocialLoginButton: Unknown provider "${provider}"`);
    // Fallback or error display for unknown provider
    return (
      <Button variant="destructive" className={cn("w-full", className)} disabled {...props}>
        Invalid Provider
      </Button>
    );
  }

  const { Icon, defaultText, className: providerClassName } = details;

  const buttonContent = children || label || defaultText;

  return (
    <Button
      variant="outline" // Base variant, specific styles from providerClassName will take precedence
      className={cn(
        "w-full flex items-center justify-center gap-2.5 py-2.5 px-4 text-sm font-medium", // Added more specific base styling
        providerClassName,
        className // Allow overriding with custom className
      )}
      onClick={() => onClick(provider)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
      {buttonContent}
    </Button>
  );
};

export default SocialLoginButton;