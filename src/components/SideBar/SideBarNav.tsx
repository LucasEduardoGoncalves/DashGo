import { Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

import * as Icons from '../../styles/icons';

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="geral">  
        <NavLink href="/dashboard" title="Dashboard" icon={Icons.DashboardLine} />
        <NavLink href="/users" title="Usuários" icon={Icons.Contacts} />
        
      </NavSection>

      <NavSection title="users">
        <NavLink href="/forms" title="Formulários" icon={Icons.InputMethod} />
        <NavLink href="/automation" title="Automação" icon={Icons.GitMerge} />
      </NavSection>
    </Stack>
  );
};