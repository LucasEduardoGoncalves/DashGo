import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useSideBarDrawer } from "../../contexts/SideBarDrawerContext";

import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

import * as Icons from '../../styles/icons';

export function Header () {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSideBarDrawer();

  return (
    <Flex
      as='header'
      w="100%"
      maxW="1480px"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={Icons.Menu}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />

      {isWideVersion && <SearchBox />}
      
      <Flex align="center" ml="auto">
        <NotificationNav />    
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex> 
  );
}