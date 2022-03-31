import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { Fragment } from 'react';

import { CheckFilledIcon } from '@tkeel/console-icons';

import { ModalMode } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

export interface Props {
  infos?: string[];
  currentStep?: number;
  mode?: ModalMode;
  handleClick: (index: number) => void;
}
const STATUS = {
  DEFAULT: 0,
  PENDING: 1,
  COMPLETED: 2,
};
const FontColor = ['grayAlternatives.300', 'gray.700', 'primary'];
const BorderColor = ['gray.200', 'primary', 'primary'];
const DotFontColor = ['gray.400', 'white', 'white'];
const DotBgColor = ['gray.50', 'primary', 'primary'];

function renderProgressLine({ status }: { status: number }) {
  return (
    <Box
      flex="1"
      w="4px"
      h="auto"
      ml="10px"
      borderRadius="2px"
      bg={status !== STATUS.COMPLETED ? 'gray.100' : 'primary'}
    />
  );
}

function renderProgressDot({
  status,
  index,
  label,
  mode,
  handleClick,
}: {
  status: number;
  index: number;
  label: string;
  mode: ModalMode;
  handleClick: (index: number) => void;
}) {
  return (
    <Flex
      h="48px"
      w="100%"
      align="center"
      cursor={mode === ModalMode.EDIT ? 'pointer' : 'default'}
      onClick={() => {
        handleClick(index);
      }}
    >
      <Center
        w="24px"
        h="24px"
        mr="8px"
        borderRadius="50%"
        color={DotFontColor[status]}
        bg={DotBgColor[status]}
        border="1px"
        borderColor={BorderColor[status]}
        fontSize="14px"
        lineHeight="24px"
        fontWeight="600"
      >
        {status === STATUS.COMPLETED ? (
          <CheckFilledIcon color="white" />
        ) : (
          `0${index}`
        )}
      </Center>
      <Box fontSize="12px" color={FontColor[status]} pos="relative">
        {label}
        {STATUS.COMPLETED === status && mode !== ModalMode.EDIT && (
          <Text
            color="grayAlternatives.300"
            fontSize="12px"
            pos="absolute"
            top="20px"
          >
            已完成
          </Text>
        )}
      </Box>
    </Flex>
  );
}

function getStatus({ idx, current }: { idx: number; current: number }) {
  let status = STATUS.DEFAULT;
  if (idx < current) {
    status = STATUS.COMPLETED;
  }

  if (idx === current) {
    status = STATUS.PENDING;
  }
  return status;
}

export default function ProgressSchedule({
  infos = [],
  currentStep = 0,
  mode = ModalMode.CREATE,
  handleClick,
}: Props) {
  return (
    <Flex h="100%" flexDirection="column">
      {infos.map((item, idx) => {
        return (
          <Fragment key={item}>
            {renderProgressDot({
              status: getStatus({ idx, current: currentStep }),
              index: idx + 1,
              label: item,
              mode,
              handleClick: () => {
                if (mode === ModalMode.EDIT) {
                  handleClick(idx);
                }
              },
            })}
            {idx !== infos.length - 1 &&
              mode !== ModalMode.EDIT &&
              renderProgressLine({
                status: getStatus({ idx, current: currentStep }),
              })}
          </Fragment>
        );
      })}
    </Flex>
  );
}
