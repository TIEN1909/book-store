import { useState, createContext } from 'react';
import { useSelector } from 'react-redux';
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [searchProduct, setSearchProduct] = useState('');
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const searchProducts = products?.filter((product) => {
    if (searchProduct === '') {
      return product;
    } else if (
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    ) {
      return product;
    }
  });
  const value = {
    searchProduct,
    searchProducts,
    setSearchProduct,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
