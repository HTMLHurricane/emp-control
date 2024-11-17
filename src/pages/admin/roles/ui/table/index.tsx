import { useDeleteRoleMutation, useGetAllRolesQuery } from '@/entities/role/api'
import { IRole } from '@/entities/role/model/types'
import {
  DeleteButton,
  EditButton,
  FlexBox,
  useAppActions,
  useAppSelector,
} from '@/shared'
import { columnResponseText } from '@/shared/const/css'
import { Table, TableProps, message } from 'antd'
import { useEffect } from 'react'

const AdminRolePageTable = () => {
  const { roleTableLimit, roleTablePage } = useAppSelector()
  const {
    setRoleForm,
    setIsUpdatingRole,
    setRoleTableLimit,
    setRoleTablePage,
  } = useAppActions()
  const { data, isLoading } = useGetAllRolesQuery()
  const [deleteBranch, { isSuccess: deleteSuccess }] = useDeleteRoleMutation()

  const handleEdit = (rec: IRole) => {
    setRoleForm({
      name: rec.name,
      id: rec.id,
    })
    setIsUpdatingRole(true)
  }

  const columns: TableProps<IRole>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'name',
      className: `${columnResponseText}`
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, rec) => (
        <FlexBox>
          {rec.name !== 'unknown' && (
            <>
              <DeleteButton onConfirm={() => deleteBranch(rec.id)} />
              <EditButton onClick={() => handleEdit(rec)} />
            </>
          )}
        </FlexBox>
      ),
      className: `${columnResponseText}`
    },
  ]

  useEffect(() => {
    if (deleteSuccess) {
      message.success('Успешно удалено')
    }
  }, [deleteSuccess])

  return (
    <Table
      loading={isLoading}
      scroll={{ x: true }}
      bordered
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data.filter(el => el.name !== 'unknown')}
      pagination={{
        showSizeChanger: false,
        current: roleTablePage,
        pageSize: roleTableLimit,
        total: data?.total,
        onChange: (page, limit) => {
          setRoleTablePage(page)
          setRoleTableLimit(limit)
        },
      }}
    />
  )
}

export { AdminRolePageTable }
