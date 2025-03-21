import { useEffect, useState } from "react";
import "../styles/Toolbar.css";
import addIcon from "../assets/Add.png";
import refreshIcon from "../assets/Refresh.png";

const ToolbarRevenue = ({ onAdd, onRefresh, onFilter, onSearch, selectedCategory, searchTerm }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };

    const handleCategoryChange = (e) => {
        onFilter(e.target.value);
    };

    return (
        <div className="toolbar">
            {/* Add Button */}
            <div className="toolbar-item">
                <button className="toolbar-btn add-btn" onClick={onAdd}>
                    <img src={addIcon} alt="Add" />
                </button>
                <p className="toolbar-text">Add</p>
            </div>

            {/* Refresh Button */}
            <div className="toolbar-item">
                <button className="toolbar-btn white-btn" onClick={onRefresh}>
                    <img src={refreshIcon} alt="Refresh" />
                </button>
                <p className="toolbar-text">Refresh</p>
            </div>

            {/* Filter Dropdown */}
            <div className="toolbar-item filter-container">
                <select className="filter-dropdown" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="all">Filter: All Fields</option>
                    <option value="id">Filter: ID</option>
                    <option value="penerimaan">Filter: Jenis Penerimaan</option>
                    <option value="jumlah">Filter: Jumlah</option>
                    <option value="sumber">Filter: Sumber Penerimaan</option>
                </select>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder={`Search by ${selectedCategory}`}
                    className="search-bar"
                    value={inputValue}
                    onChange={handleSearchChange}
                />
                <span className="search-icon">🔍</span>
            </div>
        </div>
    );
};

export default ToolbarRevenue;