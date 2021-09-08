import { useState } from 'react';
import { Box,HStack, Link, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react';
import NextLink from 'next/link';

import * as Icons from '../../styles/icons';

import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { Pagination } from '../../components/Pagination';
import { getUsers, useUsers } from '../../hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { GetServerSideProps } from 'next';

export default function UsersList() {

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(id: string) {
    await queryClient.prefetchQuery(['user', id], async () => {
      const response = await api.get(`users/${id}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários 
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            
            <HStack>
              <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  onClick={() => refetch()}
                >
                Atualizar Page
              </Button>

              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={Icons.AddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </HStack>     
          </Flex>

          {isLoading ? ( 
            <Flex align="center" justify="center">
              <Spinner />
            </Flex>
          ) : error ? ( 
            <Flex align="center" justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" w="8">
                    <Checkbox colorScheme="pink" />
                  </Th>

                  <Th>Usuário</Th>
                  { isWideVersion && <Th>Data de cadastro</Th>}
                  <Th w="8"></Th>
                </Tr>
              </Thead>
            
              <Tbody>
                {data.users.map(user => {
                  return (                
                  <>
                  <Tr px="6" key={user.id}>
                  <Td px={["4", "4", "6"]}><Checkbox colorScheme="pink" /></Td>

                  <Td>
                    <Box>
                      <Link color="purple.500" onMouseEnter={() => handlePrefetchUser(user.id)}>
                        <Text fontWeight="Bold">{user.name}</Text>
                      </Link>
                      <Text fontSize="sm" color="gray.300">{user.email}</Text>
                    </Box>
                  </Td>

                  { isWideVersion && (
                    <Td>
                      {user.createdAt}
                    </Td>
                  )}

                  { isWideVersion && (
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={Icons.Edit} fontSize="15" />}
                        >
                        Editar
                      </Button>
                    </Td>
                  )}
                </Tr>
                </>
                )
                })}
              </Tbody>
            </Table>

            <Pagination 
              totalCountRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};