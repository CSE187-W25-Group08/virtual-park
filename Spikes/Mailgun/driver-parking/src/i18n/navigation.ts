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

import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);