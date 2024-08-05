import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/slices/successModalSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function SuccessModal() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [, setOpenModal] = useState(false);

    const curOpenModal = useSelector(state => state.successModal.openModal);

    const onCloseModal = () => {
        setOpenModal(false);
        dispatch(closeModal());
    }

    return (
        <Dialog className="relative z-10" open={curOpenModal} onClose={onCloseModal}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#59B259] sm:mx-0 sm:h-10 sm:w-10">
                        <FontAwesomeIcon icon={faCircleCheck} className='h-6 w-6 text-white'/>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-center text-[#232323]">
                            {t('successfully')}!
                        </DialogTitle>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-[#59B259] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:ml-3 sm:w-auto"
                        onClick={onCloseModal}
                    >
                        OK
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
