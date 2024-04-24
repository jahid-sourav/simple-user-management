import { useQuery } from "@tanstack/react-query";

function UseUserHooks() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        `https://simple-user-management-server.vercel.app/users`
      );
      const data = await response.json();
      return data;
    },
  });
  return { data, isLoading, refetch };
}

export default UseUserHooks;
