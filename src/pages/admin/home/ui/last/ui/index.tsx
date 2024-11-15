import { useGetLastDataQuery } from '@/entities/home/api';
import { ILast } from '@/entities/home/model';
import { useAppSelector, Card, Title } from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { Image, Spin, Table, TableProps, Tag } from 'antd';
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
                <div className="flex items-center">
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
                        src={rec.user_image[0]}
                        className="hidden lg:block lg:w-[100px]"
                    />
                    <span className="px-0 lg:px-2">{name}</span>
                </div>
            ),
            className: `${columnResponseText}`,
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Филиал',
            dataIndex: 'branch',
            key: 'branch',
            className: `${columnResponseText}`,
        },
        {
            title: 'Статус',
            dataIndex: 'score',
            key: 'score',
            render: (score) => (
                <Tag color={score > 60 ? 'green' : 'red'}>{score}%</Tag>
            ),
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
            render: (time) => time.slice(0, 5),
            className: `${columnResponseText} w-[50px]`,
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
                    onClick={(e) => e.stopPropagation()}
                    src={rec.attendance_image[0]}
                    alt="photo"
                    className="w-[100px]"
                />
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
            <Card className="flex-col flex-1 min-h-[450px] text-center">
                <Title>
                    Последняя активность за {homeDate.format('YYYY-MM-DD')}
                </Title>
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
                    className="mt-4 w-full sm:w-full md:w-auto lg:w-auto xl:w-auto"
                    pagination={false}
                />
            </Card>
        );
    }
};

export { Last };
