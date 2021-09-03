import { Button, ButtonProps  } from '@chakra-ui/react';

interface Props extends ButtonProps{
  title: string;
  isCurrent?: boolean;
}

export function PaginationButton({ title, isCurrent = false, ...rest }: Props) {
  if(isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursor: "default",
        }}
        
        {...rest}
      >
        {title}
      </Button>
    );
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        bg="gray.700"
        _hover={{
          bg:'gray.600'
        }}
        
        {...rest}
      >
        {title}
      </Button>
    );
  }
};