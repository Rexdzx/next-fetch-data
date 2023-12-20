import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      // Buat data di parameter kedua agar menjadi body request
      const bookResponse = await axiosInstance.post("/books", body);

      return bookResponse;
    },
    onSuccess,
  });
};
