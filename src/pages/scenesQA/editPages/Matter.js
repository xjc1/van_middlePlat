import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Form, Row, Select, Button } from 'antd';
import { TItem, TSelect } from '@/components/tis_ui';
import MatterBox from './MatterBox';
import { MATTER } from '@/services/api';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Code2Name } from '@/utils/DictTools';
import filesImg from './undraw_sync_files_xb3r.png';
import styles from '@/pages/scenesQA/editPages/editPages.less';

function getName({ title, name, subItemName, regions, isError }, dictNames) {
  if (isError) {
    return <span style={{ color: 'red' }}>{title}</span>;
  }
  return `${title}_${name}_${subItemName}_${dictNames.SH00XZQH[regions]}`;
}

function Matter({ focusNode, scenesId, dispatch }) {
  const [form] = Form.useForm();
  const { matter = [] } = focusNode;
  const [matterids, setMatterids] = useState({});
  const [selected, setSelected] = useState(_.map(matter, ({ tid }) => tid));
  const platMatter = _.reduce(
    matter,
    (result, { tid, material }) => {
      // eslint-disable-next-line no-param-reassign
      result[tid] = material;
      return result;
    },
    {},
  );

  useEffect(() => {
    Code2Name(
      MATTER.findMatterBySceneIdUsingGET(scenesId).then(content => ({ content })),
      ['SH00XZQH', 'regions'],
    ).then(data => {
      setMatterids(data);
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    focusNode.matter = _.map(selected, id => {
      const lastMatter = _.find(matter, { tid: id });
      return (
        lastMatter || {
          tid: id,
          material: [],
        }
      );
    });
    dispatch({
      type: 'scenesQA/touch',
    });
  }, [selected]);

  const { content = [], dictNames = { SH00XZQH: {} } } = matterids;

  // const { waitSelect, selectedMatters } = _.reduce(
  //   content,
  //   (result, item) => {
  //     if (_.includes(selected, item.id)) {
  //       result.selectedMatters.push(item);
  //     } else {
  //       result.waitSelect.push(item);
  //     }
  //     return result;
  //   },
  //   { waitSelect: [], selectedMatters: [] },
  // );

  // 处理选择了但是数据变更的情况
  const selectedMatters = selected.map(selectedId => {
    const selectedItem = _.find(content, { id: selectedId });
    if (selectedItem) {
      return selectedItem;
    }
    return { id: selectedId, title: selectedId, isError: true };
  });

  const nextContent = _.filter(content, ({ id }) => !_.includes(selected, id));

  return (
    <>
      <Form form={form}>
        <Row>
          <TItem
            col={20}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            label="事项"
            name="matterSelecter"
          >
            <TSelect mode="multiple" labelInValue optionFilterProp="label">
              {_.map(nextContent, ({ id, ...others }) => (
                <Select.Option key={id} value={id} label={getName(others, dictNames)}>
                  {getName(others, dictNames)}
                </Select.Option>
              ))}
            </TSelect>
          </TItem>

          <TItem
            col={4}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={nextContent.length === 0}
              size="normal"
              onClick={() => {
                const matterSelecters = form.getFieldValue('matterSelecter');
                form.setFieldsValue({ matterSelecter: [] });
                setSelected([...selected, ..._.map(matterSelecters, ({ value }) => value)]);
              }}
            />
          </TItem>
        </Row>
        <div style={{ padding: '0 50px', minHeight: 400 }}>
          {_.map(selectedMatters, ({ id, ...others }) => (
            <MatterBox
              getName={getName}
              dictNames={dictNames}
              materials={platMatter[id]}
              key={id}
              id={id}
              onChange={nextMaterials => {
                const matterPiece = _.find(matter, { tid: id });
                if (!matterPiece) return;
                matterPiece.material = _.map(nextMaterials, ({ id: nextId }) => ({ rid: nextId }));
                dispatch({
                  type: 'scenesQA/touch',
                });
              }}
              onCancel={rmId => {
                setSelected(_.filter(selected, sel => sel !== rmId));
                dispatch({
                  type: 'scenesQA/touch',
                });
              }}
              matter={others}
            />
          ))}
          {selectedMatters.length === 0 && (
            <div className={styles.flexCenter}>
              <div className={styles.centered}>
                <img src={filesImg} alt="matter" width={200} />
              </div>
            </div>
          )}
        </div>
      </Form>
    </>
  );
}

export default connect(({ scenesQA }) => ({
  focusNode: scenesQA.focusNode,
  scenesId: scenesQA.scenesId,
  tree: scenesQA.tree,
}))(Matter);
