import apiKey from "@/APIKey/APIKey"
import { currency } from "./currency"

export async function getData(baseCode, foreignCode) {
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey()}&base_currency=${baseCode}`
  const response = await fetch(url)
  const data = await response.json()

  return currency(foreignCode, data.data[foreignCode])
}