/*
#######################################################################
#
# Copyright (C) 2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: "as-needed",
});

/* when you try to do http://localhost:3000/en, it will do nothing because the enligh is the default locale route */