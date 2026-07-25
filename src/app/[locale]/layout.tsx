import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Manrope} from 'next/font/google';
import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import SchemaOrg from "@/components/SchemaOrg";
import Analytics from "@/components/Analytics";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import MotionProvider from "@/components/MotionProvider";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} dark antialiased`}>
      <head>
        <SchemaOrg />
        <Analytics />
      </head>
      <body className="bg-[#0B0B0B] text-white font-sans min-h-screen selection:bg-[#D4AF37] selection:text-[#0B0B0B] overflow-x-hidden pb-20 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
            <MobileStickyCTA />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

