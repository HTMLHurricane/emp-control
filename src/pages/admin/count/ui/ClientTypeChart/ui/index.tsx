import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ClientType = ({ data }: { data: number[] }) => {
    const total = data[0] + data[1];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            const isMobile = window.innerWidth < 768;
            setIsMobile(isMobile ? true : false); // Изменяем радиус
        };
        updateLayout(); // Установить начальное состояние
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

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
        <div className="w-[350px] h-[280px] md:w-[580px]">
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
                        label={isMobile ? undefined : renderLabel}
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
