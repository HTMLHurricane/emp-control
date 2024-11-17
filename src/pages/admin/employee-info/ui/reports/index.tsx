import { FC } from 'react';
import { IEmployeeInfoReportsProps } from '../../model';
import { Image, Table, TableProps } from 'antd';
import { IEmployeeInfo } from '@/entities/employee-info/model/types';
import { IdUrl } from '@/shared/types/Types';
import { columnResponseText } from '@/shared/const/css';

const EmployeeInfoReports: FC<IEmployeeInfoReportsProps> = ({
    data,
    loading,
}) => {
    const columns: TableProps<IEmployeeInfo['dates']>['columns'] = [
        {
            title: 'День',
            dataIndex: 'day',
            className: `${columnResponseText}`,
        },
        {
            title: 'Пришёл(а)',
            dataIndex: 'in',
            className: `${columnResponseText}`,
        },
        {
            title: 'Фото прихода',
            dataIndex: 'in_images',
            render: (el: IdUrl[]) => (
                <div className="flex flex-wrap gap-2">
                    {el?.map((img) => (
                        <Image
                            src={img.url}
                            className="!w-[50px] !h-[50px] md:!w-[150px] md:!h-[100px]"
                        />
                    ))}
                </div>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Опоздал(а)',
            dataIndex: 'late',
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Ранний уход',
            dataIndex: 'early',
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Ушёл(а)',
            dataIndex: 'out',
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Фото ухода',
            dataIndex: 'out_images',
            render: (el: IdUrl[]) => (
                <div className="flex flex-wrap gap-2">
                    {el?.map((img) => (
                        <Image
                            src={img.url}
                            className="!w-[50px] !h-[50px] md:!w-[150px] md:!h-[100px]"
                        />
                    ))}
                </div>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
    ];

    return (
        <Table
            loading={loading}
            scroll={{ x: true }}
            bordered
            columns={columns as never}
            dataSource={data.dates}
            rowKey={() => Math.random()}
            pagination={false}
        />
    );
};

export { EmployeeInfoReports };
