import styles from "@/styles/Cell.module.css"

export default function CurrencyCell({ currency, base }) {
  function rateString(currency, base) {
    if (currency.rate === 0) {
      return ""
    } else {
      const roundedRate = Math.round((1/currency.rate) * 1000) / 1000
      return `${roundedRate} ${base.symbol}`
    }
  }

  return <>
    <div className={styles.cell}>
      <div className={styles.textLeftSide}>
        <p className={styles.flag}>{currency.flag}</p>
        <div className={styles.textVStack}>
          <p className={styles.name}>{currency.name}</p>
          <p className={styles.code}>{currency.code}</p>
        </div>
      </div>

      <p className={styles.rate}>{rateString(currency, base)}</p>
    </div>
  </>
}