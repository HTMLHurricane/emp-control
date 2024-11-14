import { useGetAllBranchesQuery } from '@/entities/branch/api'
import { useCreateEmployeeMutation } from '@/entities/employee/api'
import { IEmployeeForm } from '@/entities/employee/model/types'
import { useGetAllRolesQuery } from '@/entities/role/api'
import { useGetAllSchedulesQuery } from '@/entities/schedule/api'
import { FlexBox, useAppActions } from '@/shared'
import {
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  message,
} from 'antd'
import { useEffect, useState } from 'react'

const AdminCreateEmployeeForm = () => {
  const [form] = Form.useForm()
  const [roleOptions, setRoleOptions] = useState<SelectProps['options']>()
  const [branchOptions, setBranchOptions] = useState<SelectProps['options']>()
  const [schduleOptions, setScheduleOptions] =
    useState<SelectProps['options']>()
  const [createEmployee, { isSuccess, isLoading, isError }] =
    useCreateEmployeeMutation()
  const { data: roles } = useGetAllRolesQuery()
  const { data: branches } = useGetAllBranchesQuery({})
  const { data: schedules } = useGetAllSchedulesQuery()
  const { setIsCreatingEmployee } = useAppActions()

  const onSubmit = (data: IEmployeeForm) => {
    createEmployee(data)
  }

  const onCancel = () => {
    setIsCreatingEmployee(false)
    form.resetFields([
      'name',
      'position_id',
      'branch_id',
      'schedule',
      'phone',
      'email',
    ])
  }

  useEffect(() => {
    if (schedules) {
      setScheduleOptions(
        schedules.data.map((schedule) => ({
          label: schedule.name,
          value: schedule.id,
        })),
      )
    }
  }, [schedules])

  useEffect(() => {
    if (isSuccess) {
      message.success('Сотрудник успешно создан')
      setIsCreatingEmployee(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время создания сотрудника')
      console.log('error', isError)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (roles) {
      setRoleOptions(
        roles.data.map((role) => ({ label: role.name, value: role.id })),
      )
    }
  }, [roles])

  useEffect(() => {
    if (branches) {
      setBranchOptions(
        branches.data.map((branch) => ({
          label: branch.name,
          value: branch.id,
        })),
      )
    }
  }, [branches])

  useEffect(() => {
    return () => {
      onCancel()
    }
  }, [])

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item<IEmployeeForm>
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IEmployeeForm>
        name="position_id"
        label="Должность"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Select disabled={!roleOptions?.length} options={roleOptions} />
      </Form.Item>
      <Form.Item<IEmployeeForm>
        name="branch_id"
        label="Филиал"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Select disabled={!branchOptions?.length} options={branchOptions} />
      </Form.Item>
      <Form.Item<IEmployeeForm>
        name="schedule"
        label="Рабочий график"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Select disabled={!schedules?.data?.length} options={schduleOptions} />
      </Form.Item>
      <Form.Item<IEmployeeForm>
        name="phone"
        label="Телефон"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Input />
      </Form.Item>
      <FlexBox>
        <Button onClick={onCancel} type="default">
          Отмена
        </Button>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Сохранить
        </Button>
      </FlexBox>
    </Form>
  )
}

export { AdminCreateEmployeeForm }
