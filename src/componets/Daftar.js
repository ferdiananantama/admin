import ImgDaftar from "../assets/bg-daftar.png";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object ({
    nama : yup.string().required().min(4),
    phone : yup.string().required().min(10),
    email : yup.string().required().email(),
    password : yup.string().required().min(8).max(16).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/),
    konfirmasiPassword : yup.string().oneOf([yup.ref('password'), null])
})

const Daftar = () =>{

    const navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm ({
        resolver : yupResolver(schema)
    })
    
    const onSubmit = async (data) => {
        console.log('yupdata :', data)

        const requestbody = {
            full_name : data.nama,
            phone_number : data.phone,
            email : data.email,
            password : data.password
        };
            axios.post('https://dreamiefs.pythonanywhere.com/api/admin/register/', requestbody)
                .then(response => {
                    navigate('/')
                    console.log('berhasil daftar',response.data)
                })
                .catch(error => {
                    console.log('dar',error)
                });
        };     
    
    return(
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-white">
                <div className="flex flex-col justify-center bg-green-800 rounded-br-3xl rounded-tr-3xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[480px] w-full mx-auto p-10 px-8">
                        <h2 className="text-4xl text-white font-normal">
                            Daftar Admin
                        </h2>
                        <p className="text-white my-3 text-lg">Selamat datang di login admin!</p>
                        <div className="flex flex-col mt-2 pt-2 text-black">
                            <input 
                            placeholder="Nama lengkap"
                            id='nama' 
                            // value={full_name}
                            // onChange={(e) => setNama(e.target.value)}
                            autoComplete="off"
                            type="text" 
                            {...register("nama")} 
                            className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"
                            />
                            <span className="text-sm text-red-400 my-2">
                            {errors.nama?.type==="required"&&"Nama harus diisi!"}
                            {errors.nama?.type==="min"&&"Nama harus lebih dari 4 huruf!"}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1 text-gray-400">
                            <input 
                            placeholder="No. telp"
                            id='phone' 
                            // value={phone_number}
                            // onChange={(e) => setPhone(e.target.value)}
                            type="number" 
                            {...register("phone")} 
                            className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"
                            />
                            <span className="my-2 text-sm text-red-400">
                            {errors.phone?.type==="required"&&"Nomor Hp harus diisi!"}
                            {errors.phone?.type==="min"&&"Nomor Hp harus lebih dari 10 angka!"}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1 text-gray-400">
                            <input 
                            placeholder="Email"
                            id='email' 
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            {...register("email")} 
                            className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"
                            />
                            <span className="my-2 text-sm text-red-400">
                            {errors.email?.type==="required"&&"Email harus diisi!"}
                            {errors.email?.type==="email"&&"Email tidak sesuai!"}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1 text-gray-400">
                            <input 
                            placeholder="password"
                            id='password' 
                            // value={password}
                            // onChange={(e) => setPwd(e.target.value)}
                            type="password" 
                            {...register("password")} 
                            className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"
                            />
                            <span className="my-2 text-sm text-red-400">
                            {errors.password?.type==="required"&&"Password harus diisi!"}
                            {errors.password?.type==="min"&&"Password harus lebih dari 8 huruf!"}
                            {errors.password?.type==="max"&&"Password tidak boleh lebih dari 16 huruf!"}
                            {errors.password?.type==="matches"&&"Password harus diawal huruf besar"}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1 text-gray-400">
                            <input placeholder="Konfirmasi password" type="password" {...register("konfirmasiPassword")} className="rounded-lg bg-green-800 mt-2 p-2 focus:border-white focus:bg-white focus:outline"/>
                            <span className="text-sm my-2 text-red-400">
                                {errors.konfirmasiPassword?.type==="oneOf"&&"Password tidak sesuai!"}
                            </span>
                        </div>
                        <div className="text-center items-center">
                            <button type="submit" className="w-3/4 mt-16 py-2 bg-orange-500 shadow-lg shadow-teal-950/20 hover:shadow-teal-950/50 text-white font-semibold rounded-lg">DAFTAR</button>
                            <div className="justify-center flex mt-5">Sudah punya Akun? <span href="" className="ms-2 text-orange-500" onClick={()=>navigate('/')}>Masuk</span></div>
                        </div>
                    </form>
                </div>
                <div className="hidden sm:block bg-white">
                    <div>
                        <img src={ImgDaftar} alt="imgdaftar.png" />
                    </div>
                </div>
            </div>
    )
}

export default Daftar;