import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getHistoricalChart } from '../State/coin/Action';
import "./LineChartComponent.css"

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer]);

const priceData=[
  [
    51662249600000,
    2.06272962164846006
  ],
  [
    1662336000000,
    0.06326097822004885
  ],
  [
    1662422400000,
    0.0628454786276194
  ],
  [
    1662508800000,
    0.059094417380440606
  ],
  [
    1662595200000,
    0.06117841696774775
  ],
  [
    1662681600000,
    0.061039794362761655
  ],
  [
    1662768000000,
    0.06395015119251674
  ],
  [
    1662854400000,
    0.06482594287186447
  ],
  [
    1662940800000,
    0.06358290222558786
  ],
  [
    1663027200000,
    0.06376477234934215
  ]
]
const LineChartComponent = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [coinList,setCoinList]=useState([])
  const chartContainerRef = useRef(null);
  const dispatch = useDispatch()
  const {coin}=useSelector(store=>store)
  const [showSearchResult,setShowSearchResult]=useState(false);

  console.log("coins ", coin.coins)

  useEffect(() => {
    dispatch(getCoinList())
  }, []);

  

  useEffect(() => {
    if(selectedCoin)
    dispatch(getHistoricalChart(selectedCoin))
  }, [selectedCoin]);

  useEffect(() => {
    
    
  
      const chart = echarts.init(chartContainerRef.current);
      chart.setOption({
      title: {
        text: 'Price Chart',
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b} <br/> Price: {c}',
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Price',
          type: 'line',
          data: coin.historical?.total_volumes, // Use the fetched price data here
        },
      ],
    });
  
  }, [coin.historical]);

  const handleCoinChange = (value) => {
    setSelectedCoin(value);
  };

  const handleSearch = (search) => {
    const searchCoins = coin.coins.filter((coin) => (
        coin.symbol.toLowerCase().includes(search)
        || coin.name.toLowerCase().includes(search)
        || coin.id.toLowerCase().includes(search)
    ))

    setCoinList(searchCoins)
}

  return (
    <div>
     
      <div className='searchWrapper'>
        <input 
        placeholder='search coin...' 
        onChange={(e)=>{
          handleSearch(e.target.value)
        }} 
        onFocus={()=>{
         
            setShowSearchResult(true)}
          
        }
        onBlur={()=>setShowSearchResult(false)}
        type="text" />
        {showSearchResult && <div className='resultDiv'>
          { coinList.map((coin)=><p 
          className='result'
          onClick={()=>handleCoinChange(coin.id)}>{coin.id}</p>)}
        </div>}
      </div>
     <div 
      ref={chartContainerRef} 
      id="chart-container" 
      style={{ width: '100%', height: '400px' }}>23</div>
    </div>
  );
}

export default LineChartComponent