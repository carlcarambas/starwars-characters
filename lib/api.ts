export const baseUrl = 'https://swapi.dev/api/people'
export const getApi = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const result = response.json()
  return result
}
