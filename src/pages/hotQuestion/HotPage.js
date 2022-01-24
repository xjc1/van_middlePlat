import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Radio } from 'antd';
import router from '@/utils/tRouter';

@connect(({ hotQuestion }) => hotQuestion)
class HotPage extends PureComponent {
  createForm = React.createRef();

  state = {
    formHide: false,
  };

  onChange = e => {
    const type = e.target.value;
    switch (type) {
      case 'question':
        router.push({
          name: 'hotQuestion',
        });
        break;
      case 'matter':
        router.push({
          name: 'hotMatter',
        });
        break;
      case 'scene':
        router.push({
          name: 'hotScene',
        });
        break;
      case 'policy':
        router.push({
          name: 'hotPolicy',
        });
        break;
      case 'service':
        router.push({
          name: 'hotService',
        });
        break;
      case 'project':
        router.push({
          name: 'hotProject',
        });
        break;
      default:
        router.push({
          name: `hotQuestion`,
        });
        break;
    }
  };

  render() {
    const { children, editForm, value, addText = '展开', queryItem = <></> } = this.props;
    const { formHide } = this.state;
    return (
      <div>
        <Card bordered={false}>
          <Radio.Group
            value={value}
            defaultValue="question"
            buttonStyle="solid"
            size="normal"
            onChange={this.onChange}
          >
            <Radio.Button value="question">热门问题</Radio.Button>
            <Radio.Button value="matter">热门事项</Radio.Button>
            <Radio.Button value="scene">热门主题</Radio.Button>
            <Radio.Button value="policy">热门政策</Radio.Button>
            <Radio.Button value="service">热门服务</Radio.Button>
            <Radio.Button value="project">热门项目</Radio.Button>
          </Radio.Group>
          <div
            style={{
              float: 'right',
            }}
          >
            {formHide ? (
              <a
                type="primary"
                onClick={() => {
                  this.setState({ formHide: false });
                }}
              >
                {addText}
              </a>
            ) : (
              <a
                type="default"
                onClick={() => {
                  this.setState({ formHide: true });
                }}
              >
                隐藏
              </a>
            )}
          </div>
        </Card>
        {queryItem}
        <div
          key={value}
          style={{
            display: formHide ? 'none' : 'block',
          }}
        >
          {editForm}
        </div>
        {children}
      </div>
    );
  }
}

export default HotPage;
