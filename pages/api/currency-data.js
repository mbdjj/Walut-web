// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY
  const {
    query: { baseCode, foreignCode }
  } = req

  const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${baseCode}&symbols=${foreignCode}`)
  res.status(200).json({data: await response.json()})
}
