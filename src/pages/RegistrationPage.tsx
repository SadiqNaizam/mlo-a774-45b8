import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalHeader from '@/components/layout/MinimalHeader';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import StandardFooter from '@/components/layout/StandardFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Label is part of FormField usually, but can be used standalone. Here we'll use shadcn Form.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define the Zod schema for registration form validation
const registrationFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to show error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log('Registration form submitted:', data);
    // In a real application, you would handle registration logic here (e.g., API call)
    // For now, let's simulate success and navigate to login or a success page
    alert('Registration successful! Please log in.'); // Placeholder
    navigate('/'); // Navigate to LoginPage (path "/")
  };

  const authFooterContent = (
    <p className="text-center text-sm text-muted-foreground">
      Already have an account?{' '}
      <Link to="/" className="font-medium text-primary hover:underline">
        Login
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-neutral-900">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormWrapper title="Create an Account" footerContent={authFooterContent}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </AuthFormWrapper>
      </main>
      <StandardFooter />
    </div>
  );
};

export default RegistrationPage;