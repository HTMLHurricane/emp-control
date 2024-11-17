import { useGetMonthDataQuery } from '@/entities/home/api';
import { useAppSelector, Card, Title } from '@/shared';
import { Chart } from './chart';
import { Spin } from 'antd';

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
            <Card className="flex flex-col w-full text-center mt-5">
                <Title>Средний % за месяц</Title>
                <div className="md:mt-4 w-full">
                    <Chart datasets={data?.data} />
                </div>
            </Card>
        );
    }
};

export { Month };
