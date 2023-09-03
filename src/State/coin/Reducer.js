import { GET_COIN_LIST, GET_HISTORYCAL_CHART } from "./ActionType";

const initialState={

    historical:null,
    coins:[]

}

export const coinReducer=(state= initialState, {type,payload})=>{

    switch (type) {
        case GET_HISTORYCAL_CHART:
          return {
            ...state, historical:payload
          };
        case GET_COIN_LIST:
            return {
                ...state, coins:payload
            };
        
        default:
          return state;
      }

}