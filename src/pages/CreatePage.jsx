import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react'


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const bgBox = useColorModeValue('white', 'gray.800')
  const bgInput = useColorModeValue('gray.100', 'gray.700')

  const toast = useToast()
  const createProduct = useProductStore(state => state.createProduct);
  const handleAddProduct = async() => {
    const { success, message } = await createProduct(newProduct)
    if (success) {
      toast({
        title: 'Produto Criado',
        description: message,
        status: 'success',
        isClosable: true,})
        setNewProduct ({ name: '', price: '', image: '' })
    } else {
      toast({
        title: 'Erro ao Criar Produto',
        description: message,
        status: 'error', 
        isClosable: true,})
    }
    console.log("Message: " + message);
  }

  return (
    <Container maxW="lg" py={10}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          color="blue.500"
          fontWeight="bold"
        >
          Criar Novo Produto
        </Heading>

        <Box
          w="full"
          bg={bgBox}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          transition="all 0.3s ease"
        >
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Nome do Produto</FormLabel>
              <Input
                bg={bgInput}
                placeholder="Ex: Fone Bluetooth"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                borderRadius="md"
                focusBorderColor="blue.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Preço (R$)</FormLabel>
              <Input
                type="number"
                bg={bgInput}
                placeholder="Ex: 99.90"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                borderRadius="md"
                focusBorderColor="blue.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel>URL da Imagem</FormLabel>
              <Input
                type="url"
                bg={bgInput}
                placeholder="https://exemplo.com/imagem.jpg"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                borderRadius="md"
                focusBorderColor="blue.400"
              />
            </FormControl>

            <Button
              onClick={handleAddProduct}
              colorScheme="blue"
              w="full"
              size="lg"
              fontWeight="bold"
              _hover={{ bg: 'blue.600' }}
              transition="all 0.2s ease"
            >
              Criar Produto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
