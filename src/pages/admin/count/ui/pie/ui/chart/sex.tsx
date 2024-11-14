import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const Sex = ({
    count,
    data,
}: {
    count: [number, number];
    data: [number, number];
}) => {
    const formattedData = [
        { name: 'Мужчины', value: count[0], precent: data[0] },
        { name: 'Женщины', value: count[1], precent: data[1] },
    ];

    // Новые ассоциированные цвета для каждого сегмента
    const COLORS = ['#1E90FF', '#FF5252 ']; // Темно-зеленый для мужчин и лаванда для женщин

    const renderLabel = ({
        name,
        precent,
    }: {
        name: string;
        value: number;
        precent: number;
    }) => {
        return `${name} ${precent.toFixed(2)}%`;
    };

    return (
        <div style={{ width: '450px', height: '280px' }}>
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
                                fill={COLORS[index % COLORS.length]} // Применение новых цветов
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
