import React, { useState, useEffect } from "react";
import {
    fetchProvinces,
    fetchDistricts,
    fetchWards,
} from "../../Services/LocationService/LocationService";

const AddressSelector = ({ onChange }) => {
    // State cho các danh sách và giá trị đã chọn
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [streetAddress, setStreetAddress] = useState("");

    // Fetch danh sách tỉnh/thành phố khi component mount
    useEffect(() => {
        fetchProvinces().then(data => {
            setProvinces(data);
        }).catch(console.error);
    }, []);

    // Fetch danh sách quận/huyện khi tỉnh/thành phố thay đổi
    useEffect(() => {
        if (selectedProvince) {
            fetchDistricts(selectedProvince).then(data => {
                setDistricts(data);
            }).catch(console.error);
            setSelectedDistrict("");
            setSelectedWard("");
            setWards([]);
        }
    }, [selectedProvince]);

    // Fetch danh sách phường/xã khi quận/huyện thay đổi
    useEffect(() => {
        if (selectedDistrict) {
            fetchWards(selectedDistrict).then(data => {
                setWards(data);
            }).catch(console.error);
            setSelectedWard("");
        }
    }, [selectedDistrict]);

    // Cập nhật địa chỉ đầy đủ khi có bất kỳ thay đổi nào
    useEffect(() => {
        const province = provinces.find(p => p.code.toString() === selectedProvince.toString())?.name || "";
        const district = districts.find(d => d.code.toString() === selectedDistrict.toString())?.name || "";
        const ward = wards.find(w => w.code.toString() === selectedWard.toString())?.name || "";

        // Gọi hàm onChange để cập nhật giá trị trong component cha
        onChange({
            province,
            district,
            ward,
            streetAddress,
            fullAddress: `${streetAddress}, ${ward}, ${district}, ${province}`.replace(/^,\s*/, "").replace(/,\s*,/g, ",").trim()
        });
    }, [selectedProvince, selectedDistrict, selectedWard, streetAddress, onChange, provinces, districts, wards]);

    // Render các dropdown và input
    return (
        <>
            {/* Dropdown cho tỉnh/thành phố */}
            <select
                className="form-select mb-2"
                value={selectedProvince}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setSelectedProvince(newValue);
                }}
            >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                        {province.name}
                    </option>
                ))}
            </select>

            {/* Dropdown cho quận/huyện */}
            <select
                className="form-select mb-2"
                value={selectedDistrict}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setSelectedDistrict(newValue);
                }}
            >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                        {district.name}
                    </option>
                ))}
            </select>

            {/* Dropdown cho phường/xã */}
            <select
                className="form-select mb-2"
                value={selectedWard}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setSelectedWard(newValue);
                }}
            >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                        {ward.name}
                    </option>
                ))}
            </select>

            {/* Input cho số nhà, tên đường */}
            <input
                type="text"
                className="form-control"
                placeholder="Số nhà, tên đường"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
            />
        </>
    );
};

export default AddressSelector;
