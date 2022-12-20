import React from 'react'

export default function CurrencyRow(props) {
  const {currencyOpt, selectedCurrency, onChangeCurrency, onChangeAmount, amount} = props
  return (
    <div>
        <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOpt && currencyOpt.map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
    </div>  
  )
}
