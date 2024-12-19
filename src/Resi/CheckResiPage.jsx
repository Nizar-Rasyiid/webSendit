import React, { useState } from "react";
import axios from "axios";

const CheckResiPage = () => {
  const [resi, setResi] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setResi(e.target.value);
  };

  const checkResi = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pemesanan/${resi}`);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to check resi");
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sendit - Cek Resi</h1>
        <div className="mb-4">
          <input type="text" value={resi} onChange={handleInputChange} placeholder="Masukkan nomor resi" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>
        <button onClick={checkResi} className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
          Cek Resi
        </button>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Hasil:</h2>
            <table className="min-w-full bg-white">
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Nomor Resi</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.id_pemesanan}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Status</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.status}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Pengirim</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.id_user}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Penerima</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.nama_penerima}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Alamat</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.lokasi_tujuan}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Tanggal Pengiriman</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.created_at}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">Tanggal Diterima</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.updated_at}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckResiPage;
