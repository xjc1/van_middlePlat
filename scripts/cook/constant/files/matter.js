module.exports = {
  namespace: 'matter',

  source: [
    ['autoImport', 0, '自动导入'],
    ['userImport', 1, '手工导入'],
    ['materialImport', 2, '材料导入'],
    ['declareImport', 3, '申报项目'],
  ],

  status: [
    ['normal', 0, '正常'],
    ['new', 1, '新增'],
    ['update', 2, '更新'],
    ['delete', 3, '删除'],
    ['hang', 4, '挂起'],
  ],

  isResolvedMaterials: [
    ['no', 0, '未拆解'],
    ['yes', 1, '已拆解'],
  ],

  havePreMatter: [
    ['no', 0, '否'],
    ['yes', 1, '是'],
  ],

  missMaterial: [
    ['no', 0, '否'],
    ['yes', 1, '是'],
  ],

  dealType: [
    ['fixed', '0', '固定周期'],
    ['limit', '1', '限定时限'],
  ],

  timeLimitType: [
    ['weekday', '0', '工作日'],
    ['naturalDay', '1', '自然日'],
    ['naturalMonth', '2', '自然月'],
  ],
  needLogistics: [
    ['no', 0, '否'],
    ['yes', 1, '是'],
  ],
  needAppointment: [
    ['no', 0, '否'],
    ['yes', 1, '是'],
  ],
  exerciseLevel: [
    ['province', 0, '省级'],
    ['city', 1, '市级'],
    ['county', 2, '县级'],
  ],
  approvalSystemType: [
    ['state', 0, '国垂'],
    ['province', 1, '省垂'],
    ['city', 2, '市(州)自建'],
  ],
  systemOpenStatus: [
    ['no', 0, '未通'],
    ['yes', 1, '已通'],
  ]
};
