import { Box, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type Inputs = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
};

export default function CreateUser() {

  const router = useRouter();

  const createUser = useMutation(async (user: Inputs ) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório.'),
    email: yup.string().required('Campo obrigatório.').email('Deve ser um email'),
    password: yup.string().required('Campo obrigatório.').min(6, 'Minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
      null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUser.mutateAsync(data);

    router.push('/users');
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box as="form" onSubmit={handleSubmit(onSubmit)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontSize="normal">Criar usuários</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth={240} spacing={["6", "8"]} w="100%">
              <Input {...register("name")} error={errors.name} label="Nome Completo"/>
              <Input {...register("email")} error={errors.email} type="email" label="E-mail"/>
            </SimpleGrid>

            <SimpleGrid minChildWidth={240} spacing={["6", "8"]} w="100%">
              <Input {...register("password")} error={errors.password} type="password" label="Senha"/>
              <Input {...register("password_confirmation")} error={errors.password_confirmation} type="password" label="Confirme a senha"/>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}