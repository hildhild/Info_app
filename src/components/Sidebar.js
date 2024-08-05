import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faPenToSquare, faStore, faTableColumns, faMagnifyingGlass, faWindowMaximize, faGears, faDesktop, faEye } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';


function Sidebar({pageType}) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="bg-[#070707] text-[#FDFDFD] h-[100vh] w-[270px] pt-[30px] px-[20px] text-[22px] hidden lg:block fixed left-0">
            <div className='flex items-center mb-[20px]'>
                <FontAwesomeIcon icon={faGlobe} className='mr-[10px]'/>
                <div className='font-semibold'>Hosty.</div>
            </div>
            <ul className='text-[16px] text-[#B4B4B4]'>
                { 
                    pageType === 'Dashboard'
                    ? 
                    <li className='mb-[15px] cursor-pointer bg-[#383838] text-white rounded-lg'>
                        <button onClick={()=>{navigate('/')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faPenToSquare} className='mr-[10px]'/>
                            {t('Dashboard')}
                        </button>
                    </li>
                    :
                    <li className='mb-[15px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                        <button onClick={()=>{navigate('/')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faPenToSquare} className='mr-[10px]'/>
                            {t('Dashboard')}
                        </button>
                    </li>
                }
                { 
                    pageType === 'Product'
                    ? 
                    <li className='mb-[15px] cursor-pointer bg-[#383838] text-white rounded-lg'>
                        <button onClick={()=>{navigate('/product')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faStore} className='mr-[10px]'/>
                            {t('Product')}
                        </button>
                    </li>
                    :
                    <li className='mb-[15px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                        <button onClick={()=>{navigate('/product')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faStore} className='mr-[10px]'/>
                            {t('Product')}
                        </button>
                    </li>
                }
                { 
                    pageType === 'ProductTable'
                    ? 
                    <li className='mb-[15px] cursor-pointer bg-[#383838] text-white rounded-lg'>
                        <button onClick={()=>{navigate('/product-table')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faTableColumns} className='mr-[10px]'/>
                            {t('Product table')}
                        </button>
                    </li>
                    :
                    <li className='mb-[15px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                        <button onClick={()=>{navigate('/product-table')}} className='h-full w-full text-start p-[10px]'>
                            <FontAwesomeIcon icon={faTableColumns} className='mr-[10px]'/>
                            {t('Product table')}
                        </button>
                   </li>
                }
                {/* <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faChartSimple} className='mr-[10px]'/>
                    Analytics
                </li> */}
                {/* <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faTableColumns} className='mr-[10px]'/>
                    {t('sites')}
                </li> */}
                <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-[10px]'/>
                    {t('explore domain')}
                </li>
                <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faWindowMaximize} className='mr-[10px]'/>
                    {t('website builder')}
                </li>
                <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faGears} className='mr-[10px]'/>
                    {t('manage service')}
                </li>
                <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faDesktop} className='mr-[10px]'/>
                    {t('monitoring')}
                </li>
                <li className='mb-[15px] p-[10px] cursor-pointer hover:bg-[#383838] hover:text-white rounded-lg'>
                    <FontAwesomeIcon icon={faEye} className='mr-[10px]'/>
                    {t('activity log')}
                </li>
            </ul>
            <img src='https://nld.mediacdn.vn/thumb_w/640/291774122806476800/2024/3/13/q4uq2bwadbxqrry9h3pcto-1710292490740828824369.jpg' alt='' className='w-[270px] mx-[-20px] fixed bottom-0'/>
        </div> 
    );
}

export default Sidebar;