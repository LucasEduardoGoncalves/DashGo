import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react';
import * as Icons from '../../styles/icons';

export function SearchBox() {
  return (
    <InputGroup
      flex="1"
      ml="6"
      maxW={400}
      variant="filled"
    >
      <Input 
        placeholder="Buscar" 
        focusBorderColor='pink.500'
        bgColor="gray.800"
        _hover={{
          bgColor: 'gray.800'
        }}
        _placeholder={{color: 'gray.400'}}
      />

      <InputRightElement >
        <Icon as={Icons.Search} fontSize="15"/>
      </InputRightElement >
    </InputGroup>
  );
};