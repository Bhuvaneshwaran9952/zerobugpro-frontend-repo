import { configureStore,combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { Reducer } from "./Reducer";
import TrainerReducer from "../Redux/TrainerReducer";

const store = configureStore({
    reducer: {
      trainerList: TrainerReducer,
    },
  });
  const rootReducer = combineReducers({
    trainers: TrainerReducer,
  });
const rootreducer=combineReducers({user:Reducer});
const Store=configureStore({reducer:rootreducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk,logger),
})

export default Store;