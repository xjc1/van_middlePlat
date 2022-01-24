import React, { useEffect, useState } from 'react';
import { Table, Image, Space, Button } from 'antd';
import { EmptyFn, hooks } from '@/components/tis_ui';
import { FileUpload } from '@/components/bussinessComponents';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';
import { useUpdateEffect } from 'ahooks';
import Styles from './index.less';

const { useUnmount } = hooks;

function Index({ valibleItems, disabled = false, onChange = EmptyFn, value = [] }) {
  const [safeExecute] = useUnmount();
  const [items, setItems] = useState([]);

  useEffect(() => {
    DictAssistant.fetchChildrenDictWithMemo('ZDLX').then(data => {
      safeExecute(setItems)(
        _.map(data, item => {
          const oldValue = _.find(value, { clientType: Number(item.code) });
          return {
            ...item,
            imgUrl: oldValue && oldValue.url,
            imgName: oldValue && oldValue.name,
            valid: _.includes(valibleItems, item.code),
          };
        }),
      );
    });
  }, []);

  useUpdateEffect(() => {
    onChange(
      items
        .filter(({ imgUrl }) => imgUrl)
        .map(({ imgUrl, imgName, code }) => {
          return {
            clientType: code,
            url: imgUrl,
            name: imgName,
          };
        }),
    );
  }, [items]);

  useUpdateEffect(() => {
    setItems(
      _.map(items, item => {
        return {
          ...item,
          valid: _.includes(valibleItems, item.code),
        };
      }),
    );
  }, [valibleItems]);

  return (
    <div className={Styles.terminalCoverConfig}>
      <Table
        showHeader={false}
        style={{ margin: '10px 0' }}
        rowClassName={({ valid = false }) => {
          return !valid && Styles.terminalCoverConfigRowInValid;
        }}
        columns={[
          {
            title: '终端类型',
            dataIndex: 'name',
            width: '20%',
          },
          {
            title: '封面图片',
            dataIndex: 'imgUrl',
            render(text) {
              return text && <Image height={50} width={50} src={text} />;
            },
          },
          {
            title: '操作',
            align: 'center',
            width: '40%',
            render: (text, record) => (
              <span>
                {!disabled && (
                  <Space>
                    <FileUpload
                      buttonName="封面上传"
                      fileTypeList={['jpg', 'png', 'jpeg']}
                      download={false}
                      showAddress={false}
                      allowClear={false}
                      onChange={val => {
                        const { _id: nextId } = record;
                        const [url, name] = val;
                        setItems(
                          _.map(items, row => {
                            const { _id } = row;
                            if (_id === nextId) {
                              return {
                                ...row,
                                imgUrl: url,
                                imgName: name,
                              };
                            }
                            return row;
                          }),
                        );
                      }}
                      tip={false}
                    />

                    <Button
                      type="text"
                      danger
                      onClick={() => {
                        FileUpload.doFileDelete(record.imgUrl.split('fileId=')[1]).then(() => {
                          const { _id: nextId } = record;
                          setItems(
                            _.map(items, row => {
                              const { _id } = row;
                              if (_id === nextId) {
                                const { imgUrl, imgName, ...others } = row;
                                return {
                                  ...others,
                                };
                              }
                              return row;
                            }),
                          );
                        });
                      }}
                      disabled={_.isEmpty(record.imgUrl)}
                    >
                      删除文件
                    </Button>
                  </Space>
                )}
              </span>
            ),
          },
        ]}
        rowKey="_id"
        dataSource={items}
        size="small"
      />
    </div>
  );
}

Index.defaultProps = {
  valibleItems: [],
};

export default Index;
