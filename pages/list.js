import Head from "next/head"
import styles from "@/styles/List.module.css"
import { useState, useEffect } from "react";
import { getAllData } from "@/helpers/networkManager"
import { currencyPlaceholder } from '@/helpers/currency';
import CurrencyCell from "@/components/CurrencyCell";

export default function List() {

    const [currencyArray, setCurrencyArray] = useState([currencyPlaceholder("PLN"), currencyPlaceholder("USD")])
    const [baseCurrency, setBaseCurrency] = useState(currencyPlaceholder("PLN"))

    async function fetchData(baseCode = baseCurrency.code) {
        const currencies = await getAllData(baseCode)
        console.log(currencies)
        setCurrencyArray(currencies)
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
                    <div className={styles.currencyList}>
                        {currencyArray.map((currency) => <CurrencyCell currency={currency} base={baseCurrency} key={currency.code} />)}
                    </div>
                </div>
            </main>
        </>
    )
}