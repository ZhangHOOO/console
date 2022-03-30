import { Flex } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import {
  BasicInfo,
  // RawData as RawDataType,
  SysField,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import useDeviceDetailSocket from '@/tkeel-console-plugin-tenant-devices/hooks/websockets/useDeviceDetailSocket';

import DeviceDetailLeftPanel from './components/DeviceDetailLeftPanel';
import DeviceDetailRightPanel from './components/DeviceDetailRightPanel';

function DeviceDetail(): JSX.Element {
  const location = useLocation();
  const didUnmount = useRef(false);
  const { search } = location;
  const { id } = qs.parse(search, { ignoreQueryPrefix: true });

  const { deviceObject, refetch } = useDeviceDetailQuery({
    id: id as string,
  });
  const properties = deviceObject?.properties;
  const configs = deviceObject?.configs ?? {};
  const originConnectInfo = properties?.connectInfo;
  const { sysField, basicInfo } = properties ?? {};
  const { rawData, connectInfo, attributes, telemetry } = useDeviceDetailSocket(
    {
      id: id as string,
    }
  );
  const connectData = connectInfo || originConnectInfo;

  const deviceInfo = {
    id: id as string,
    configs,
    properties: {
      sysField: sysField as SysField,
      basicInfo: basicInfo as BasicInfo,
      rawData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      attributes: !isEmpty(attributes)
        ? attributes
        : properties?.attributes ?? {},
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      telemetry: !isEmpty(telemetry) ? telemetry : properties?.telemetry ?? {},
      connectInfo: connectData,
    },
  };
  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);
  return (
    <Flex h="100%">
      <DeviceDetailLeftPanel refetch={refetch} deviceObject={deviceInfo} />
      <DeviceDetailRightPanel deviceObject={deviceInfo} refetch={refetch} />
    </Flex>
  );
}

export default DeviceDetail;
