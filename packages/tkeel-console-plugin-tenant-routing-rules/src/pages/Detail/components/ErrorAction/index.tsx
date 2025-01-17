import { Flex, StyleProps, Text, useDisclosure } from '@chakra-ui/react';

import { AutoFilledIcon, MessageWarningFilledIcon } from '@tkeel/console-icons';

import ProductTab from '../ProductTab';
import TitleWrapper from '../TitleWrapper';
import ErrorActionModal from './ErrorActionModal';

type Props = {
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function ErrorAction({ styles }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconColor = 'grayAlternatives.300';

  return (
    <Flex flexDirection="column" {...styles?.wrapper}>
      <TitleWrapper
        icon={<AutoFilledIcon color={iconColor} size="20px" />}
        title="错误操作（可选）"
        description="当转发失败之后，对于数据的存储以及操作"
      />
      <Flex
        marginTop="20px"
        flexDirection="column"
        padding="20px"
        borderRadius="4px"
        backgroundColor="gray.100"
      >
        <Text color="grayAlternatives.500" fontSize="14px" lineHeight="24px">
          请添加相关产品转发数据
        </Text>
        <ProductTab
          name="发送至订阅"
          icon={<MessageWarningFilledIcon size={24} color={iconColor} />}
          onClick={onOpen}
          styles={{
            wrapper: {
              marginTop: '8px',
              paddingLeft: '20px',
              justifyContent: 'flex-start',
            },
          }}
        />
      </Flex>
      <ErrorActionModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
