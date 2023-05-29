import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import BgLogin from "../assets/bg-login.png";
import Logo from "../assets/logo fix.png"
import axios from "axios";


const schema = yup.object({
    phone : yup.string().required().min(10),
    password : yup.string().required().min(8)
})

const Login = () =>{
    const navigate = useNavigate()

    const {register, formState:{ errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async (data) => {
        console.log('yupdata :', data)

        const requestbody = {
            phone_number : data.phone,
            password : data.password
        };
            axios.post('https://dreamiefs.pythonanywhere.com/api/admin/login/', requestbody)
                .then(response => {
                    navigate('/data-akun')
                    console.log('berhasil daftar',response.data)
                })
                .catch(error => {
                    console.log('dar',error)
                });
        };     

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-white">
            <div className="hidden sm:block bg-white content-center static">
                <img alt="logo.png" className="mt-3 ml-4" src={Logo} width={40} height={40} />
                <div className="relative top-32 left-60">
                    <h1 className="text-black font-semibold text-3xl">Selamat Datang!</h1>
                </div>
                <img alt="background.png" src={BgLogin} />
            </div>
            <div className="bg-green-800 flex flex-col justify-center rounded-bl-3xl rounded-tl-3xl">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] w-full mx-auto p-8 px-8">
                    <p className="text-5xl text-white font-normal">
                        Login
                    </p>
                    <p className="text-white my-3 text-lg">Selamat datang di login admin!</p>
                    <div className="flex flex-col mt-8 pt-2 text-black">
                        <input 
                        type="text" 
                        id="phone"
                        {...register("phone")} 
                        placeholder="No Telepon"  
                        className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"/>
                        <span className="text-red-400 text-xs my-2">
                        {errors.phone?.type==="required"&&"No. telp harus diisi!"}
                        {errors.phone?.type==="min"&&"No. telp minimal 10 angka!"}
                        </span>
                    </div>
                    <div className="flex flex-col text-black">
                        <input 
                        type="password" 
                        id="password"
                        {...register("password")} 
                        placeholder="Password" 
                        className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"/>
                        <span className="text-red-400 text-xs my-2">
                        {errors.password?.type==="required"&&"Password harus diisi!"}
                        {errors.password?.type==="min"&&"Password harus lebih dari 8 huruf!"}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <p className="flex items-center"><input type="checkbox" className="mr-2 rounded-sm bg-green-800 " />Ingat sandi</p>
                        <p>Lupa password?</p>
                    </div>
                    <div className="text-center items-center">
                    <button type="submit" className="w-3/4 mt-20 py-2 bg-orange-500 shadow-lg shadow-teal-950/20 hover:shadow-teal-950/50 text-white font-semibold rounded-lg">Masuk</button>
                        <div className="flex mt-6 justify-center">Belum punya Akun? 
                            <a className="ms-1 text-orange-500" onClick={() => {navigate('/Daftar')} }> Daftar</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
