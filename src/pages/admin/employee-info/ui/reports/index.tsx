import { FC } from 'react'
import { IEmployeeInfoReportsProps } from '../../model'
import { Image, Table, TableProps } from 'antd'
import { IEmployeeInfo } from '@/entities/employee-info/model/types'
import { IdUrl } from '@/shared/types/Types'

const EmployeeInfoReports: FC<IEmployeeInfoReportsProps> = ({
  data,
  loading,
}) => {
  const columns: TableProps<IEmployeeInfo['dates']>['columns'] = [
    {
      title: 'День',
      dataIndex: 'day',
    },
    {
      title: 'Пришёл(а)',
      dataIndex: 'in',
    },
    {
      title: 'Фото прихода',
      dataIndex: 'in_images',
      render: (el: IdUrl[]) => (
        <div className="flex flex-wrap gap-2">
          {el?.map((img) => (
            <Image src={img.url} width={150} height={100} />
          ))}
        </div>
      ),
    },
    {
      title: 'Опоздал(а)',
      dataIndex: 'late',
    },
    {
      title: 'Ранний уход',
      dataIndex: 'early',
    },
    {
      title: 'Ушёл(а)',
      dataIndex: 'out',
    },
    {
      title: 'Фото ухода',
      dataIndex: 'out_images',
      render: (el: IdUrl[]) => (
        <div className="flex flex-wrap gap-2">
          {el?.map((img) => (
            <Image src={img.url} width={150} height={100} />
          ))}
        </div>
      ),
    },
  ]

  return (
    <Table
      loading={loading}
      scroll={{ x: true }}
      bordered
      columns={columns as never}
      dataSource={data.dates}
      rowKey={() => Math.random()}
      pagination={false}
    />
  )
}

export { EmployeeInfoReports }
