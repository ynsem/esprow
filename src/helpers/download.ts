export const download = (jsonData: object[]) => {
  if (!jsonData) return

  const blob = new Blob([ JSON.stringify(jsonData, null, 2) ], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'updated_data.json'
  link.click()
  URL.revokeObjectURL(url)
}