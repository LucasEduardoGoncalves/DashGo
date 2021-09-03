import { Box, Drawer, DrawerHeader, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react';
import { useSideBarDrawer } from '../../contexts/SideBarDrawerContext';
import { SideBarNav } from './SideBarNav';

export function SideBar() {

  const { isOpen, onClose } = useSideBarDrawer();

  const isFloatingSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if(isFloatingSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800">
            <DrawerCloseButton mt="6" p="4" />
            <DrawerHeader>Navageção</DrawerHeader>

            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };


  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}