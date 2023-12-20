import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const bookResponse = await axiosInstance.put(`/books/${body.id}`, body);

      return bookResponse;
    },
    onSuccess,
  });
};
