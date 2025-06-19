import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MinimalHeader from '@/components/layout/MinimalHeader';
import StandardFooter from '@/components/layout/StandardFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StaticPageContent {
  title: string;
  content: React.ReactNode;
}

const contentMap: Record<string, StaticPageContent> = {
  terms: {
    title: 'Terms of Service',
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>Welcome to AuthPortal! These terms and conditions outline the rules and regulations for the use of AuthPortal's Website, located at yourdomain.com.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use AuthPortal if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h3 className="font-semibold text-lg text-foreground">Cookies</h3>
        <p>We employ the use of cookies. By accessing AuthPortal, you agreed to use cookies in agreement with the AuthPortal's Privacy Policy.</p>
        <h3 className="font-semibold text-lg text-foreground">License</h3>
        <p>Unless otherwise stated, AuthPortal and/or its licensors own the intellectual property rights for all material on AuthPortal. All intellectual property rights are reserved. You may access this from AuthPortal for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <p>You must not:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Republish material from AuthPortal</li>
          <li>Sell, rent or sub-license material from AuthPortal</li>
          <li>Reproduce, duplicate or copy material from AuthPortal</li>
          <li>Redistribute content from AuthPortal</li>
        </ul>
        <p>This Agreement shall begin on the date hereof.</p>
        {/* Add more placeholder terms content here */}
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>Your privacy is important to us. It is AuthPortal's policy to respect your privacy regarding any information we may collect from you across our website, yourdomain.com, and other sites we own and operate.</p>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
        <h3 className="font-semibold text-lg text-foreground">Information We Collect</h3>
        <p>Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
        <h3 className="font-semibold text-lg text-foreground">Security</h3>
        <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
        {/* Add more placeholder privacy content here */}
      </div>
    ),
  },
  contact: {
    title: 'Contact Us',
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>If you have any questions about these Terms, please contact us.</p>
        <p>Email: support@authportal.example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 AuthPortal Street, Suite 100, Tech City, TX 75001</p>
        <h3 className="font-semibold text-lg text-foreground">Feedback</h3>
        <p>We welcome your feedback and suggestions about how to improve AuthPortal. Feel free to reach out to us through any of the channels above.</p>
      </div>
    ),
  },
  default: {
    title: 'Information',
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>Please select a topic to view its content. You can find links in the footer of most pages.</p>
        <p>This page is used to display static content such as terms of service, privacy policies, or contact information.</p>
      </div>
    ),
  }
};

const StaticContentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pageData, setPageData] = useState<StaticPageContent>(contentMap.default);

  useEffect(() => {
    console.log('StaticContentPage loaded or searchParams changed');
    const view = searchParams.get('view');
    if (view && contentMap[view]) {
      setPageData(contentMap[view]);
    } else {
      setPageData(contentMap.default);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <MinimalHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-10 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to="/"> {/* Default link, ideally should be to previous page or home */}
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">{pageData.title}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose dark:prose-invert max-w-none">
                {pageData.content}
              </CardContent>
            </Card>
          </div>
        </main>
      </ScrollArea>
      <StandardFooter />
    </div>
  );
};

export default StaticContentPage;