import { useGetAllBranchesQuery } from "@/entities/branch/api";
import { FlexBox, useAppActions, useAppSelector } from "@/shared";
import { Button, Select, SelectProps } from "antd";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminEmployeePageHead = () => {
  const { isCreatingEmployee, isUpdatingEmployee } = useAppSelector();
  const { setIsCreatingEmployee, setAttendanceBranch } = useAppActions();
  const { data: branches, isSuccess: branchesSuccess } = useGetAllBranchesQuery(
    {}
  );
  const [branchOptions, setBranchOptions] = useState<SelectProps["options"]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (branchesSuccess) {
      setBranchOptions(
        branches?.data?.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }))
      );
    }
  }, [branchesSuccess]);

  const handleCreate = () => {
    setIsCreatingEmployee(true);
  };

  return (
    <FlexBox cls="justify-between">
      <h2>
        <FaArrowLeft
          size={15}
          className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
          onClick={() => navigate(-1)}
        />
        Сотрудники
      </h2>
      {!isCreatingEmployee && !isUpdatingEmployee && (
        <FlexBox>
          <Select
            options={branchOptions}
            placeholder="Выберите филиал"
            onSelect={(e) => setAttendanceBranch(e)}
            style={{ width: "100%" }}
            allowClear
            onClear={() => setAttendanceBranch()}
          />
          <Button icon={<FaPlus />} type="primary" onClick={handleCreate}>
            Добавить сотрудника
          </Button>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export { AdminEmployeePageHead };
