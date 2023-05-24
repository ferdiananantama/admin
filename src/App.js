import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componets/Login";
import Daftar from "./componets/Daftar";
import Akun from "./componets/view/DataAkun";
import Alamat from "./componets/view/DataAlamat";
import DataPengajuan from "./componets/view/DataPengajuan";
import DataTransaksi from "./componets/view/DataTransaksi";
import DataDetailTransaksi from "./componets/view/DataDetailTransaksi";
import DataProduk from "./componets/view/DataProduk";
import DataAdmin from "./componets/view/DataAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Daftar' element={<Daftar />} />
        <Route path="/data-akun" element={<Akun/>}/>
        <Route path="/data-alamat" element={<Alamat/>}></Route>
        <Route path="/data-pengajuan" element={<DataPengajuan/>}></Route>
        <Route path="/data-transaksi" element={<DataTransaksi/>}></Route>
        <Route path="/data-detail-transaksi" element={<DataDetailTransaksi/>}></Route>
        <Route path="/data-produk" element={<DataProduk/>}></Route>
        <Route path="/data-admin" element={<DataAdmin/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
