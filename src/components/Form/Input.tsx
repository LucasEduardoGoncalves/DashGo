import { Input as ChakraInput, FormLabel, FormErrorMessage, FormControl, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const Inputbase: ForwardRefRenderFunction<HTMLInputElement,InputProps > = ({name, error = null, label, ...rest}, ref) => {
    return (
        <FormControl isInvalid={!!error}>
          {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <ChakraInput
            name={name}      
            id={name}       
            focusBorderColor='pink.500'
            bgColor="gray.900"
            variant="filled"
            _hover={{
              bgColor: 'gray.900'
            }}
            size="md"
            ref={ref}
            {...rest}
          />

          {!!error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
        </FormControl>
    );
}

export const Input = forwardRef(Inputbase);