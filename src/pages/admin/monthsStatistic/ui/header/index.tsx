import { useAppActions } from '@/shared';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { setHomeMonthDate } = useAppActions();

    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeMonthDate(dayjs(dateString as never));
    };
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center">
            <h2 className="header_title">
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Месячная статистика
            </h2>
            <div>
                <div>
                    <DatePicker
                        allowClear={false}
                        onChange={onChange}
                        placeholder="Выберите месяц"
                        picker="month"
                        className="w-[170px] mr-2"
                    />
                </div>
            </div>
        </div>
    );
};
