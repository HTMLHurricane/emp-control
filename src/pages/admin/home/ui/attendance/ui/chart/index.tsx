import { FC, useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { IAttendance } from '@/entities/home/model';
import { IoIosGitBranch } from 'react-icons/io';

type Props = {
    data: IAttendance[] | undefined;
    selectedStatus: string;
};

const colors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    border: '1px solid #ccc',
                }}
            >
                <p>{`Дата: ${label}`}</p>
                {payload.map((entry: any, index: number) => (
                    <p
                        key={`tooltip-item-${index}`}
                        style={{ color: entry.color }}
                    >
                        {`${entry.name}: ${entry.value}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const AttendanceChart: FC<Props> = ({ data, selectedStatus }) => {
    const [chartData, setChartData] = useState<any>([]);
    const [visibleBranches, setVisibleBranches] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setVisibleBranches(data?.map((branch) => branch?.name));
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const newDatasets = data?.map((branch) => ({
                name: branch?.name,
                data: branch?.work_days?.map((day) => ({
                    work_day: day?.work_day,
                    value:
                        selectedStatus === 'total_workers'
                            ? day?.total_workers
                            : selectedStatus === 'late_workers'
                            ? day?.late_workers
                            : day?.workers_count,
                })),
            }));

            const formattedData = newDatasets[0]?.data?.map((_, i) => {
                const result: any = {
                    work_day: newDatasets[0]?.data[i]?.work_day,
                };
                newDatasets.forEach((dataset) => {
                    if (visibleBranches.includes(dataset.name)) {
                        result[dataset.name] = dataset?.data[i]?.value;
                    }
                });
                return result;
            });
            setChartData(formattedData);
        }
    }, [data, selectedStatus, visibleBranches]);

    const handleLegendClick = (branchName: string) => {
        setVisibleBranches((prev) =>
            prev.includes(branchName)
                ? prev.filter((name) => name !== branchName)
                : [...prev, branchName],
        );
    };

    const renderLegend = () => (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px',
            }}
        >
            {data?.map((branch, idx) => (
                <span
                    key={branch?.name}
                    onClick={() => handleLegendClick(branch?.name)}
                    style={{
                        cursor: 'pointer',
                        color: visibleBranches.includes(branch?.name)
                            ? colors[idx % colors.length]
                            : '#ccc',
                        marginRight: '15px',
                    }}
                >
                    <IoIosGitBranch className="text-[15px]" /> {branch?.name}
                </span>
            ))}
        </div>
    );

    return (
        <div>
            <ResponsiveContainer width="100%" height={350} className="my-5">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="work_day"
                        height={50}
                        angle={-35} // Угол поворота
                        dx={-20} // Смещение по горизонтали
                        dy={15} // Смещение по вертикали
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {data?.map((branch, idx) =>
                        visibleBranches.includes(branch?.name) ? (
                            <Line
                                key={branch?.name}
                                type="monotone"
                                dataKey={branch.name}
                                name={branch.name}
                                stroke={colors[idx % colors.length]}
                                activeDot={{ r: 8 }}
                            />
                        ) : null,
                    )}
                </LineChart>
            </ResponsiveContainer>
            {renderLegend()}
        </div>
    );
};
