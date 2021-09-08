import { Stack, HStack, Box, Text } from '@chakra-ui/react';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  totalCountRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

export function Pagination({ totalCountRegisters, onPageChange, currentPage = 1, registerPerPage = 10 }: PaginationProps ) {

  const lastPage = Math.floor(totalCountRegisters / registerPerPage);

  const previosPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1 )
    : []

  const nextPages = currentPage < lastPage 
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [] 

  return( 
    <Stack direction={["column", "row"]} mt="8" justify="space-around" align="center" spacing="6">
    
      <Box>
        <strong>0</strong> - <strong>10</strong>  de <strong>100</strong>
      </Box>

    <HStack spacing="2">  

      {currentPage > ( 1 + siblingsCount) && 
        <>
          <PaginationButton onPageChange={onPageChange} title={String(1)} />
          {currentPage > ( 2 + siblingsCount) && <Text color="gray.300" w="8" textAlign="center" >...</Text>}
        </>
      }
        
      {previosPages.length > 0 && previosPages.map(page => {
        return (
          <>
            <PaginationButton onPageChange={onPageChange} key={page} title={String(page)} />
          </>
        )
      })}

      <PaginationButton onPageChange={onPageChange} title={String(currentPage)} isCurrent />

      {nextPages.length > 0 && nextPages.map(page => {
        return (
          <>
            <PaginationButton onPageChange={onPageChange} key={page} title={String(page)} />
          </>
        )
      })}

      {(currentPage + siblingsCount) < lastPage && 
        <>
          {(currentPage + 1 + siblingsCount) < lastPage && <Text color="gray.300" w="8" textAlign="center" >...</Text>}
          <PaginationButton onPageChange={onPageChange} title={String(lastPage)} />
        </>
      }

    </HStack>
    </Stack>
  );
}