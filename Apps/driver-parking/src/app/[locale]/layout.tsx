import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound} from 'next/navigation';


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
  }
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} >{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

