import { useCreateBranchMutation } from '@/entities/branch/api'
import { IBranchForm } from '@/entities/branch/model/types'
import { FlexBox, useAppActions } from '@/shared'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'

const AdminCreateBranchForm = () => {
  const [form] = Form.useForm()
  const [createBranch, { isSuccess, isLoading, isError }] =
    useCreateBranchMutation()
  const { setIsCreatingBranch } = useAppActions()

  const onSubmit = (data: IBranchForm) => {
    createBranch(data)
  }

  const onCancel = () => {
    setIsCreatingBranch(false)
    form.resetFields(['name', 'location'])
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('Филиал успешно создан')
      setIsCreatingBranch(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время создания филиала')
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
        label="Название филиала"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBranchForm>
        name="location"
        label="Адрес"
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

export { AdminCreateBranchForm }
