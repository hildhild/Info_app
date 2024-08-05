import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { setStatus } from "../services/setStatusApi";
import { toast } from "react-toastify";
import { TailSpin } from 'react-loading-icons';
import { useState } from "react";

function ProductItem ({name, id, code, status, img, handleChangeStatus}) {
    const { t } = useTranslation();
    const [loadingApi, setLoadingApi] = useState(false);

    const handleSetStatus = () => {
        setLoadingApi(true); 
        setStatus(status === 1 ? 0 : 1, code).then((res)=>{
            handleChangeStatus();
            if (res.message === 'Success') {
                toast.success(t('change status successfully'));
            }
            else {
                toast.error(res.message);
            }
        }).finally(()=> {
            setLoadingApi(false); 
        });
    }

    return (
        <div className='grid grid-cols-12 border-b-[1px] border-solid py-[16px] items-center'>
            <div className='col-span-1 px-[10px] text-center'>{id}</div>
            <div className='col-span-5 px-[10px] flex'>
                {
                    img.length !== 0
                    ?
                    <img src={img[0].image.link} className='w-[50px] h-[50px] object-cover hidden md:block' alt=''/>
                    :
                    <img src='https://account.agridential.vn/d953f40a238756b5095f1a8d11c6f950.png' className='w-[50px] h-[50px] object-cover hidden md:block' alt=''/>
                }
                <div className='grid grid-row-2 place-content-between md:ml-[30px]'>
                    <div className="font-semibold">{name}</div>
                    <div>( {t('code')}: {code} )</div>
                </div>
            </div>
            <div className='col-span-2 px-[10px] text-center'>_ _ _</div>
            <div className='col-span-2 px-[10px] text-center'>
                {
                    status === 1
                    ?
                    <div className='bg-[#E5F9ED] text-[#54B862] text-[12px] font-semibold'>{t('in production')}</div>
                    :
                    <div className='bg-[#FEE0E3] text-[#F83245] text-[12px] font-semibold'>{t('stop producing')}</div>
                }
            </div>
            <div className='col-span-2 px-[10px] flex items-center justify-center'>
                <button className="w-[40px] h-[40px] rounded-md bg-[#DCF6FA] text-[#11C5DB] hover:bg-[#11C5DB] hover:text-white mr-[10px]">
                    <FontAwesomeIcon icon={faPen}/>
                </button>
                {
                    status === 1
                    ?
                    <button className="w-[40px] h-[40px] rounded-md bg-[#FEE0E3] text-[#F83245] hover:bg-[#F83245] hover:text-white grid place-content-center" onClick={handleSetStatus}>
                        {loadingApi ? <TailSpin className='w-[20px] h-[20px]' stroke="#000" strokeWidth="3"/> : <FontAwesomeIcon icon={faXmark}/>}
                    </button>
                    :
                    <button className="w-[40px] h-[40px] rounded-md bg-[#E5F9ED] text-[#54B862] hover:bg-[#54B862] hover:text-white grid place-content-center" onClick={handleSetStatus}>
                        {loadingApi ? <TailSpin className='w-[20px] h-[20px]' stroke="#000" strokeWidth="3"/> : <FontAwesomeIcon icon={faCheck}/>}
                    </button>
                }
            </div>
        </div>
    );
}

export default ProductItem;