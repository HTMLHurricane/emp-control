import { useGetAttendanceDataQuery } from '@/entities/home/api';
import { FlexBox, useAppSelector } from '@/shared';
import { Card, Select, Spin } from 'antd';
import { useState } from 'react';
import { AttendanceChart } from './chart';

const statusesOptions = [
    // { label: 'Общее количество рабочих', value: 'total_workers' },
    { label: 'Количество присутствующих', value: 'workers_count' },
    { label: 'Количество опоздавших', value: 'late_workers' },
];

const Attendance = () => {
    const { homeMonthData } = useAppSelector();
    const [selectedStatus, setSelectedStatus] = useState('workers_count');
    const { data, isLoading } = useGetAttendanceDataQuery({
        day: homeMonthData.format('YYYY-MM'),
    });
    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className="flex-col flex-1 text-center w-[90%] mt-4">
                <FlexBox cls="w-full justify-between">
                    <span className="text-[16px] text-[#645e5e] font-semibold whitespace-nowrap">
                        Посещаемость за {homeMonthData.format('YYYY-MM')}
                    </span>
                    <FlexBox>
                        <Select
                            options={statusesOptions}
                            value={selectedStatus}
                            onSelect={(e) => setSelectedStatus(e)}
                            style={{ width: '100%' }}
                        />
                    </FlexBox>
                </FlexBox>
                <AttendanceChart
                    data={data?.data}
                    selectedStatus={selectedStatus}
                />
            </Card>
        );
    }
};

export { Attendance };
