import { useNavigate } from "react-router-dom";
import ImgLogin from "../assets/img-login.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    email : yup.string().required().email(),
    password : yup.string().required().min(8)
})

const Login = () =>{
    const navigate = useNavigate()

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    console.log(errors)

    const formSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="bg-gray-800 flex flex-col justify-center">
                <form onSubmit={handleSubmit(formSubmit)} className="max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                    <h2 className="text-4xl dark:text-white font-bold text-center">
                        HALLO
                    </h2>
                    <div className="flex flex-col mt-2 py-2 text-gray-400">
                        <label>Email</label>
                        <input type="text" {...register("email")}  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"/>
                        <span className="text-red-500 text-xs my-2">
                        {errors.email?.type==="required"&&"Email harus diisi!"}
                        {errors.email?.type==="email"&&"Format email salah!"}
                        </span>
                    </div>
                    <div className="flex flex-col py-2 text-gray-400">
                        <label>Password</label>
                        <input type="password" {...register("password")} className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"/>
                        <span className="text-red-500 text-xs my-2">
                        {errors.password?.type==="required"&&"Password harus diisi!"}
                        {errors.password?.type==="min"&&"Password harus lebih dari 8 huruf!"}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-400 py-2">
                        <p className="flex items-center"><input type="checkbox" className="mr-2" />Ingat Sandi</p>
                        <p>Lupa Password</p>
                    </div>
                    <button type="submit" className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">Masuk</button>
                    <div className="justify-center flex mt-3">Belum punya Akun? <a href="" className="ms-1" onClick={() => {navigate('/Daftar')}}>Daftar</a></div>
                </form>
            </div>
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={ImgLogin} alt="" />
            </div>
        </div>
    );
}

export default Login;
