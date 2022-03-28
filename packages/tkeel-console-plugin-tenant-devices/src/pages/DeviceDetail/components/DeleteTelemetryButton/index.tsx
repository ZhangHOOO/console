import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { useDeleteTelemetryMutation } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

interface Props {
  attributeInfo: {
    name: string;
    id: string;
  };
  id: string;
  refetch?: () => void;
}

function DeleteTelemetryButton({
  attributeInfo,
  refetch = () => {},
  id: deviceId,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, id } = attributeInfo;
  const toast = plugin.getPortalToast();

  const { mutate: deleteTemplateMutate, isLoading } =
    useDeleteTelemetryMutation({
      id: deviceId,
      onSuccess() {
        toast('删除成功', { status: 'success' });
        refetch();
        onClose();
      },
    });

  const handleConfirm = () => {
    deleteTemplateMutate({ data: { ids: [id] } });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除遥测"
        onClick={onOpen}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isOpen}
        description={`遥测ID: ${id}`}
        title={`确定要删除遥测「${name}」吗？`}
        onClose={onClose}
        isConfirmButtonLoading={isLoading}
        onConfirm={handleConfirm}
      />
    </>
  );
}
export default DeleteTelemetryButton;
