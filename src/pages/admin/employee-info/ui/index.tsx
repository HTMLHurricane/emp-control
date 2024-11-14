import { useGetEmployeeInfoQuery } from '@/entities/employee-info/api'
import { useParams } from 'react-router-dom'
import { EmployeeInformation } from './info'
import { EmployeeInfoReports } from './reports'
import { FlexBox } from '@/shared'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { EmployeeInfoHead } from './head'

const AdminEmployeeInfoPage = () => {
  const { id } = useParams()
  const [date, setDate] = useState(dayjs())
  const { data, isLoading } = useGetEmployeeInfoQuery({
    id: id!,
    month: date.format('YYYY-MM'),
  })

  if (!data) {
    return <Spin />
  } else {
    return (
      <FlexBox cls="flex-col">
        <EmployeeInfoHead setDate={setDate} date={date} />
        <EmployeeInformation data={data?.data} />
        <FlexBox cls="flex-col">
          <EmployeeInfoReports data={data?.data} loading={isLoading} />
        </FlexBox>
      </FlexBox>
    )
  }
}

export { AdminEmployeeInfoPage }
