import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GoodsAndServices.css"; // File CSS untuk styling

const GoodsAndServices = () => {
    const [barangList, setBarangList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        axios.get("http://localhost:8080/api/barang/viewall", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setBarangList(response.data.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [navigate]);

    return (
        <div className="page-container">
            <nav className="navbar">
                <h2>Goods & Services</h2>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/");
                }}>Logout</button>
            </nav>
            <div className="goods-container">
                {barangList.length > 0 ? (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Barang</th>
                                    <th>Kategori</th>
                                    <th>Merk</th>
                                    <th>Stok</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barangList.map((barang) => (
                                    <tr key={barang.id}>
                                        <td>{barang.id}</td>
                                        <td>{barang.nama}</td>
                                        <td>{barang.kategori}</td>
                                        <td>{barang.merk}</td>
                                        <td>{barang.totalStock}</td>
                                        <td>
                                            <button 
                                                className="detail-btn" 
                                                onClick={() => navigate(`/good-and-services/${barang.id}`)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data-container">
                        <h3 className="no-data-text">Tidak ada data barang tersedia.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoodsAndServices;
