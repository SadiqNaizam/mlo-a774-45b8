import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialLoginButton, { type SocialProvider } from '@/components/SocialLoginButton'; // Assuming SocialProvider is exported
import StandardFooter from '@/components/layout/StandardFooter';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Lucide Icons
import { Loader2, AlertTriangle } from 'lucide-react';

// Define Zod schema for login form validation
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginProviderLoading, setSocialLoginProviderLoading] = useState<SocialProvider | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Simulate login API call
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    console.log('Login form submitted:', data);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example login logic
    if (data.email === "user@example.com" && data.password === "password") {
      console.log('Login successful, navigating to application homepage...');
      navigate('/application-homepage'); // Path from App.tsx
    } else {
      console.log('Login failed: Invalid credentials.');
      setLoginError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSocialLoginProviderLoading(provider);
    setLoginError(null);
    console.log(`Initiating ${provider} login...`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example social login logic (always success for demo)
    console.log(`${provider} login successful, navigating to application homepage...`);
    navigate('/application-homepage'); // Path from App.tsx
    
    setSocialLoginProviderLoading(null);
  };
  
  useEffect(() => {
    // This effect could be used for things like setting document title,
    // but for just a console log, it's fine at the top level of the component.
  }, []);

  const authFormFooterContent = (
    <div className="space-y-3 text-center text-sm">
      <Link
        to="/password-recovery" // Path from App.tsx
        className="font-medium text-primary hover:underline"
      >
        Forgot your password?
      </Link>
      <p className="text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          to="/registration" // Path from App.tsx
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormWrapper title="Login to Your Account" footerContent={authFormFooterContent}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {loginError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} disabled={isLoading || !!socialLoginProviderLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || !!socialLoginProviderLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading || !!socialLoginProviderLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || !!socialLoginProviderLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <SocialLoginButton
              provider="google"
              onClick={() => handleSocialLogin('google')}
              isLoading={socialLoginProviderLoading === 'google'}
              disabled={isLoading || (!!socialLoginProviderLoading && socialLoginProviderLoading !== 'google')}
            />
            {/* Add other social login buttons if needed, e.g., GitHub */}
            {/* 
            <SocialLoginButton
              provider="github"
              onClick={() => handleSocialLogin('github')}
              isLoading={socialLoginProviderLoading === 'github'}
              disabled={isLoading || (!!socialLoginProviderLoading && socialLoginProviderLoading !== 'github')}
            /> 
            */}
          </div>
        </AuthFormWrapper>
      </main>
      <StandardFooter />
    </div>
  );
};

export default LoginPage;