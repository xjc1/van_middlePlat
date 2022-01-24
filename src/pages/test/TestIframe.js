import React, { useEffect } from 'react';
import { Card } from 'antd';
import { RichText, RichTextTooltip } from '@/components/tis_ui';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const showCard = {
  marginTop: 10,
  marginRight: 10,
  // transform:'scale(0.5)',
  // transformOrigin:'top left',
  zoom: 0.5,
  width: '30%',
  float: 'left',
};

const contentStyle = {
  height: 800,
};

const val = `<p> 　　今天是“六一”国际儿童节，在这个属于千万孩子们的节日里，一群“特殊”的儿童获得一份特别的关爱。记者从市民政局了解到，由市民政局联合市高级法院、市检察院、市发改委、市教委、市公安局等13个部门共同印发的《关于进一步加强本市困境儿童保障和农村留守儿童关爱服务工作的通知》今起正式实施。</p>
<p> 　　根据《通知》要求，本市将通过落实基本生活保障，加强医疗和康复保障，完善教育资助和教育救助等渠道，进一步加强针对困境儿童的保障。同时，将通过督促落实监护责任、强化安全保护机制、增进日常关爱服务等方式，进一步加强对困境儿童和农村留守儿童的关爱服务工作。</p>
<p> 　　医疗救助不再核定家庭收入</p>
<p> 　　所谓困境儿童，是指在出生、发育和成长过程中，遇到特殊困难境遇的儿童群体。比如受虐待儿童、长刑期罪犯子女、贫困家庭儿童等儿童，这些儿童虽然有父母，称不上孤儿，却面临着“事实上无人抚养”的困境。</p>
<p> 　　为此，《通知》明确要求进一步完善本市困境儿童的基本生活保障制度。事实上，自2018年起，上海已在国内率先建立了困境儿童基本生活保障制度，为符合条件的困境儿童每人每月发放1800元基本生活费；2019年，又将保障标准提高到每人每月1900元。同时，在保障群体范围上，上海的困境儿童基本生活保障对象不仅完全覆盖要求的事实无人抚养儿童，还拓展增加了“因家庭监护不当导致陷入困境”的儿童群体。</p>
<p> 　　除了基本生活保障，《通知》还对困境儿童在医疗、教育等方面的救助做出了细致的规定。在医疗救助方面，《通知》要求全市各区对符合条件的困境儿童按规定实施医疗救助，分类落实“资助参保”政策的要求。《通知》还明确，将本市困境儿童基本生活保障对象参照本市低保家庭成员给予医疗救助，不再核定其监护人家庭实际经济收入。在教育资助和救助方面，《通知》明确，本市困境儿童基本生活保障对象在学前教育、义务教育、普通高中和中等职业学校等4个阶段，均参照孤儿标准享受教育资助。</p>
<p> 　　有能力却拒不抚养可追索费用</p>
<p> 　　在困境儿童群体中，还有一类儿童，他们或是被父母遗弃，或是其父母明明有能力却未履行监护责任，有的儿童甚至因为监护人放任不管而成了“流浪儿童”，这部分儿童，也是困境儿童保护制度重点关注的对象。</p>
<p> 　　对此，《通知》强调，对有能力履行抚养义务而拒不抚养的父母，民政部门可依法追索抚养费。同时，《通知》还要求公检法等部门要依法打击监护侵害、故意或者恶意不履行监护职责以及其他各类侵害儿童权益的违法犯罪行为。在强化安全保护机制落实方面，《通知》明确将进一步健全完善本市困境儿童安全保护工作操作规程，开通热线受理平台，建立“一口受理、协同处置”安全保护工作模式。在加强日常关爱服务方面，《通知》明确要求必须着重从家庭探访、临时救助、控辍保学和法律援助等多方面入手，同时注重发挥共青团、妇联等群团组织优势，提升关爱服务能力。</p>
<p> 　　困境儿童的关爱服务需要更多耐心和细心，这离不开相关工作队伍的建设。为此，《通知》要求，加强针对困境儿童与农村留守儿童关爱保障工作的基层工作队伍建设，同时，鼓励和引导社会力量广泛参与相关工作。</p>
<p> 　　为鼓励和引导社会力量广泛参与，《通知》明确，将困境儿童和农村留守儿童关爱保障工作纳入政府购买服务指导性目录，加大政府购买未成年人社会工作类社会组织和心理服务类社会组织服务的力度。</p>`;

const actions = [
  <SettingOutlined key="setting" />,
  <EditOutlined key="edit" />,
  <EllipsisOutlined key="ellipsis" />,
];

function TestIframe() {
  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          marginTop: 30,
        }}
      >
        <RichTextTooltip visible title={val}>
          ffffffffdsf
        </RichTextTooltip>
      </div>
      {/*<Card bordered style={{*/}
      {/*  width: 1000,*/}
      {/*  margin: 'auto',*/}
      {/*  marginTop: 30,*/}
      {/*}}>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*  <Card actions={actions} style={showCard}>*/}
      {/*    <RichText contentStyle={contentStyle} readOnly value={val} />*/}
      {/*  </Card>*/}
      {/*</Card>*/}
    </div>
  );
}

export default TestIframe;
