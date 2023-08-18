import { SidebarContext } from '@/components/crm/context/resizeContext'
import styleHome from '@/components/crm/home/home.module.css'
import { SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { useHeader } from '@/components/crm/hooks/useHeader'
import CustomerListInputGroup from '@/components/crm/customer/customer_input_group'
import { TableRowSelection } from 'antd/es/table/interface'
import HomeList from '@/components/crm/delete_data/delete_data.list'
import { data } from '@/components/crm/table/table-order-promotion'

export default function CustomerList() {
  const mainRef = useRef<HTMLDivElement>(null)
  const { isOpen } = useContext<any>(SidebarContext)
  const [selected, setSelected] = useState(false)
  const [numberSelected, setNumberSelected] = useState(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader()

  interface DataType {
    key: React.Key
    personname: string
    date1: string
    date2: string
    filename: string
    operation: string
  }

  const onSelectChange = (
    selectedRowKeys: any,
    selectedRows: string | any[]
  ) => {
    setSelectedRowKeys(selectedRowKeys)
    setNumberSelected(selectedRows?.length)
    if (selectedRows?.length > 0) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }

  const handleSelectAll = () => {
    const allRowKeys = data.map((item: { key: any }) => item.key)
    setSelectedRowKeys(allRowKeys)
    setNumberSelected(data.length)
  }

  const handleDeselectAll = () => {
    setSelectedRowKeys([])
    setNumberSelected(0)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelect: (record, selected, selectedRows) => {
    //   console.log(selectedRows);
    //   setNumberSelected(selectedRows?.length);
    // },
    onSelectAll: handleSelectAll,
  }

  useEffect(() => {
    setHeaderTitle('Dữ liệu đã xoá')
    setShowBackButton(false)
    setCurrentPath('/crmdelete_data')
  }, [setHeaderTitle, setShowBackButton, setCurrentPath])

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add('content_resize')
    } else {
      mainRef.current?.classList.remove('content_resize')
    }
  }, [isOpen])
  return (
    <div ref={mainRef} className={styleHome.main}>
      <HomeList />
    </div>
  )
}
