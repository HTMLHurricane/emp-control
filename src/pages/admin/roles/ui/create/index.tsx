import { IBranchForm } from '@/entities/branch/model/types'
import { useCreateRoleMutation } from '@/entities/role/api'
import { FlexBox, useAppActions } from '@/shared'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'

const AdminCreateRoleForm = () => {
  const [form] = Form.useForm()
  const [createRole, { isSuccess, isLoading, isError }] =
    useCreateRoleMutation()
  const { setIsCreatingRole } = useAppActions()

  const onSubmit = (data: IBranchForm) => {
    createRole(data)
  }

  const onCancel = () => {
    setIsCreatingRole(false)
    form.resetFields(['name'])
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('Роль успешно создан')
      setIsCreatingRole(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время создания роли')
      console.log('error', isError)
    }
  }, [isSuccess, isError])

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
      <Form.Item<IBranchForm>
        name="name"
        label="Название роли"
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

export { AdminCreateRoleForm }
