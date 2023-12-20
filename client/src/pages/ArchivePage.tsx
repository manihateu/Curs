import React, { useEffect, useState } from 'react'
import { getByCell } from '../api/archive'
import { useParams } from 'react-router-dom'

const ArchivePage = () => {
    const [data, setData] = useState<object | null>()
    const {cellCode} = useParams()
    console.log(cellCode)
    useEffect(() => {
        const getArchiveData = async() => {
            if (typeof cellCode == 'string'){
                const info = await getByCell(cellCode)
                setData(info)
            }
        }
        getArchiveData()
    }, [])
    if (data) {
        console.log(data)
    }
  return (
    <div>
    {data ? 
        <div className='p-5 rounded-xl shadow-xl flex flex-col'>
            <p className='text-xl font-bold'>Архив - {data.id}</p>
            <p className="font-mono">Стеллаж - {data.shelf}</p>
            <p className="font-mono">Полка - {data.shelfNumber}</p>
            <p className="font-mono">Ячейка - {data.cell}</p>
            <p className="font-mono">Код ячейки - {data.cellCode}</p>
            <p className="font-mono">Заполнение - {data.filling}</p>
        </div>
    : null}
    </div>
  )
}

export default ArchivePage