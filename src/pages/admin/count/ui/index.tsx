import { useGetCountStatisticsQuery } from '@/entities/count/api';
import { Filter } from './filter/ui';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { SexChart } from './pie/ui';
import { ClientTypeChart } from './ClientTypeChart';
import { FlexBox } from '@/shared';
import { PeakHours } from './PeakHoursChart/ui/PeakHours';
import { AgeChartExample } from './AgeChart/ui/AgeChart';

const AdminCount = () => {
    const [isOneDay, setIsOneDay] = useState<boolean>(true);
    const [day, setDay] = useState<string>(
        new Date().toISOString().slice(0, 10),
    );
    const [dayFromTo, setDayFromTo] = useState<string[]>([]);
    const { data } = useGetCountStatisticsQuery(
        isOneDay
            ? { day }
            : { start_date: dayFromTo[0], end_date: dayFromTo[1] },
    );

    useEffect(() => {
        if (dayFromTo.length < 1) {
            setDay(new Date().toISOString().slice(0, 10));
            setIsOneDay(true);
        }
    }, [dayFromTo]);

    if (!data) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin spinning />
            </div>
        );
    }
    return (
        <div className="w-full">
            <Filter
                setDay={setDay}
                setIsOneDay={setIsOneDay}
                setDayFromTo={setDayFromTo}
            />
            <FlexBox cls="flex">
                <SexChart
                    count={[data.male_count, data.female_count]}
                    data={[data?.male_percentage, data?.female_percentage]}
                />
                <ClientTypeChart
                    data={[data.regular_clients, data.new_clients]}
                />
            </FlexBox>
            <div className="flex justify-between">
                <div className="flex-col w-full">
                    <PeakHours day={day} data={data?.peak_attendance} />
                    <AgeChartExample day={day} data={data?.age_statistics} />
                </div>
            </div>
        </div>
    );
};

export { AdminCount };
