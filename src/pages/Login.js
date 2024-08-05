import { LoginForm } from "../components";

function Login() {
    return ( 
        <div className="h-[100vh] bg-cover bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/10/hinh-nen-mau-xam-thanh-pho-dep-780x439.jpg')] grid place-content-center">
            <div className="px-[50px] lg:px-[150px] xl:px-[250px]">
                <LoginForm/>
            </div>
        </div> 
    );
}

export default Login;