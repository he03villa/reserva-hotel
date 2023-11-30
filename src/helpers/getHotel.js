import apiHotel from "../api/apiHotel";

const saveHotel = async (data) => {
    const res = await apiHotel.post('/hotels', data);
    return res.data;
}

export default saveHotel;