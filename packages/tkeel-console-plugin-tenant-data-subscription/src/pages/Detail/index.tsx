import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BackButton, InfoCard, MoreAction } from '@tkeel/console-components';
import { MessageWarningTwoToneIcon } from '@tkeel/console-icons';

import useSubscribeInfoQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';
import Table from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/Table';
import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';

function Detail(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];
  const { data } = useSubscribeInfoQuery(ID);
  // console.log('data', data);

  return (
    <Flex>
      <Box width="360px" mr="20px">
        <Box
          height="150px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="0 10px"
            paddingTop="10px"
          >
            <BackButton
              onClick={() => {
                navigate('/');
              }}
            />
            <MoreAction
              buttons={[
                <ModifySubscriptionButton
                  key="modify"
                  onSuccess={() => {
                    // console.log('123');
                    // refetch();
                  }}
                />,
                <DeleteSubscriptionButton
                  key="delete"
                  id="123"
                  refetchData={() => {
                    // console.log('123');
                    // refetch();
                  }}
                />,
              ]}
            />
          </Flex>

          <Flex height="70px" align="center" padding="0 20px">
            <MessageWarningTwoToneIcon
              style={{ width: '24px', height: '22px' }}
            />
            <Box
              lineHeight="50px"
              ml="12px"
              color="gray.700"
              fontWeight="600"
              fontSize="14px"
            >
              {data?.title}
            </Box>
          </Flex>
          <Flex background="white" height="40px" alignItems="center">
            <Box fontSize="12px" color="grayAlternatives.300" padding="0 20px">
              订阅地址：
              <Text display="inline" color="gray.800">
                {data?.endpoint}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          mt="12px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
        >
          <InfoCard
            title="基本信息"
            data={[
              {
                label: '订阅ID',
                value: data?.id,
              },
              {
                label: '订阅数量',
                value: data?.count,
              },
              {
                label: '创建时间',
                value: data?.created_at,
              },
              {
                label: '描述',
                value: data?.description,
              },
            ]}
          />
        </Box>
      </Box>
      <Box
        flex="1"
        height="80vh"
        background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
        borderRadius="4px"
      >
        <Table id={ID} />
      </Box>
    </Flex>
  );
}

export default Detail;
