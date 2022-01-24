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
import ${upperFirstName}QueryBar from "./${upperFirstName}QueryBar";
import { TButton } from "@/components/tis_ui";
import ${upperFirstName}List from "./${upperFirstName}List";
import styles from './${name}.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';

@connect(({ ${name} }) => ${name})
class Index extends PureComponent {
  queryForm = null;

  render() {

    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.leftGrid}>
          ccddd
        </div>
        <div className={layoutSytles.rightGrid}>
        <${upperFirstName}QueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create size="small">创建</TButton.Create>
              <TButton.Delete confirmText="您确认要删除吗?" size="small">删除</TButton.Delete>
            </>
          }
          footer={
            <>
              <TButton.Commit
                size="small"
                confirmText="您确认要提交吗?"
                onClick={() => {
                  console.log(this.queryForm.getFieldsValue());
                }}>提交</TButton.Commit>
            </>
          }
        />

        <${upperFirstName}List className={styles.${name}List} />
        </div>
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
