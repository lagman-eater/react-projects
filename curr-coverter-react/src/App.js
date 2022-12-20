import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './Components/CurrencyRow';


function App() {
  const [currencyOpt, setCurrencyOpt] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  const myHeaders = new Headers();
  myHeaders.append("apikey", "8o19zNtxhPFEX20jbhNgAIX0qmJOcqEv");

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    // fetch("https://api.apilayer.com/exchangerates_data/latest&base=EUR", requestOptions)
    fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=AED%2C%20AFN%2C%20ALL%2C%20AMD%2C%20ANG%2C%20AOA%2C%20ARS%2C%20AUD%2C%20AWG%2C%20AZN%2C%20BAM%2C%20BBD%2C%20%2C%20BGN%2C%20BHD%2C%20BIF%2C%20BMD%2C%20BND%2C%20BOB%2C%20BRL%2C%20BSD%2C%20BTC%2C%20BTN%2C%20BWP%2C%20BYN%2C%20BYR%2C%20BZD%2C%20CAD%2C%20CDF&base=EUR"
      , requestOptions)
      .then(response => response.json())
      .then(result => {
        const firstCurrency = Object.keys(result.rates)[0]
        setCurrencyOpt([result.base, ...Object.keys(result.rates)])
        setFromCurrency(result.base)
        setToCurrency(firstCurrency)
        setExchangeRate(result.rates[firstCurrency])
      })
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      console.log(toCurrency + '   ' + fromCurrency);
      fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then(res => res.json)
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .catch(error => console.log('error', error));
    }
  }, fromCurrency, toCurrency)

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1 className="App">Convert</h1>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equality">=</div>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
