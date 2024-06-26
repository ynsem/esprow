import React, { useState } from 'react'

import './JsonUploader.css'
import JsonTable from '../JsonTable'

import { download } from '../../helpers/download'

import { type JsonData } from '../../types'

const JsonUploader = () => {
  const [ jsonData, setJsonData ] = useState<JsonData[] | null>(null)
  const [ error, setError ] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const result = JSON.parse(e.target?.result as string)
          if (Array.isArray(result)) {
            setJsonData(result)
            setError(null)
          } else {
            console.error('Загруженный файл не является допустимым JSON массивом.')
          }
        } catch (err) {
          setError('Неверный JSON файл.')
          setJsonData(null)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleDataChange = (updatedData: JsonData[]) => {
    setJsonData(updatedData)
  }

  return (
    <div className="wrapper">
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {error && <p className="error">{error}</p>}
      {jsonData && (
        <button type="button" onClick={() => download(jsonData)}>
          Загрузить измененные данные
        </button>
      )}
      {jsonData && <JsonTable data={jsonData} onDataChange={handleDataChange} />}
    </div>
  )
}

export default JsonUploader
