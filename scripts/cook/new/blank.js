
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


function generateIndex(name, upperFirstName) {
  return `
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from "@/components/tis_ui";

class Index extends PureComponent {

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Index;

    `
};


module.exports = (dir, name) => {
  const upperFirstName = _.upperFirst(name);
  fs.writeFileSync(path.join(dir, 'index.js'), generateIndex(name, upperFirstName), { encoding: 'utf8' });
 };

