import React from 'react'
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  useColorMode,
  Icon,
  Link as ChakraLink
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { CiLight, CiDark } from 'react-icons/ci'
import { MdLocalGroceryStore } from 'react-icons/md'

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      as="nav"
      px={6}
      py={3}
      position="sticky"
      top="0"
      zIndex="10"
      backdropFilter="blur(10px)"
      bgColor={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.300'}
      boxShadow="md"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <ChakraLink
          as={Link}
          to="/"
          _hover={{ textDecoration: 'none', color: 'blue.400' }}
        >
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            My Store{' '}
            <Icon
              as={MdLocalGroceryStore}
              boxSize={6}
              ml={1}
              verticalAlign="middle"
            />
          </Text>
        </ChakraLink>

        <HStack spacing={4}>
          <Button
            as={Link}
            to="/create"
            colorScheme="blue"
            leftIcon={<FaPlus />}
            _hover={{ bg: 'blue.500', color: 'white' }}
          >
            Novo
          </Button>

          <Button
            onClick={toggleColorMode}
            colorScheme="blue"
            variant="outline"
          >
            {colorMode === 'dark' ? <CiLight /> : <CiDark />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}

export default NavBar
