import { useUpdateEmployeeMutation } from '@/entities/employee/api'
import {
  IEmployeeFormData,
} from '@/entities/employee/model/types'
import { FlexBox, useAppActions, useAppSelector } from '@/shared'
import { Button, Form, Input, message, Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { useGetAllBranchesQuery } from '@/entities/branch/api'
import { useGetAllRolesQuery } from '@/entities/role/api'
import { useGetAllSchedulesQuery } from '@/entities/schedule/api'

const AdminUpdateEmployeeForm = () => {
  const [form] = Form.useForm()
  const [roleOptions, setRoleOptions] = useState<SelectProps['options']>()
  const [branchOptions, setBranchOptions] = useState<SelectProps['options']>()
  const [schduleOptions, setScheduleOptions] =
    useState<SelectProps['options']>()
  const [updateEmployee, { isSuccess, isLoading, isError }] =
    useUpdateEmployeeMutation()
  const { data: schedules } = useGetAllSchedulesQuery()
  const { employeeForm } = useAppSelector()
  const { setIsUpdatingEmployee } = useAppActions()
  const { data: roles } = useGetAllRolesQuery()
  const { data: branches } = useGetAllBranchesQuery({})

  const onSubmit = (data: IEmployeeFormData) => {
    updateEmployee({
      id: employeeForm?.id,
      ...data,
    })
  }

  const onCancel = () => {
    setIsUpdatingEmployee(false)
    form.resetFields()
  }

  useEffect(() => {
    if (employeeForm) {
      form.setFieldsValue({
        ...employeeForm,
        schedule: employeeForm.schedule?.id,
      })
    }
  }, [employeeForm, form])

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
      message.success('Сотрудник успешно изменён')
      setIsUpdatingEmployee(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время редактирования')
      console.log('error', isError)
    }
  }, [isSuccess, isError, setIsUpdatingEmployee])

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
      <Form.Item name="name" label="Имя">
        <Input />
      </Form.Item>
      <Form.Item name="position_id" label="Должность">
        <Select disabled={!roles?.data?.length} options={roleOptions} />
      </Form.Item>
      <Form.Item name="branch_id" label="Филиал">
        <Select disabled={!branches?.data?.length} options={branchOptions} />
      </Form.Item>
      <Form.Item name="schedule" label="Рабочий график">
        <Select disabled={!schedules?.data?.length} options={schduleOptions} />
      </Form.Item>
      <Form.Item name="phone" label="Телефон">
        <Input />
        {/* <MaskedInput
          mask="+{998}00 000 00 00"
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.unmaskedValue)}
        /> */}
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

export { AdminUpdateEmployeeForm }
