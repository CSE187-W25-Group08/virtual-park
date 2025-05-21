import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // basePath: '/driver',
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);