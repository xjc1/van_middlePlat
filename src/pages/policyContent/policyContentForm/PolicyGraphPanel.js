import React, { PureComponent } from 'react';
import { CATEGORIES } from '@/pages/policyGraph/consts';
import { GraphinCanvas } from '@/components/bussinessComponents';
import { getPolicyAtlasUsingGET, getPolicyNodeDetailUsingGET } from '@/pages/policyGraph/utils';
import { TabForm } from '@/components/tis_ui';
import Styles from './index.less';

class PolicyGraphPanel extends PureComponent {
  state = {
    policy: null,
  };

  constructor() {
    super();
    this.onNodeSelected = this.onNodeSelected.bind(this);
    this.onEdgeSelected = this.onEdgeSelected.bind(this);
  }

  componentDidMount() {
    const { item } = this.props;
    getPolicyAtlasUsingGET(item).then(nextItem => {
      this.setState({ policy: nextItem });
    });
  }

  onNodeSelected(nextNode) {
    const { onShow, detail } = this.props;
    if (detail && detail.name === nextNode.name) {
      onShow(null);
    } else {
      getPolicyNodeDetailUsingGET(Number(nextNode.id)).then(nextDetail => {
        onShow(nextDetail);
      });
    }
  }

  onEdgeSelected() {
    const { onShow } = this.props;
    onShow(null);
  }

  render() {
    const { item, ...others } = this.props;
    const { policy } = this.state;
    return (
      <TabForm.Tab {...others}>
        <div className={Styles.policyGraphPanel}>
          {policy && (
            <GraphinCanvas
              categories={CATEGORIES}
              nodes={policy.nodes}
              edges={policy.edges}
              onNodeSelected={this.onNodeSelected}
              onEdgeSelected={this.onEdgeSelected}
            />
          )}
        </div>
      </TabForm.Tab>
    );
  }
}

export default PolicyGraphPanel;
