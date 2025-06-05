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

'use client'

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common')

  const switchLocale = (locale: string) => {
    router.replace(
      {pathname},
      {locale: locale}
    )
  }

  return (
    <div>
      <button onClick={() => switchLocale('en')}>{t('english')}</button>
      <button onClick={() => switchLocale('es')}>{t('spanish')}</button>
    </div>
  );
};