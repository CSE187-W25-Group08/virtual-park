import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound} from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '../../components/Navbar';
import BottomNavbar from '../../components/BottomNavbar';
import { Toolbar } from '@mui/material';

import { cookies } from 'next/headers';

import ThemeWrapper from '@/components/ThemeWrapper';

// npm build
type Params = Promise<{ locale: string }>
/* https://medium.com/hackernoon/follow-single-argument-principle-in-typescript-with-parameter-objects-c8a259dd7191 */
export async function generateMetadata({ params }:{params: Params}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'), 
  };
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
    // redirect('/')
  }

  const session = (await cookies()).get("session")?.value;
  const isLoggedIn = Boolean(session); // or use your own session validation
  
  return (
    <html lang={locale}>
      <body style={{margin:0, padding: 0}}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <NextIntlClientProvider locale={locale}>
          <ThemeWrapper>
            {isLoggedIn && (
              <>
                <Navbar />
                <Toolbar />
                <BottomNavbar />
              </>
            )}
            <main>{children}</main>
          </ThemeWrapper>
        </NextIntlClientProvider>
      </GoogleOAuthProvider>
      </body>
    </html>
  );
}

