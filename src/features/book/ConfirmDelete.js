import { useDeleteBook } from "@/features/book/useDeleteBook";
import { useFetchBooks } from "@/features/book/useFetchBooks";
import { useRef } from "react";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";

export default function ConfirmDelete(bookId) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { refetch: refetchBooks } = useFetchBooks();

  const toast = useToast();

  const { mutate: deleteBook } = useDeleteBook({
    onSuccess: async () => {
      try {
        toast({
          title: "buku berhasil dihapus",
          status: "info",
          position: "top-right",
          duration: 1000,
        });
        await refetchBooks();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDelete = (bookId) => {
    const id = bookId.id;

    // console.log(id);

    deleteBook(id);
  };

  return (
    <>
      <Button mx={"10px"} colorScheme={"red"} onClick={onOpen}>
        Hapus
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Buku
            </AlertDialogHeader>

            <AlertDialogBody>Konfirmasi Hapus Buku</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(bookId);
                }}
                ml={3}
              >
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
