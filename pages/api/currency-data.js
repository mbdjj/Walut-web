// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const {
    query: { baseCode }
  } = req

  const response = await fetch(`https://open.er-api.com/v6/latest/${baseCode}`)
  res
    .status(200)
    .json({data: await response.json()})
}
