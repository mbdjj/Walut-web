import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { currencyPlaceholder } from '@/helpers/currency';
import { getData } from '@/helpers/networkManager';

const allCurrencyCodes = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"]

export default function Home() {
  const [foreignCurrency, setForeignCurrency] = useState(currencyPlaceholder("EUR"))
  const [baseCurrency, setBaseCurrency] = useState(currencyPlaceholder("PLN"))

  async function setForeignAndRefresh(code) {
    setForeignCurrency(currencyPlaceholder(code))
    fetchData(baseCurrency.code, code)
  }
  async function setBaseAndRefresh(code) {
    setBaseCurrency(currencyPlaceholder(code))
    fetchData(code)
  }

  async function fetchData(baseCode = baseCurrency.code, foreignCode = foreignCurrency.code) {
    const newForeign = await getData(baseCode, foreignCode)
    console.log(newForeign)
    setForeignCurrency(newForeign)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Walut Web</title>
        <meta name="description" content="Walut - currency converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <div className={styles.floatingWindow}>

          <h1>Calculation</h1>

          <div className={styles.fromToContainer}>
            <span>From: </span>
            <select defaultValue={foreignCurrency.code} onChange={(e) => setForeignAndRefresh(e.target.value)}>
              {allCurrencyCodes.map((code) => {
                const cur = currencyPlaceholder(code)
                return <option key={cur.code} value={cur.code}>{`${cur.flag} ${cur.code}`}</option>
              })}
            </select>
            <span>To: </span>
            <select defaultValue={baseCurrency.code} onChange={(e) => setBaseAndRefresh(e.target.value)}>
              {allCurrencyCodes.map((code) => {
                const cur = currencyPlaceholder(code)
                return <option key={cur.code} value={cur.code}>{`${cur.flag} ${cur.code}`}</option>
              })}
            </select>
          </div>

          <div className={styles.numbersContainer}>
            <div className={styles.foreignContainer}>
              <span className={styles.foreignCurrencyCode}>EUR</span>
              <span className={styles.foreignAmount}>0</span>
              <span className={styles.foreignCurrencyCode} style={{opacity: 0}}>EUR</span>
            </div>
            {/* <button className={styles.swapButton}></button> */}
            <div className={styles.baseContainer}>
              <span className={styles.baseCurrencyCode}>PLN</span>
              <span className={styles.baseAmount}>0</span>
              <span className={styles.baseCurrencyCode} style={{opacity: 0}}>PLN</span>
            </div>
          </div>

          <div className={styles.currencyInfoContainer}>
            <div className={styles.flagCircle}>{foreignCurrency.flag}</div>
            <div className={styles.currencyTextContainer}>
              <h3>{foreignCurrency.name}</h3>
              <p>{`${Math.round(foreignCurrency.price * 1000) / 1000} ${baseCurrency.symbol}`}</p>
            </div>
          </div>

          <button className={styles.clearButton}>Clear</button>
        </div>
      </main>
    </>
  )
}
