import { Form, Card, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { confirmAble, FormBtnGp } from '@/components/tis_ui';
import { connect } from 'dva';
import BaseInfoModule from './baseInfoModule';
import PersonTag from './personTag';
import LegalPersonTag from './legalPersonTag';
import router from '@/utils/tRouter';
import { appUserType } from '@/utils/constantEnum';

function Index({ location, dispatch, focusItem }) {
  const [form] = Form.useForm();
  const [isCheck, setIsCheck] = useState(false);
  const [title, setTitle] = useState('新增输出模块');
  const [object, setObject] = useState(appUserType.selfAndLegalPerson);

  useEffect(() => {
    const { pathname = '', query } = location;
    const { id, object: obj } = query;
    setIsCheck(false);
    if (pathname.indexOf('edit') > -1) {
      setTitle('编辑输出模块');
      getDetail(id);
      setObject(obj);
    } else if (pathname.indexOf('view') > -1) {
      getDetail(id);
      setTitle('查看输出模块');
      setIsCheck(true);
      setObject(obj);
    } else {
      dispatch({ type: 'outputModule/selectedItem', item: {} });
      setTitle('新增输出模块');
    }
  }, []);

  function getDetail(id) {
    dispatch({ type: 'outputModule/detail', id });
  }

  function back2list() {
    if (isCheck) {
      router.replace('outputModule');
      return;
    }
    const warning = confirmAble({
      confirmText: '警告',
      confirmContent: '现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到输出模块列表吗?',
      onClick: () => {
        router.replace('outputModule');
      },
    });
    warning();
  }

  function onFinish() {
    form
      .validateFields()
      .then(vals => {
        dispatch({
          type: focusItem.id ? 'outputModule/editOutputModule' : 'outputModule/addOutputModule',
          body: { ...focusItem, ...vals },
        });
      })
      .catch(() => {
        message.info('请检查必填项是否全部填写完毕');
      });
  }

  return (
    <div>
      {focusItem ? (
        <Card title={title}>
          <Form form={form} onFinish={onFinish} initialValues={focusItem}>
            <BaseInfoModule disabled={isCheck} onChange={val => setObject(val)} />
            {object !== appUserType.legalPerson && <PersonTag disabled={isCheck} />}
            {object !== appUserType.self && <LegalPersonTag disabled={isCheck} />}
            <FormBtnGp onOk={onFinish} disabled={isCheck} onCancel={back2list} />
          </Form>
        </Card>
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </div>
  );
}
export default connect(({ outputModule }) => outputModule)(Index);
