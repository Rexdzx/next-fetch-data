import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBooks = () => {
  return useQuery({
    queryFn: async () => {
      const bookResponse = await axiosInstance.get("/books");
      return bookResponse;
    },
    // Cache
    queryKey: ["fetch.books"],
  });
};
