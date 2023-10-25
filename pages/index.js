'use client'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import { useState, useEffect } from "react";
import { currency, currencyPlaceholder } from '@/helpers/currency';
import { getData } from '@/helpers/networkManager';

const allCurrencyCodes = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"]

export default function Home() {
  const [foreignCurrency, setForeignCurrency] = useState(currency("EUR", 0))
  const [baseCurrency, setBaseCurrency] = useState(currencyPlaceholder("PLN"))

  const [topCurrency, setTopCurrency] = useState(currency("EUR", 0))
  const [botCurrency, setBotCurrency] = useState(currencyPlaceholder("PLN"))

  const [topAmount, setTopAmount] = useState(0)
  const [botAmount, setBotAmount] = useState(0)

  const [refreshDate, setRefreshDate] = useState(new Date(Date.UTC(2004, 1, 23, 21, 0, 0)))

  const dateOptions = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}

  async function setForeignAndRefresh(code) {
    const newForeign = currencyPlaceholder(code)
    if (topCurrency.code === foreignCurrency.code) {
      setTopCurrency(newForeign)
    } else {
      setBotCurrency(newForeign)
    }
    setForeignCurrency(newForeign)
    fetchData(baseCurrency.code, code)
  }
  async function setBaseAndRefresh(code) {
    const newBase = currencyPlaceholder(code)
    if (topCurrency.code === baseCurrency.code) {
      setTopCurrency(newBase)
    } else {
      setBotCurrency(newBase)
    }
    setBaseCurrency(currencyPlaceholder(code))
    fetchData(code)
  }

  async function fetchData(baseCode = baseCurrency.code, foreignCode = foreignCurrency.code) {
    const newForeign = await getData(baseCode, foreignCode)
    console.log(newForeign)
    setForeignCurrency(newForeign)
    clear()
    setRefreshDate(new Date)
  }

  function keyPressed(key) {
    console.log(key)
    if ("1234567890".includes(key)) {
      setTopAmount(topAmount => topAmount * 10 + Number(key))
    } else if (key == "Backspace") {
      setTopAmount(topAmount => Math.floor(topAmount / 10))
    }
  }

  function calcBottom(newTop) {
    console.log("bottom set")
    if (topCurrency.code === baseCurrency.code) {
      setBotAmount(Math.round((newTop * foreignCurrency.rate) * 100) / 100)
    } else {
      setBotAmount(Math.round((newTop * foreignCurrency.price) * 100) / 100)
    }
  }

  function swapCurrencies() {
    const tempTopCurrency = topCurrency
    setTopCurrency(botCurrency)
    setBotCurrency(tempTopCurrency)

    const tempTopAmount = topAmount
    setTopAmount(botAmount)
    setBotAmount(tempTopAmount)
  }

  function clear() {
    setTopAmount(0)
    calcBottom(0)
  }

  useEffect(() => {
    fetchData()
    setRefreshDate(new Date)
  }, [])

  useEffect(() => {
    calcBottom(topAmount)
    console.log(refreshDate)
    function handleKeyDown(e) {
      const key = e.key
      keyPressed(e.key)
    }

    document.addEventListener("keydown", handleKeyDown)
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [topAmount])

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
          <div className={styles.topTextContainer}>
            <h1>Calculation</h1>
            <p>{refreshDate.getFullYear() == new Date().getFullYear() ? refreshDate.toLocaleDateString("pl-PL", dateOptions) : ""}</p>
          </div>

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
              <span className={styles.foreignCurrencyCode}>{topCurrency.code}</span>
              <span className={styles.foreignAmount}>{topAmount}</span>
              <span className={styles.foreignCurrencyCode} style={{ opacity: 0 }}>{topCurrency.code}</span>
            </div>
            <div className={styles.baseContainer} onClick={() => { swapCurrencies()}}>
              <span className={styles.baseCurrencyCode}>{botCurrency.code}</span>
              <span className={styles.baseAmount}>{botAmount}</span>
              <span className={styles.baseCurrencyCode} style={{ opacity: 0 }}>{botCurrency.code}</span>
            </div>
          </div>

          <div className={styles.currencyInfoContainer}>
            <div className={styles.flagCircle}>{foreignCurrency.flag}</div>
            <div className={styles.currencyTextContainer}>
              <h3>{foreignCurrency.name}</h3>
              <p>{`${Math.round(foreignCurrency.price * 1000) / 1000} ${baseCurrency.symbol}`}</p>
            </div>
          </div>

          <button className={styles.clearButton} onClick={() => { clear() }}>Clear</button>
        </div>
      </main>
    </>
  )
}
