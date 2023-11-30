import { defineStore } from "pinia";

export const useHotelStore = defineStore('hotel', {
    state: () => ({
        hotel: undefined,
        reserva: undefined
    }),
    actions: {
        saveHotel(data) {
            this.hotel = data;
        },
        getReserva(data) {
            this.reserva = data;
        }
    }
});