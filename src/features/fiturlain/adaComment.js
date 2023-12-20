import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  // const [books, setBooks] = useState([]); //nyimpan respon get buku
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchBooks = async () => {
  //   // const bookResponse = await axios.get("http://localhost:1234/books");
  //   setIsLoading(true); //kasih tau lagi loading

  //   try {
  //     setTimeout(async () => {
  //       const bookResponse = await axiosInstance.get("/books");
  //       setBooks(bookResponse.data.Data);
  //       setIsLoading(false);
  //     }, 1200);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // fetchBook hanya function biasa, dan jika ingin dieksekusi ketika masuk ke halaman pakai useEffects
  // useEffect(() => {
  //   fetchBooks();
  //   // Kasih Array Kosong Supaya Hanya Dieksekusi Sekali saja
  // }, []);

  return useQuery({
    queryFn: async () => {
      // akan masuk kedalam properti data punya react query
      const bookResponse = await axiosInstance.get("/books");
      return bookResponse;
    },
  });
};
