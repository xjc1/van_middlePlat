import React, { useState } from 'react';
import { connect } from 'dva';
import { BulkEdit, ArrayFormatTextArea, TButton } from '@/components/tis_ui';
import _ from 'lodash';
import { Popover, message } from 'antd';
import UserTag from './userTags';
import emptyFn from '@/utils/EmptyFn';
import { appUserType } from '@/utils/constantEnum';

const editType = {
  delete: '1',
  add: '0',
};

function Index(props) {
  const {
    dispatch,
    location: { query = {} },
  } = props;
  const { object = appUserType.self } = query;
  const [searchPopoverVisible, setSearchPopoverVisible] = useState(false);
  const [bulkMatterCodes, setBulkMatterCodes] = useState([]);
  const [userTagValue, setUserTagValue] = useState([]);
  const [list, setList] = useState([]);
  let createForm = null;
  const options = {
    list,
    pagination: {
      showSizeChanger: true,
      pageSizeOptions: [10, 100, 200],
    },
  };

  const reg_sfz = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证校验
  const reg_shtyxydm = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g; // 社会统一信用代码校验

  const tableOptions = {
    ...options,
    columns: [
      {
        title: `${appUserType.self === object ? '证件号码' : '统一社会信用代码'}`,
        dataIndex: 'uniqueCode',
      },
    ],
  };

  function handleSubmit(ids, handleClose, handleClear) {
    const val = createForm.current.getFieldsValue();
    const { operateType } = val;
    const req_body = {
      tagIds: userTagValue.map(({ value }) => value),
      uniqueCodes: ids,
    };
    if (operateType) {
      if (object === appUserType.self) {
        dispatch({
          type:
            editType.delete === operateType ? 'selfBulk/bathDeleteTags' : 'selfBulk/bathAddTags',
          body: req_body,
        });
      } else {
        dispatch({
          type:
            editType.delete === operateType
              ? 'selfBulk/bathDeleteLegalTags'
              : 'selfBulk/bathAddLegalTags',
          body: req_body,
        });
      }
    } else {
      message.warning('请选择一个操作类型');
    }
    handleClose();
    handleClear();
    setUserTagValue([]);
  }

  function check_unique(codesArray) {
    let flag = true;
    if (appUserType.self === object) {
      codesArray.forEach(id => {
        if (!reg_sfz.test(id)) {
          flag = false;
        }
      });
    } else if (appUserType.legalPerson === object) {
      codesArray.forEach(id => {
        if (!reg_shtyxydm.test(id)) {
          flag = false;
        }
      });
    }
    return flag;
  }

  function bulkQueryList(codesArray) {
    const flag = check_unique(codesArray); // 校验身份证或者统一信用代码
    setSearchPopoverVisible(false);
    setList(_.uniq(codesArray).map(id => ({ id, uniqueCode: id })));
    if (appUserType.self === object && !flag) {
      message.warning('存在不合法的证件号码');
    } else if (appUserType.legalPerson === object && !flag) {
      message.warning('存在不合法的统一社会信用代码');
    }
  }

  return (
    <BulkEdit
      title={appUserType.self === object ? '个人用户数据' : '法人用户数据'}
      onForm={form => {
        createForm = form;
      }}
      onSearch={emptyFn}
      showSearch={false}
      tableOptions={tableOptions}
      handleSubmit={handleSubmit}
      initialValues={{ operateType: editType.add }}
      leftExtra={
        <>
          <Popover
            visible={searchPopoverVisible}
            content={
              <ArrayFormatTextArea
                filter={[',', '，', '\\n', '\\s']}
                style={{ width: 500 }}
                value={bulkMatterCodes}
                onChange={val => setBulkMatterCodes(val)}
                onSubmit={bulkQueryList}
                placeholder={`请输入${
                  appUserType.self === object ? '证件号码' : '统一社会信用代码'
                },以换行或英文逗号分隔,并点击格式化按钮,例如:5f97c1ef67a79e221dc21219,5f8e4ddc2e0e4357fb2e4b1b`}
              />
            }
            trigger="click"
            onVisibleChange={visible => setSearchPopoverVisible(visible)}
          >
            <TButton.Button>
              {appUserType.self === object ? '输入证件号码' : '输入统一社会信用代码'}
            </TButton.Button>
          </Popover>
        </>
      }
    >
      <UserTag setUserTagValue={setUserTagValue} userTagValue={userTagValue} object={object} />
    </BulkEdit>
  );
}

export default connect(({ selfBulk }) => selfBulk)(Index);
