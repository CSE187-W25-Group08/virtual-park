import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  if (!requested) {
    notFound();
  }
  const locale = requested;
  /* reference: https://github.com/cucumber/common/issues/1519 */
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});