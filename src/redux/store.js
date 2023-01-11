import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./userRedux/userSlice";
import homeSlice from "./homeRedux/homeSlice";
import imageSlice from "./imageRedux/imageSlice";
import categorySlice from "./categoryRedux/categorySlice";
import contractSlice from "./contractRedux/contractSlice";
import homesDaysSlice from "./homesDaysRedux/homesDaysSlice";
import repairTimesSlice from "./repairTimesRedux/repairTimesSlice";
import commentSlice from "./comment/commentSlice";
import notificationSlice from "./notificationRedux/notificationSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        home: homeSlice,
        image: imageSlice,
        category: categorySlice,
        contract: contractSlice,
        homesDays: homesDaysSlice,
        repairTimes: repairTimesSlice,
        comment: commentSlice,
        notification: notificationSlice
    },
})
export default store