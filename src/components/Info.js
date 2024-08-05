import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/slices/loginSlice';
import { useTranslation } from 'react-i18next';


function Info() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector(state => state.dashboard.formData);
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.removeItem("user_data");
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="px-[15px]">
            <div className='flex justify-end mb-[50px]'>
                <button className='bg-white hover:bg-[#D3EAF1] font-semibold rounded-md w-[100px] px-[10px] py-[5px]' onClick={()=>{navigate('/')}}>{t('edit')}</button>
            </div>
            <p className='mb-[30px]'><strong>{t('name')}:</strong> {formData.name}</p>
            <p className='mb-[30px]'><strong>{t('gender')}:</strong> {formData.gender}</p>
            <p className='mb-[30px]'><strong>{t('phone')}:</strong> {formData.phone}</p>
            <p className='mb-[30px]'><strong>Email:</strong> {formData.email}</p>
            <p className='h-[100px] break-words'><strong>{t('address')}:</strong> {formData.address}</p>
            <button onClick={handleLogout} className="bg-[#232323] text-[#FDFDFD] w-full cursor-pointer py-[10px] rounded-xl mt-[80px] hover:opacity-80 hover:text-white text-center">
                {t('log out')}
            </button>
        </div>  
    );
}
  
export default Info;