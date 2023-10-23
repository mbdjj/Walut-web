const emojiDictionary = {
  "AUD": "🇦🇺",
  "BRL": "🇧🇷",
  "BGN": "🇧🇬",
  "CAD": "🇨🇦",
  "CNY": "🇨🇳",
  "HRK": "🇭🇷",
  "CZK": "🇨🇿",
  "DKK": "🇩🇰",
  "EUR": "🇪🇺",
  "HKD": "🇭🇰",
  "HUF": "🇭🇺",
  "INR": "🇮🇳",
  "IDR": "🇮🇩",
  "ILS": "🇮🇱",
  "JPY": "🇯🇵",
  "MYR": "🇲🇾",
  "MXN": "🇲🇽",
  "RON": "🇷🇴",
  "NZD": "🇳🇿",
  "NOK": "🇳🇴",
  "PHP": "🇵🇭",
  "PLN": "🇵🇱",
  "GBP": "🇬🇧",
  "RUB": "🇷🇺",
  "SGD": "🇸🇬",
  "ZAR": "🇿🇦",
  "KRW": "🇰🇷",
  "SEK": "🇸🇪",
  "CHF": "🇨🇭",
  "THB": "🇹🇭",
  "TRY": "🇹🇷",
  "USD": "🇺🇸"
}

const symbolDictionary = {
  "AUD": "$",
  "BRL": "R$",
  "BGN": "лв.",
  "CAD": "$",
  "CNY": "¥",
  "HRK": "kn",
  "CZK": "Kč",
  "DKK": "kr",
  "EUR": "€",
  "HKD": "$",
  "HUF": "Ft",
  "INR": "₹",
  "IDR": "Rp",
  "ILS": "₪",
  "JPY": "¥",
  "MYR": "RM",
  "MXN": "$",
  "RON": "lei",
  "NZD": "$",
  "NOK": "kr",
  "PHP": "₱",
  "PLN": "zł",
  "GBP": "£",
  "RUB": "₽",
  "SGD": "$",
  "ZAR": "R",
  "KRW": "₩",
  "SEK": "kr",
  "CHF": "Fr.",
  "THB": "฿",
  "TRY": "₺",
  "USD": "$"
}

const nameDictionary = {
  "AUD": "Australian dollar",
  "BRL": "Brazilian real",
  "BGN": "Bulgarian lev",
  "CAD": "Canadian dollar",
  "CNY": "Chinese yuan",
  "HRK": "Croatian kuna",
  "CZK": "Czech koruna",
  "DKK": "Danish krone",
  "EUR": "Euro",
  "HKD": "Hong Kong dollar",
  "HUF": "Hungarian forint",
  "INR": "Indian rupee",
  "IDR": "Indonesian rupiah",
  "ILS": "Israeli new shekel",
  "JPY": "Japanese yen",
  "MYR": "Malaysian ringgit",
  "MXN": "Mexican peso",
  "RON": "Romanian leu",
  "NZD": "New Zealand dollar",
  "NOK": "Norwegian krone",
  "PHP": "Phillippine peso",
  "PLN": "Polish zloty",
  "GBP": "British pound",
  "RUB": "Russian ruble",
  "SGD": "Singapure dollar",
  "ZAR": "South African rand",
  "KRW": "South Korean won",
  "SEK": "Swedish krona",
  "CHF": "Swiss franc",
  "THB": "Thai baht",
  "TRY": "Turkish lira",
  "USD": "US dollar"
}

export function currencyPlaceholder(code) {
  return {
    code: code,
    flag: emojiDictionary[code],
    name: nameDictionary[code],
    symbol: symbolDictionary[code]
  }
}

export function currency(code, rate) {
  return {
    code: code,
    flag: emojiDictionary[code],
    name: nameDictionary[code],
    symbol: symbolDictionary[code],
    rate: rate,
    price: 1 / rate
  }
}