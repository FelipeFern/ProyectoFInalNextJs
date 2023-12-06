import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { toast } from 'sonner';

// import { ICartItem, IProduct, IProductContextType } from '@/types';
// import useLocalStorage from '@/hooks/useLocalStorage';
// import CustomToast from '@/components/CustomToast';

const ProductsContext = createContext({
  allProducts: [],
  products: [],
  categories: [],
  getProductsByCategory: () => ({}),
  loadingData: false,
  getProductsBySearch: () => ({}),
  cartItems: [],
  addToCart: () => ({}),
  removeFromCart: () => ({}),
  updateCartItemQuantity: () => ({}),
  isCartModalOpen: false,
  openCartModal: () => ({}),
  closeCartModal: () => ({}),
  favoriteProducts: [],
  handleFavorite: () => ({}),
});

function ProductsProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('CART_ITEMS_V1', []);
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage(
    'FAVORITE_PRODUCTS_V1',
    [],
  );

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { status } = useSession();

  // Obtener todos los productos
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getAllProducts();
  }, []);

  // Obtener productos por categoría
  const getProductsByCategory = async (category) => {
    setLoadingData(true);
    try {
      const response = await fetch(`/api/products/${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error filtering products by category:', error);
    } finally {
      setLoadingData(false);
    }
  };

  // Obtener productos por query search
  const getProductsBySearch = async (query) => {
    try {
      const response = await fetch(`/api/products?search=${query}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Obtener las categorías disponibles
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.categoria)),
        );

        const uniqueSubcategories = Array.from(
          new Set(data.map((product) => product.subCategoria)),
        );
        setCategories([...uniqueCategories, ...uniqueSubcategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const addToCart = ({ productId, quantity = 1 }) => {
    const existingCartItem = cartItems.find((item) => item.product.id === productId);
    let newCartItems;

    if (existingCartItem) {
      newCartItems = cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: quantity } : item,
      );

      setCartItems(newCartItems);
    } else {
      const product = allProducts.find((product) => product.id === productId);
      if (!product) return;
      newCartItems = [...cartItems, { product, quantity }];
      setCartItems(newCartItems);
    }
  };

  const removeFromCart = (productId) => {
    const newCartItems = [...cartItems].filter((item) => item.product.id !== productId);
    setCartItems(newCartItems);
  };

  const updateCartItemQuantity = ({
    productId,
    quantity,
  }) => {
    const newCartItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    setCartItems(newCartItems);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const handleFavorite = (productId) => {
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        products,
        categories,

        getProductsByCategory,
        getProductsBySearch,

        loadingData,

        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,

        isCartModalOpen,
        openCartModal,
        closeCartModal,

        favoriteProducts,
        handleFavorite,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

const useProductsContext = () => useContext(ProductsContext);

export { ProductsProvider, useProductsContext };
