import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ClientType = ({ data }: { data: number[] }) => {
    const total = data[0] + data[1];

    const formattedData = [
        { name: 'Постоянные клиенты', value: data[0] },
        { name: 'Новые клиенты', value: data[1] },
    ];

    // Ассоциированные цвета для каждого сегмента
    const COLORS = ['#2E3A8C', '#32CD32']; // Синий для постоянных и оранжевый для новых клиентов

    const renderLabel = ({ name, value }: { name: string; value: number }) => {
        const percent = ((value / total) * 100).toFixed(0);
        return `${name} ${percent}%`;
    };

    return (
        <div style={{ width: '580px', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={renderLabel}
                    >
                        {formattedData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]} // Применение ассоциированных цветов
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
