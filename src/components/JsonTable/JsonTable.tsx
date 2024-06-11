import React, { useEffect, useState } from 'react'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

import { type JsonData } from '../../types'

interface JsonTableProps {
  data: JsonData[];
  onDataChange: (updatedData: JsonData[]) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({ data, onDataChange }) => {
  const [ tableData, setTableData ] = useState<JsonData[]>(data)

  useEffect(() => {
    setTableData(data)
  }, [ data ])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    key: string
  ) => {
    const newData = [ ...tableData ]
    let value: string | number | boolean | null

    if (e.target.type === 'radio') {
      value = e.target.value === 'true'
    } else if (e.target.type === 'number') {
      value = e.target.value === '' ? null : Number(e.target.value)
    } else {
      value = e.target.value
    }

    newData[rowIndex] = { ...newData[rowIndex], [key]: value }
    setTableData(newData)
    onDataChange(newData)
  }

  const renderInputField = (value: string | number | boolean | null, rowIndex: number, key: string) => {
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
      const trueId = `true-${rowIndex}-${key}`
      const falseId = `false-${rowIndex}-${key}`
      return (
        <>
          <label htmlFor={trueId}>
            <input
              id={trueId}
              type="radio"
              name={`isActive-${rowIndex}`}
              value="true"
              checked={value === true}
              onChange={e => handleInputChange(e, rowIndex, key)}
            /> True
          </label>
          <label htmlFor={falseId}>
            <input
              id={falseId}
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
    if (typeof value === 'string' && Date.parse(value)) {
      return <input type="date" value={new Date(value).toISOString().split('T')[0]} onChange={e => handleInputChange(e, rowIndex, key)} />
    }
    return <span>{value}</span>
  }

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <table>
        <tbody>
          <tr key={index}>
            {Object.keys(tableData[index]).map(key => (
              <td key={key}>{renderInputField(tableData[index][key], index, key)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <List
      height={600}
      itemCount={tableData.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  )
}

export default JsonTable
