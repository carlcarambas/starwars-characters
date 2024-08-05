export const getApi = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal })
  const result = response.json()
  return result
}