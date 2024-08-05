import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formSubmit } from '../redux/slices/formSlice';
import { openModal } from '../redux/slices/successModalSlice';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

function Form() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [, setFormData] = useState({
        name: '',
        gender: '',
        phone: '',
        email: '',
        address: ''
    });

    //Du lieu khi dispatch thi moi thay doi
    const curFormData = useSelector(state => state.dashboard.formData);

    //Lay cac field hien tai, thay doi tuc thoi
    const [name, setName] = useState(curFormData.name);
    const [gender, setGender] = useState(curFormData.gender);
    const [phone, setPhone] = useState(curFormData.phone);
    const [email, setEmail] = useState(curFormData.email);
    const [address, setAddress] = useState(curFormData.address);

    const handleInputChange = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
    
        if (field === 'name') {
            setName(value);
        } else if (field === 'gender') {
            setGender(value);
        } else if (field === 'phone') {
            setPhone(value);
        } else if (field === 'email') {
            setEmail(value);
        } else if (field === 'address') {
            setAddress(value);
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault(); //Ngăn chặn hành vi mặc định (load lại trang)
        const formData = { name, gender, phone, email, address };
        setFormData(formData);
        dispatch(openModal());
        dispatch(formSubmit(formData));
    };

    
    return (
      <div className="px-[15px]">
        <form onSubmit={handleSubmit} className=''>
            <div>
                <div className='font-semibold mb-[10px]'>{t('name')}:</div>
                <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="name" value={name} onChange={handleInputChange} placeholder={t('enter your name')}/>
            </div>
            <div>
                <div className='font-semibold mb-[10px]'>{t('gender')}:</div>
                <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="gender" value={gender} onChange={handleInputChange} placeholder={t('enter your gender')}/>
            </div><div>
                <div className='font-semibold mb-[10px]'>{t('phone')}:</div>
                <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="phone" value={phone} onChange={handleInputChange} placeholder={t('enter your phone')}/>
            </div><div>
                <div className='font-semibold mb-[10px]'>Email:</div>
                <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="email" name="email" value={email} onChange={handleInputChange} placeholder={t('enter your email')}/>
            </div>
            <div>
                <div className='font-semibold mb-[10px]'>{t('address')}:</div>
                <textarea className='mb-[50px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' placeholder={t('enter your address')} name='address' value={address} onChange={handleInputChange}></textarea>
            </div>
            <input type="submit" value={t('save')} className="bg-[#232323] text-[#FDFDFD] w-full cursor-pointer py-[10px] rounded-xl mb-[20px] hover:opacity-80 hover:text-white" />
        </form>
      </div>
    );
}
  
export default Form;