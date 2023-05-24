import ImgDaftar from "../assets/img-daftar.jpg";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef,useState, useEffect } from "react";

const schema = yup.object ({
    nama : yup.string().required().min(4),
    email : yup.string().required().email(),
    password : yup.string().required().min(8).max(16).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/),
    konfirmasiPassword : yup.string().oneOf([yup.ref('password'), null])
})

const Daftar = () =>{
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('false')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, mail, pwd);
        setSuccess(true)
    }
    useEffect = (() => {
        userRef.current.focus()
    }, [])

    useEffect = (() => {
        setErrMsg('')
    }, [user, mail, pwd])
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm ({
        resolver : yupResolver(schema)
    })
    
    const formSubmit = (data) =>{
        console.log(data)
    } 
    return(
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
                <div className="hidden sm:block">
                    <img className="w-full h-full object-cover" src={ImgDaftar} alt="" />
                </div>
                <div className="bg-white flex flex-col justify-center">
                    <form onSubmit={handleSubmit(formSubmit)} className="max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
                        <h2 className="text-4xl dark:text-white font-bold text-center">
                            DAFTAR ADMIN
                        </h2>
                        <div className="flex flex-col mt-2 py-2 text-gray-400">
                            <label htmlFor="nama">Nama Lengkap</label>
                            <input 
                            id='nama' 
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            type="text" 
                            {...register("nama")} 
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"
                            />
                            <span className="text-sm text-red-400 my-2">
                            {errors.nama?.type==="required"&&"Nama harus diisi!"}
                            {errors.nama?.type=="min"&&"Nama harus lebih dari 4 huruf!"}
                            </span>
                        </div>
                        <div className="flex flex-col py-2 text-gray-400">
                            <label htmlFor="mail">Email</label>
                            <input 
                            id='mail' 
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            type="email" 
                            {...register("email")} 
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"
                            />
                            <span className="my-2 text-sm text-red-400">
                            {errors.email?.type==="required"&&"Email harus diisi!"}
                            {errors.email?.type==="email"&&"Format email salah!"}
                            </span>
                        </div>
                        <div className="flex flex-col py-2 text-gray-400">
                            <label htmlFor="password">Password</label>
                            <input 
                            id='password' 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            type="password" 
                            {...register("password")} 
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"
                            />
                            <span className="my-2 text-sm text-red-400">
                            {errors.password?.type==="required"&&"Password harus diisi!"}
                            {errors.password?.type==="min"&&"Password harus lebih dari 8 huruf!"}
                            {errors.password?.type==="max"&&"Password tidak boleh lebih dari 16 huruf!"}
                            {errors.password?.type==="matches"&&"Password harus diawal huruf besar"}
                            </span>
                        </div>
                        <div className="flex flex-col py-2 text-gray-400">
                            <label>Konfirmasi Password</label>
                            <input type="password" {...register("konfirmasiPassword")} className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline"/>
                            <span className="text-sm my-2 text-red-400">
                                {errors.konfirmasiPassword?.type==="oneOf"&&"Password tidak sesuai!"}
                            </span>
                        </div>
                        <button type="submit" className="w-full mt-10 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">DAFTAR</button>
                        <div className="justify-center flex mt-5">Sudah punya Akun? <span href="" className="ms-2" onClick={()=>navigate('/')}>Masuk</span></div>
                    </form>
                </div>
            </div>
    )
}

export default Daftar;