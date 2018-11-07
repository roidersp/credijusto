import React, { Component } from 'react'

class TabsTop extends Component {
 
  render () {
     const {cryptos,currentTab,changeTab} = this.props
    return (
      <div className='tabsTopContainer' >
        {cryptos.map((crypto, index) => {
          console.log(index)
          return (
            <div onClick={(e) => changeTab(index) } key={crypto.name} className={currentTab === index ? 'tabTopItem active':'tabTopItem'}>
              {crypto.name}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TabsTop
