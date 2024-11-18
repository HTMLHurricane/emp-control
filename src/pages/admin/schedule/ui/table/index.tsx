import {
    useDeleteScheduleMutation,
    useGetAllSchedulesQuery,
} from '@/entities/schedule/api';
import { ISchedule, IScheduleDay } from '@/entities/schedule/model/types';
import { DeleteButton, EditButton, useAppActions } from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { Table, TableProps, message } from 'antd';
import { useEffect, useState } from 'react';

const AdminSchedulePageTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { setScheduleForm, setIsUpdatingSchedule } = useAppActions();
    const { data, isLoading } = useGetAllSchedulesQuery();
    const [deleteSchedule, { isSuccess: deleteSuccess, isError: deleteError }] =
        useDeleteScheduleMutation();

    const handleEdit = (rec: ISchedule) => {
        setScheduleForm(rec);
        setIsUpdatingSchedule(true);
    };

    const columns: TableProps<ISchedule>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Количество рабочих с этим графиком',
            dataIndex: 'users',
            render: (item) => <div className="text-center">{item}</div>,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Дни',
            dataIndex: 'days',
            render: (_, rec) => {
                return (
                    <ul>
                        {rec?.days?.map((day: IScheduleDay) => {
                            if (day.time_in && day.time_out) {
                                return (
                                    <li key={day.id}>
                                        {`${
                                            day.day === 'monday'
                                                ? 'Понедельник'
                                                : day.day === 'tuesday'
                                                ? 'Вторник'
                                                : day.day === 'wednesday'
                                                ? 'Среда'
                                                : day.day === 'thursday'
                                                ? 'Четверг'
                                                : day.day === 'friday'
                                                ? 'Пятница'
                                                : day.day === 'saturday'
                                                ? 'Суббота'
                                                : 'Воскресенье'
                                        } ${day.time_in.slice(0, 5)}
            -${day.time_out.slice(0, 5)}`}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                );
            },
            className: `${columnResponseText}`,
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-4">
                    <DeleteButton onConfirm={() => deleteSchedule(rec.id)} />
                    <EditButton onClick={() => handleEdit(rec)} />
                </div>
            ),
            className: `${columnResponseText}`,
        },
    ];

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Успешно удалено');
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (deleteError) {
            message.error('Произошла ошибка во время удаления');
            console.log('error', deleteError);
        }
    }, [deleteError]);

    return (
        <Table
            loading={isLoading}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data?.data}
            pagination={{
                showSizeChanger: false,
                current: page,
                pageSize: limit,
                total: data?.data?.length,
                onChange: (page, limit) => {
                    setPage(page);
                    setLimit(limit);
                },
            }}
        />
    );
};

export { AdminSchedulePageTable };
