import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faFilter, faCircleQuestion, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { getProducts } from '../services/getProductsApi';
import {ToastContainer} from 'react-toastify';
import { TailSpin } from 'react-loading-icons';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import useDebounce from '../customHooks/useDebounce';


function ProductList() {
    const { t } = useTranslation();
    const [filterName, setFilterName] = useState('');
    const debouncedFilterName = useDebounce(filterName, 500);
    const [row, setRow] = useState(5);
    const [curPage, setCurPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['products', curPage, row, debouncedFilterName],
        queryFn: async () => {
            const res = await getProducts(curPage, row, debouncedFilterName);
            return res;
        },
    });

    const pageCount = Number(data?.totalPage) || 0;

    const handleChangeFilterName = (event) => {
        setFilterName(event.target.value);
    };
    const handleChangeRow = (event) => {
        setRow(event.target.value);
    };
    const handlePageClick = (event) => {
        setCurPage(event.selected+1);
    };
    const handleChangeStatus = () => {
        refetch();
    };

    return (
        <div className="px-[15px] pb-[100px] ">
            <ToastContainer className='w-[100px]'/>
            <div className='md:flex justify-between pb-[30px]'>
                <div className='text-2xl font-semibold grid place-content-center mb-[30px] md:mb-0'>{t('products list')}</div>
                <div className='flex justify-end'>
                    <form className='overflow-hidden grid grid-cols-2 w-[360px] mr-[15px]'>
                        <div className='bg-[#D6EDB9] h-full rounded-l-md font-semibold flex justify-center items-center'>
                            <FontAwesomeIcon icon={faFilter} className='mr-[10px]'/>
                            {t('product name')}
                        </div>
                        <input type='text' placeholder={t('enter name')} className='border-[1px] border-solid rounded-r-md p-[10px]' onChange={handleChangeFilterName} value={filterName}/>
                    </form>
                    <button className='rounded-md bg-[#D6EDB9] w-[100px] font-semibold hover:bg-[#CCFF66] hover:shadow-lg'>
                        <FontAwesomeIcon icon={faCirclePlus} className='mr-[10px]'/>
                        {t('add')}
                    </button>
                </div>
            </div>
            <div className='rounded-xl border-[2px] border-solid py-[8px] px-[16px] bg-white' >
                <div className='grid grid-cols-12 border-b-[1px] border-solid py-[16px]'>
                    <div className='col-span-1 px-[10px] font-semibold text-center'>ID</div>
                    <div className='col-span-5 px-[10px] font-semibold'>{t('name of product type')}</div>
                    <div className='col-span-2 px-[10px] font-semibold text-center'>
                        {t('gtin code')}
                        <FontAwesomeIcon icon={faCircleQuestion} className='ml-[10px]'/>
                    </div>
                    <div className='col-span-2 px-[10px] font-semibold text-center'>{t('status')}</div>
                    <div className='col-span-2 px-[10px] font-semibold text-center'>{t('actions')}</div>
                </div>
                {
                    isLoading 
                    ? 
                    <div className='w-full flex justify-center py-[50px]'>
                        <TailSpin className='w-[20px] h-[20px]' stroke="#000" strokeWidth="3"/>
                    </div> 
                    :
                    (
                        data?.data.length === 0 
                        ?
                        <div className='w-full flex justify-center py-[50px] text-[red] font-semibold'>
                            {t('no product')}
                        </div> 
                        :
                        data?.data.map((product, index) => (<ProductItem key={product.uuid} id={row*(curPage-1)+index+1} code={product.uuid} name={product.name} status={product.status} img={product.imageLanguage} handleChangeStatus={handleChangeStatus}/>))
                    ) 
                }
                <div className='md:flex md:justify-between md:items-center px-[20px] py-[10px]'>
                    <ReactPaginate
                        breakLabel={
                            <button className="w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white mr-[10px]">
                                ...
                            </button>
                        }
                        nextLabel={
                            <button className="w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white mr-[10px]">
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </button>
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel={
                            <button className="w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white mr-[10px]">
                                <FontAwesomeIcon icon={faAngleLeft}/>
                            </button>
                        }
                        renderOnZeroPageCount={null}
                        className='flex font-semibold justify-center md:justify-start' 
                        pageLinkClassName='w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white mr-[10px] grid place-content-center'
                        activeLinkClassName='border-[2px] border-black text-black'
                    />
                    <div className='flex items-center p-[16px] justify-center md:justify-end'>
                        <div className='mr-[10px]'>{t('show')}:</div>
                        <select className='border-[1px] border-solid px-[5px] py-[5px] rounded-xl mr-[10px] outline-none' onChange={handleChangeRow} defaultValue={row}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div>{t('row')}</div>
                    </div>
                </div>
            </div>
        </div>  
    );
}
  
export default ProductList;