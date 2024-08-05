import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell, faUser, faBars} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { showSidebar } from '../redux/slices/sidebarSlice';


function Header({page}) {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logined = useSelector(state => state.loginStatus.logined);
    const formData = useSelector(state => state.dashboard.formData);
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (event) => {
        const language = event.target.value === 'VI' ? 'vi' : 'en';
        i18n.changeLanguage(language);
    }

    const handleShowSidebarModal = () => {
        dispatch(showSidebar());
    }

    return ( 
        <div className="mx-[30px] mb-[50px] rounded-xl px-[30px] py-[10px] flex justify-between sticky top-[20px] bg-white shadow">
            <div className='flex items-center'>
                <button className='w-[35px] h-[35px] rounded-full border-solid border-[1px] place-content-center cursor-pointer hover:bg-black hover:text-white lg:hidden grid mr-[10px]' onClick={handleShowSidebarModal}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                <div className="text-[20px] md:text-[25px] font-semibold flex items-center">{t(`${page}`)}</div>
            </div>
            {
                !logined
                ?
                <div className='flex'>
                    <select className='w-[55px] h-[35px] rounded-full border-solid border-[1px] px-[5px] cursor-pointer mr-[10px] font-semibold outline-none' onChange={handleChangeLanguage} defaultValue={i18n.language === 'vi' ? 'VI' : 'EN'}>
                        <option value="VI">VI</option>
                        <option value="EN">EN</option>
                    </select>
                    <button className='font-semibold rounded-full px-[40px] border-[1px] border-solid hover:bg-black hover:text-white' onClick={()=>{navigate('/login')}}>{t('log in')}</button>
                </div>
                :
                <div className='flex items-center'>
                    <div className='w-[35px] h-[35px] rounded-full border-solid border-[1px] grid place-content-center cursor-pointer mr-[10px] hover:bg-black hover:text-white'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                    <div className='w-[35px] h-[35px] rounded-full border-solid border-[1px] grid place-content-center cursor-pointer mr-[10px] hover:bg-black hover:text-white'>
                        <FontAwesomeIcon icon={faBell}/>
                    </div>
                    <select className='w-[55px] h-[35px] rounded-full border-solid border-[1px] px-[5px] cursor-pointer mr-[10px] font-semibold outline-none' onChange={handleChangeLanguage} defaultValue={i18n.language === 'vi' ? 'VI' : 'EN'}>
                        <option value="VI">VI</option>
                        <option value="EN">EN</option>
                    </select>
                    {
                        page === "Profile"
                        ?
                        <button onClick={() => {navigate('/profile')}} className='w-[40px] md:w-[160px] h-[40px] rounded-full border-solid border-[1px] cursor-pointer bg-black text-white flex items-center justify-center font-semibold'>
                            <div className='hidden md:block'>{formData.name}</div>
                            <FontAwesomeIcon icon={faUser} className='md:ml-[10px]'/>
                        </button>
                        :
                        <button onClick={() => {navigate('/profile')}} className='w-[40px] md:w-[160px] h-[40px] rounded-full border-solid border-[1px] cursor-pointer hover:bg-black hover:text-white flex items-center justify-center font-semibold'>
                            <div className='hidden md:block'>{formData.name}</div>
                            <FontAwesomeIcon icon={faUser} className='md:ml-[10px]'/> 
                        </button>
                    }
                </div>
            }
            

        </div> 
    );
}

export default Header;