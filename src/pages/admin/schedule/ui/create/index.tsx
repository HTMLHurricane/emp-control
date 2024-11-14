import { FC, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useCreateScheduleMutation } from '@/entities/schedule/api'
import { FlexBox, useAppActions } from '@/shared'
import { IScheduleFormCreate } from '../../model'

const AdminCreateScheduleForm: FC = () => {
  const [form] = Form.useForm<IScheduleFormCreate>()
  const [createSchedule, { isSuccess, isLoading, isError }] =
    useCreateScheduleMutation()
  const { setIsCreatingSchedule } = useAppActions()

  const onSubmit = (data: IScheduleFormCreate) => {
    createSchedule({
      name: data.name,
      days: [
        {
          day_of_week: 'monday',
          time_in: data.weekDays?.monday?.startTime
            ? data.weekDays?.monday?.startTime
            : null,
          time_out: data.weekDays?.monday?.endTime
            ? data.weekDays?.monday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.monday?.endTime && data?.weekDays?.monday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'tuesday',
          time_in: data.weekDays?.tuesday?.startTime
            ? data.weekDays?.tuesday?.startTime
            : null,
          time_out: data.weekDays?.tuesday?.endTime
            ? data.weekDays?.tuesday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.tuesday?.endTime && data?.weekDays?.tuesday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'wednesday',
          time_in: data.weekDays?.wednesday?.startTime
            ? data.weekDays?.wednesday?.startTime
            : null,
          time_out: data.weekDays?.wednesday?.endTime
            ? data.weekDays?.wednesday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.wednesday?.endTime &&
            data?.weekDays?.wednesday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'thursday',
          time_in: data.weekDays?.thursday?.startTime
            ? data.weekDays?.thursday?.startTime
            : null,
          time_out: data.weekDays?.thursday?.endTime
            ? data.weekDays?.thursday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.thursday?.endTime &&
            data?.weekDays?.thursday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'friday',
          time_in: data.weekDays?.friday?.startTime
            ? data.weekDays?.friday?.startTime
            : null,
          time_out: data.weekDays?.friday?.endTime
            ? data.weekDays?.friday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.friday?.endTime && data?.weekDays?.friday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'saturday',
          time_in: data.weekDays?.saturday?.startTime
            ? data.weekDays?.saturday?.startTime
            : null,
          time_out: data.weekDays?.saturday?.endTime
            ? data.weekDays?.saturday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.saturday?.endTime &&
            data?.weekDays?.saturday?.endTime
              ? true
              : false,
        },
        {
          day_of_week: 'sunday',
          time_in: data.weekDays?.sunday?.startTime
            ? data.weekDays?.sunday?.startTime
            : null,
          time_out: data.weekDays?.sunday?.endTime
            ? data.weekDays?.sunday?.endTime
            : null,
          is_work_day:
            data?.weekDays?.sunday?.endTime && data?.weekDays?.sunday?.endTime
              ? true
              : false,
        },
      ],
    })
  }

  const onCancel = () => {
    setIsCreatingSchedule(false)
    form.resetFields(['weekDays', 'startTime', 'endTime'])
  }

  useEffect(() => {
    if (isSuccess) {
      message.success('График работы успешно создан')
      setIsCreatingSchedule(false)
    }
    if (isError) {
      message.error('Произошла ошибка во время создания графика работы')
      console.log('error', isError)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    return () => {
      onCancel()
    }
  }, [])

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        className="max-w-[600px]"
        label="Название рабочего графика"
        name="name"
        rules={[
          { required: true, message: 'Введите название рабочего графика' },
        ]}
      >
        <Input />
      </Form.Item>
      <FlexBox cls="max-w-[600px] mb-5">
        <b>День недели</b>
        <b className="ml-auto mr-10">Начало рабочего дня</b>
        <b>Конец рабочего дня</b>
      </FlexBox>
      <FlexBox gap="0" cls="flex-col max-w-[600px]">
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Понедельник</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'monday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'monday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Вторник</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'tuesday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'tuesday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Среда</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'wednesday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'wednesday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Четверг</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'thursday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'thursday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Пятница</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'friday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'friday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Суббота</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'saturday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'saturday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
        <FlexBox>
          <Form.Item style={{ width: 150 }}>
            <b>Воскресенье</b>
          </Form.Item>
          <Form.Item
            name={['weekDays', 'sunday', 'startTime']}
            style={{ marginLeft: 'auto' }}
          >
            <Input placeholder="Например: 10:00" />
          </Form.Item>
          <Form.Item name={['weekDays', 'sunday', 'endTime']}>
            <Input placeholder="Например: 10:00" />
          </Form.Item>
        </FlexBox>
      </FlexBox>
      <p className="text-sm mb-5 text-gray-400">
        Оставьте пустым поле если этот день должен быть выходным
      </p>
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

export { AdminCreateScheduleForm }
