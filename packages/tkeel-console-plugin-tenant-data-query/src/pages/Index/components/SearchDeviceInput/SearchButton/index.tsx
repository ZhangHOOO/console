import { Button } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

export default function SearchButton() {
  return (
    <Button
      leftIcon={<MagnifierFilledIcon color="white" size={20} />}
      colorScheme="primary"
      position="absolute"
      right="0"
      top="0"
      height="100%"
      fontSize="14px"
      boxShadow="none"
    >
      搜索
    </Button>
  );
}