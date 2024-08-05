import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loading-icons';
import { loginApi } from '../services/loginApi';
import { login } from '../redux/slices/loginSlice';
import { formSubmit } from '../redux/slices/formSlice';
import { useTranslation } from 'react-i18next';


function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logined = useSelector(state => state.loginStatus.logined);
    const { t } = useTranslation();

    useEffect(() => {
        if (logined) {
            navigate("/");
        }
    },[navigate, logined]);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
    
        if (field === 'email') {
            setEmail(value);
        } else if (field === 'password') {
            setPassword(value);
        }
    };

    const handleHidePassword = () => {
        setHidePassword(!hidePassword)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            toast.error('Please complete the reCAPTCHA');
        } else {
            // alert('reCAPTCHA completed successfully');
            // Xử lý logic gửi form ở đây
            setLoadingApi(true);
            let res = await loginApi(email, password);
            console.log('res', res);
            if (res && res.data.token) {
                localStorage.setItem('token', res.data.token);
                // localStorage.setItem('user_data', JSON.stringify(res.data));
                const formData = {
                    name: res.data.name,
                    gender: res.data.type,
                    phone: res.data.publicPhone,
                    email: res.data.publicEmail,
                    address: res.data.address
                }
                dispatch(formSubmit(formData))
                dispatch(login());
                navigate("/");
            } else {
                //error
                if (res && (res.status === 400 || res.status === 422)) {
                    toast.error(res.data.message);
                }
            }
            setLoadingApi(false)
        }
    };

    return (
        <div className="p-[30px] bg-white rounded-xl">
            <ToastContainer className='w-[100px]'/>
            <div>Email: {process.env.REACT_APP_LOGIN_EMAIL}</div>
            <div>{t('password')}: {process.env.REACT_APP_LOGIN_PASSWORD}</div>
            <form onSubmit={handleLogin} className='w-full mt-[30px]'>
                <div>
                    <div className='font-semibold mb-[10px] flex'>Email<div className='text-[red] ml-[5px]'>*</div></div>
                    <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="email" name="email" value={email} onChange={handleInputChange} placeholder={t('enter your email')}/>
                </div>
                <div className='relative'>
                    <div className='font-semibold mb-[10px] flex'>{t('password')}<div className='text-[red] ml-[5px]'>*</div></div>
                    <input className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type={hidePassword ? "password" : "text"} name="password" value={password} onChange={handleInputChange} placeholder={t('enter your password')}/>
                    <div className='absolute top-[45px] right-[20px] z-1 cursor-pointer' onClick={handleHidePassword}>
                        {
                            hidePassword
                            ?
                            <FontAwesomeIcon icon={faEyeSlash}/>
                            :
                            <FontAwesomeIcon icon={faEye}/>
                        }
                    </div>
                </div>
                <div className='flex justify-end mb-[20px]'>
                    <div className='font-bold hover:opacity-70 cursor-pointer'>{t('forgot password')}</div>
                </div>
                <div className='flex justify-center mb-[20px]'>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        onChange={handleCaptchaChange}
                    />
                </div>
                <button type="submit" className="bg-[#232323] text-[#FDFDFD] w-full cursor-pointer py-[10px] rounded-xl mb-[20px] hover:opacity-80 hover:text-white flex items-center justify-center">
                    {loadingApi && <TailSpin className='w-[20px] h-[20px] mr-[10px]'/>}
                    {t('log in')}
                </button>
                <div className='flex justify-center'>
                    {t("don't have account")}
                    <div className='ml-[10px] font-bold hover:opacity-70 cursor-pointer'>{t('sign up')}</div>
                </div>
            </form>
      </div>  
    );
}
  
export default LoginForm;