import { useGetLineDataQuery } from '@/entities/home/api';
import { Spin, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useAppSelector, Card, Title } from '@/shared';
import { ILine } from '@/entities/home/model';
import { useNavigate } from 'react-router-dom';
import { columnResponseText } from '@/shared/const/css';

const Line = () => {
    const { homeDate, branch, collapsed } = useAppSelector();

    const [isPreviewOpened] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading } = useGetLineDataQuery({
        day: homeDate.format('YYYY-MM-DD'),
        branch: branch,
    });

    const columns: TableProps<ILine>['columns'] = [
        {
            title: 'ФИО',
            dataIndex: 'name',
            className: `${columnResponseText} w-[100px] md:w-[200px]`,
        },
        {
            title: 'Должность',
            dataIndex: 'position.name',
            render: (_, record) => <Tag>{record.position.name}</Tag>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Филиал',
            dataIndex: 'branch.name',
            render: (_, record) => <Tag>{record.branch.name}</Tag>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Пришел',
            dataIndex: 'attendance.come',
            render: (_, record) => (
                <Tag color={record.attendance.come === '0' ? 'red' : 'green'}>
                    {record.attendance.come}
                </Tag>
            ),
            className: `${columnResponseText}`,
        },
        {
            title: 'Опоздал',
            dataIndex: 'attendance.late',
            render: (_, record) => (
                <Tag color={record.attendance.late ? 'red' : 'green'}>
                    {record.attendance.late}
                </Tag>
            ),
            className: `${columnResponseText}`,
        },
    ];

    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className={`text-center ${collapsed ? '' : 'xl:w-[800px]'}`}>
                <Title>
                    Общая активность за {homeDate.format('YYYY-MM-DD')}
                </Title>
                <Table
                    dataSource={data?.data}
                    rowKey={(row) => row.id}
                    size="small"
                    columns={columns}
                    scroll={{ x: 'max-content', y: 300 }}
                    pagination={false}
                    onRow={(rec) => ({
                        onClick: () => {
                            if (!isPreviewOpened) {
                                navigate(`employees/${rec.id}`);
                            }
                        },
                        className: 'hover:cursor-pointer',
                    })}
                    className="mt-4 w-full sm:w-full md:w-auto lg:w-auto xl:w-auto"
                />
            </Card>
        );
    }
};

export { Line };
