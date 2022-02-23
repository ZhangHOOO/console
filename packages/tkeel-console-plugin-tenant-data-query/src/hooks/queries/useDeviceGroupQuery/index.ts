import useQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/useQuery';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
      [propName: string]: any;
    };
    sysField: {
      [propName: string]: any;
    };
  };
  [propName: string]: any;
}

export interface TreeNodeType {
  [propName: string]: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}

type RequestParams = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: any[];
};

interface ApiData {
  '@type': string;
  GroupTree: TreeNodeType;
}

const defaultRequestParams = {
  page_num: 1,
  page_size: 1000,
  order_by: 'name',
  is_descending: false,
  query: '',
  condition: [
    {
      field: 'type',
      operator: '$eq',
      value: 'group',
    },
  ],
};

export default function useDeviceGroupQuery() {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: defaultRequestParams,
  });
  const deviceGroupTree = data?.GroupTree ?? {};
  return { deviceGroupTree, data, ...rest };
}