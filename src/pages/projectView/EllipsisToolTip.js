import React from 'react';
import { Tooltip } from 'antd';

class EllipsisTooltip extends React.Component {
  state = {
    visible: false,
  };

  handleVisibleChange = visible => {
    if (this.container.clientWidth < this.container.scrollWidth) {
      this.setState({
        visible,
      });
    }
  };

  render() {
    const { visible } = this.state;
    const { title, children, style, ...others } = this.props;
    const divStyle = {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      ...style,
    };
    return (
      <Tooltip visible={visible} onVisibleChange={this.handleVisibleChange} title={title}>
        <div
          ref={node => {
            this.container = node;
          }}
          style={divStyle}
          {...others}
        >
          {children}
        </div>
      </Tooltip>
    );
  }
}

export default EllipsisTooltip;
