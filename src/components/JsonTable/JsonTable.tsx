import React, { useEffect, useState } from 'react'

interface JsonTableProps {
  data: object[];
  onDataChange: (updatedData: object[]) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({ data, onDataChange }) => {
  const [ tableData, setTableData ] = useState(data)

  useEffect(() => {
    setTableData(data)
  }, [ data ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, rowIndex: number, key: string) => {
    const newData = [ ...tableData ]
    newData[rowIndex] = { ...newData[rowIndex], [key]: e.target.value }
    setTableData(newData)
    onDataChange(newData)
  }

  const renderInputField = (value: string, rowIndex: number, key: string) => {
    if (key === 'id') {
      return <span>{value}</span>
    }
    if (typeof value === 'string') {
      return value.includes('@') ? (
        <input type="email" value={value} onChange={e => handleInputChange(e, rowIndex, key)} />
      ) : (
        <textarea value={value} onChange={e => handleInputChange(e, rowIndex, key)} />
      )
    }
    if (typeof value === 'number') {
      return <input type="number" value={value} onChange={e => handleInputChange(e, rowIndex, key)} />
    }
    if (typeof value === 'boolean') {
      return (
        <>
          <label>
            <input
              type="radio"
              name={`isActive-${rowIndex}`}
              value="true"
              checked={value === true}
              onChange={e => handleInputChange(e, rowIndex, key)}
            /> True
          </label>
          <label>
            <input
              type="radio"
              name={`isActive-${rowIndex}`}
              value="false"
              checked={value === false}
              onChange={e => handleInputChange(e, rowIndex, key)}
            /> False
          </label>
        </>
      )
    }
    if (Date.parse(value)) {
      return <input type="date" value={new Date(value).toISOString().split('T')[0]} onChange={e => handleInputChange(e, rowIndex, key)} />
    }
    return <span>{value}</span>
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(tableData[0]).map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map(key => (
              <td key={key}>{renderInputField(row[key], rowIndex, key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default JsonTable
