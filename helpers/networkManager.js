import { currency } from "./currency"
import { allCurrencyCodes } from "./appData"

export async function getData(baseCode, foreignCode) {
  const url = `/api/currency-data?baseCode=${baseCode}`
  const response = await fetch(url)
  const data = await response.json()

  return currency(foreignCode, data.data.rates[foreignCode])
}

export async function getAllData(baseCode) {
  const url = `/api/currency-data?baseCode=${baseCode}`
  const response = await fetch(url)
  const data = await response.json()

  console.log(data)

  const currencies = allCurrencyCodes.map(code => currency(code, data.data.rates[code]));

  console.log(currencies)

  return currencies
}