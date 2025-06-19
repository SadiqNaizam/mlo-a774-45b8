import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import MinimalHeader from '@/components/layout/MinimalHeader';
import StandardFooter from '@/components/layout/StandardFooter';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const passwordRecoveryFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type PasswordRecoveryFormValues = z.infer<typeof passwordRecoveryFormSchema>;

const PasswordRecoveryPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  console.log('PasswordRecoveryPage loaded');

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(passwordRecoveryFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: PasswordRecoveryFormValues) => {
    setIsLoading(true);
    console.log('Password recovery form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("If an account with that email exists, a password reset link has been sent.", {
      description: "Please check your inbox (and spam folder).",
    });
    form.reset();
    // Optionally redirect or show further instructions
    // navigate('/'); // Redirect to login after message
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-neutral-900">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormWrapper
          title="Forgot Your Password?"
          footerContent={
            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                Log in
              </Link>
            </p>
          }
        >
          <p className="text-sm text-muted-foreground mb-6 text-center">
            No problem! Enter your email address below and we&apos;ll send you a link to reset your password.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        disabled={isLoading}
                        className="dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Recovery Link'}
              </Button>
            </form>
          </Form>
        </AuthFormWrapper>
      </main>
      <StandardFooter />
    </div>
  );
};

export default PasswordRecoveryPage;