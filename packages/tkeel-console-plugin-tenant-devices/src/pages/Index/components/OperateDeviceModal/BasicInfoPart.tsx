import { Stack, Text } from '@chakra-ui/react';
import { map } from 'lodash';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormField,
  Select,
  TreeSelect,
} from '@tkeel/console-components';

import {
  ConnectInfoType,
  ConnectOption,
  DeviceFormFields,
  GroupOptions,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

const { TextField, TextareaField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceFormFields, object>;
  watchFields: DeviceFormFields;
  type: ModalType;
  mode: ModalMode;
  groupOptions: GroupOptions[];
  handleSelectTemplate?: (selected: boolean) => void;
  templateOptions: Array<{ label: string; id: string }>;
}
export default function BasicInfoPart({
  type,
  mode,
  formHandler,
  watchFields,
  groupOptions,
  // handleSelectTemplate,
  templateOptions,
}: Props) {
  const { register, formState, setValue, clearErrors } = formHandler;
  const { errors } = formState;
  // eslint-disable-next-line no-console
  console.log(watchFields);
  return (
    <>
      <TextField
        id="name"
        label={type === ModalType.DEVICE ? '设备名称' : '设备组名称'}
        registerReturn={register('name', {
          required: { value: true, message: '请填写设备名称' },
        })}
        error={errors.name}
      />
      <FormControl
        id="parentId"
        label={type === ModalType.DEVICE ? '设备分组' : '父设备组'}
      >
        <TreeSelect
          id="parentId"
          allowClear
          placeholder="请选择设备分组"
          extras={{ hideTreeIcon: true }}
          style={{ width: '100%' }}
          styles={{
            treeTitle: 'font-size:14px;height:32px;line-height:32px;',
          }}
          treeData={groupOptions}
          defaultValue={watchFields.parentId}
          notFoundContent="暂无选项"
          onChange={(value: string, label: ReactNode[]) => {
            if (value) {
              setValue('parentId', value);
              setValue('parentName', label[0] as string);
            }
          }}
        />
      </FormControl>

      {type === ModalType.DEVICE && (
        <>
          <FormControl id="connectOption" label="设备连接方式">
            <Select
              placeholder="请选择设备连接方式"
              id="directConnection"
              value={watchFields.connectType}
              style={{ width: '100%' }}
              {...register('connectType', {
                required: { value: true, message: '请选择设备连接方式' },
              })}
              disabled={mode === ModalMode.EDIT}
              onChange={(value: string) => {
                if (value) {
                  setValue('connectType', value);
                  clearErrors('connectType');
                  if (value === ConnectOption.INDIRECT) {
                    setValue('connectInfo', [ConnectInfoType.useTemplate]);
                  }
                }
              }}
            >
              {map(ConnectOption, (value) => {
                return { label: value, value };
              }).map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
            {errors.connectType && (
              <Text color="red.500" fontSize="sm" mt="8px">
                请选择连接方式
              </Text>
            )}
          </FormControl>
          {watchFields.connectType && (
            <FormControl id="connectInfo">
              <CheckboxGroup
                onChange={(value: ConnectInfoType[]) => {
                  // eslint-disable-next-line no-console
                  console.log(value);
                  setValue('connectInfo', value);
                  // if (handleSelectTemplate) {
                  //   handleSelectTemplate(
                  //     value.includes(ConnectInfoType.useTemplate)
                  //   );
                  // }
                }}
                value={watchFields.connectInfo}
              >
                <Stack spacing="16px" direction="column">
                  <Checkbox
                    colorScheme="primary"
                    id="useTemplate"
                    value={ConnectInfoType.useTemplate}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      使用设备模版
                    </Text>
                  </Checkbox>
                  {(watchFields.connectInfo || []).includes(
                    ConnectInfoType.useTemplate
                  ) && (
                    <>
                      <Select
                        placeholder="请选择设备模版"
                        id="templateId"
                        value={watchFields.templateId}
                        style={{ width: '100%' }}
                        allowClear
                        disabled={mode === ModalMode.EDIT}
                        {...register('templateId', {
                          required: (watchFields.connectInfo || []).includes(
                            ConnectInfoType.useTemplate
                          ),
                        })}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(value: string) => {
                          setValue('templateId', value);
                          setValue(
                            'templateName',
                            templateOptions.find((v) => v.id === value)
                              ?.label ?? ''
                          );
                          if (value) {
                            clearErrors('templateId');
                          }
                        }}
                      >
                        {templateOptions.map((val) => (
                          <Select.Option value={val.id} key={val.id}>
                            {val.label}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors.templateId && (
                        <Text color="red.500" fontSize="sm">
                          请选择设备模版
                        </Text>
                      )}
                    </>
                  )}

                  <Checkbox
                    colorScheme="primary"
                    id="selfLearn"
                    value={ConnectInfoType.selfLearn}
                    isDisabled={
                      watchFields.connectType !== ConnectOption.DIRECT
                    }
                  >
                    <Text color="gray.600" fontSize="14px">
                      自学习模式
                    </Text>
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          )}
        </>
      )}
      <TextareaField
        id="description"
        label="描述"
        placeholder="请输入"
        type="text"
        registerReturn={register('description')}
        error={errors.description}
      />
    </>
  );
}
