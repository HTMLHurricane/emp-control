import { FlexBox } from '@/shared';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;
type Props = {
    setDay: React.Dispatch<React.SetStateAction<string>>;
    setIsOneDay: React.Dispatch<React.SetStateAction<boolean>>;
    setDayFromTo: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Filter = ({ setDay, setIsOneDay, setDayFromTo }: Props) => {
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setIsOneDay(true);
        setDay(dateString as string);
    };
    const onOk = () => {
        setIsOneDay(false);
    };
    const navigate = useNavigate();
    return (
        <FlexBox cls="justify-between pb-5">
            <h2 className='header_title'>
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Статистика
            </h2>
            <div className="flex flex-col lg:flex-row gap-1">
                <DatePicker
                    allowClear={false}
                    placeholder="Выберите день"
                    onChange={onChange}
                    className="w-[220px]"
                />
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    className="lg:ml-3"
                    onChange={(_, dateString) => {
                        if (!dateString[0]) {
                            setIsOneDay(true);
                        }
                        setDayFromTo(dateString);
                        console.log(dateString);
                    }}
                    onOk={onOk}
                />
            </div>
        </FlexBox>
    );
};
