import React, { useState } from 'react';
import {
  Box,
  HStack,
  IconButton,
  Image,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();

  // Abre o modal e reseta o estado para o produto original
  const handleOpen = () => {
    setUpdatedProduct(product);
    onOpen();
  };

  const handleDeleteProduct = async (id) => {
    try {
      const result = await deleteProduct(id);
      toast({
        title: result.success ? 'Sucesso' : 'Erro',
        description: result.message,
        status: result.success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: error?.message || 'Falha ao excluir o produto.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    try {
      const { success, message } = await updateProduct(pid, updatedProduct);
      toast({
        title: success ? 'Sucesso' : 'Erro',
        description: message,
        status: success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
      if (success) {
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error?.message || 'Falha ao atualizar o produto.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      _hover={{ shadow: 'xl', transform: 'translateY(-5px)' }}
      transition="all 0.3s ease"
      bg={bg}
      maxW="sm"
    >
      {/* Imagem */}
      <Image
        src={product.image || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      {/* Conteúdo */}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1}>
          {product.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color={textColor} mb={3}>
          R$ {product.price}
        </Text>

        {/* Botões de ação */}
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={handleOpen}
            colorScheme="blue"
            size="sm"
            aria-label="Editar produto"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            size="sm"
            aria-label="Excluir produto"
          />
        </HStack>
      </Box>

      {/* Modal de edição */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Nome do produto"
                name="name"
                value={updatedProduct.name ?? ''}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Preço do produto"
                name="price"
                type="number"
                value={updatedProduct.price ?? ''}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })
                }
              />
              <Input
                placeholder="URL da imagem"
                name="image"
                value={updatedProduct.image ?? ''}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
