import { useGetLineDataQuery } from '@/entities/home/api';
import { Card, Spin, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '@/shared';
import { ILine } from '@/entities/home/model';
import { useNavigate } from 'react-router-dom';

const Line = () => {
    const { homeDate, branch } = useAppSelector();

    const [isPreviewOpened] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading } = useGetLineDataQuery({
        day: homeDate.format('YYYY-MM-DD'),
        branch: branch,
    });

    const columns: TableProps<ILine>['columns'] = [
        { title: 'ФИО', dataIndex: 'name', width: 150 },
        {
            title: 'Должность',
            dataIndex: 'position.name',
            render: (_, record) => <Tag>{record.position.name}</Tag>,
        },
        {
            title: 'Филиал',
            dataIndex: 'branch.name',
            render: (_, record) => <Tag>{record.branch.name}</Tag>,
        },
        {
            title: 'Пришел',
            dataIndex: 'attendance.come',
            render: (_, record) => (
                <Tag color={record.attendance.come === '0' ? 'red' : 'green'}>
                    {record.attendance.come}
                </Tag>
            ),
        },
        {
            title: 'Опоздал',
            dataIndex: 'attendance.late',
            render: (_, record) => (
                <Tag color={record.attendance.late ? 'red' : 'green'}>
                    {record.attendance.late}
                </Tag>
            ),
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
            <Card className="flex-col w-full max-w-[800px] min-h-[450px] text-center">
                <span className="text-[16px] text-[#645e5e] font-semibold whitespace-nowrap">
                    Общая активность за {homeDate.format('YYYY-MM-DD')}
                </span>
                <Table
                    dataSource={data?.data}
                    rowKey={(row) => row.id}
                    size="small"
                    columns={columns}
                    scroll={{ y: 300 }}
                    pagination={false}
                    onRow={(rec) => ({
                        onClick: () => {
                            if (!isPreviewOpened) {
                                navigate(`employees/${rec.id}`);
                            }
                        },
                        className: 'hover:cursor-pointer',
                    })}
                    className="mt-4"
                />
            </Card>
        );
    }
};

export { Line };
