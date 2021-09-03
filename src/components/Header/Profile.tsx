import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }:Props) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Gonçalves</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            lucasedugoncalves123@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Lucas Gonçalves"/>
    </Flex>
  );
};