import { Stack, HStack, Box, useBreakpointValue } from '@chakra-ui/react';
import { PaginationButton } from './PaginationButton';

export function Pagination() {

  return( 
    <Stack direction={["column", "row"]} mt="8" justify="space-around" align="center" spacing="6">
    
      <Box>
        <strong>0</strong> - <strong>10</strong>  de <strong>100</strong>
      </Box>

    <HStack spacing="2">
      
      <PaginationButton title="1" isCurrent />

      <PaginationButton title="2"/>
      <PaginationButton title="3"/>
      <PaginationButton title="4"/>
      <PaginationButton title="5"/>
    </HStack>
    </Stack>
  );
}