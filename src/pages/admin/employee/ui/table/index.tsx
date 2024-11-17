import {
    useDeleteEmployeeMutation,
    useGetAllEmployeesQuery,
} from '@/entities/employee/api';
import { IEmployee } from '@/entities/employee/model/types';
import {
    DeleteButton,
    EditButton,
    FlexBox,
    useAppActions,
    useAppSelector,
} from '@/shared';
import { Button, Table, TableProps, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';
import { columnResponseText } from '@/shared/const/css';

const AdminEmployeePageTable = () => {
    const { attendanceBranch, employeeTablePage, employeeTableLimit } =
        useAppSelector();
    const {
        setEmployeeForm,
        setIsUpdatingEmployee,
        setEmployeeTableLimit,
        setEmployeeTablePage,
    } = useAppActions();
    const navigate = useNavigate();
    const { data, isFetching } = useGetAllEmployeesQuery({
        page: employeeTablePage,
        per_page: employeeTableLimit,
        id: attendanceBranch,
    });
    const [deleteBranch, { isSuccess: deleteSuccess }] =
        useDeleteEmployeeMutation();

    const handleEdit = (rec: IEmployee) => {
        setEmployeeForm({
            branch_id: rec.branch.id,
            name: rec.name,
            phone: rec?.phone,
            position_id: rec.position.id,
            id: rec.id,
            schedule: rec.schedule,
        });
        setIsUpdatingEmployee(true);
    };

    const columns: TableProps<IEmployee>['columns'] = [
        {
            title: 'Имя',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            render: (e) =>
                e.name === 'unknown' ? 'Должность не указана' : e.name,
            className: `${columnResponseText}`,
        },
        {
            title: 'Подразделение',
            dataIndex: 'branch',
            render: (e) => e.name,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Рабочий график',
            dataIndex: 'schedule',
            render: (el) => (
                <FlexBox cls="flex-col w-[200px]">{el.name}</FlexBox>
            ),
            className: `${columnResponseText}`,
            responsive: ['lg', 'xl'],
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            render: (item) => <div className="w-[150px]">{item}</div>,
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex flex-col gap-1 lg:gap-2 xl:gap-5">
                    <Button
                        type="primary"
                        onClick={() => navigate(`/employees/${rec.id}`)}
                        icon={<FaEye />}
                        className="text-[12px] md:text-[14px]"
                    >
                        <div className="hidden xl:block">Смотреть</div>
                    </Button>
                    <DeleteButton onConfirm={() => deleteBranch(rec.id)} />
                    <EditButton onClick={() => handleEdit(rec)} />
                </div>
            ),
            className: `${columnResponseText}`,
        },
    ];

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Успешно удалено');
        }
    }, [deleteSuccess]);

    return (
        <Table
            loading={isFetching}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data?.data}
            pagination={{
                showSizeChanger: true,
                current: employeeTablePage,
                pageSize: employeeTableLimit,
                total: data?.total,
                onChange: (page, limit) => {
                    setEmployeeTablePage(page);
                    setEmployeeTableLimit(limit);
                },
            }}
            className="mt-2"
        />
    );
};

export { AdminEmployeePageTable };
