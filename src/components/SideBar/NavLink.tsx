import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';

interface Props extends ChakraLinkProps {
  title: string;
  icon: ElementType;
  href: string;
}

export function NavLink({title, href,  icon: Icons, ...rest}: Props) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={Icons} fontSize="20" />
        <Text ml="4" fontWeigth="medium">{title}</Text>
      </ChakraLink>
    </ActiveLink>
  );
};