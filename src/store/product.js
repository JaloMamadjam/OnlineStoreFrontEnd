import { create } from 'zustand';
const API_URL = import.meta.env.VITE_API_URL;
export const useProductStore = create((set) => ({
  products: [],
  
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false,message: 'Todos os campos são obrigatórios' };
    }

    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return {success: true, message: 'Produto criado com sucesso' };
  },

  fetchProducts: async () => {
    const response = await fetch(`${API_URL}/api/products`);
    const data = await response.json();
    set({ products: data.data });
  },
  
  deleteProduct: async (id) => {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: 'Produto excluído com sucesso' };
    } else {
      return { success: false, message: 'Falha ao excluir o produto' };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();

    if (response.ok) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedProduct } : product
        ),
      }));
      return { success: true, message: data.message || 'Produto atualizado com sucesso' };
    } else {
      return { success: false, message: data.message || 'Falha ao atualizar o produto' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Erro inesperado ao atualizar o produto' };
  }
}

}));
