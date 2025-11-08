export default async function handler(req, res) {
  const { q } = req.query
  const API_KEY = process.env.API_KEY

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(q)}&page=1&include_adult=false`
    )
    const data = await response.json()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch search results' })
  }
}
