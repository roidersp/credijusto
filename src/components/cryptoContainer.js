import React, { Component } from 'react'

class TabsTop extends Component {
 
  render () {
     const {cryptos,currentTab} = this.props
    return (
      <div className='tabsTopContainer' >
        {cryptos.map((crypto, index) => {
          return (
            <div key={crypto.name} className={currentTab === index ? 'tabTopItem active':'tabTopItem'}>
              {crypto.name}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TabsTop
