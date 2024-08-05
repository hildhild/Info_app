import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import SidebarModal from "./SidebarModal";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../redux/slices/sidebarSlice";

function DefaultLayout({children}) {
    const dispatch = useDispatch();
    const showSidebar = useSelector(state => state.sidebar.showSidebar);

    const handleCloseSidebarModal = () => {
        dispatch(closeSidebar());
    }

    return (
        <div className="flex">
            <Sidebar pageType={children.type.name}/>
            <div className="lg:ml-[270px] w-full lg:w-[calc(100vw-270px)]">
                {children}
            </div>
            { 
                showSidebar 
                && 
                <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-1 bg-[rgba(0,0,0,.4)]" onClick={handleCloseSidebarModal}>
                    <SidebarModal pageType={children.type.name}/>
                </div>
            }
        </div>
    );
}

export default DefaultLayout;