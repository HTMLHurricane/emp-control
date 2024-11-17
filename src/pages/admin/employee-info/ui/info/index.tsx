import { Button, Descriptions, Image, Popconfirm, message } from 'antd';
import { IEmployeeInformationProps } from '../../model';
import { FC, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDeleteImageMutation } from '@/entities/employee-info/api';
import { FlexBox } from '@/shared';

const EmployeeInformation: FC<IEmployeeInformationProps> = ({ data }) => {
    const [deleteImage, { isSuccess, isError }] = useDeleteImageMutation();

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалено');
        }
        if (isError) {
            message.error('Произошла ошибка во время удаления');
        }
    }, [isSuccess, isError]);

    return (
        <Descriptions title={`Информация об ${data.user.name}`}>
            <Descriptions.Item label="ID">{data.user.id}</Descriptions.Item>
            <Descriptions.Item label="Имя">{data.user.name}</Descriptions.Item>
            <Descriptions.Item label="Телефон">
                {data.user.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Должность">
                {data.user.position.name === 'unknown'
                    ? 'Должность не указана'
                    : data.user.position.name}
            </Descriptions.Item>
            <Descriptions.Item label="Филиал">
                {data.user.branch.name}
            </Descriptions.Item>
            <Descriptions.Item label="Рабочие дни">
                <FlexBox cls="flex-col">
                    {data?.user?.schedule.name}
                    {/* <ul>
                        {data?.user?.schedule.days.map((day: IScheduleDay) => {
                            if (day.time_in && day.time_out) {
                                return (
                                    <li key={day.id}>
                                        {`${
                                            day.day === 'monday'
                                                ? 'Понедельник'
                                                : day.day === 'tuesday'
                                                ? 'Вторник'
                                                : day.day === 'wednesday'
                                                ? 'Среда'
                                                : day.day === 'thursday'
                                                ? 'Четверг'
                                                : day.day === 'friday'
                                                ? 'Пятница'
                                                : day.day === 'saturday'
                                                ? 'Суббота'
                                                : 'Воскресенье'
                                        } ${day.time_in.slice(0, 5)}
                    -${day.time_out.slice(0, 5)}`}
                                    </li>
                                );
                            }
                        })}
                    </ul> */}
                </FlexBox>
            </Descriptions.Item>
            <Descriptions.Item label="Изображения">
                <div className="flex flex-wrap gap-3">
                    {data?.user?.images.map((img) => (
                        <div className="flex flex-col">
                            <Image
                                className="!w-[50px] !h-[50px] md:!w-[100px] md:!h-[100px]"
                                src={img.url}
                                alt={img.url}
                            />
                            <Popconfirm
                                title="Вы действительно хотите удалить?"
                                onConfirm={() => deleteImage(img.id)}
                            >
                                <Button
                                    type="default"
                                    className="flex items-center justify-center"
                                >
                                    <BsTrash color="red" size="22" />
                                </Button>
                            </Popconfirm>
                        </div>
                    ))}
                </div>
            </Descriptions.Item>
        </Descriptions>
    );
};

export { EmployeeInformation };
