import { Button } from 'antd'
import { FC } from 'react'
import { BsPencil } from 'react-icons/bs'

type Props = {
  onClick: () => void
}

const EditButton: FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="primary" icon={<BsPencil />}>
      Редактировать
    </Button>
  )
}

export { EditButton }
