import { Icon, HStack } from '@chakra-ui/react';
import * as Icons from '../../styles/icons';

export function NotificationNav() {
  return (
    <HStack
      spacing={["6","8"]}
      mx={["6","8"]}
      pr={["6","8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={Icons.Notification} fontSize="20" />
      <Icon as={Icons.User} fontSize="20" />
    </HStack>
  );
};