import { FlexBox, useAppActions, useAppSelector } from "@/shared";
import { Button, DatePicker, DatePickerProps } from "antd";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminBranchPageHead = () => {
  const { isCreatingBranch, isUpdatingBranch } = useAppSelector();
  const { setIsCreatingBranch, setBranchDate } = useAppActions();
  const navigate = useNavigate();
  const handleCreate = () => setIsCreatingBranch(true);

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setBranchDate(dateString as any);
  };

  return (
    <FlexBox cls="justify-between">
      <h2>
        <FaArrowLeft
          size={15}
          className="mr-4 cursor-pointer hover:text-blue-300 duration-150"
          onClick={() => navigate(-1)}
        />
        Филиалы
      </h2>
      <FlexBox>
        <DatePicker
          allowClear={false}
          onChange={onChange}
          style={{ width: "200px" }}
        />
        {!isCreatingBranch && !isUpdatingBranch && (
          <Button icon={<FaPlus />} type="primary" onClick={handleCreate}>
            Добавить филиал
          </Button>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export { AdminBranchPageHead };
