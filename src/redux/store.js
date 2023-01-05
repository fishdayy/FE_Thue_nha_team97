import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./userRedux/userSlice";
import homeSlice from "./homeRedux/homeSlice";
import imageSlice from "./imageRedux/imageSlice";
import categorySlice from "./categoryRedux/categorySlice";
import contractSlice from "./contractRedux/contractSlice";
import homesDaysSlice from "./homesDaysRedux/homesDaysSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        home: homeSlice,
        image: imageSlice,
        category: categorySlice,
        contract: contractSlice,
        homesDays: homesDaysSlice
    },
})
export default store