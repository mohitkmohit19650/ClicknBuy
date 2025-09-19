import React, { useEffect, useState } from 'react'
import { getDataHook } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import ProductCard from '../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import ProductPagination from '../components/ProductPagination'

const Products = () => {
  const { data, fetchAllProducts } = getDataHook()
  const [filterSearch, setfilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterByPrice, setFilterByPrice] = useState([0, 5000])
  const [paginationPage, SetPaginationPage] = useState(1)
  const [sortOption, setSortOption] = useState("default")

  const handelCategoryChange = (e) => {
    const value = e.target.value;
    // if category already selected → remove it
    if (filterCategory.includes(value)) {
      setFilterCategory(filterCategory.filter(cat => cat !== value));
    } else {
      // else → add it
      setFilterCategory([...filterCategory, value]);
    }
  };

  const handelBrandChange = (e) => {
    setFilterBrand(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const resetFilters = () => {
    setfilterSearch("")
    setFilterCategory([])
    setFilterBrand("all")
    setFilterByPrice([0, 5000])
  }

let filtered = data?.filter((item) => item.title.toLowerCase().includes(filterSearch.toLowerCase()) &&
  (filterCategory.length === 0 || filterCategory.includes(item.category)) &&
  (filterBrand === "all" || item.brand === filterBrand) &&
  item.price >= filterByPrice[0] && item.price <= filterByPrice[1]
);

  // sort logic
if (sortOption === "priceLowHigh") {
  filtered = [...filtered].sort((a, b) => a.price - b.price);
} else if (sortOption === "priceHighLow") {
  filtered = [...filtered].sort((a, b) => b.price - a.price);
} else if (sortOption === "titleAsc") {
  filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
} else if (sortOption === "titleDesc") {
  filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
}

const filterData = filtered; 

  const paginationHandler = (selectedPage) => {
    SetPaginationPage(selectedPage);
  }

  const totalPages = Math.ceil(filterData?.length / 8)

  useEffect(() => {
    fetchAllProducts();
  }, [])



  return (
    <Container fluid>
      {
        data?.length > 0 ? (
          <Row>
            <Col md="9" lg='2'>
              <FilterSection
                filterSearch={filterSearch}
                setfilterSearch={setfilterSearch}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterBrand={filterBrand}
                setFilterBrand={setFilterBrand}
                filterByPrice={filterByPrice}
                setFilterByPrice={setFilterByPrice}
                handelCategoryChange={handelCategoryChange}
                handelBrandChange={handelBrandChange}
                resetFilters={resetFilters}
              />
            </Col>
            <Col md="9" lg='10'>
              <div className="flex justify-end mt-4">
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Default</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="titleAsc">Name: A → Z</option>
                  <option value="titleDesc">Name: Z → A</option>
                </select>
              </div>
              {
                filterData?.length > 0 ? (
                  <>
                    <div className='product-card-wrapper grid grid-cols-4 gap-4 mt-10'>
                      {
                        filterData?.slice(paginationPage * 8 - 8, paginationPage * 8).map((productData, index) => {
                          return <ProductCard key={index} product={productData} />
                        })
                      }
                    </div>
                    <ProductPagination paginationPage={paginationPage} paginationHandler={paginationHandler} totalPages={totalPages} />
                  </>
                ) : (
                  <div className='flex h-full justify-center items-center text-xl font-bold bg-gray-100'>No data</div>
                )
              }
            </Col>

          </Row>
        ) : (
          <Row>
            <Col>
              No Data Found
            </Col>
          </Row>
        )
      }
    </Container>
  )
}

export default Products