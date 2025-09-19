import React from 'react'
import { Form } from 'react-bootstrap'
import ReuseableInput from '../components/common/ReuseableInput'
import { getDataHook } from '../context/DataContext'

const FilterSection = ({ filterSearch, setfilterSearch, filterCategory, setFilterCategory, filterBrand, setFilterBrand,
    filterByPrice, setFilterByPrice, handelCategoryChange, handelBrandChange, resetFilters }) => {
    const { categories, brands } = getDataHook();


    return (
        <div className='filter-section mt-10'>
            <ReuseableInput
                placeholder='Search...'
                name='Search'
                value={filterSearch}
                onChange={(e) => setfilterSearch(e.target.value)}
            />

            {/* Category only products */}
            <h6 className='mt-4 !font-bold'>Category</h6>
            <div className='flex flex-col gap-2 mt-3'>
                {categories.map((cat, index) => {
                    return (
                        <div className='formCheck' key={index}>
                            <Form.Check
                                type='checkbox'
                                name={cat}
                                value={cat}
                                id={index + 1}
                                label={cat.toUpperCase()}
                                checked={filterCategory.includes(cat)}
                                onChange={handelCategoryChange}
                                className='text-sm font-medium cursor-pointer'
                            />
                        </div>
                    )
                })
                }
            </div>

            {/* Data by Brand */}
            {/* <h6 className='mt-4 !font-bold'>Brand</h6>
            <Form.Select name='selectbox' value={filterBrand} onChange={handelBrandChange} className='text-sm font-medium'>
                {
                    brands.map((brand, index) => {
                        return (
                            <option
                                key={index}
                                value={brand}
                                className='text-sm font-medium'
                            >
                                {brand.toUpperCase()}
                            </option>
                        )
                    })
                }
            </Form.Select> */}

            {/* Price  range filter */}
            <h6 className='mt-4 !font-bold'>Price Range</h6>
            <div className='flex flex-colum gap-2'></div>
            <label htmlFor="">Price Range: ${filterByPrice[0]} - ${filterByPrice[1]}</label>
            <input
                type="range"
                min={0}
                max={5000}
                value={filterByPrice[1]}
                onChange={(e) => setFilterByPrice([filterByPrice[0], Number(e.target.value)])}
            />
            {/* Reset */}
            <button className='!bg-black text-white mt-4' onClick={resetFilters}>Reset All Filters</button>
        </div>
    )
}

export default FilterSection