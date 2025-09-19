import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productService";
import { getUniqueValues } from "../utils/GetUniqueValues";
import { handleApiError } from "../utils/errorHandler";
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [wishlist, setWishlist] = useState([])

  // fetching all products
  const fetchAllProducts = async () => {
    try {
      const productsData = await getProducts(); // ✅ already the array
      setData(productsData);
    } catch (error) {
      handleApiError(error); // Centralized handling
    }
  };

  // extract unique filters
  useEffect(() => {
    if (data?.length > 0) {
      setCategories(getUniqueValues(data, "category"));
      setBrands(getUniqueValues(data, "brand", true));
    }
  }, [data]);


// wishlist the product
const handleWishList = (product) =>{
  setWishlist((prevWishlist)=>{
    const exists = prevWishlist.some(item=> item.id === product.id)
    if(exists){
      // remove from wishlist
      return prevWishlist.filter(item=>item.id !== product.id)
    }else{
      return [...prevWishlist, product]
    }
  });
};


  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categories,
        brands,
        handleWishList,
        wishlist
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getDataHook = () => useContext(DataContext);
