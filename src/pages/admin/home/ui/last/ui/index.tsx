import { useGetLastDataQuery } from '@/entities/home/api';
import { ILast } from '@/entities/home/model';
import { FlexBox, useAppSelector } from '@/shared';
import { Card, Image, Spin, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Last = () => {
    const { homeDate, branch } = useAppSelector();
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading } = useGetLastDataQuery({
        day: homeDate.format('YYYY-MM-DD'),
        branch: branch,
    });

    const columns: TableProps<ILast>['columns'] = [
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            render: (name, rec) => (
                <FlexBox>
                    <Image
                        preview={{
                            onVisibleChange(value) {
                                if (value) {
                                    setIsPreviewOpened(true);
                                } else {
                                    setIsPreviewOpened(false);
                                }
                            },
                        }}
                        onClick={(e) => e.stopPropagation()}
                        width={50}
                        src={rec.user_image[0]}
                    />
                    {name}
                </FlexBox>
            ),
        },
        { title: 'Должность', dataIndex: 'position', key: 'position' },
        { title: 'Филиал', dataIndex: 'branch', key: 'branch' },
        {
            title: 'Статус',
            dataIndex: 'score',
            key: 'score',
            render: (score) => (
                <Tag color={score > 60 ? 'green' : 'red'}>{score}%</Tag>
            ),
        },
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
            render: (time) => time.slice(0, 5),
        },
        {
            title: 'Изображение',
            dataIndex: 'attendance_image',
            key: 'attendance_image',
            render: (_, rec) => (
                <Image
                    preview={{
                        onVisibleChange(value) {
                            if (value) {
                                setIsPreviewOpened(true);
                            } else {
                                setIsPreviewOpened(false);
                            }
                        },
                    }}
                    width={100}
                    onClick={(e) => e.stopPropagation()}
                    src={rec.attendance_image[0]}
                    alt="photo"
                />
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
            <Card className="flex-col flex-1 min-h-[450px] text-center">
                <span className="text-[16px] text-[#645e5e] font-semibold whitespace-nowrap">
                    Последняя активность за {homeDate.format('YYYY-MM-DD')}
                </span>
                <Table
                    scroll={{ y: 450 }}
                    dataSource={data?.data}
                    columns={columns}
                    size="small"
                    onRow={(rec) => ({
                        onClick: () => {
                            if (!isPreviewOpened) {
                                navigate(`employees/${rec.id}`);
                            }
                        },
                        className: 'hover:cursor-pointer',
                    })}
                    className="mt-4"
                    pagination={false}
                />
            </Card>
        );
    }
};

export { Last };
