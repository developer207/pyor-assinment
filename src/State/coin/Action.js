import api from "../../Config/api";
import { GET_COIN_LIST, GET_COIN_LIST_FAILURE, GET_HISTORYCAL_CHART, GET_HISTORYCAL_CHART_FAILURE } from "./ActionType";

export const getHistoricalChart = (coin)=>async(dispatch)=>{
    try {
        const { data } = await api.get(
          `/api/v3/coins/${coin}/market_chart?vs_currency=INR&days=30`
        );
    
        console.log("get historical chart - ", data);
        dispatch({
          type: GET_HISTORYCAL_CHART,
          payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_HISTORYCAL_CHART_FAILURE,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}

export const getCoinList= () =>async(dispatch)=>{
    try {
        const { data } = await api.get(
          `/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
    
        console.log("coin list - ", data);
        dispatch({
          type: GET_COIN_LIST,
          payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_COIN_LIST_FAILURE,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}