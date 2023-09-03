import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { coinReducer } from "./coin/Reducer";

const rootReducers=combineReducers({

    coin:coinReducer

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))