import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faFilter, faCircleQuestion, faAngleLeft, faAngleRight, faAngleDown, faXmark, faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { getProducts } from '../services/getProductsApi';
import {ToastContainer} from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import useDebounce from '../customHooks/useDebounce';
import { setStatus } from "../services/setStatusApi";
import { toast } from "react-toastify";
import LoadingModal from './LoadingModal';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import {
    createColumnHelper,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
} from '@tanstack/react-table';

const fallbackData = [];

function ProductListTable() {
    const { t } = useTranslation();
    const [filterName, setFilterName] = useState('');
    const debouncedFilterName = useDebounce(filterName, 500);
    const [rowCount, setRowCount] = useState(5);
    const [curPage, setCurPage] = useState(1);
    const [expanded, setExpanded] = useState({});
    const [loadingOnSetStatus, setLoadingOnSetStatus] = useState(false); 

    const columnHelper = createColumnHelper(); //an toàn hơn
    const columns = [
        columnHelper.accessor('expander', {
            header: () => null,
            cell: ({ row }) => {
            return row.getCanExpand() ? 
            (
                <button {...{onClick: row.getToggleExpandedHandler()}} className='text-center w-full'>
                    {row.getIsExpanded() ? <FontAwesomeIcon icon={faAngleDown}/> : <FontAwesomeIcon icon={faAngleRight}/>}
                </button>
            ) 
            : 
            ('');
            },
        }),
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('nameOfProductType', {
            header: <div className='text-start'>{t('name of product type')}</div>,
        }),
        columnHelper.accessor('gtinCode', {
            header: <div>{t('gtin code')} <FontAwesomeIcon icon={faCircleQuestion} className='ml-[10px]'/></div>,
        }),
        columnHelper.accessor('status', {
            header: t('status'),
        }),
        columnHelper.accessor('actions', {
            header: t('actions'),
        }),
    ];

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['products', curPage, rowCount, debouncedFilterName],
        queryFn: async () => {
            setExpanded({}); 
            const res = await getProducts(curPage, rowCount, debouncedFilterName);
            return res;
        },
    });

    const pageCount = Number(data?.totalPage) || 0;

    const table = useReactTable({ 
        columns, 
        data: data?.data ?? fallbackData,
        state: {
            expanded, //quản lý các hàng expanded
        },
        onExpandedChange: setExpanded,
        getRowCanExpand: () => true, //hàng nào cũng có thể mở rộng
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    const handleChangeFilterName = (event) => {
        setFilterName(event.target.value);
    };
    const handleChangeRow = (event) => {
        setRowCount(event.target.value);
    };
    const handlePageClick = (event) => {
        setCurPage(event.selected+1);
    };
    const handleSetStatus = (status, code) => {
        setLoadingOnSetStatus(true); 
        setStatus(status === 1 ? 0 : 1, code).then((res)=>{
            refetch(); //khong phai tao bien key changeStatus
            if (res.message === 'Success') {
                toast.success(t('change status successfully'));
            }
            else {
                toast.error(res.message);
            }
        }).finally(()=> {
            setLoadingOnSetStatus(false); 
        })
    }

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
                <Table className='w-full'>
                    <Thead>
                        <Tr key={table.getHeaderGroups()[0].id} className='border-b-[1px] border-solid'>
                            {table.getHeaderGroups()[0].headers.map(header => (
                                <Th key={header.id} className='px-[20px] py-[15px]'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row, index) => (
                        <Fragment key={row.original.uuid}>
                            <Tr key={row.original.uuid} className='border-b-[1px] border-solid'>
                                <Td key={row.getVisibleCells()[0].id}>
                                    {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
                                </Td>
                                <Td className='text-center'>
                                    {rowCount*(curPage-1)+index+1}
                                </Td>
                                <Td className='flex py-[15px]'>
                                    {
                                        row.original.imageLanguage.length !== 0
                                        ?
                                        <img src={row.original.imageLanguage[0].image.link} className='w-[50px] h-[50px] object-cover' alt=''/>
                                        :
                                        <img src='https://account.agridential.vn/d953f40a238756b5095f1a8d11c6f950.png' className='w-[50px] h-[50px] object-cover' alt=''/>
                                    }
                                    <div className='grid grid-row-2 place-content-between md:ml-[30px]'>
                                        <div className="font-semibold">{row.original.name}</div>
                                        <div>( {t('code')}: {row.original.uuid} )</div>
                                    </div>
                                </Td>
                                <Td className='text-center'>_ _ _</Td>
                                <Td className='text-center'>
                                {
                                    row.original.status === 1
                                    ?
                                    <div className='bg-[#E5F9ED] text-[#54B862] text-[12px] font-semibold'>{t('in production')}</div>
                                    :
                                    <div className='bg-[#FEE0E3] text-[#F83245] text-[12px] font-semibold'>{t('stop producing')}</div>
                                }
                                </Td>
                                <Td >
                                    <div className='flex items-center justify-center'>
                                        <button className="w-[40px] h-[40px] rounded-md bg-[#DCF6FA] text-[#11C5DB] hover:bg-[#11C5DB] hover:text-white mr-[10px]">
                                            <FontAwesomeIcon icon={faPen}/>
                                        </button>
                                        {
                                            row.original.status === 1
                                            ?
                                            <button className="w-[40px] h-[40px] rounded-md bg-[#FEE0E3] text-[#F83245] hover:bg-[#F83245] hover:text-white grid place-content-center" onClick={() => handleSetStatus(row.original.status, row.original.uuid)}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </button>
                                            :
                                            <button className="w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white grid place-content-center" onClick={() => handleSetStatus(row.original.status, row.original.uuid)}>
                                                <FontAwesomeIcon icon={faCheck}/>
                                            </button>
                                        }
                                    </div>
                                </Td>
                            </Tr>
                            {
                                row.getIsExpanded() && 
                                (
                                    <Tr className='border-[1px] border-solid'>
                                        <Td colSpan={6}>
                                            <Table className='w-full'>
                                                <Thead>
                                                    <Tr className='border-b-[1px] border-solid'>
                                                        <Th className='py-[10px]'>{t('unit')}</Th>
                                                        <Th className='py-[10px]'>{t('created at')}</Th>
                                                        <Th className='py-[10px]'>{t('owned by')}</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr className='text-center'>
                                                        <Td className='py-[20px]'>{row.original.unit}</Td>
                                                        <Td className='py-[20px]'>{row.original.createdAt.slice(11,19)} {row.original.createdAt.slice(0,10)}</Td>
                                                        <Td className='py-[20px]'>{row.original.ownedBy}</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </Td>
                                    </Tr>
                                )
                            }
                        </Fragment>
                        ))}
                    </Tbody>
                </Table>
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
                        <select className='border-[1px] border-solid px-[5px] py-[5px] rounded-xl mr-[10px] outline-none' onChange={handleChangeRow} defaultValue={rowCount}>
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
            {
            (isLoading || loadingOnSetStatus) && <LoadingModal/>
            }
        </div>  
    );
}
  
export default ProductListTable;