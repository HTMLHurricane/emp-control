import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from '@/entities/schedule/api'
import { ISchedule, IScheduleDay } from '@/entities/schedule/model/types'
import { DeleteButton, EditButton, FlexBox, useAppActions } from '@/shared'
import { Table, TableProps, message } from 'antd'
import { useEffect, useState } from 'react'

const AdminSchedulePageTable = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { setScheduleForm, setIsUpdatingSchedule } = useAppActions()
  const { data, isLoading } = useGetAllSchedulesQuery()
  const [deleteSchedule, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteScheduleMutation()

  const handleEdit = (rec: ISchedule) => {
    setScheduleForm(rec)
    setIsUpdatingSchedule(true)
  }

  const columns: TableProps<ISchedule>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Количество рабочих с этим графиком',
      dataIndex: 'users',
      render: (item) => <div className='text-center'>{item}</div>
    },
    {
      title: 'Дни',
      dataIndex: 'days',
      render: (_, rec) => {
        return (
          <ul>
            {rec?.days?.map((day: IScheduleDay) => {
              if (day.time_in && day.time_out) {
                return (
                  <li key={day.id}>
                    {`${
                      day.day === 'monday'
                        ? 'Понедельник'
                        : day.day === 'tuesday'
                        ? 'Вторник'
                        : day.day === 'wednesday'
                        ? 'Среда'
                        : day.day === 'thursday'
                        ? 'Четверг'
                        : day.day === 'friday'
                        ? 'Пятница'
                        : day.day === 'saturday'
                        ? 'Суббота'
                        : 'Воскресенье'
                    } ${day.time_in.slice(0, 5)}
            -${day.time_out.slice(0, 5)}`}
                  </li>
                )
              }
            })}
          </ul>
        )
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, rec) => (
        <FlexBox>
          <DeleteButton onConfirm={() => deleteSchedule(rec.id)} />
          <EditButton onClick={() => handleEdit(rec)} />
        </FlexBox>
      ),
    },
  ]

  useEffect(() => {
    if (deleteSuccess) {
      message.success('Успешно удалено')
    }
  }, [deleteSuccess])

  useEffect(() => {
    if (deleteError) {
      message.error('Произошла ошибка во время удаления')
      console.log('error', deleteError)
    }
  }, [deleteError])

  return (
    <Table
      loading={isLoading}
      scroll={{ x: true }}
      bordered
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data}
      pagination={{
        showSizeChanger: false,
        current: page,
        pageSize: limit,
        total: data?.data?.length,
        onChange: (page, limit) => {
          setPage(page)
          setLimit(limit)
        },
      }}
    />
  )
}

export { AdminSchedulePageTable }
