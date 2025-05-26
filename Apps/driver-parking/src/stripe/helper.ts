 import { redirect} from 'next/navigation' 
import { getCheckoutSessionUrlAction } from '../app/[locale]/stripe/action';
  
  const createCheckout = async (name: string, amount: number, metadata: Record<string, unknown>) => {
    function generateCheckoutUrls(data: Record<string, unknown>, redirectURL: string) {
    const queryString = Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        }
        return null; 
      })
      .filter(Boolean)
      .join("&");

      const successUrl = `${redirectURL}/checkout/?${queryString}&status=success`;
      const cancelUrl = `${redirectURL}/checkout/?${queryString}&status=cancel`;

      return { successUrl, cancelUrl };
    }
    const convertToSubCurrency = (amount: number, factor = 100) => {
      return Math.round(amount * factor);
    };
    const amountInCents = convertToSubCurrency(amount);
    const redirectURL = 'https://virtual-park.net/'

    const dynamicUrls = generateCheckoutUrls({
      name: name,
      amount: amount, 
      ... metadata,
    }, redirectURL);

    const successUrl = dynamicUrls.successUrl;
    const cancelUrl = dynamicUrls.cancelUrl;
    const url = await getCheckoutSessionUrlAction(amountInCents, name, metadata, successUrl, cancelUrl)
    console.log(url)
    if (url) {
      redirect(url)
    }   
  };

  export { createCheckout };