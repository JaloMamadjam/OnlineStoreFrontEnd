import React, { useEffect } from 'react';
import { Container, VStack, Text, Button, Icon, SimpleGrid, Box, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import { useProductStore } from '../store/product';
import PoductCard from '../components/PoductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={6} textAlign='center'  w="full">
        {products.length === 0 ? (
          <Box>
            <Icon as={FiPackage} boxSize={20} color="blue.400" mb={4} />
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="blue.600" mb={2}>
              Nenhum produto encontrado 😢
            </Text>
            <Text fontSize="lg" color="gray.500" maxW="sm" mx="auto" mb={6}>
              Parece que você ainda não adicionou nada à sua loja. Vamos criar algo incrível?
            </Text>
            <Button
              as={Link}
              to="/create"
              size="lg"
              colorScheme="blue"
              borderRadius="full"
              shadow="md"
              _hover={{ transform: 'scale(1.05)', shadow: 'xl' }}
              transition="all 0.2s ease-in-out"
            >
              Criar Produto
            </Button>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} textAlign='left' spacing={10} w="full">
            {products.map((product) => (
              <PoductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
