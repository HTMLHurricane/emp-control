import { FC, useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { IBarChartProps } from '../..';

interface ChartData {
    name: string;
    al_comers: number;
    not_comers: number;
    late_percentage: number;
}

const Chart: FC<IBarChartProps> = ({ datasets }) => {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (datasets) {
            const formattedData = datasets.branches.map((branch) => ({
                name: branch.branch_name,
                al_comers: branch.al_comers,
                not_comers: branch.not_comers,
                late_percentage: branch.late_percentage,
            }));
            setChartData(formattedData);
        }
    }, [datasets]);

    return (
        <ResponsiveContainer className="w-full" height={400}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap="20%"
            >
                <CartesianGrid strokeDasharray="4 4" stroke="#ddd" />
                <XAxis dataKey="name" tick={{ fill: '#333', fontSize: 14 }} />
                <YAxis tick={{ fill: '#333', fontSize: 14 }} />
                <Tooltip
                    formatter={(value: number) => `${value.toFixed(2)}%`}
                    labelStyle={{ fontWeight: 'bold', color: '#666' }}
                    contentStyle={{
                        backgroundColor: '#f7f7f7',
                        borderRadius: 5,
                    }}
                />
                <Legend
                    verticalAlign="top"
                    wrapperStyle={{ paddingBottom: 10 }}
                />
                <Bar
                    dataKey="al_comers"
                    fill="#4CAF50"
                    name="% Присутствовавших"
                />
                <Bar
                    dataKey="not_comers"
                    fill="#F44336"
                    name="% Отсутствовавших"
                />
                <Bar
                    dataKey="late_percentage"
                    fill="#FFC107"
                    name="% Опоздавших"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export { Chart };
