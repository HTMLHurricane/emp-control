import {
    useDeleteBranchMutation,
    useGetAllBranchesQuery,
} from '@/entities/branch/api';
import { IBranch } from '@/entities/branch/model/types';
import {
    DeleteButton,
    EditButton,
    useAppActions,
    useAppSelector,
} from '@/shared';
import { columnResponseText } from '@/shared/const/css';
import { Table, TableProps, message } from 'antd';
import { useEffect, useState } from 'react';

const AdminBranchPageTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const {
        setBranchForm,
        setIsUpdatingBranch,
        setBranchComeModal,
        setBranchLateModal,
        setBranchNotComeModal,
        setSelectedBranchID,
    } = useAppActions();
    const { branchDate } = useAppSelector();
    const { data, isFetching } = useGetAllBranchesQuery({ day: branchDate });
    const [deleteBranch, { isSuccess: deleteSuccess, isError: deleteError }] =
        useDeleteBranchMutation();

    const handleEdit = (rec: IBranch) => {
        setBranchForm({
            name: rec.name,
            id: rec.id,
            location: rec.location,
        });
        setIsUpdatingBranch(true);
    };

    const columns: TableProps<IBranch>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'name',
            className: `${columnResponseText}`,
        },
        {
            title: 'Локация',
            dataIndex: 'location',
            className: `${columnResponseText}`,
        },
        {
            title: 'Количество рабочих',
            dataIndex: 'workers_count',
            className: `${columnResponseText}`,
        },
        {
            title: 'Количество пришедших',
            dataIndex: 'all_comers',
            render: (el, rec) => (
                <span
                    onClick={() => {
                        setBranchComeModal(true);
                        setSelectedBranchID(rec.id);
                    }}
                    className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer"
                >
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Количество опоздавших',
            dataIndex: 'late_comers',
            render: (el, rec) => (
                <span
                    onClick={() => {
                        setBranchLateModal(true);
                        setSelectedBranchID(rec.id);
                    }}
                    className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer"
                >
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['lg', 'xl'],
        },
        {
            title: 'Количество отсутствующих',
            dataIndex: 'not_comers',
            render: (el, rec) => (
                <span
                    onClick={() => {
                        setBranchNotComeModal(true);
                        setSelectedBranchID(rec.id);
                    }}
                    className="hover:bg-gray-300 p-3 rounded-md transition-all cursor-pointer"
                >
                    {el}
                </span>
            ),
            className: `${columnResponseText}`,
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, rec) => (
                <div className="flex flex-col md:flex-row gap-1 md:gap-2 lg:gap-4">
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

    useEffect(() => {
        if (deleteError) {
            message.error('Произошла ошибка во время удаления');
            console.log('error', deleteError);
        }
    }, [deleteError]);

    return (
        <Table
            loading={isFetching}
            scroll={{ x: true }}
            bordered
            columns={columns}
            rowKey={(el) => el.id}
            dataSource={data?.data}
            pagination={{
                showSizeChanger: false,
                current: page,
                pageSize: limit,
                total: data?.data?.length,
                onChange: (page, limit) => {
                    setPage(page);
                    setLimit(limit);
                },
            }}
        />
    );
};

export { AdminBranchPageTable };
