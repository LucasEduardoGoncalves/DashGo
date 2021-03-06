import { useQuery } from "react-query";
import { api } from "../services/api";

type UserProps = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersProps = {
  totalCount: number;
  users: UserProps[];
}

export async function getUsers(page: number): Promise<GetUsersProps> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']); 

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  });
}