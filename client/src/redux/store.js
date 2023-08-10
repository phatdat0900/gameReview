import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
  },
});

export default store;
