import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useStore } from "../store/useStore";
import { useSearchParams } from "react-router-dom";
import {paginationWithDots} from "../utils/helperFunctions/paginationWithDots";
export const Pagination = () => {
    const productMetaData = useStore(state => state.productMetaData);
    const productFilters = useStore(state => state.productFilters);
    const [searchParams, setSearchParams] = useSearchParams();
    const setPage = useStore(state => state.setPage);
    const products = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const page = useStore(state => state.page);

    const totalPages = productMetaData.last_page;
    const pages = paginationWithDots(page, totalPages);

    const handlePageChange = (newPage) => {
         if(newPage === "..." || newPage === page) return;
         setPage(newPage);
         fetchProducts({page: newPage});
         
    }

  return (
    <div className = "flex gap-1 items-center mb-30 mt-25 justify-center">
        <div className = "flex gap-1">
            {/* {
                productMetaData?.links?.map((link) => {
                    const isPrev = link.label.includes("laquo");
                    const isNext = link.label.includes("raquo")

                  return ( 
                    <button onClick = {() => handlePageChange(link.label)} className = {`${page == link.label && "border-[#FF4000] text-[#FF4000]"} w-[32px] h-[32px] cursor-pointer border border-[#F8F6F7] rounded-[4px] flex justify-center items-center text-[#212B36] text-[14px] font-[500]`}>
                        {
                            isPrev ? <MdOutlineKeyboardArrowLeft /> : isNext ? <MdOutlineKeyboardArrowRight /> : link.label
                        }
                    </button>
                )
            })
            } */}
            <button disabled = {page === 1} onClick = {() => handlePageChange(page - 1)} className = {` w-[32px] h-[32px] cursor-pointer border border-[#F8F6F7] rounded-[4px] flex justify-center items-center text-[#212B36] text-[14px] font-[500]`}>
                <MdOutlineKeyboardArrowLeft />
            </button>
            {pages.map((p, i) => {
                return (
                    <button key = {i} onClick = {() => handlePageChange(p)} className = {`${ page === p && "border-[#FF4000] text-[#FF4000]"} w-[32px] h-[32px] cursor-pointer border border-[#F8F6F7] rounded-[4px] flex justify-center items-center text-[#212B36] text-[14px] font-[500]`}>
                        {p}
                    </button>
                )
            })}
            <button disabled = {page === totalPages} onClick = {() => handlePageChange(page + 1)} className = {` w-[32px] h-[32px] cursor-pointer border border-[#F8F6F7] rounded-[4px] flex justify-center items-center text-[#212B36] text-[14px] font-[500]`}>
                <MdOutlineKeyboardArrowRight />
            </button>
        </div>
    </div>
  )
}
