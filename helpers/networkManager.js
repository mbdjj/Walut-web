import { currency } from "./currency"

export async function getData(baseCode, foreignCode) {
  const url = `/api/currency-data?baseCode=${baseCode}&foreignCode=${foreignCode}`
  const response = await fetch(url)
  const data = await response.json()

  return currency(foreignCode, data.data.data[foreignCode])
}