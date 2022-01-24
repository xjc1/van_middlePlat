const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const generateModel = require('./generateListModel');
const generateList = require('./generateList');
const generateQueryBar = require('./generateQueryBar');

function generateIndex(name, upperFirstName) {
  return `
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from "@/components/tis_ui";
import ${upperFirstName}QueryBar from "./${upperFirstName}QueryBar";
import ${upperFirstName}List from "./${upperFirstName}List";
import styles from './${name}.less';


@connect(({ ${name} }) => ${name})
class Index extends PureComponent {
  queryForm = null;

  state = {
     query: {}
  };

  componentDidMount() {
    this.fetch${upperFirstName}({});
  }

  fetch${upperFirstName}WithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: '${name}/fetchList',
      payload: {
        page, size, query
      }
    });
    this.setState({ query })
  }

  fetch${upperFirstName} = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: '${name}/fetchList',
      payload: {
        page, size, query
      }
    });
  }


  render() {
    return (
      <div>
        <${upperFirstName}QueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create>新增政策</TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then((query) => {
                    console.info(query)
                    this.fetch${upperFirstName}WithQuery({ query });
                  });
                }}
              >查询</TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetch${upperFirstName}WithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <${upperFirstName}List
            className={styles.${name}List}
            onPageSizeChange={this.fetch${upperFirstName}}
             />
      </div>
    );
  }
}

export default Index;

    `;
}

function generateCss(name, upperFirstName) {
  return `
.${name}List {
  margin-top: 10px;
  border: 1px solid #e8e8e8;
  background-color: white;
}
  `;
}

module.exports = (dir, name) => {
  const upperFirstName = _.upperFirst(name);
  fs.writeFileSync(path.join(dir, 'index.js'), generateIndex(name, upperFirstName), {
    encoding: 'utf8',
  });
  fs.writeFileSync(path.join(dir, 'models', `${name}.js`), generateModel(name, upperFirstName), {
    encoding: 'utf8',
  });
  fs.writeFileSync(path.join(dir, `${upperFirstName}List.js`), generateList(name, upperFirstName), {
    encoding: 'utf8',
  });
  fs.writeFileSync(path.join(dir, `${name}.less`), generateCss(name, upperFirstName), {
    encoding: 'utf8',
  });
  fs.writeFileSync(
    path.join(dir, `${upperFirstName}QueryBar.js`),
    generateQueryBar(name, upperFirstName),
    { encoding: 'utf8' },
  );
};
