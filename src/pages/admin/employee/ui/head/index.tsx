import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions, useAppSelector } from '@/shared';
import { Button, Select, SelectProps } from 'antd';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const AdminEmployeePageHead = () => {
    const { isCreatingEmployee, isUpdatingEmployee } = useAppSelector();
    const { setIsCreatingEmployee, setAttendanceBranch } = useAppActions();
    const { data: branches, isSuccess: branchesSuccess } =
        useGetAllBranchesQuery({});
    const [branchOptions, setBranchOptions] = useState<SelectProps['options']>(
        [],
    );
    const navigate = useNavigate();

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

    const handleCreate = () => {
        setIsCreatingEmployee(true);
    };

    return (
        <div className="flex justify-between items-center">
            <h2 className='header_title'>
                <FaArrowLeft
                    size={15}
                    className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
                    onClick={() => navigate(-1)}
                />
                Сотрудники
            </h2>
            {!isCreatingEmployee && !isUpdatingEmployee && (
                <div className="flex">
                    <Select
                        options={branchOptions}
                        placeholder="Филиал"
                        onSelect={(e) => setAttendanceBranch(e)}
                        allowClear
                        onClear={() => setAttendanceBranch()}
                    />
                    <Button
                        icon={<FaUserPlus />}
                        type="primary"
                        onClick={handleCreate}
                        className="text-[14px] md:ml-4 ml-2"
                    >
                        <div className="hidden md:block">
                            Добавить сотрудника
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};

export { AdminEmployeePageHead };
