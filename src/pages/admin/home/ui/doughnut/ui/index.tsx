import { Spin } from 'antd';
import { DoughnutChart } from './chart';
import { useGetDoughnutDataQuery } from '@/entities/home/api';
import { useAppSelector, Card } from '@/shared';

const Doughnut = () => {
    const { homeDate, branch } = useAppSelector();
    const { data, isLoading } = useGetDoughnutDataQuery({
        day: homeDate.format('YYYY-MM-DD'),
        branch: branch,
    });

    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className="xl:max-w-[400px]">
                <DoughnutChart
                    datasets={[
                        data?.notComers ?? 0,
                        data?.lateComers ?? 0,
                        data?.allComers ?? 0,
                    ]}
                    date={homeDate}
                    total={data?.allUsers ?? 0}
                />
            </Card>
        );
    }
};

export { Doughnut };
