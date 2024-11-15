import { useAppActions, useAppSelector } from '@/shared';
import { Button, Modal, Table, TableProps } from 'antd';
import { useGetNotComeDataQuery } from '../../api';
import { IEmployee } from '@/entities/employee/model/types';
import { useNavigate } from 'react-router-dom';
import { columnResponseText } from '@/shared/const/css'

const columns: TableProps<IEmployee>['columns'] = [
    {
        title: 'Имя',
        dataIndex: 'name',
        className: `${columnResponseText}`,
    },
    {
        title: 'Должность',
        dataIndex: 'position',
        render: (e) => e.name,
        className: `${columnResponseText}`,
    },
    {
        title: 'Подразделение',
        dataIndex: 'branch',
        render: (e) => e.name,
        className: `${columnResponseText}`,
    },
    {
        title: 'Время прихода',
        dataIndex: 'schedule',
        render: (el) => el.time_in.slice(0, 5),
        className: `${columnResponseText}`,
    },
    {
        title: 'Время отъезда',
        dataIndex: 'schedule',
        render: (el) => el.time_out.slice(0, 5),
        className: `${columnResponseText}`,
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        className: `${columnResponseText}`,
    }, 
];

const NotComeModal = () => {
    const { setIsNotComeModal } = useAppActions();
    const { isNotComeModal, homeDate, doughnutBranch } = useAppSelector();
    const navigate = useNavigate();
    const { data } = useGetNotComeDataQuery({
        day: homeDate.format('YYYY-MM-DD'),
        branch: doughnutBranch,
        limit: 100,
    });

    const handleCancel = () => setIsNotComeModal(false);

    return (
        <Modal
            title="Отсутствовавшие"
            open={isNotComeModal}
            onCancel={handleCancel}
            footer={
                <Button onClick={handleCancel} key="back" type="primary">
                    Закрыть
                </Button>
            }
            width={1000}
        >
            <Table
                scroll={{ y: 300 }}
                dataSource={data?.data}
                rowKey={(row) => row.id}
                columns={columns}
                pagination={false}
                size="small"
                onRow={(rec) => ({
                    onClick: () => {
                        navigate(`employees/${rec.id}`);
                        handleCancel();
                    },
                    className: 'hover:cursor-pointer',
                })}
            />
        </Modal>
    );
};

export { NotComeModal };
