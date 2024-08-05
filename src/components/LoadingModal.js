import { TailSpin } from 'react-loading-icons';
import { useTranslation } from 'react-i18next';

function LoadingModal() {
    const { t } = useTranslation();

    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-1 bg-[rgba(0,0,0,.4)]">
            <div className="bg-[white] text-[black] h-[200px] w-[300px] py-[30px] px-[20px] text-[22px] fixed z-1 left-[calc(50vw-150px)] top-[calc(50vh-100px)] rounded-2xl grid place-content-center" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-center mb-[10px]'><TailSpin className='w-[50px] h-[50px]' stroke="#000" strokeWidth="3"/></div>
                {t('processing')}
            </div> 
        </div>
        
    );
}

export default LoadingModal;