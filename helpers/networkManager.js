import { currency } from "./currency"

export async function getData(baseCode, foreignCode) {
  const url = `/api/currency-data?baseCode=${baseCode}`
  const response = await fetch(url)
  const data = await response.json()

  return currency(foreignCode, data.data.rates[foreignCode])
}