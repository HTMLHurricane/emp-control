import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions } from '@/shared';
import { DatePicker, DatePickerProps, Select, SelectProps } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export const Header = () => {
    const { setHomeDate, setBranch } = useAppActions();
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
        setHomeDate(dayjs(dateString as never));
    };
    const { data: branches, isSuccess: branchesSuccess } =
        useGetAllBranchesQuery({});
    const [branchOptions, setBranchOptions] = useState<SelectProps['options']>(
        [],
    );

    useEffect(() => {
        if (branchesSuccess) {
            setBranchOptions(
                branches?.data?.map((branch) => ({
                    label: branch.name,
                    value: branch.id,
                })),
            );
        }
    }, [branchesSuccess]);

    return (
        <div className="flex justify-between items-center md:px-4">
            <h2 className='header_title'>Главная</h2>
            <div>
                <DatePicker
                    allowClear={false}
                    onChange={onChange}
                    placeholder="месяц"
                    className="w-[100px] mr-2"
                />
                <Select
                    options={branchOptions}
                    placeholder="филиал"
                    onSelect={(e) => setBranch(e)}
                    allowClear
                    onClear={() => setBranch()}
                    className="w-[100px]"
                />
            </div>
        </div>
    );
};
