import { Header, Info } from "../components";

function Profile() {

    return ( 
        <div className='bg-[#F5F5F5] h-[100vh]'>
            <Header page='Profile'/>
            <div className="px-[20px]">
                <Info/>
            </div>
        </div> 
    );
}

export default Profile;