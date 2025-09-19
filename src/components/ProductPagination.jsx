import React, { useMemo } from 'react'
const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  }else{
    if( current <= 3){
      pages.push(1,2,3, '...', total)
    }else if(current >= total-2){ 
      pages.push(1, '...', total-2, total-1, total)
    }
    else{
      pages.push(1, '...', current-1, current, current+1, '...', total)
    }
  }
  return pages
}

const ProductPagination = ({ paginationHandler, totalPages, paginationPage }) => {
  const TotelFinialpages = useMemo(()=>getPages(paginationPage, totalPages), [paginationPage, totalPages]);

  return (
    <div className='flex gap-1 mt-4 items-center justify-center'>
      <button disabled={paginationPage === 1} 
      className={`${paginationPage === 1 ? "!bg-red-300" : "!bg-red-500"} text-white text-sm h-[34px] py-0 px-3`}
      onClick={()=>paginationHandler( paginationPage - 1)}
      >Prev</button>
      {
      TotelFinialpages?.map((item, index)=>{
        return(
          <span key={index} onClick={()=> typeof item === "number" && paginationHandler(item)} 
          className={`${item === paginationPage ? "font-bold text-red-500" : "text-gray-500"} cursor-pointer px-1`}
          >{item}</span>
        )
      })
      }
      <button disabled={paginationPage === totalPages}
       className={`${paginationPage === totalPages ? "!bg-red-300" : "!bg-red-500"} text-white text-sm h-[34px] py-0 px-3`}
       onClick={()=>paginationHandler( paginationPage + 1)}
       >Next</button>
    </div>
  )
}

export default ProductPagination
