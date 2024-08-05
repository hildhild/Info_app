import { Header, ProductList } from '../components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Product() {
    const logined = useSelector(state => state.loginStatus.logined);
    const { t } = useTranslation();

    return ( 
        <div className="bg-[#F5F5F5] h-[100vh]">
            <Header page='Product'/>
            {
                logined
                ?
                <div className="px-[20px]">
                    <ProductList/>
                </div>
                :
                <div className='px-[30px] h-[calc(100vh-105px)] flex flex-col items-center justify-center text-[20px]'>
                    <img src='https://cdn-icons-png.flaticon.com/512/6478/6478111.png' className='w-[20%]' alt=''></img>
                    <div className='text-[20px] lg:text-[30px] font-semibold'>{t('please log in')}</div>
                </div>
            }
            
        </div> 
    );
}

export default Product;