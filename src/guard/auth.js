import router from '../router';
import { useHotelStore } from '../store/hotelStore';

const authGuard = (to, from, next) => {
    const hotelStore = useHotelStore();
    const { hotel } = hotelStore;
    if (hotel) {
      next();
    } else {
      next('/');
    }
};

export default authGuard;