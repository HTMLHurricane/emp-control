import { FlexBox, TOKEN } from '@/shared';
import dayjs from 'dayjs';
import { Button, DatePicker, DatePickerProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
import { IEmployeeInformationHeadProps } from '../../model';
import { useGetEmployeeInfoQuery } from '@/entities/employee-info/api';

const EmployeeInfoHead: FC<IEmployeeInformationHeadProps> = ({
    setDate,
    date,
}) => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_APP_API_URL;
    const { id } = useParams();
    const { refetch } = useGetEmployeeInfoQuery({
        id: id!,
        month: date.format('YYYY-MM'),
    });

    const handleUpload = async (e: any) => {
        const formData = new FormData();
        for (const image of e.target.files) {
            formData.append('images[]', image);
        }
        console.log(Object.entries(formData));

        const token = TOKEN.get();
        try {
            const response = await fetch(
                `${BASE_URL}/user/update/${id}?_method=put`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                },
            );
            const result = await response.text();
            console.log(result);
            return refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setDate(dayjs(dateString as never));
    };

    return (
        <FlexBox cls="justify-between">
            <Button onClick={() => navigate(-1)} type="primary">
                Назад
            </Button>
            <div className="flex flex-col md:flex-row items-center md:gap-2 lg:gap-4">
                <DatePicker
                    allowClear={false}
                    picker="month"
                    onChange={onChange}
                    placeholder="Месяц"
                    style={{ width: 100 }}
                />
                {/* <Button icon={<FaPlus />} type="primary">
          Добавить изображение
        </Button> */}

                <input
                    type="file"
                    multiple
                    // id="file"
                    // className="opacity-0"
                    onChange={(e) => handleUpload(e)}
                    accept=".png, .jpg, .jpeg"
                    className="mt-2 md:mt-0 hidden md:block"
                />
            </div>
        </FlexBox>
    );
};

export { EmployeeInfoHead };
