import React from 'react';
import _ from 'lodash';
import { Row, Form } from 'antd';
import FrWrapper from './FR/FrWrapper';
import PageWrapper from './PageWrapper';
import EmptyPage from './EmptyPage';

function Index({ formData }) {
  return formData ? (
    <Form>
      <PageWrapper>
        <Row>
          {_.map(formData.content, ({ id, ...others }) => (
            <FrWrapper key={id} id={id} {...others} />
          ))}
        </Row>
      </PageWrapper>
    </Form>
  ) : (
    <EmptyPage />
  );
}

export default Index;
