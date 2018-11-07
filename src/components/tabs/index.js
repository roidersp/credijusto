import React, { Component,Fragment } from 'react'
import moment from 'moment'
import TabsTop from './tabsTop'

class Tabs extends Component {
  
  render () {
    const {data, cryptos, currentTab, changeTab} =  this.props
    const currentCoin = cryptos[currentTab]['id']

    return (
      <div className='tabsConatiner' >
        <TabsTop changeTab={changeTab} cryptos={cryptos} currentTab={currentTab} />
        <div className="tabSlideContainer">
          {(data.length > 0) ? buidTab(data,currentCoin) : null}
        </div>
      </div>
    )
  }
}

const buidTab = (data,currentCoin) => {
  const dataCoin = Object.assign([], data);
  dataCoin.reverse()


  const currentData = dataCoin[0]
  return( 
    <div className="criptoContainer">
      <div className="criptoItem bitso">
        <div className="criptoItemHead up">{currentData['criptos'][currentCoin]['bitso'].price}</div>
        <div className="criptoname">bitso</div> 
        <div className="ciptoList">
          {buildList(dataCoin,currentCoin,'bitso')}
        </div>
        
      </div>
      <div className="criptoItem coinrex down">
        <div className="criptoItemHead up">{currentData['criptos'][currentCoin]['coinrex'].price}</div>
        <div className="criptoname">coinrex</div> 
        <div className="ciptoList">
          {buildList(dataCoin,currentCoin,'coinrex')}
        </div>
      </div>
      <div className="criptoItem bitlem">
        <div className="criptoItemHead up">{currentData['criptos'][currentCoin]['bitlem'].price}</div>
        <div className="criptoname">bitlem</div> 
        <div className="ciptoList">
          {buildList(dataCoin,currentCoin,'bitlem')}
        </div>
      </div>
    </div>
  )
}

const buildList = (data,cripto,exchange) => {
  const dataCoin = Object.assign([], data);
  dataCoin.shift()
  
    return (
    <ul>
      {dataCoin.map((item,index) => {
        const {date, criptos} = item
        const coinPrice = criptos[cripto][exchange].price
        return(
          <li key={index}>
          
            <div className="date">{moment(date).format('YYYY-MM-DD h:mm:ss')}</div>
            <div className="price">{coinPrice}</div>
          </li>
        )
      })}
    </ul>
    )
}

export default Tabs
