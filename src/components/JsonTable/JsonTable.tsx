import React, { useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window'

import JsonRow from './components/JsonRow'

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

  return (
    <List
      height={600}
      itemCount={tableData.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <JsonRow
          index={index}
          style={style}
          data={tableData}
          onDataChange={onDataChange}
        />
      )}
    </List>
  )
}

export default JsonTable
