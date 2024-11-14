import { Popconfirm, Button } from 'antd'
import { FC } from 'react'
import { BsTrash } from 'react-icons/bs'

type Props = {
  onConfirm: () => void
}

const DeleteButton: FC<Props> = ({ onConfirm }) => {
  return (
    <Popconfirm
      onConfirm={() => onConfirm()}
      title="Вы действительно хотите удалить?"
    >
      <Button type="primary" icon={<BsTrash />} danger>
        Удалить
      </Button>
    </Popconfirm>
  )
}

export { DeleteButton }
