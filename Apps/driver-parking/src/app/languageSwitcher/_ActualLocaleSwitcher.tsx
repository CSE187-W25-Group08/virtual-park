'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

type LocaleSwitcherProps = {
  bottom?: boolean;
};

export default function LocaleSwitcher({ bottom = false }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLocale = (locale: string) => {
    router.replace({ pathname }, { locale });
    handleClose();
  };


    const anchorOrigin = bottom
  ? ({ vertical: 'top', horizontal: 'right' } as const)
  : ({ vertical: 'bottom', horizontal: 'right' } as const);

const transformOrigin = bottom
  ? ({ vertical: 'bottom', horizontal: 'right' } as const)
  : ({ vertical: 'top', horizontal: 'right' } as const);

  return (
    <>
      <Tooltip title={t('language')}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="select language"
          aria-controls={open ? 'locale-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'language-button' }}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <MenuItem onClick={() => switchLocale('en')}>{t('english')}</MenuItem>
        <MenuItem onClick={() => switchLocale('es')}>{t('spanish')}</MenuItem>
      </Menu>
    </>
  );
}
