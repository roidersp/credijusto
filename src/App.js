import React, { Component } from 'react'
import axios from 'axios'
import './App.scss'

import Tabs from './components/tabs'

const crypto = [
  {book: 'btc_mxn', id: 'BTC', name:'Bitcoin'},
  {book: 'eth_mxn', id: 'ETH', name:'Ethereum'},
  {book: 'xrp_mxn', id: 'XRP', name:'Ripple'}
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
      data: []
    }

  this.loadData = this.loadData.bind(this)
  this.changeTab = this.changeTab.bind(this)
  }

  componentDidMount() {
    this.loadData()
    this.interval = setInterval(() => this.loadData(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeTab(tab){
    this.setState({currentTab:tab})
  }

  loadData(){
    const date = new Date()
    const _this = this

    axios.all([
      axios.get('http://api.bitso.com/v3/ticker'),
      axios.get('http://api.coinrex.io/v1/markets/stats'),
      axios.get('http://bitlem.com/api/store')
    ])
    .then(axios.spread(function (bitsoResult, coinrexResult, bitlemResult) {
      const dataBitso = bitsoResult.data.payload
      const dataCoinrex = coinrexResult.data.data.stats
      const dataBitlem = bitlemResult.data

      const dataCrypto = [] 

      crypto.forEach(element => {
        const {id, book} = element
        dataCrypto[id] = []

        dataBitlem.forEach(criptoItem => {
          if(criptoItem.asset_symbol === id){
            dataCrypto[id]['bitlem'] = {price:criptoItem.bid_price,created_at:criptoItem.created_at}
          }
        });
        dataCrypto[id]['coinrex'] = {price:dataCoinrex[id].last_price}

        dataBitso.forEach(criptoItem => {
          if(criptoItem.book === book){
            dataCrypto[id]['bitso'] =  {price:criptoItem.last}
            return true
          } 
        });
      });

      const data = _this.state.data
      data.push({date: date, criptos: dataCrypto})
      const dataCoin = Object.assign([], data);

      if(dataCoin.length > 10){        
        dataCoin.shift()
      } 
      _this.setState({data:dataCoin})
      
    }));
  }

  render () {
    const {data,currentTab} = this.state 
    return (
      <div className='mainContainer' >
        <header>
          <h1>Cypto currency</h1>
        </header>
        <main className='container'>
          <Tabs changeTab={this.changeTab} data={data} cryptos={crypto} currentTab={currentTab}/>
        </main>
      </div>
    )
  }
}

export default App
