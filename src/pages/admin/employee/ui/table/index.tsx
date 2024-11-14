import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from '@/entities/employee/api'
import { IEmployee } from '@/entities/employee/model/types'
import {
  DeleteButton,
  EditButton,
  FlexBox,
  useAppActions,
  useAppSelector,
} from '@/shared'
import { Button, Table, TableProps, message } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa6'
import { IScheduleDay } from '@/entities/schedule/model/types'

const AdminEmployeePageTable = () => {
  const { attendanceBranch, employeeTablePage, employeeTableLimit } =
    useAppSelector()
  const {
    setEmployeeForm,
    setIsUpdatingEmployee,
    setEmployeeTableLimit,
    setEmployeeTablePage,
  } = useAppActions()
  const navigate = useNavigate()
  const { data, isFetching } = useGetAllEmployeesQuery({
    page: employeeTablePage,
    per_page: employeeTableLimit,
    id: attendanceBranch,
  })
  const [deleteBranch, { isSuccess: deleteSuccess }] =
    useDeleteEmployeeMutation()

  const handleEdit = (rec: IEmployee) => {
    setEmployeeForm({
      branch_id: rec.branch.id,
      name: rec.name,
      phone: rec?.phone,
      position_id: rec.position.id,
      id: rec.id,
      schedule: rec.schedule,
    })
    setIsUpdatingEmployee(true)
  }

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'name',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      render: (e) => (e.name === 'unknown' ? 'Должность не указана' : e.name),
    },
    {
      title: 'Подразделение',
      dataIndex: 'branch',
      render: (e) => e.name,
    },
    {
      title: 'Рабочий график',
      dataIndex: 'schedule',
      render: (el) => (
        <FlexBox cls="flex-col w-[200px]">
          {el.name}
          <ul>
            {el.days.map((day: IScheduleDay) => {
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
        </FlexBox>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      render: (item) => <div className='w-[150px]'>{item}</div>
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, rec) => (
        <FlexBox cls='flex-col'>
          <Button
            type="primary"
            onClick={() => navigate(`/employees/${rec.id}`)}
            icon={<FaEye />}
          >
            Смотреть
          </Button>
          <DeleteButton onConfirm={() => deleteBranch(rec.id)} />
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

  return (
    <Table
      loading={isFetching}
      scroll={{ x: true }}
      bordered
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data}
      pagination={{
        showSizeChanger: true,
        current: employeeTablePage,
        pageSize: employeeTableLimit,
        total: data?.total,
        onChange: (page, limit) => {
          setEmployeeTablePage(page)
          setEmployeeTableLimit(limit)
        },
      }}
    />
  )
}

export { AdminEmployeePageTable }
