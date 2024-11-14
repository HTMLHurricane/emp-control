import { useGetMonthDataQuery } from '@/entities/home/api';
import { useAppSelector } from '@/shared';
import { Chart } from './chart';
import { Card, Spin } from 'antd';

const Month = () => {
    const { homeMonthData } = useAppSelector();
    const { data, isLoading } = useGetMonthDataQuery({
        day: homeMonthData.format('YYYY-MM'),
    });

    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else if (!isLoading && data) {
        return (
            <Card className="flex flex-col w-[90%] text-center mt-5">
                <span className="text-[16px] text-[#645e5e] font-semibold whitespace-nowrap">
                    Средний % за месяц
                </span>
                <div className="mt-4 w-full">
                    <Chart datasets={data?.data} />
                </div>
            </Card>
        );
    }
};

export { Month };
