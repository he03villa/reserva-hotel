import apiHotel from "../api/apiHotel";

const getAllReservas = async (id, ID = '', fecha = '', nombre = '') => {
    const params = new URLSearchParams();
    if (ID != '') {
        params.append('id', ID);
    }
    if (fecha != '') {
        params.append('fecha', fecha);
    }
    if (nombre != '') {
        params.append('nombre', nombre);
    }
    /* console.log(params.toString()); */
    const res = await apiHotel.get(`/bookings/${id}`, { params });
    return res.data;
}

const updateStado = async (data, id)  => {
    const res = await apiHotel.put(`/bookings/estado_reserva/${id}`, data);
    return res.data;

}
const saveRerva = async (data)  => {
    const res = await apiHotel.post(`/bookings/`, data);
    return res.data;
}

const updateRerva = async (data, id)  => {
    const res = await apiHotel.put(`/bookings/${id}`, data);
    return res.data;
}

export {
    getAllReservas,
    updateStado,
    saveRerva,
    updateRerva
}