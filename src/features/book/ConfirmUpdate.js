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
  VStack,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useUpdateBook } from "@/features/book/useUpdateBook";

export default function ConfirmUpdate({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { judul, pengarang, kategori, cover, id } = data;
  const { refetch: refetchBooks } = useFetchBooks();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      id,
      judul, //inisial nilai dan akan diubah ketika diinput
      pengarang,
      kategori,
      cover,
    },
    onSubmit: () => {
      const { id, judul, pengarang, kategori, cover } = formik.values;
      // Mutate akan menjadi argumen body
      updateBook({
        judul, // = judul: judul
        pengarang,
        kategori,
        cover,
        id,
      });

      //   console.log(id);
    },
  });

  const { mutate: updateBook } = useUpdateBook({
    onSuccess: async () => {
      try {
        toast({
          title: "Buku Telah Diupdate",
          status: "success",
          position: "top-right",
          duration: 1000,
        });
        await refetchBooks();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <Button mx={"10px"} colorScheme={"blue"} onClick={onOpen}>
        Edit
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form onSubmit={formik.handleSubmit}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Update Buku
              </AlertDialogHeader>

              <AlertDialogBody>
                <VStack spacing={"4"}>
                  <FormControl hidden>
                    <Input
                      onChange={handleFormInput}
                      name="id"
                      value={formik.values.id}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Judul</FormLabel>
                    <Input
                      onChange={handleFormInput}
                      name="judul"
                      value={formik.values.judul}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Pengarang</FormLabel>
                    <Input
                      onChange={handleFormInput}
                      name="pengarang"
                      value={formik.values.pengarang}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Kategori</FormLabel>
                    <Input
                      onChange={handleFormInput}
                      name="kategori"
                      value={formik.values.kategori}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Cover</FormLabel>
                    <Input
                      onChange={handleFormInput}
                      name="cover"
                      value={formik.values.cover}
                    />
                  </FormControl>
                </VStack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Batal
                </Button>
                <Button
                  type="submit"
                  colorScheme="cyan"
                  ml={3}
                  onClick={onClose}
                >
                  Submit
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
