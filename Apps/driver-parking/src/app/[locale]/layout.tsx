import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { cookies } from 'next/headers';
import ThemeWrapper from '@/components/ThemeWrapper';
import ConditionalLayout from '@/components/ConditionalLayout';

// npm build
type Params = Promise<{ locale: string }>

/* https://medium.com/hackernoon/follow-single-argument-principle-in-typescript-with-parameter-objects-c8a259dd7191 */
export async function generateMetadata({ params }: { params: Params }) {
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
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const session = (await cookies()).get("session")?.value;
  const isLoggedIn = Boolean(session);

  return (
    <html lang={locale}>
      <body style={{ margin: 0, padding: 0, height: '100%' }}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <NextIntlClientProvider locale={locale}>
            <ThemeWrapper>
              <ConditionalLayout isLoggedIn={isLoggedIn}>
                {children}
              </ConditionalLayout>
            </ThemeWrapper>
          </NextIntlClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}