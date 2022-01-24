import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Radio } from 'antd';
import router from '@/utils/tRouter';
import _ from 'lodash';
import EffectiveSplit from './effectiveSplit';
import IneffectivenessMaterial from './ineffectivenessMaterial';
import ApprovalResults from './approvalResults';
import Styles from './index.less';
import ModalType from './ModalType';
import OriginalMaterialAdd from './OriginalMaterialAdd';
import SplitMaterialAdd from './SplitMaterialAdd';
import { adaptText } from '@/utils/AdaptiveHelper';
import { materialStatus } from '@/utils/constantEnum';
import authEnum, { authCheck } from '@/utils/auth';
import { EventCenter } from '@/components/tis_ui';

const SPLIT_TYPE = {
  EFFECTIVE: 'effective',
  INEFFECTIVENESS: 'ineffectiveness',
  APPROVAL_RESULTS: 'approval_results',
};

@connect(({ split }) => split)
class Index extends PureComponent {
  state = {
    type: null,
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDeleteMaterial = this.onDeleteMaterial.bind(this);
  }

  componentDidMount() {
    const { match, dispatch } = this.props;
    const { id, type = SPLIT_TYPE.EFFECTIVE } = match.params;
    this.setState({ type });
    dispatch({
      type: 'split/fetchMaterial',
      id,
    });
    dispatch({
      type: 'split/fetchResults',
      id,
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'split/clean',
    });
  }

  onCancel() {
    const { dispatch } = this.props;
    dispatch({
      type: 'split/unSelected',
    });
  }

  onDeleteMaterial = selectedKeys => {
    const { dispatch } = this.props;
    dispatch({
      type: 'split/deleteMaterial',
      selectKeys: selectedKeys,
    });
  };

  onDeleteSplitMaterial = selectedKeys => {
    const { dispatch } = this.props;
    dispatch({
      type: 'split/deleteResolveMaterial',
      selectKeys: selectedKeys,
    });
  };

  handleChange(e) {
    const { matter } = this.props;
    if(matter) {
      const { id } = matter;
      const nextType = e.target.value;
      this.setState(
        {
          type: nextType,
        },
        () => {
          router.push({ name: 'matters_materialSplit', params: { type: nextType, id } });
        },
      );
    }
  }

  render() {
    const {
      matter = {},
      modalType,
      materialDTOS = [],
      originApprovalResult = [],
      dictNames,
    } = this.props;
    const { type } = this.state;
    const { name } = matter;
    return (
      <div className={Styles.materialSplit}>
        <Card className={Styles.materialSplitHeadWrapper}>
          <div className={Styles.materialSplitHead}>
            事项名称: <span>{name}</span>
          </div>
          <Radio.Group value={type} onChange={this.handleChange} buttonStyle="solid">
            <Radio.Button value={SPLIT_TYPE.EFFECTIVE}>有效申请材料</Radio.Button>
            <Radio.Button value={SPLIT_TYPE.INEFFECTIVENESS}>失效申请材料</Radio.Button>
            {authCheck(
              authEnum.matters_editmore,
              <Radio.Button value={SPLIT_TYPE.APPROVAL_RESULTS}>审批结果材料</Radio.Button>,
            )}
          </Radio.Group>
          <Button
            style={{
              float: 'right',
            }}
            type="link"
            onClick={() => {
              router.push('matters');
            }}
          >
            返回事项列表
          </Button>
        </Card>
        <div className={Styles.materialSplitContentWrapper}>
          <EffectiveSplit
            dictNames={dictNames}
            materialDTOS={_.filter(materialDTOS, item => {
              return _.includes([materialStatus.add, materialStatus.update], item.status);
            })}
            hidden={type !== SPLIT_TYPE.EFFECTIVE}
            onDeleteMaterial={this.onDeleteMaterial}
            onDeleteSplitMaterial={this.onDeleteSplitMaterial}
          />
          <IneffectivenessMaterial
            materialDTOS={_.filter(materialDTOS, item => {
              return _.includes([materialStatus.delete], item.status);
            })}
            dictNames={dictNames}
            hidden={type !== SPLIT_TYPE.INEFFECTIVENESS}
            onDeleteMaterial={this.onDeleteMaterial}
            onDeleteSplitMaterial={this.onDeleteSplitMaterial}
          />
          <ApprovalResults
            hidden={type !== SPLIT_TYPE.APPROVAL_RESULTS}
            matter={matter}
            onRefresh={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'split/fetchResults',
                id: matter.id,
              });
            }}
            originApprovalResult={originApprovalResult}
          />
        </div>
        {modalType === ModalType.Original && (
          <OriginalMaterialAdd title="原始材料" onCancel={this.onCancel} />
        )}
        {modalType === ModalType.Split && (
          <SplitMaterialAdd
            orginalMaterial={materialDTOS}
            title={adaptText('拆解材料')}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}

export default Index;
export { SPLIT_TYPE };
