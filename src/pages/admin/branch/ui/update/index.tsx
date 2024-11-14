import { useUpdateBranchMutation } from '@/entities/branch/api'
import { IBranchForm } from '@/entities/branch/model/types'
import { FlexBox, useAppActions, useAppSelector } from '@/shared'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'

const AdminUpdateBranchForm = () => {
  const [form] = Form.useForm()
  const [updateBranch, { isSuccess, isLoading, isError }] =
    useUpdateBranchMutation()
  const { branchForm } = useAppSelector()
  const { setIsUpdatingBranch } = useAppActions()

  const onSubmit = (data: IBranchForm) => {
    updateBranch({ id: branchForm?.id, ...data })
  }

  const onCancel = () => {
    setIsUpdatingBranch(false)
    form.resetFields(['name', 'location'])
  }

  useEffect(() => {
    if (branchForm) {
      form.setFieldsValue(branchForm)
    }
  }, [branchForm])

  useEffect(() => {
    if (isSuccess) {
      message.success('Филиал успешно изменён')
      setIsUpdatingBranch(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время редактирования')
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

export { AdminUpdateBranchForm }
