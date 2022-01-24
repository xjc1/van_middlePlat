
const viewPermissions = {content:{key:"content",parent:"root",paths:["content"],name:"内容运营",feature:false,allName:"内容运营",hasLeaf:false,status:"VALID"},themeManage:{key:"themeManage",parent:"content",paths:["content","themeManage"],name:"主题接入管理",feature:false,allName:"内容运营/主题接入管理",hasLeaf:false,status:"VALID"},themeAccess:{key:"themeAccess",parent:"themeManage",paths:["content","themeManage","themeAccess"],name:"业务梳理",feature:false,allName:"内容运营/主题接入管理/业务梳理",hasLeaf:true,status:"VALID"},themeAudit:{key:"themeAudit",parent:"themeManage",paths:["content","themeManage","themeAudit"],name:"梳理确认",feature:false,allName:"内容运营/主题接入管理/梳理确认",hasLeaf:true,status:"VALID"},infoLibrary:{key:"infoLibrary",parent:"themeManage",paths:["content","themeManage","infoLibrary"],name:"基本信息库",feature:false,allName:"内容运营/主题接入管理/基本信息库",hasLeaf:true,status:"VALID"},themeOperation:{key:"themeOperation",parent:"content",paths:["content","themeOperation"],name:"主题管理",feature:false,allName:"内容运营/主题管理",hasLeaf:false,status:"VALID"},matters:{key:"matters",parent:"themeOperation",paths:["content","themeOperation","matters"],name:"事项管理",feature:false,allName:"内容运营/主题管理/事项管理",hasLeaf:true,desc:"事项查看、关联主题查看",status:"VALID"},matters_edit:{key:"matters_edit",parent:"matters",paths:["content","themeOperation","matters","matters_edit"],name:"事项基本信息编辑",feature:true,allName:"内容运营/主题管理/事项管理/事项基本信息编辑",hasLeaf:false,desc:"事项基本信息创建、编辑",status:"VALID",alias:["matters_bluk","matters_delete","matters_publish","matters_editmore"]},matters_editmore:{key:"matters_editmore",parent:"matters",paths:["content","themeOperation","matters","matters_editmore"],name:"事项拓展信息编辑",feature:true,allName:"内容运营/主题管理/事项管理/事项拓展信息编辑",hasLeaf:false,desc:"审批事项结果、事项拓展信息、事项推荐信息",status:"VALID"},matters_split:{key:"matters_split",parent:"matters",paths:["content","themeOperation","matters","matters_split"],name:"材料拆解",feature:true,allName:"内容运营/主题管理/事项管理/材料拆解",hasLeaf:false,desc:"材料拆解",status:"VALID"},matters_origin:{key:"matters_origin",parent:"matters",paths:["content","themeOperation","matters","matters_origin"],name:"原始材料拆解",feature:true,allName:"内容运营/主题管理/事项管理/原始材料拆解",hasLeaf:false,desc:"原始材料添加、删除、编辑",status:"VALID"},matters_bluk:{key:"matters_bluk",parent:"matters",paths:["content","themeOperation","matters","matters_bluk"],name:"事项批量",feature:true,allName:"内容运营/主题管理/事项管理/事项批量",hasLeaf:false,desc:"批量操作、包含事项基本信息、拓展信息编辑",status:"VALID"},matters_delete:{key:"matters_delete",parent:"matters",paths:["content","themeOperation","matters","matters_delete"],name:"事项删除",feature:true,allName:"内容运营/主题管理/事项管理/事项删除",hasLeaf:false,desc:"事项删除、包含事项基本信息、拓展信息编辑",status:"VALID"},matters_publish:{key:"matters_publish",parent:"matters",paths:["content","themeOperation","matters","matters_publish"],name:"事项发布",feature:true,allName:"内容运营/主题管理/事项管理/事项发布",hasLeaf:false,desc:"上/下架、包含事项基本信息、拓展信息编辑",status:"VALID"},matters_operate:{key:"matters_operate",parent:"matters",paths:["content","themeOperation","matters","matters_operate"],name:"事项运营",feature:true,allName:"内容运营/主题管理/事项管理/事项运营",hasLeaf:false,desc:"标注、完成、相似问",status:"VALID"},mattersSync:{key:"mattersSync",parent:"themeOperation",paths:["content","themeOperation","mattersSync"],name:"事项同步",feature:false,allName:"内容运营/主题管理/事项同步",hasLeaf:true,desc:"事项同步记录查看、一键同步",status:"VALID"},materialSplit:{key:"materialSplit",parent:"themeOperation",paths:["content","themeOperation","materialSplit"],name:"材料拆解",feature:false,allName:"内容运营/主题管理/材料拆解",hasLeaf:true,desc:"拆解材料查看，拆解材料导出，查看审核意见",status:"VALID"},materialSplit_edit:{key:"materialSplit_edit",parent:"materialSplit",paths:["content","themeOperation","materialSplit","materialSplit_edit"],name:"拆解材料编辑",feature:true,allName:"内容运营/主题管理/材料拆解/拆解材料编辑",hasLeaf:false,desc:"拆解材料新增，拆解材料编辑，审核状态编辑",status:"VALID",alias:["materialSplit_delete"]},materialSplit_delete:{key:"materialSplit_delete",parent:"materialSplit",paths:["content","themeOperation","materialSplit","materialSplit_delete"],name:"拆解材料删除",feature:true,allName:"内容运营/主题管理/材料拆解/拆解材料删除",hasLeaf:false,desc:"拆解材料删除，包含拆解材料编辑",status:"VALID"},scenes:{key:"scenes",parent:"themeOperation",paths:["content","themeOperation","scenes"],name:"主题管理",feature:false,allName:"内容运营/主题管理/主题管理",hasLeaf:true,desc:"主题查看、引导问卷查看",status:"VALID"},scenes_edit:{key:"scenes_edit",parent:"scenes",paths:["content","themeOperation","scenes","scenes_edit"],name:"主题编辑",feature:true,allName:"内容运营/主题管理/主题管理/主题编辑",hasLeaf:false,desc:"主题创建、编辑、预览、主题复制、引导问卷编辑",status:"VALID",alias:["scenes_bluk","scenes_delete"]},scenes_bluk:{key:"scenes_bluk",parent:"scenes",paths:["content","themeOperation","scenes","scenes_bluk"],name:"主题批量",feature:true,allName:"内容运营/主题管理/主题管理/主题批量",hasLeaf:false,desc:"批量操作、包含主题编辑",status:"VALID"},scenes_delete:{key:"scenes_delete",parent:"scenes",paths:["content","themeOperation","scenes","scenes_delete"],name:"主题删除",feature:true,allName:"内容运营/主题管理/主题管理/主题删除",hasLeaf:false,desc:"主题删除、包含主题编辑",status:"VALID"},scenes_table:{key:"scenes_table",parent:"scenes",paths:["content","themeOperation","scenes","scenes_table"],name:"主题一表",feature:true,allName:"内容运营/主题管理/主题管理/主题一表",hasLeaf:false,desc:"引导问卷-一表和规则页、引导问卷-节点字段页",status:"VALID"},scenes_publish:{key:"scenes_publish",parent:"scenes",paths:["content","themeOperation","scenes","scenes_publish"],name:"主题发布",feature:true,allName:"内容运营/主题管理/主题管理/主题发布",hasLeaf:false,desc:"上/下架",status:"VALID"},scenes_operate:{key:"scenes_operate",parent:"scenes",paths:["content","themeOperation","scenes","scenes_operate"],name:"主题运营",feature:true,allName:"内容运营/主题管理/主题管理/主题运营",hasLeaf:false,desc:"标注、相似问",status:"VALID"},scenesAudit:{key:"scenesAudit",parent:"themeOperation",paths:["content","themeOperation","scenesAudit"],name:"主题审核",feature:false,allName:"内容运营/主题管理/主题审核",hasLeaf:true,status:"VALID"},oneFormManager:{key:"oneFormManager",parent:"themeOperation",paths:["content","themeOperation","oneFormManager"],name:"一表管理",feature:false,allName:"内容运营/主题管理/一表管理",hasLeaf:true,status:"VALID"},oneMatter:{key:"oneMatter",parent:"themeOperation",paths:["content","themeOperation","oneMatter"],name:"主题专栏",feature:false,allName:"内容运营/主题管理/主题专栏",hasLeaf:true,desc:"联办事项查看",status:"VALID"},oneMatter_edit:{key:"oneMatter_edit",parent:"oneMatter",paths:["content","themeOperation","oneMatter","oneMatter_edit"],name:"联办事项编辑",feature:true,allName:"内容运营/主题管理/主题专栏/联办事项编辑",hasLeaf:false,desc:"联办事项创建、编辑、置顶",status:"VALID",alias:["oneMatter_delete","oneMatter_publish"]},oneMatter_delete:{key:"oneMatter_delete",parent:"oneMatter",paths:["content","themeOperation","oneMatter","oneMatter_delete"],name:"联办事项删除",feature:true,allName:"内容运营/主题管理/主题专栏/联办事项删除",hasLeaf:false,desc:"联办事项删除、包含联办事项编辑",status:"VALID"},oneMatter_publish:{key:"oneMatter_publish",parent:"oneMatter",paths:["content","themeOperation","oneMatter","oneMatter_publish"],name:"联办事项发布",feature:true,allName:"内容运营/主题管理/主题专栏/联办事项发布",hasLeaf:false,desc:"上/下架、包含联办事项编辑",status:"VALID"},oneMatter_operate:{key:"oneMatter_operate",parent:"oneMatter",paths:["content","themeOperation","oneMatter","oneMatter_operate"],name:"联办事项运营",feature:true,allName:"内容运营/主题管理/主题专栏/联办事项运营",hasLeaf:false,desc:"主题显示",status:"VALID"},policyKnowledgeLib:{key:"policyKnowledgeLib",parent:"content",paths:["content","policyKnowledgeLib"],name:"政务知识库",feature:false,allName:"内容运营/政务知识库",hasLeaf:false,status:"VALID"},policyContent:{key:"policyContent",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","policyContent"],name:"政策原文",feature:false,allName:"内容运营/政务知识库/政策原文",hasLeaf:true,desc:"政策查看、导出、列配置",status:"VALID"},policyContent_edit:{key:"policyContent_edit",parent:"policyContent",paths:["content","policyKnowledgeLib","policyContent","policyContent_edit"],name:"政策编辑",feature:true,allName:"内容运营/政务知识库/政策原文/政策编辑",hasLeaf:false,desc:"政策创建、编辑、模板下载、Excel导入",status:"VALID",alias:["policyContent_delete","policyContent_publish"]},policyContent_delete:{key:"policyContent_delete",parent:"policyContent",paths:["content","policyKnowledgeLib","policyContent","policyContent_delete"],name:"政策删除",feature:true,allName:"内容运营/政务知识库/政策原文/政策删除",hasLeaf:false,desc:"政策删除，包含政策编辑",status:"VALID"},policyContent_publish:{key:"policyContent_publish",parent:"policyContent",paths:["content","policyKnowledgeLib","policyContent","policyContent_publish"],name:"政策发布",feature:true,allName:"内容运营/政务知识库/政策原文/政策发布",hasLeaf:false,desc:"上/下架、包含政策编辑",status:"VALID"},policyContent_operate:{key:"policyContent_operate",parent:"policyContent",paths:["content","policyKnowledgeLib","policyContent","policyContent_operate"],name:"政策运营",feature:true,allName:"内容运营/政务知识库/政策原文/政策运营",hasLeaf:false,desc:"相似问",status:"VALID"},policyGraph:{key:"policyGraph",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","policyGraph"],name:"政策图谱",feature:false,allName:"内容运营/政务知识库/政策图谱",hasLeaf:false,desc:"政策图谱",status:"VALID"},policyWord:{key:"policyWord",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","policyWord"],name:"政务百科词条",feature:false,allName:"内容运营/政务知识库/政务百科词条",hasLeaf:true,desc:"百科词条查看",status:"VALID"},policyWord_edit:{key:"policyWord_edit",parent:"policyWord",paths:["content","policyKnowledgeLib","policyWord","policyWord_edit"],name:"词条编辑",feature:true,allName:"内容运营/政务知识库/政务百科词条/词条编辑",hasLeaf:false,desc:"百科词条创建、编辑",status:"VALID",alias:["policyWord_delete","policyWord_publish"]},policyWord_delete:{key:"policyWord_delete",parent:"policyWord",paths:["content","policyKnowledgeLib","policyWord","policyWord_delete"],name:"词条删除",feature:true,allName:"内容运营/政务知识库/政务百科词条/词条删除",hasLeaf:false,desc:"百科词条删除、包含词条编辑",status:"VALID"},policyWord_publish:{key:"policyWord_publish",parent:"policyWord",paths:["content","policyKnowledgeLib","policyWord","policyWord_publish"],name:"词条发布",feature:true,allName:"内容运营/政务知识库/政务百科词条/词条发布",hasLeaf:false,desc:"上/下架、包含词条编辑",status:"VALID"},policyWord_operate:{key:"policyWord_operate",parent:"policyWord",paths:["content","policyKnowledgeLib","policyWord","policyWord_operate"],name:"词条运营",feature:true,allName:"内容运营/政务知识库/政务百科词条/词条运营",hasLeaf:false,desc:"相似问",status:"VALID"},institutionManage:{key:"institutionManage",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","institutionManage"],name:"部门信息",feature:false,allName:"内容运营/政务知识库/部门信息",hasLeaf:true,desc:"机构查看",status:"VALID"},institutionManage_edit:{key:"institutionManage_edit",parent:"institutionManage",paths:["content","policyKnowledgeLib","institutionManage","institutionManage_edit"],name:"机构编辑",feature:true,allName:"内容运营/政务知识库/部门信息/机构编辑",hasLeaf:false,desc:"机构新增、编辑",status:"VALID",alias:["institutionManage_delete","institutionManage_publish"]},institutionManage_delete:{key:"institutionManage_delete",parent:"institutionManage",paths:["content","policyKnowledgeLib","institutionManage","institutionManage_delete"],name:"机构删除",feature:true,allName:"内容运营/政务知识库/部门信息/机构删除",hasLeaf:false,desc:"机构删除、包含机构编辑",status:"VALID"},institutionManage_publish:{key:"institutionManage_publish",parent:"institutionManage",paths:["content","policyKnowledgeLib","institutionManage","institutionManage_publish"],name:"机构发布",feature:true,allName:"内容运营/政务知识库/部门信息/机构发布",hasLeaf:false,desc:"机构上下架、包含机构编辑",status:"VALID"},institutionManage_operate:{key:"institutionManage_operate",parent:"institutionManage",paths:["content","policyKnowledgeLib","institutionManage","institutionManage_operate"],name:"机构运营",feature:true,allName:"内容运营/政务知识库/部门信息/机构运营",hasLeaf:false,desc:"机构相似问",status:"VALID"},article:{key:"article",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","article"],name:"通知公告",feature:false,allName:"内容运营/政务知识库/通知公告",hasLeaf:true,desc:"文章查看",status:"VALID"},article_edit:{key:"article_edit",parent:"article",paths:["content","policyKnowledgeLib","article","article_edit"],name:"文章编辑",feature:true,allName:"内容运营/政务知识库/通知公告/文章编辑",hasLeaf:false,desc:"文章创建、编辑、模板下载、Excel导入",status:"VALID",alias:["article_delete","article_publish"]},article_delete:{key:"article_delete",parent:"article",paths:["content","policyKnowledgeLib","article","article_delete"],name:"文章删除",feature:true,allName:"内容运营/政务知识库/通知公告/文章删除",hasLeaf:false,desc:"文章删除、包含文章编辑",status:"VALID"},article_publish:{key:"article_publish",parent:"article",paths:["content","policyKnowledgeLib","article","article_publish"],name:"文章发布",feature:true,allName:"内容运营/政务知识库/通知公告/文章发布",hasLeaf:false,desc:"上/下架、包含文章编辑",status:"VALID"},service:{key:"service",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","service"],name:"服务管理",feature:false,allName:"内容运营/政务知识库/服务管理",hasLeaf:true,desc:"服务查看、导出",status:"VALID"},service_edit:{key:"service_edit",parent:"service",paths:["content","policyKnowledgeLib","service","service_edit"],name:"服务编辑",feature:true,allName:"内容运营/政务知识库/服务管理/服务编辑",hasLeaf:false,desc:"服务新增、编辑",status:"VALID",alias:["service_delete","service_publish"]},service_bulk:{key:"service_bulk",parent:"service",paths:["content","policyKnowledgeLib","service","service_bulk"],name:"服务批量",feature:true,allName:"内容运营/政务知识库/服务管理/服务批量",hasLeaf:false,desc:"服务批量、包含服务编辑",status:"VALID"},service_delete:{key:"service_delete",parent:"service",paths:["content","policyKnowledgeLib","service","service_delete"],name:"服务删除",feature:true,allName:"内容运营/政务知识库/服务管理/服务删除",hasLeaf:false,desc:"服务删除、包含服务编辑",status:"VALID"},service_publish:{key:"service_publish",parent:"service",paths:["content","policyKnowledgeLib","service","service_publish"],name:"服务发布",feature:true,allName:"内容运营/政务知识库/服务管理/服务发布",hasLeaf:false,desc:"上/下架、包含服务编辑",status:"VALID"},service_operate:{key:"service_operate",parent:"service",paths:["content","policyKnowledgeLib","service","service_operate"],name:"服务运营",feature:true,allName:"内容运营/政务知识库/服务管理/服务运营",hasLeaf:false,desc:"修改标注、相似问",status:"VALID"},projectManage:{key:"projectManage",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","projectManage"],name:"申报项目",feature:false,allName:"内容运营/政务知识库/申报项目",hasLeaf:true,desc:"项目查看",status:"VALID"},projectManage_edit:{key:"projectManage_edit",parent:"projectManage",paths:["content","policyKnowledgeLib","projectManage","projectManage_edit"],name:"项目编辑",feature:true,allName:"内容运营/政务知识库/申报项目/项目编辑",hasLeaf:false,desc:"项目新增、编辑、体检",status:"VALID",alias:["projectManage_delete","projectManage_publish","projectManage_operate"]},projectManage_delete:{key:"projectManage_delete",parent:"projectManage",paths:["content","policyKnowledgeLib","projectManage","projectManage_delete"],name:"项目删除",feature:true,allName:"内容运营/政务知识库/申报项目/项目删除",hasLeaf:false,desc:"项目删除、包含项目编辑",status:"VALID"},projectManage_publish:{key:"projectManage_publish",parent:"projectManage",paths:["content","policyKnowledgeLib","projectManage","projectManage_publish"],name:"项目发布",feature:true,allName:"内容运营/政务知识库/申报项目/项目发布",hasLeaf:false,desc:"项目上下架、计算配置保存",status:"VALID"},projectManage_operate:{key:"projectManage_operate",parent:"projectManage",paths:["content","policyKnowledgeLib","projectManage","projectManage_operate"],name:"项目运营",feature:true,allName:"内容运营/政务知识库/申报项目/项目运营",hasLeaf:false,desc:"计算配置保存",status:"VALID"},policyProjectSync:{key:"policyProjectSync",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","policyProjectSync"],name:"政策项目同步",feature:false,allName:"内容运营/政务知识库/政策项目同步",hasLeaf:true,desc:"政策项目同步查看",status:"VALID"},synonyms:{key:"synonyms",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","synonyms"],name:"常见问题",feature:false,allName:"内容运营/政务知识库/常见问题",hasLeaf:true,desc:"问答查看",status:"VALID"},synonyms_edit:{key:"synonyms_edit",parent:"synonyms",paths:["content","policyKnowledgeLib","synonyms","synonyms_edit"],name:"问答编辑",feature:true,allName:"内容运营/政务知识库/常见问题/问答编辑",hasLeaf:false,desc:"问答创建、编辑",status:"VALID",alias:["synonyms_delete","synonyms_publish"]},synonyms_delete:{key:"synonyms_delete",parent:"synonyms",paths:["content","policyKnowledgeLib","synonyms","synonyms_delete"],name:"问答删除",feature:true,allName:"内容运营/政务知识库/常见问题/问答删除",hasLeaf:false,desc:"问答删除、包含问答编辑",status:"VALID"},synonyms_publish:{key:"synonyms_publish",parent:"synonyms",paths:["content","policyKnowledgeLib","synonyms","synonyms_publish"],name:"问答发布",feature:true,allName:"内容运营/政务知识库/常见问题/问答发布",hasLeaf:false,desc:"上/下架、包含用户编辑",status:"VALID"},synonyms_operate:{key:"synonyms_operate",parent:"synonyms",paths:["content","policyKnowledgeLib","synonyms","synonyms_operate"],name:"问答运营",feature:true,allName:"内容运营/政务知识库/常见问题/问答运营",hasLeaf:false,desc:"修改标注、相似问",status:"VALID"},policyExplain:{key:"policyExplain",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","policyExplain"],name:"政策解读",feature:false,allName:"内容运营/政务知识库/政策解读",hasLeaf:true,desc:"政策解读",status:"VALID"},policyExplain_edit:{key:"policyExplain_edit",parent:"policyExplain",paths:["content","policyKnowledgeLib","policyExplain","policyExplain_edit"],name:"政策解读编辑",feature:true,allName:"内容运营/政务知识库/政策解读/政策解读编辑",hasLeaf:false,desc:"政策解读创建、编辑",status:"VALID",alias:["policyExplain_delete","policyExplain_publish"]},policyExplain_delete:{key:"policyExplain_delete",parent:"policyExplain",paths:["content","policyKnowledgeLib","policyExplain","policyExplain_delete"],name:"政策解读删除",feature:true,allName:"内容运营/政务知识库/政策解读/政策解读删除",hasLeaf:false,desc:"政策解读删除、包含政策解读编辑",status:"VALID"},policyExplain_publish:{key:"policyExplain_publish",parent:"policyExplain",paths:["content","policyKnowledgeLib","policyExplain","policyExplain_publish"],name:"政策解读发布",feature:true,allName:"内容运营/政务知识库/政策解读/政策解读发布",hasLeaf:false,desc:"政策解读上/下架、包含政策解读编辑",status:"VALID"},policyExplain_operate:{key:"policyExplain_operate",parent:"policyExplain",paths:["content","policyKnowledgeLib","policyExplain","policyExplain_operate"],name:"政策解读运营",feature:true,allName:"内容运营/政务知识库/政策解读/政策解读运营",hasLeaf:false,desc:"政策解读相似问",status:"VALID"},hotline:{key:"hotline",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","hotline"],name:"热线电话",feature:false,allName:"内容运营/政务知识库/热线电话",hasLeaf:true,desc:"热线电话",status:"VALID"},hotline_edit:{key:"hotline_edit",parent:"hotline",paths:["content","policyKnowledgeLib","hotline","hotline_edit"],name:"热线电话编辑",feature:true,allName:"内容运营/政务知识库/热线电话/热线电话编辑",hasLeaf:false,desc:"热线电话创建、编辑",status:"VALID",alias:["hotline_delete","hotline_publish"]},hotline_delete:{key:"hotline_delete",parent:"hotline",paths:["content","policyKnowledgeLib","hotline","hotline_delete"],name:"热线电话删除",feature:true,allName:"内容运营/政务知识库/热线电话/热线电话删除",hasLeaf:false,desc:"热线电话删除、包含热线电话编辑",status:"VALID"},hotline_publish:{key:"hotline_publish",parent:"hotline",paths:["content","policyKnowledgeLib","hotline","hotline_publish"],name:"热线电话发布",feature:true,allName:"内容运营/政务知识库/热线电话/热线电话发布",hasLeaf:false,desc:"热线电话上/下架、包含热线电话编辑",status:"VALID"},hotline_operate:{key:"hotline_operate",parent:"hotline",paths:["content","policyKnowledgeLib","hotline","hotline_operate"],name:"热线电话运营",feature:true,allName:"内容运营/政务知识库/热线电话/热线电话运营",hasLeaf:false,desc:"热线电话相似问",status:"VALID"},matterHandleGuide:{key:"matterHandleGuide",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","matterHandleGuide"],name:"网上办事指引",feature:false,allName:"内容运营/政务知识库/网上办事指引",hasLeaf:true,desc:"网上办事指引",status:"VALID"},matterHandleGuide_edit:{key:"matterHandleGuide_edit",parent:"matterHandleGuide",paths:["content","policyKnowledgeLib","matterHandleGuide","matterHandleGuide_edit"],name:"网上办事编辑",feature:true,allName:"内容运营/政务知识库/网上办事指引/网上办事编辑",hasLeaf:false,desc:"网上办事创建、编辑",status:"VALID",alias:["matterHandleGuide_delete","matterHandleGuide_publish"]},matterHandleGuide_delete:{key:"matterHandleGuide_delete",parent:"matterHandleGuide",paths:["content","policyKnowledgeLib","matterHandleGuide","matterHandleGuide_delete"],name:"网上办事删除",feature:true,allName:"内容运营/政务知识库/网上办事指引/网上办事删除",hasLeaf:false,desc:"网上办事删除、包含网上办事编辑",status:"VALID"},matterHandleGuide_publish:{key:"matterHandleGuide_publish",parent:"matterHandleGuide",paths:["content","policyKnowledgeLib","matterHandleGuide","matterHandleGuide_publish"],name:"网上办事发布",feature:true,allName:"内容运营/政务知识库/网上办事指引/网上办事发布",hasLeaf:false,desc:"网上办事上/下架、包含网上办事编辑",status:"VALID"},matterHandleGuide_operate:{key:"matterHandleGuide_operate",parent:"matterHandleGuide",paths:["content","policyKnowledgeLib","matterHandleGuide","matterHandleGuide_operate"],name:"网上办事运营",feature:true,allName:"内容运营/政务知识库/网上办事指引/网上办事运营",hasLeaf:false,desc:"网上办事相似问",status:"VALID"},smartQa:{key:"smartQa",parent:"policyKnowledgeLib",paths:["content","policyKnowledgeLib","smartQa"],name:"智能小申",feature:false,allName:"内容运营/政务知识库/智能小申",hasLeaf:true,desc:"智能小申",status:"VALID"},reviewPoint:{key:"reviewPoint",parent:"content",paths:["content","reviewPoint"],name:"审查要素库",feature:false,allName:"内容运营/审查要素库",hasLeaf:true,desc:"审查要素查看",status:"VALID"},reviewPoint_edit:{key:"reviewPoint_edit",parent:"reviewPoint",paths:["content","reviewPoint","reviewPoint_edit"],name:"审查要素编辑",feature:true,allName:"内容运营/审查要素库/审查要素编辑",hasLeaf:false,desc:"特别程序、申请条件、申请材料、填报表单列表",status:"VALID"},qaManage:{key:"qaManage",parent:"content",paths:["content","qaManage"],name:"问答运营",feature:false,allName:"内容运营/问答运营",hasLeaf:false,status:"VALID"},emoticon:{key:"emoticon",parent:"qaManage",paths:["content","qaManage","emoticon"],name:"表情包管理",feature:false,allName:"内容运营/问答运营/表情包管理",hasLeaf:true,desc:"表情包查看",status:"VALID"},emoticon_edit:{key:"emoticon_edit",parent:"emoticon",paths:["content","qaManage","emoticon","emoticon_edit"],name:"表情包编辑",feature:true,allName:"内容运营/问答运营/表情包管理/表情包编辑",hasLeaf:false,desc:"表情包编辑、新增",status:"VALID",alias:["emoticon_delete","emoticon_publish"]},emoticon_delete:{key:"emoticon_delete",parent:"emoticon",paths:["content","qaManage","emoticon","emoticon_delete"],name:"表情包删除",feature:true,allName:"内容运营/问答运营/表情包管理/表情包删除",hasLeaf:false,desc:"表情包删除、包含表情包编辑",status:"VALID"},emoticon_publish:{key:"emoticon_publish",parent:"emoticon",paths:["content","qaManage","emoticon","emoticon_publish"],name:"表情包发布",feature:true,allName:"内容运营/问答运营/表情包管理/表情包发布",hasLeaf:false,desc:"表情包上下架、包含表情包编辑",status:"VALID"},dimensionManage:{key:"dimensionManage",parent:"qaManage",paths:["content","qaManage","dimensionManage"],name:"维度管理",feature:false,allName:"内容运营/问答运营/维度管理",hasLeaf:true,desc:"维度查看",status:"VALID"},dimensionManage_edit:{key:"dimensionManage_edit",parent:"dimensionManage",paths:["content","qaManage","dimensionManage","dimensionManage_edit"],name:"维度编辑",feature:true,allName:"内容运营/问答运营/维度管理/维度编辑",hasLeaf:false,desc:"维度创建、编辑",status:"VALID",alias:["dimensionManage_delete"]},dimensionManage_delete:{key:"dimensionManage_delete",parent:"dimensionManage",paths:["content","qaManage","dimensionManage","dimensionManage_delete"],name:"维度删除",feature:true,allName:"内容运营/问答运营/维度管理/维度删除",hasLeaf:false,desc:"维度创建、包含维度编辑",status:"VALID"},hotWords:{key:"hotWords",parent:"qaManage",paths:["content","qaManage","hotWords"],name:"热词管理",feature:false,allName:"内容运营/问答运营/热词管理",hasLeaf:true,desc:"热词查看",status:"VALID"},hotWords_edit:{key:"hotWords_edit",parent:"hotWords",paths:["content","qaManage","hotWords","hotWords_edit"],name:"热词编辑",feature:true,allName:"内容运营/问答运营/热词管理/热词编辑",hasLeaf:false,desc:"热词创建、编辑",status:"VALID",alias:["hotWords_delete"]},hotWords_delete:{key:"hotWords_delete",parent:"hotWords",paths:["content","qaManage","hotWords","hotWords_delete"],name:"热词删除",feature:true,allName:"内容运营/问答运营/热词管理/热词删除",hasLeaf:false,desc:"热词删除、包含热词编辑",status:"VALID"},synonymsSetting:{key:"synonymsSetting",parent:"qaManage",paths:["content","qaManage","synonymsSetting"],name:"问答设置",feature:false,allName:"内容运营/问答运营/问答设置",hasLeaf:true,desc:"问答设置查看",status:"VALID"},synonymsSetting_edit:{key:"synonymsSetting_edit",parent:"synonymsSetting",paths:["content","qaManage","synonymsSetting","synonymsSetting_edit"],name:"问答编辑",feature:true,allName:"内容运营/问答运营/问答设置/问答编辑",hasLeaf:false,desc:"问答新增、编辑",status:"VALID",alias:["synonymsSetting_delete"]},synonymsSetting_delete:{key:"synonymsSetting_delete",parent:"synonymsSetting",paths:["content","qaManage","synonymsSetting","synonymsSetting_delete"],name:"问答删除",feature:true,allName:"内容运营/问答运营/问答设置/问答删除",hasLeaf:false,desc:"问答删除、包含问答编辑",status:"VALID"},chatLibrary:{key:"chatLibrary",parent:"qaManage",paths:["content","qaManage","chatLibrary"],name:"聊天库",feature:false,allName:"内容运营/问答运营/聊天库",hasLeaf:true,desc:"聊天库查看",status:"VALID"},chatLibrary_edit:{key:"chatLibrary_edit",parent:"chatLibrary",paths:["content","qaManage","chatLibrary","chatLibrary_edit"],name:"聊天库编辑",feature:true,allName:"内容运营/问答运营/聊天库/聊天库编辑",hasLeaf:false,desc:"聊天库新增、编辑",status:"VALID",alias:["chatLibrary_delete"]},chatLibrary_delete:{key:"chatLibrary_delete",parent:"chatLibrary",paths:["content","qaManage","chatLibrary","chatLibrary_delete"],name:"聊天库删除",feature:true,allName:"内容运营/问答运营/聊天库/聊天库删除",hasLeaf:false,desc:"聊天库删除、包含聊天库编辑",status:"VALID"},chatLibrary_publish:{key:"chatLibrary_publish",parent:"chatLibrary",paths:["content","qaManage","chatLibrary","chatLibrary_publish"],name:"聊天库发布",feature:true,allName:"内容运营/问答运营/聊天库/聊天库发布",hasLeaf:false,desc:"聊天库上下架、包含聊天库编辑",status:"VALID"},hotQuestion:{key:"hotQuestion",parent:"qaManage",paths:["content","qaManage","hotQuestion"],name:"热门问题",feature:false,allName:"内容运营/问答运营/热门问题",hasLeaf:true,desc:"热门问题查看",status:"VALID"},hotQuestion_edit:{key:"hotQuestion_edit",parent:"hotQuestion",paths:["content","qaManage","hotQuestion","hotQuestion_edit"],name:"热门问题编辑",feature:true,allName:"内容运营/问答运营/热门问题/热门问题编辑",hasLeaf:false,desc:"热门问题创建、编辑",status:"VALID",alias:["hotQuestion_delete"]},hotQuestion_delete:{key:"hotQuestion_delete",parent:"hotQuestion",paths:["content","qaManage","hotQuestion","hotQuestion_delete"],name:"热门问题删除",feature:true,allName:"内容运营/问答运营/热门问题/热门问题删除",hasLeaf:false,desc:"热门问题删除、包含热门问题编辑",status:"VALID"},qaRefresh:{key:"qaRefresh",parent:"qaManage",paths:["content","qaManage","qaRefresh"],name:"刷新",feature:false,allName:"内容运营/问答运营/刷新",hasLeaf:false,desc:"刷新问答端、刷新shell端",status:"VALID"},triggerWords:{key:"triggerWords",parent:"qaManage",paths:["content","qaManage","triggerWords"],name:"触发词管理",feature:false,allName:"内容运营/问答运营/触发词管理",hasLeaf:true,desc:"触发词查看",status:"VALID"},triggerWords_edit:{key:"triggerWords_edit",parent:"triggerWords",paths:["content","qaManage","triggerWords","triggerWords_edit"],name:"触发词编辑",feature:true,allName:"内容运营/问答运营/触发词管理/触发词编辑",hasLeaf:false,desc:"热门问题创建、编辑",status:"VALID",alias:["triggerWords_delete","triggerWords_publish"]},triggerWords_delete:{key:"triggerWords_delete",parent:"triggerWords",paths:["content","qaManage","triggerWords","triggerWords_delete"],name:"触发词删除",feature:true,allName:"内容运营/问答运营/触发词管理/触发词删除",hasLeaf:false,desc:"触发词删除、包含触发词编辑",status:"VALID"},triggerWords_publish:{key:"triggerWords_publish",parent:"triggerWords",paths:["content","qaManage","triggerWords","triggerWords_publish"],name:"触发词发布",feature:true,allName:"内容运营/问答运营/触发词管理/触发词发布",hasLeaf:false,desc:"触发词上/下架、包含触发词编辑",status:"VALID"},functionWords:{key:"functionWords",parent:"qaManage",paths:["content","qaManage","functionWords"],name:"功能词管理",feature:false,allName:"内容运营/问答运营/功能词管理",hasLeaf:true,desc:"功能词查看、导出",status:"VALID"},functionWords_edit:{key:"functionWords_edit",parent:"functionWords",paths:["content","qaManage","functionWords","functionWords_edit"],name:"功能词编辑",feature:true,allName:"内容运营/问答运营/功能词管理/功能词编辑",hasLeaf:false,desc:"功能词编辑、新增、模板下载、导入",status:"VALID",alias:["functionWords_delete"]},functionWords_delete:{key:"functionWords_delete",parent:"functionWords",paths:["content","qaManage","functionWords","functionWords_delete"],name:"功能词删除",feature:true,allName:"内容运营/问答运营/功能词管理/功能词删除",hasLeaf:false,desc:"功能词删除、包含功能词编辑",status:"VALID"},professionalWords:{key:"professionalWords",parent:"qaManage",paths:["content","qaManage","professionalWords"],name:"专业词管理",feature:false,allName:"内容运营/问答运营/专业词管理",hasLeaf:true,desc:"专业词管理",status:"VALID"},rubbishWords:{key:"rubbishWords",parent:"qaManage",paths:["content","qaManage","rubbishWords"],name:"垃圾词管理",feature:false,allName:"内容运营/问答运营/垃圾词管理",hasLeaf:true,desc:"垃圾词查看",status:"VALID"},rubbishWords_edit:{key:"rubbishWords_edit",parent:"rubbishWords",paths:["content","qaManage","rubbishWords","rubbishWords_edit"],name:"触发词编辑",feature:true,allName:"内容运营/问答运营/垃圾词管理/触发词编辑",hasLeaf:false,desc:"垃圾词创建、编辑",status:"VALID",alias:["rubbishWords_delete"]},rubbishWords_delete:{key:"rubbishWords_delete",parent:"rubbishWords",paths:["content","qaManage","rubbishWords","rubbishWords_delete"],name:"垃圾词删除",feature:true,allName:"内容运营/问答运营/垃圾词管理/垃圾词删除",hasLeaf:false,desc:"垃圾词删除、包含垃圾词编辑",status:"VALID"},archiveManage:{key:"archiveManage",parent:"content",paths:["content","archiveManage"],name:"用户档案库",feature:false,allName:"内容运营/用户档案库",hasLeaf:false,status:"VALID"},archiveLib:{key:"archiveLib",parent:"archiveManage",paths:["content","archiveManage","archiveLib"],name:"档案库",feature:false,allName:"内容运营/用户档案库/档案库",hasLeaf:true,desc:"档案库查看",status:"VALID"},archiveLib_edit:{key:"archiveLib_edit",parent:"archiveLib",paths:["content","archiveManage","archiveLib","archiveLib_edit"],name:"档案库编辑",feature:true,allName:"内容运营/用户档案库/档案库/档案库编辑",hasLeaf:false,desc:"档案库编辑",status:"VALID"},menuSetting:{key:"menuSetting",parent:"archiveManage",paths:["content","archiveManage","menuSetting"],name:"菜单配置",feature:false,allName:"内容运营/用户档案库/菜单配置",hasLeaf:true,desc:"菜单查看",status:"VALID"},menuSetting_edit:{key:"menuSetting_edit",parent:"menuSetting",paths:["content","archiveManage","menuSetting","menuSetting_edit"],name:"菜单编辑",feature:true,allName:"内容运营/用户档案库/菜单配置/菜单编辑",hasLeaf:false,desc:"菜单编辑、新增",status:"VALID",alias:["menuSetting_delete","menuSetting_publish"]},menuSetting_delete:{key:"menuSetting_delete",parent:"menuSetting",paths:["content","archiveManage","menuSetting","menuSetting_delete"],name:"菜单删除",feature:true,allName:"内容运营/用户档案库/菜单配置/菜单删除",hasLeaf:false,desc:"菜单删除、包含菜单编辑",status:"VALID"},menuSetting_publish:{key:"menuSetting_publish",parent:"menuSetting",paths:["content","archiveManage","menuSetting","menuSetting_publish"],name:"菜单发布",feature:true,allName:"内容运营/用户档案库/菜单配置/菜单发布",hasLeaf:false,desc:"菜单上/下架、包含菜单编辑",status:"VALID"},standardMaterial:{key:"standardMaterial",parent:"archiveManage",paths:["content","archiveManage","standardMaterial"],name:"标准材料管理",feature:false,allName:"内容运营/用户档案库/标准材料管理",hasLeaf:true,desc:"标准材料查看、导出",status:"VALID"},standardMaterial_edit:{key:"standardMaterial_edit",parent:"standardMaterial",paths:["content","archiveManage","standardMaterial","standardMaterial_edit"],name:"标准材料编辑",feature:true,allName:"内容运营/用户档案库/标准材料管理/标准材料编辑",hasLeaf:false,desc:"标准材料新增、编辑、模板下载、导入",status:"VALID",alias:["standardMaterial_delete"]},standardMaterial_delete:{key:"standardMaterial_delete",parent:"standardMaterial",paths:["content","archiveManage","standardMaterial","standardMaterial_delete"],name:"标准材料删除",feature:true,allName:"内容运营/用户档案库/标准材料管理/标准材料删除",hasLeaf:false,desc:"标准材料删除、包含标准材料编辑",status:"VALID"},standardMaterial_publish:{key:"standardMaterial_publish",parent:"standardMaterial",paths:["content","archiveManage","standardMaterial","standardMaterial_publish"],name:"标准材料发布",feature:true,allName:"内容运营/用户档案库/标准材料管理/标准材料发布",hasLeaf:false,desc:"标准材料上下架、包含标准材料编辑",status:"VALID"},standardFieldStore:{key:"standardFieldStore",parent:"archiveManage",paths:["content","archiveManage","standardFieldStore"],name:"标准字段管理",feature:false,allName:"内容运营/用户档案库/标准字段管理",hasLeaf:true,desc:"标准字段查看、导出",status:"VALID"},standardFieldStore_edit:{key:"standardFieldStore_edit",parent:"standardFieldStore",paths:["content","archiveManage","standardFieldStore","standardFieldStore_edit"],name:"标准字段编辑",feature:true,allName:"内容运营/用户档案库/标准字段管理/标准字段编辑",hasLeaf:false,desc:"标准字段新增、编辑、模板下载、导入",status:"VALID",alias:["standardFieldStore_delete"]},standardFieldStore_delete:{key:"standardFieldStore_delete",parent:"standardFieldStore",paths:["content","archiveManage","standardFieldStore","standardFieldStore_delete"],name:"标准字段删除",feature:true,allName:"内容运营/用户档案库/标准字段管理/标准字段删除",hasLeaf:false,desc:"标准字段删除、包含标准字段编辑",status:"VALID"},efficacy:{key:"efficacy",parent:"content",paths:["content","efficacy"],name:"主题效能管理",feature:false,allName:"内容运营/主题效能管理",hasLeaf:false,status:"VALID"},themeOpen:{key:"themeOpen",parent:"efficacy",paths:["content","efficacy","themeOpen"],name:"主题开通统计",feature:false,allName:"内容运营/主题效能管理/主题开通统计",hasLeaf:true,status:"VALID"},themeDo:{key:"themeDo",parent:"efficacy",paths:["content","efficacy","themeDo"],name:"主题办件统计",feature:false,allName:"内容运营/主题效能管理/主题办件统计",hasLeaf:true,status:"VALID"},workOrder:{key:"workOrder",parent:"content",paths:["content","workOrder"],name:"知识库工单",feature:false,allName:"内容运营/知识库工单",hasLeaf:false,status:"VALID"},workOrderCommit:{key:"workOrderCommit",parent:"workOrder",paths:["content","workOrder","workOrderCommit"],name:"工单上报",feature:false,allName:"内容运营/知识库工单/工单上报",hasLeaf:true,status:"VALID"},workOrderConfirm:{key:"workOrderConfirm",parent:"workOrder",paths:["content","workOrder","workOrderConfirm"],name:"工单确认",feature:false,allName:"内容运营/知识库工单/工单确认",hasLeaf:true,status:"VALID"},workOrderKnowledge:{key:"workOrderKnowledge",parent:"workOrder",paths:["content","workOrder","workOrderKnowledge"],name:"知识库接口",feature:false,allName:"内容运营/知识库工单/知识库接口",hasLeaf:true,status:"VALID"},portraitMenu:{key:"portraitMenu",parent:"content",paths:["content","portraitMenu"],name:"用户画像库",feature:false,allName:"内容运营/用户画像库",hasLeaf:false,status:"VALID"},tagManage:{key:"tagManage",parent:"portraitMenu",paths:["content","portraitMenu","tagManage"],name:"标签管理",feature:false,allName:"内容运营/用户画像库/标签管理",hasLeaf:true,desc:"标签查看",status:"VALID"},tagManage_edit:{key:"tagManage_edit",parent:"tagManage",paths:["content","portraitMenu","tagManage","tagManage_edit"],name:"标签编辑",feature:true,allName:"内容运营/用户画像库/标签管理/标签编辑",hasLeaf:false,desc:"标签创建、编辑",status:"VALID",alias:["tagManage_delete"]},tagManage_delete:{key:"tagManage_delete",parent:"tagManage",paths:["content","portraitMenu","tagManage","tagManage_delete"],name:"标签删除",feature:true,allName:"内容运营/用户画像库/标签管理/标签删除",hasLeaf:false,desc:"标签删除、包含标签编辑",status:"VALID"},tagManage_detail_expandInfo:{key:"tagManage_detail_expandInfo",parent:"tagManage",paths:["content","portraitMenu","tagManage","tagManage_detail_expandInfo"],name:"拓展信息",feature:true,allName:"内容运营/用户画像库/标签管理/拓展信息",hasLeaf:false,desc:"标签详情页面的基本信息分栏",status:"VALID"},tagManage_detail_reviewRecord:{key:"tagManage_detail_reviewRecord",parent:"tagManage",paths:["content","portraitMenu","tagManage","tagManage_detail_reviewRecord"],name:"审核记录",feature:true,allName:"内容运营/用户画像库/标签管理/审核记录",hasLeaf:false,desc:"标签详情页的审核记录分栏",status:"VALID"},portraitSelf:{key:"portraitSelf",parent:"portraitMenu",paths:["content","portraitMenu","portraitSelf"],name:"用户管理-个人",feature:false,allName:"内容运营/用户画像库/用户管理-个人",hasLeaf:true,status:"VALID"},portraitLegal:{key:"portraitLegal",parent:"portraitMenu",paths:["content","portraitMenu","portraitLegal"],name:"用户管理-法人",feature:false,allName:"内容运营/用户画像库/用户管理-法人",hasLeaf:true,status:"VALID"},ruleManage:{key:"ruleManage",parent:"portraitMenu",paths:["content","portraitMenu","ruleManage"],name:"规则管理",feature:false,allName:"内容运营/用户画像库/规则管理",hasLeaf:true,status:"VALID"},ruleManage_conditionView:{key:"ruleManage_conditionView",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_conditionView"],name:"查看(限定条件)",feature:true,allName:"内容运营/用户画像库/规则管理/查看(限定条件)",hasLeaf:false,status:"VALID",alias:["ruleManage_conditionEdit","ruleManage_conditionDelete"]},ruleManage_conditionEdit:{key:"ruleManage_conditionEdit",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_conditionEdit"],name:"编辑(限定条件)",feature:true,allName:"内容运营/用户画像库/规则管理/编辑(限定条件)",hasLeaf:false,desc:"限定条件新增、编辑，包含限定条件查看",status:"VALID",alias:["ruleManage_conditionDelete"]},ruleManage_conditionDelete:{key:"ruleManage_conditionDelete",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_conditionDelete"],name:"删除(限定条件)",feature:true,allName:"内容运营/用户画像库/规则管理/删除(限定条件)",hasLeaf:false,desc:"限定条件删除，包含限定条件编辑",status:"VALID"},ruleManage_funView:{key:"ruleManage_funView",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_funView"],name:"查看(函数)",feature:true,allName:"内容运营/用户画像库/规则管理/查看(函数)",hasLeaf:false,status:"VALID",alias:["ruleManage_funEdit","ruleManage_funPublish"]},ruleManage_funEdit:{key:"ruleManage_funEdit",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_funEdit"],name:"编辑(函数)",feature:true,allName:"内容运营/用户画像库/规则管理/编辑(函数)",hasLeaf:false,desc:"函数新增、编辑，包含函数查看",status:"VALID",alias:["ruleManage_funPublish"]},ruleManage_funPublish:{key:"ruleManage_funPublish",parent:"ruleManage",paths:["content","portraitMenu","ruleManage","ruleManage_funPublish"],name:"上下架(函数)",feature:true,allName:"内容运营/用户画像库/规则管理/上下架(函数)",hasLeaf:false,desc:"函数上下架，包含函数编辑",status:"VALID"},tableManage:{key:"tableManage",parent:"portraitMenu",paths:["content","portraitMenu","tableManage"],name:"库表管理",feature:false,allName:"内容运营/用户画像库/库表管理",hasLeaf:true,desc:"库表查看",status:"VALID"},tableManage_edit:{key:"tableManage_edit",parent:"tableManage",paths:["content","portraitMenu","tableManage","tableManage_edit"],name:"编辑",feature:true,allName:"内容运营/用户画像库/库表管理/编辑",hasLeaf:false,desc:"库表编辑、新增",status:"VALID",alias:["tableManage_delete"]},tableManage_delete:{key:"tableManage_delete",parent:"tableManage",paths:["content","portraitMenu","tableManage","tableManage_delete"],name:"库表删除",feature:true,allName:"内容运营/用户画像库/库表管理/库表删除",hasLeaf:false,desc:"库表删除、包含库表编辑",status:"VALID"},minimalCondition:{key:"minimalCondition",parent:"portraitMenu",paths:["content","portraitMenu","minimalCondition"],name:"最小条件",feature:false,allName:"内容运营/用户画像库/最小条件",hasLeaf:true,desc:"最小条件",status:"VALID"},tagAudit:{key:"tagAudit",parent:"portraitMenu",paths:["content","portraitMenu","tagAudit"],name:"标签审核",feature:false,allName:"内容运营/用户画像库/标签审核",hasLeaf:true,desc:"标签审核",status:"VALID"},tagAudit_detail_expandInfo:{key:"tagAudit_detail_expandInfo",parent:"tagAudit",paths:["content","portraitMenu","tagAudit","tagAudit_detail_expandInfo"],name:"拓展信息",feature:true,allName:"内容运营/用户画像库/标签审核/拓展信息",hasLeaf:false,desc:"标签详情页面的基本信息分栏",status:"VALID"},tagAudit_detail_reviewRecord:{key:"tagAudit_detail_reviewRecord",parent:"tagAudit",paths:["content","portraitMenu","tagAudit","tagAudit_detail_reviewRecord"],name:"审核记录",feature:true,allName:"内容运营/用户画像库/标签审核/审核记录",hasLeaf:false,desc:"标签详情页的审核记录分栏",status:"VALID"},tagSync:{key:"tagSync",parent:"portraitMenu",paths:["content","portraitMenu","tagSync"],name:"标签同步",feature:false,allName:"内容运营/用户画像库/标签同步",hasLeaf:true,desc:"标签同步",status:"VALID"},outputModule:{key:"outputModule",parent:"portraitMenu",paths:["content","portraitMenu","outputModule"],name:"输出管理",feature:false,allName:"内容运营/用户画像库/输出管理",hasLeaf:true,desc:"输出模块查看",status:"VALID"},outputModule_edit:{key:"outputModule_edit",parent:"outputModule",paths:["content","portraitMenu","outputModule","outputModule_edit"],name:"输出模块编辑",feature:true,allName:"内容运营/用户画像库/输出管理/输出模块编辑",hasLeaf:false,desc:"输出模块编辑、新增",status:"VALID",alias:["outputModule_delete"]},outputModule_delete:{key:"outputModule_delete",parent:"outputModule",paths:["content","portraitMenu","outputModule","outputModule_delete"],name:"输出模块删除",feature:true,allName:"内容运营/用户画像库/输出管理/输出模块删除",hasLeaf:false,desc:"输出模块删除、包含输出模块编辑",status:"VALID"},recommendTest:{key:"recommendTest",parent:"portraitMenu",paths:["content","portraitMenu","recommendTest"],name:"推荐测试",feature:false,allName:"内容运营/用户画像库/推荐测试",hasLeaf:true,status:"VALID"},paramsManage:{key:"paramsManage",parent:"portraitMenu",paths:["content","portraitMenu","paramsManage"],name:"参数管理",feature:false,allName:"内容运营/用户画像库/参数管理",hasLeaf:true,status:"VALID"},sceneData:{key:"sceneData",parent:"content",paths:["content","sceneData"],name:"场景用数",feature:false,allName:"内容运营/场景用数",hasLeaf:false,status:"VALID"},sceneDataManage:{key:"sceneDataManage",parent:"sceneData",paths:["content","sceneData","sceneDataManage"],name:"场景用数管理",feature:false,allName:"内容运营/场景用数/场景用数管理",hasLeaf:true,desc:"场景用数管理",status:"VALID"},recommendManage:{key:"recommendManage",parent:"content",paths:["content","recommendManage"],name:"推荐管理",feature:false,allName:"内容运营/推荐管理",hasLeaf:false,status:"VALID"},modules:{key:"modules",parent:"recommendManage",paths:["content","recommendManage","modules"],name:"模块管理",feature:false,allName:"内容运营/推荐管理/模块管理",hasLeaf:true,desc:"模块查看",status:"VALID"},modules_edit:{key:"modules_edit",parent:"modules",paths:["content","recommendManage","modules","modules_edit"],name:"模块编辑",feature:true,allName:"内容运营/推荐管理/模块管理/模块编辑",hasLeaf:false,desc:"模块编辑",status:"VALID",alias:["modules_delete"]},modules_delete:{key:"modules_delete",parent:"modules",paths:["content","recommendManage","modules","modules_delete"],name:"模块删除",feature:true,allName:"内容运营/推荐管理/模块管理/模块删除",hasLeaf:false,desc:"模块删除、包含模块编辑",status:"VALID"},strategy:{key:"strategy",parent:"recommendManage",paths:["content","recommendManage","strategy"],name:"策略管理",feature:false,allName:"内容运营/推荐管理/策略管理",hasLeaf:true,desc:"策略管理",status:"VALID"},suggestTest:{key:"suggestTest",parent:"recommendManage",paths:["content","recommendManage","suggestTest"],name:"推荐测试",feature:false,allName:"内容运营/推荐管理/推荐测试",hasLeaf:true,desc:"推荐测试",status:"VALID"},messageMenu:{key:"messageMenu",parent:"content",paths:["content","messageMenu"],name:"消息中心",feature:false,allName:"内容运营/消息中心",hasLeaf:false,status:"VALID"},message:{key:"message",parent:"messageMenu",paths:["content","messageMenu","message"],name:"消息管理",feature:false,allName:"内容运营/消息中心/消息管理",hasLeaf:true,desc:"消息查看",status:"VALID"},message_edit:{key:"message_edit",parent:"message",paths:["content","messageMenu","message","message_edit"],name:"消息编辑",feature:true,allName:"内容运营/消息中心/消息管理/消息编辑",hasLeaf:false,desc:"消息创建、编辑、复制",status:"VALID",alias:["message_delete","message_publish"]},message_delete:{key:"message_delete",parent:"message",paths:["content","messageMenu","message","message_delete"],name:"消息删除",feature:true,allName:"内容运营/消息中心/消息管理/消息删除",hasLeaf:false,desc:"消息删除、包含消息编辑",status:"VALID"},message_publish:{key:"message_publish",parent:"message",paths:["content","messageMenu","message","message_publish"],name:"消息发布",feature:true,allName:"内容运营/消息中心/消息管理/消息发布",hasLeaf:false,desc:"上/下架、包含消息编辑",status:"VALID"},certification:{key:"certification",parent:"content",paths:["content","certification"],name:"证照管理",feature:false,allName:"内容运营/证照管理",hasLeaf:false,status:"VALID"},certificationManage:{key:"certificationManage",parent:"certification",paths:["content","certification","certificationManage"],name:"证照管理",feature:false,allName:"内容运营/证照管理/证照管理",hasLeaf:true,desc:"证照管理",status:"VALID"},certificationSync:{key:"certificationSync",parent:"certification",paths:["content","certification","certificationSync"],name:"证照同步",feature:false,allName:"内容运营/证照管理/证照同步",hasLeaf:true,desc:"证照同步",status:"VALID"},tool:{key:"tool",parent:"content",paths:["content","tool"],name:"工具菜单",feature:false,allName:"内容运营/工具菜单",hasLeaf:false,status:"VALID"},dictManage:{key:"dictManage",parent:"tool",paths:["content","tool","dictManage"],name:"字典管理",feature:false,allName:"内容运营/工具菜单/字典管理",hasLeaf:true,desc:"字典查看",status:"VALID"},summaryInfo:{key:"summaryInfo",parent:"content",paths:["content","summaryInfo"],name:"统计信息",feature:false,allName:"内容运营/统计信息",hasLeaf:false,status:"VALID"},app:{key:"app",parent:"root",paths:["app"],name:"应用运营",feature:false,allName:"应用运营",hasLeaf:false,status:"VALID"},appManager:{key:"appManager",parent:"app",paths:["app","appManager"],name:"主题应用接入",feature:false,allName:"应用运营/主题应用接入",hasLeaf:false,status:"VALID"},appRegister:{key:"appRegister",parent:"appManager",paths:["app","appManager","appRegister"],name:"应用注册",feature:false,allName:"应用运营/主题应用接入/应用注册",hasLeaf:true,status:"VALID"},applicationAudit:{key:"applicationAudit",parent:"appManager",paths:["app","appManager","applicationAudit"],name:"应用审核",feature:false,allName:"应用运营/主题应用接入/应用审核",hasLeaf:true,status:"VALID"},model:{key:"model",parent:"root",paths:["model"],name:"模型运营",feature:false,allName:"模型运营",hasLeaf:false,status:"VALID"},modelManager:{key:"modelManager",parent:"model",paths:["model","modelManager"],name:"模型管理",feature:false,allName:"模型运营/模型管理",hasLeaf:false,status:"VALID"},commonModel:{key:"commonModel",parent:"modelManager",paths:["model","modelManager","commonModel"],name:"公共模型",feature:false,allName:"模型运营/模型管理/公共模型",hasLeaf:true,status:"VALID"},subscription:{key:"subscription",parent:"modelManager",paths:["model","modelManager","subscription"],name:"订阅管理",feature:false,allName:"模型运营/模型管理/订阅管理",hasLeaf:true,status:"VALID"},system:{key:"system",parent:"root",paths:["system"],name:"系统",feature:false,allName:"系统",hasLeaf:false,status:"VALID"},systemManage:{key:"systemManage",parent:"system",paths:["system","systemManage"],name:"系统管理",feature:false,allName:"系统/系统管理",hasLeaf:false,status:"VALID"},users:{key:"users",parent:"systemManage",paths:["system","systemManage","users"],name:"账号管理",feature:false,allName:"系统/系统管理/账号管理",hasLeaf:true,status:"VALID"},role:{key:"role",parent:"systemManage",paths:["system","systemManage","role"],name:"角色管理",feature:false,allName:"系统/系统管理/角色管理",hasLeaf:true,status:"VALID"},department:{key:"department",parent:"systemManage",paths:["system","systemManage","department"],name:"部门管理",feature:false,allName:"系统/系统管理/部门管理",hasLeaf:true,status:"VALID"},operatingManual:{key:"operatingManual",parent:"systemManage",paths:["system","systemManage","operatingManual"],name:"产品手册",feature:false,allName:"系统/系统管理/产品手册",hasLeaf:true,status:"VALID"},logRecord:{key:"logRecord",parent:"systemManage",paths:["system","systemManage","logRecord"],name:"日志监控管理",feature:false,allName:"系统/系统管理/日志监控管理",hasLeaf:true,desc:"日志监控管理",status:"VALID"},taskManage:{key:"taskManage",parent:"systemManage",paths:["system","systemManage","taskManage"],name:"任务管理",feature:false,allName:"系统/系统管理/任务管理",hasLeaf:true,status:"VALID"},systemConfig:{key:"systemConfig",parent:"system",paths:["system","systemConfig"],name:"系统配置",feature:false,allName:"系统/系统配置",hasLeaf:false,status:"VALID"},themeConfig:{key:"themeConfig",parent:"systemConfig",paths:["system","systemConfig","themeConfig"],name:"主题配置",feature:false,allName:"系统/系统配置/主题配置",hasLeaf:true,status:"VALID"},loginConfig:{key:"loginConfig",parent:"systemConfig",paths:["system","systemConfig","loginConfig"],name:"登录配置",feature:false,allName:"系统/系统配置/登录配置",hasLeaf:true,status:"VALID"},auditChain:{key:"auditChain",parent:"systemConfig",paths:["system","systemConfig","auditChain"],name:"审核链配置",feature:false,allName:"系统/系统配置/审核链配置",hasLeaf:true,status:"VALID"},departmentDict:{key:"departmentDict",parent:"systemConfig",paths:["system","systemConfig","departmentDict"],name:"字典配置",feature:false,allName:"系统/系统配置/字典配置",hasLeaf:true,desc:"字典权限配置",status:"VALID"},departmentDict_edit:{key:"departmentDict_edit",parent:"departmentDict",paths:["system","systemConfig","departmentDict","departmentDict_edit"],name:"字典配置编辑",feature:true,allName:"系统/系统配置/字典配置/字典配置编辑",hasLeaf:false,desc:"字典配置编辑、新增",status:"VALID",alias:["departmentDict_delete"]},departmentDict_delete:{key:"departmentDict_delete",parent:"departmentDict",paths:["system","systemConfig","departmentDict","departmentDict_delete"],name:"字典配置删除",feature:true,allName:"系统/系统配置/字典配置/字典配置删除",hasLeaf:false,desc:"字典配置删除、包含编辑",status:"VALID"},subsystem:{key:"subsystem",parent:"systemConfig",paths:["system","systemConfig","subsystem"],name:"子系统",feature:false,allName:"系统/系统配置/子系统",hasLeaf:false,desc:"子系统配置",status:"VALID"}};

const treePermissions = [
        {
          key: 'login',
          name:'登录',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'content',
          name:'内容运营',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'themeManage',
          name:'主题接入管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'themeAccess',
          name:'业务梳理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'themeAccess_create',
          name:'业务梳理创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeAccess_edit',
          name:'业务梳理编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeAccess_delete',
          name:'业务梳理删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'themeAudit',
          name:'梳理确认',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'themeAudit_create',
          name:'梳理确认创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeAudit_edit',
          name:'梳理确认编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeAudit_delete',
          name:'梳理确认删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'infoLibrary',
          name:'基本信息库',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'infoLibrary_create',
          name:'基本信息库创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'infoLibrary_edit',
          name:'基本信息库编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'infoLibrary_delete',
          name:'基本信息库删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'themeOperation',
          name:'主题管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'matters',
          name:'事项管理',
          status: 'VALID',
          desc: '事项查看、关联主题查看',
          hasLeaf: true,
          children: [
        {
          key: 'matters_edit',
          name:'事项基本信息编辑',
          status: 'VALID',
          desc: '事项基本信息创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_editmore',
          name:'事项拓展信息编辑',
          status: 'VALID',
          desc: '审批事项结果、事项拓展信息、事项推荐信息',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_split',
          name:'材料拆解',
          status: 'VALID',
          desc: '材料拆解',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_origin',
          name:'原始材料拆解',
          status: 'VALID',
          desc: '原始材料添加、删除、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_bluk',
          name:'事项批量',
          status: 'VALID',
          desc: '批量操作、包含事项基本信息、拓展信息编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_delete',
          name:'事项删除',
          status: 'VALID',
          desc: '事项删除、包含事项基本信息、拓展信息编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_publish',
          name:'事项发布',
          status: 'VALID',
          desc: '上/下架、包含事项基本信息、拓展信息编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matters_operate',
          name:'事项运营',
          status: 'VALID',
          desc: '标注、完成、相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'mattersSync',
          name:'事项同步',
          status: 'VALID',
          desc: '事项同步记录查看、一键同步',
          hasLeaf: true,
          children: [
        {
          key: 'mattersSync_sync',
          name:'一键同步',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'materialSplit',
          name:'材料拆解',
          status: 'VALID',
          desc: '拆解材料查看，拆解材料导出，查看审核意见',
          hasLeaf: true,
          children: [
        {
          key: 'materialSplit_edit',
          name:'拆解材料编辑',
          status: 'VALID',
          desc: '拆解材料新增，拆解材料编辑，审核状态编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'materialSplit_delete',
          name:'拆解材料删除',
          status: 'VALID',
          desc: '拆解材料删除，包含拆解材料编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'scenes',
          name:'主题管理',
          status: 'VALID',
          desc: '主题查看、引导问卷查看',
          hasLeaf: true,
          children: [
        {
          key: 'scenes_edit',
          name:'主题编辑',
          status: 'VALID',
          desc: '主题创建、编辑、预览、主题复制、引导问卷编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenes_bluk',
          name:'主题批量',
          status: 'VALID',
          desc: '批量操作、包含主题编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenes_delete',
          name:'主题删除',
          status: 'VALID',
          desc: '主题删除、包含主题编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenes_table',
          name:'主题一表',
          status: 'VALID',
          desc: '引导问卷-一表和规则页、引导问卷-节点字段页',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenes_publish',
          name:'主题发布',
          status: 'VALID',
          desc: '上/下架',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenes_operate',
          name:'主题运营',
          status: 'VALID',
          desc: '标注、相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'scenesAudit',
          name:'主题审核',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'scenesAudit_create',
          name:'审核创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenesAudit_edit',
          name:'审核编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'scenesAudit_delete',
          name:'审核删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'oneFormManager',
          name:'一表管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'oneFormManager_create',
          name:'一表管理创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'oneFormManager_edit',
          name:'一表管理编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'oneFormManager_delete',
          name:'一表管理删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'oneMatter',
          name:'主题专栏',
          status: 'VALID',
          desc: '联办事项查看',
          hasLeaf: true,
          children: [
        {
          key: 'oneMatter_edit',
          name:'联办事项编辑',
          status: 'VALID',
          desc: '联办事项创建、编辑、置顶',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'oneMatter_delete',
          name:'联办事项删除',
          status: 'VALID',
          desc: '联办事项删除、包含联办事项编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'oneMatter_publish',
          name:'联办事项发布',
          status: 'VALID',
          desc: '上/下架、包含联办事项编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'oneMatter_operate',
          name:'联办事项运营',
          status: 'VALID',
          desc: '主题显示',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'policyKnowledgeLib',
          name:'政务知识库',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'policyContent',
          name:'政策原文',
          status: 'VALID',
          desc: '政策查看、导出、列配置',
          hasLeaf: true,
          children: [
        {
          key: 'policyContent_edit',
          name:'政策编辑',
          status: 'VALID',
          desc: '政策创建、编辑、模板下载、Excel导入',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyContent_delete',
          name:'政策删除',
          status: 'VALID',
          desc: '政策删除，包含政策编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyContent_publish',
          name:'政策发布',
          status: 'VALID',
          desc: '上/下架、包含政策编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyContent_operate',
          name:'政策运营',
          status: 'VALID',
          desc: '相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'policyGraph',
          name:'政策图谱',
          status: 'VALID',
          desc: '政策图谱',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyWord',
          name:'政务百科词条',
          status: 'VALID',
          desc: '百科词条查看',
          hasLeaf: true,
          children: [
        {
          key: 'policyWord_edit',
          name:'词条编辑',
          status: 'VALID',
          desc: '百科词条创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyWord_delete',
          name:'词条删除',
          status: 'VALID',
          desc: '百科词条删除、包含词条编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyWord_publish',
          name:'词条发布',
          status: 'VALID',
          desc: '上/下架、包含词条编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyWord_operate',
          name:'词条运营',
          status: 'VALID',
          desc: '相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'institutionManage',
          name:'部门信息',
          status: 'VALID',
          desc: '机构查看',
          hasLeaf: true,
          children: [
        {
          key: 'institutionManage_edit',
          name:'机构编辑',
          status: 'VALID',
          desc: '机构新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'institutionManage_delete',
          name:'机构删除',
          status: 'VALID',
          desc: '机构删除、包含机构编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'institutionManage_publish',
          name:'机构发布',
          status: 'VALID',
          desc: '机构上下架、包含机构编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'institutionManage_operate',
          name:'机构运营',
          status: 'VALID',
          desc: '机构相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'article',
          name:'通知公告',
          status: 'VALID',
          desc: '文章查看',
          hasLeaf: true,
          children: [
        {
          key: 'article_edit',
          name:'文章编辑',
          status: 'VALID',
          desc: '文章创建、编辑、模板下载、Excel导入',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'article_delete',
          name:'文章删除',
          status: 'VALID',
          desc: '文章删除、包含文章编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'article_publish',
          name:'文章发布',
          status: 'VALID',
          desc: '上/下架、包含文章编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'service',
          name:'服务管理',
          status: 'VALID',
          desc: '服务查看、导出',
          hasLeaf: true,
          children: [
        {
          key: 'service_edit',
          name:'服务编辑',
          status: 'VALID',
          desc: '服务新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'service_bulk',
          name:'服务批量',
          status: 'VALID',
          desc: '服务批量、包含服务编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'service_delete',
          name:'服务删除',
          status: 'VALID',
          desc: '服务删除、包含服务编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'service_publish',
          name:'服务发布',
          status: 'VALID',
          desc: '上/下架、包含服务编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'service_operate',
          name:'服务运营',
          status: 'VALID',
          desc: '修改标注、相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'projectManage',
          name:'申报项目',
          status: 'VALID',
          desc: '项目查看',
          hasLeaf: true,
          children: [
        {
          key: 'projectManage_edit',
          name:'项目编辑',
          status: 'VALID',
          desc: '项目新增、编辑、体检',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'projectManage_delete',
          name:'项目删除',
          status: 'VALID',
          desc: '项目删除、包含项目编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'projectManage_publish',
          name:'项目发布',
          status: 'VALID',
          desc: '项目上下架、计算配置保存',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'projectManage_operate',
          name:'项目运营',
          status: 'VALID',
          desc: '计算配置保存',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'policyProjectSync',
          name:'政策项目同步',
          status: 'VALID',
          desc: '政策项目同步查看',
          hasLeaf: true,
          children: [
        {
          key: 'policyProjectSync_edit',
          name:'政策项目同步编辑',
          status: 'INVALID',
          desc: '政策项目同步新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyProjectSync_delete',
          name:'政策项目同步删除',
          status: 'INVALID',
          desc: '政策项目同步删除、包含政策项目同步编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'synonyms',
          name:'常见问题',
          status: 'VALID',
          desc: '问答查看',
          hasLeaf: true,
          children: [
        {
          key: 'synonyms_edit',
          name:'问答编辑',
          status: 'VALID',
          desc: '问答创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'synonyms_delete',
          name:'问答删除',
          status: 'VALID',
          desc: '问答删除、包含问答编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'synonyms_publish',
          name:'问答发布',
          status: 'VALID',
          desc: '上/下架、包含用户编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'synonyms_operate',
          name:'问答运营',
          status: 'VALID',
          desc: '修改标注、相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'policyExplain',
          name:'政策解读',
          status: 'VALID',
          desc: '政策解读',
          hasLeaf: true,
          children: [
        {
          key: 'policyExplain_edit',
          name:'政策解读编辑',
          status: 'VALID',
          desc: '政策解读创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyExplain_delete',
          name:'政策解读删除',
          status: 'VALID',
          desc: '政策解读删除、包含政策解读编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyExplain_publish',
          name:'政策解读发布',
          status: 'VALID',
          desc: '政策解读上/下架、包含政策解读编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'policyExplain_operate',
          name:'政策解读运营',
          status: 'VALID',
          desc: '政策解读相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'hotline',
          name:'热线电话',
          status: 'VALID',
          desc: '热线电话',
          hasLeaf: true,
          children: [
        {
          key: 'hotline_edit',
          name:'热线电话编辑',
          status: 'VALID',
          desc: '热线电话创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'hotline_delete',
          name:'热线电话删除',
          status: 'VALID',
          desc: '热线电话删除、包含热线电话编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'hotline_publish',
          name:'热线电话发布',
          status: 'VALID',
          desc: '热线电话上/下架、包含热线电话编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'hotline_operate',
          name:'热线电话运营',
          status: 'VALID',
          desc: '热线电话相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'matterHandleGuide',
          name:'网上办事指引',
          status: 'VALID',
          desc: '网上办事指引',
          hasLeaf: true,
          children: [
        {
          key: 'matterHandleGuide_edit',
          name:'网上办事编辑',
          status: 'VALID',
          desc: '网上办事创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matterHandleGuide_delete',
          name:'网上办事删除',
          status: 'VALID',
          desc: '网上办事删除、包含网上办事编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matterHandleGuide_publish',
          name:'网上办事发布',
          status: 'VALID',
          desc: '网上办事上/下架、包含网上办事编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'matterHandleGuide_operate',
          name:'网上办事运营',
          status: 'VALID',
          desc: '网上办事相似问',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'smartQa',
          name:'智能小申',
          status: 'VALID',
          desc: '智能小申',
          hasLeaf: true,
          children: []
        },
    ]
        },
    
        {
          key: 'reviewPoint',
          name:'审查要素库',
          status: 'VALID',
          desc: '审查要素查看',
          hasLeaf: true,
          children: [
        {
          key: 'reviewPoint_edit',
          name:'审查要素编辑',
          status: 'VALID',
          desc: '特别程序、申请条件、申请材料、填报表单列表',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'qaManage',
          name:'问答运营',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'emoticon',
          name:'表情包管理',
          status: 'VALID',
          desc: '表情包查看',
          hasLeaf: true,
          children: [
        {
          key: 'emoticon_edit',
          name:'表情包编辑',
          status: 'VALID',
          desc: '表情包编辑、新增',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'emoticon_delete',
          name:'表情包删除',
          status: 'VALID',
          desc: '表情包删除、包含表情包编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'emoticon_publish',
          name:'表情包发布',
          status: 'VALID',
          desc: '表情包上下架、包含表情包编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'dimensionManage',
          name:'维度管理',
          status: 'VALID',
          desc: '维度查看',
          hasLeaf: true,
          children: [
        {
          key: 'dimensionManage_edit',
          name:'维度编辑',
          status: 'VALID',
          desc: '维度创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'dimensionManage_delete',
          name:'维度删除',
          status: 'VALID',
          desc: '维度创建、包含维度编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'hotWords',
          name:'热词管理',
          status: 'VALID',
          desc: '热词查看',
          hasLeaf: true,
          children: [
        {
          key: 'hotWords_edit',
          name:'热词编辑',
          status: 'VALID',
          desc: '热词创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'hotWords_delete',
          name:'热词删除',
          status: 'VALID',
          desc: '热词删除、包含热词编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'synonymsSetting',
          name:'问答设置',
          status: 'VALID',
          desc: '问答设置查看',
          hasLeaf: true,
          children: [
        {
          key: 'synonymsSetting_edit',
          name:'问答编辑',
          status: 'VALID',
          desc: '问答新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'synonymsSetting_delete',
          name:'问答删除',
          status: 'VALID',
          desc: '问答删除、包含问答编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'chatLibrary',
          name:'聊天库',
          status: 'VALID',
          desc: '聊天库查看',
          hasLeaf: true,
          children: [
        {
          key: 'chatLibrary_edit',
          name:'聊天库编辑',
          status: 'VALID',
          desc: '聊天库新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'chatLibrary_delete',
          name:'聊天库删除',
          status: 'VALID',
          desc: '聊天库删除、包含聊天库编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'chatLibrary_publish',
          name:'聊天库发布',
          status: 'VALID',
          desc: '聊天库上下架、包含聊天库编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'hotQuestion',
          name:'热门问题',
          status: 'VALID',
          desc: '热门问题查看',
          hasLeaf: true,
          children: [
        {
          key: 'hotQuestion_edit',
          name:'热门问题编辑',
          status: 'VALID',
          desc: '热门问题创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'hotQuestion_delete',
          name:'热门问题删除',
          status: 'VALID',
          desc: '热门问题删除、包含热门问题编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'qaRefresh',
          name:'刷新',
          status: 'VALID',
          desc: '刷新问答端、刷新shell端',
          hasLeaf: false,
          children: [
        {
          key: 'qaRefresh_allRefresh',
          name:'全部刷新',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'triggerWords',
          name:'触发词管理',
          status: 'VALID',
          desc: '触发词查看',
          hasLeaf: true,
          children: [
        {
          key: 'triggerWords_edit',
          name:'触发词编辑',
          status: 'VALID',
          desc: '热门问题创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'triggerWords_delete',
          name:'触发词删除',
          status: 'VALID',
          desc: '触发词删除、包含触发词编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'triggerWords_publish',
          name:'触发词发布',
          status: 'VALID',
          desc: '触发词上/下架、包含触发词编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'functionWords',
          name:'功能词管理',
          status: 'VALID',
          desc: '功能词查看、导出',
          hasLeaf: true,
          children: [
        {
          key: 'functionWords_edit',
          name:'功能词编辑',
          status: 'VALID',
          desc: '功能词编辑、新增、模板下载、导入',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'functionWords_delete',
          name:'功能词删除',
          status: 'VALID',
          desc: '功能词删除、包含功能词编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'professionalWords',
          name:'专业词管理',
          status: 'VALID',
          desc: '专业词管理',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'rubbishWords',
          name:'垃圾词管理',
          status: 'VALID',
          desc: '垃圾词查看',
          hasLeaf: true,
          children: [
        {
          key: 'rubbishWords_edit',
          name:'触发词编辑',
          status: 'VALID',
          desc: '垃圾词创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'rubbishWords_delete',
          name:'垃圾词删除',
          status: 'VALID',
          desc: '垃圾词删除、包含垃圾词编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'archiveManage',
          name:'用户档案库',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'archiveLib',
          name:'档案库',
          status: 'VALID',
          desc: '档案库查看',
          hasLeaf: true,
          children: [
        {
          key: 'archiveLib_edit',
          name:'档案库编辑',
          status: 'VALID',
          desc: '档案库编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'menuSetting',
          name:'菜单配置',
          status: 'VALID',
          desc: '菜单查看',
          hasLeaf: true,
          children: [
        {
          key: 'menuSetting_edit',
          name:'菜单编辑',
          status: 'VALID',
          desc: '菜单编辑、新增',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'menuSetting_delete',
          name:'菜单删除',
          status: 'VALID',
          desc: '菜单删除、包含菜单编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'menuSetting_publish',
          name:'菜单发布',
          status: 'VALID',
          desc: '菜单上/下架、包含菜单编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'standardMaterial',
          name:'标准材料管理',
          status: 'VALID',
          desc: '标准材料查看、导出',
          hasLeaf: true,
          children: [
        {
          key: 'standardMaterial_edit',
          name:'标准材料编辑',
          status: 'VALID',
          desc: '标准材料新增、编辑、模板下载、导入',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'standardMaterial_delete',
          name:'标准材料删除',
          status: 'VALID',
          desc: '标准材料删除、包含标准材料编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'standardMaterial_publish',
          name:'标准材料发布',
          status: 'VALID',
          desc: '标准材料上下架、包含标准材料编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'standardFieldStore',
          name:'标准字段管理',
          status: 'VALID',
          desc: '标准字段查看、导出',
          hasLeaf: true,
          children: [
        {
          key: 'standardFieldStore_edit',
          name:'标准字段编辑',
          status: 'VALID',
          desc: '标准字段新增、编辑、模板下载、导入',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'standardFieldStore_delete',
          name:'标准字段删除',
          status: 'VALID',
          desc: '标准字段删除、包含标准字段编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'efficacy',
          name:'主题效能管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'themeOpen',
          name:'主题开通统计',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'themeOpen_create',
          name:'主题开通创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeOpen_edit',
          name:'主题开通编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeOpen_delete',
          name:'开通删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'themeDo',
          name:'主题办件统计',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'themeDo_create',
          name:'主题办件创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeDo_edit',
          name:'主题办件编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeDo_delete',
          name:'主题办件删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'workOrder',
          name:'知识库工单',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'workOrderCommit',
          name:'工单上报',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'workOrderCommit_create',
          name:'工单上报创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderCommit_edit',
          name:'工单上报编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderCommit_delete',
          name:'工单上报删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'workOrderConfirm',
          name:'工单确认',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'workOrderConfirm_create',
          name:'工单确认创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderConfirm_edit',
          name:'工单确认编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderConfirm_delete',
          name:'工单确认删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'workOrderKnowledge',
          name:'知识库接口',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'workOrderKnowledge_create',
          name:'知识库接口创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderKnowledge_edit',
          name:'知识库接口编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'workOrderKnowledge_delete',
          name:'知识库接口删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'portraitMenu',
          name:'用户画像库',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'tagManage',
          name:'标签管理',
          status: 'VALID',
          desc: '标签查看',
          hasLeaf: true,
          children: [
        {
          key: 'tagManage_edit',
          name:'标签编辑',
          status: 'VALID',
          desc: '标签创建、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'tagManage_delete',
          name:'标签删除',
          status: 'VALID',
          desc: '标签删除、包含标签编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'tagManage_detail_expandInfo',
          name:'拓展信息',
          status: 'VALID',
          desc: '标签详情页面的基本信息分栏',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'tagManage_detail_reviewRecord',
          name:'审核记录',
          status: 'VALID',
          desc: '标签详情页的审核记录分栏',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'portraitSelf',
          name:'用户管理-个人',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'portraitSelf_create',
          name:'用户管理创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'portraitSelf_edit',
          name:'用户管理编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'portraitSelf_delete',
          name:'用户管理删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'portraitLegal',
          name:'用户管理-法人',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'portraitLegal_create',
          name:'用户管理创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'portraitLegal_edit',
          name:'用户管理编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'portraitLegal_delete',
          name:'用户管理删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'ruleManage',
          name:'规则管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'ruleManage_conditionView',
          name:'查看(限定条件)',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'ruleManage_conditionEdit',
          name:'编辑(限定条件)',
          status: 'VALID',
          desc: '限定条件新增、编辑，包含限定条件查看',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'ruleManage_conditionDelete',
          name:'删除(限定条件)',
          status: 'VALID',
          desc: '限定条件删除，包含限定条件编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'ruleManage_funView',
          name:'查看(函数)',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'ruleManage_funEdit',
          name:'编辑(函数)',
          status: 'VALID',
          desc: '函数新增、编辑，包含函数查看',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'ruleManage_funPublish',
          name:'上下架(函数)',
          status: 'VALID',
          desc: '函数上下架，包含函数编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'tableManage',
          name:'库表管理',
          status: 'VALID',
          desc: '库表查看',
          hasLeaf: true,
          children: [
        {
          key: 'tableManage_edit',
          name:'编辑',
          status: 'VALID',
          desc: '库表编辑、新增',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'tableManage_delete',
          name:'库表删除',
          status: 'VALID',
          desc: '库表删除、包含库表编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'minimalCondition',
          name:'最小条件',
          status: 'VALID',
          desc: '最小条件',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'tagAudit',
          name:'标签审核',
          status: 'VALID',
          desc: '标签审核',
          hasLeaf: true,
          children: [
        {
          key: 'tagAudit_detail_expandInfo',
          name:'拓展信息',
          status: 'VALID',
          desc: '标签详情页面的基本信息分栏',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'tagAudit_detail_reviewRecord',
          name:'审核记录',
          status: 'VALID',
          desc: '标签详情页的审核记录分栏',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'tagSync',
          name:'标签同步',
          status: 'VALID',
          desc: '标签同步',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'outputModule',
          name:'输出管理',
          status: 'VALID',
          desc: '输出模块查看',
          hasLeaf: true,
          children: [
        {
          key: 'outputModule_edit',
          name:'输出模块编辑',
          status: 'VALID',
          desc: '输出模块编辑、新增',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'outputModule_delete',
          name:'输出模块删除',
          status: 'VALID',
          desc: '输出模块删除、包含输出模块编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'recommendTest',
          name:'推荐测试',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'paramsManage',
          name:'参数管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: []
        },
    ]
        },
    
        {
          key: 'sceneData',
          name:'场景用数',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'sceneDataManage',
          name:'场景用数管理',
          status: 'VALID',
          desc: '场景用数管理',
          hasLeaf: true,
          children: []
        },
    ]
        },
    
        {
          key: 'recommendManage',
          name:'推荐管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'modules',
          name:'模块管理',
          status: 'VALID',
          desc: '模块查看',
          hasLeaf: true,
          children: [
        {
          key: 'modules_edit',
          name:'模块编辑',
          status: 'VALID',
          desc: '模块编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'modules_delete',
          name:'模块删除',
          status: 'VALID',
          desc: '模块删除、包含模块编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'strategy',
          name:'策略管理',
          status: 'VALID',
          desc: '策略管理',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'suggestTest',
          name:'推荐测试',
          status: 'VALID',
          desc: '推荐测试',
          hasLeaf: true,
          children: []
        },
    ]
        },
    
        {
          key: 'messageMenu',
          name:'消息中心',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'message',
          name:'消息管理',
          status: 'VALID',
          desc: '消息查看',
          hasLeaf: true,
          children: [
        {
          key: 'message_edit',
          name:'消息编辑',
          status: 'VALID',
          desc: '消息创建、编辑、复制',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'message_delete',
          name:'消息删除',
          status: 'VALID',
          desc: '消息删除、包含消息编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'message_publish',
          name:'消息发布',
          status: 'VALID',
          desc: '上/下架、包含消息编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'certification',
          name:'证照管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'certificationManage',
          name:'证照管理',
          status: 'VALID',
          desc: '证照管理',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'certificationSync',
          name:'证照同步',
          status: 'VALID',
          desc: '证照同步',
          hasLeaf: true,
          children: []
        },
    ]
        },
    
        {
          key: 'tool',
          name:'工具菜单',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'dictManage',
          name:'字典管理',
          status: 'VALID',
          desc: '字典查看',
          hasLeaf: true,
          children: [
        {
          key: 'dictManage_edit',
          name:'字典编辑',
          status: 'INVALID',
          desc: '字典新增、编辑',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'dictManage_delete',
          name:'字典删除',
          status: 'INVALID',
          desc: '字典删除、包含字典编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'summaryInfo',
          name:'统计信息',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'app',
          name:'应用运营',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'appManager',
          name:'主题应用接入',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'appRegister',
          name:'应用注册',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'appRegister_create',
          name:'应用创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'appRegister_edit',
          name:'应用编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'appRegister_delete',
          name:'应用删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'applicationAudit',
          name:'应用审核',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'applicationAudit_create',
          name:'审核创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'applicationAudit_edit',
          name:'审核编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'applicationAudit_delete',
          name:'审核删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    ]
        },
    
        {
          key: 'model',
          name:'模型运营',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'modelManager',
          name:'模型管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'commonModel',
          name:'公共模型',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'commonModel_create',
          name:'模型创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'commonModel_edit',
          name:'模型编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'commonModel_delete',
          name:'模型删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'subscription',
          name:'订阅管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'subscription_create',
          name:'订阅创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'subscription_edit',
          name:'订阅编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'subscription_delete',
          name:'订阅删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    ]
        },
    
        {
          key: 'system',
          name:'系统',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'systemManage',
          name:'系统管理',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'users',
          name:'账号管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'users_create',
          name:'账号创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'users_edit',
          name:'账号编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'users_delete',
          name:'账号删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'role',
          name:'角色管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'role_create',
          name:'角色创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'role_edit',
          name:'角色编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'role_delete',
          name:'角色删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'department',
          name:'部门管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'department_create',
          name:'部门创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'department_edit',
          name:'部门编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'department_delete',
          name:'部门删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'operatingManual',
          name:'产品手册',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'operatingManual_create',
          name:'手册创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'operatingManual_edit',
          name:'手册编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'operatingManual_delete',
          name:'手册删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'logRecord',
          name:'日志监控管理',
          status: 'VALID',
          desc: '日志监控管理',
          hasLeaf: true,
          children: []
        },
    
        {
          key: 'taskManage',
          name:'任务管理',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'taskManage_create',
          name:'任务创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'taskManage_edit',
          name:'任务编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'taskManage_delete',
          name:'任务删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    
        {
          key: 'systemConfig',
          name:'系统配置',
          status: 'VALID',
          desc: null,
          hasLeaf: false,
          children: [
        {
          key: 'themeConfig',
          name:'主题配置',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'themeConfig_create',
          name:'配置创建',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeConfig_edit',
          name:'配置编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'themeConfig_delete',
          name:'配置删除',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'loginConfig',
          name:'登录配置',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'loginConfig_edit',
          name:'登录配置编辑',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'auditChain',
          name:'审核链配置',
          status: 'VALID',
          desc: null,
          hasLeaf: true,
          children: [
        {
          key: 'auditChain_config',
          name:'配置审核链',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'auditChain_clear',
          name:'清除配置',
          status: 'INVALID',
          desc: null,
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'departmentDict',
          name:'字典配置',
          status: 'VALID',
          desc: '字典权限配置',
          hasLeaf: true,
          children: [
        {
          key: 'departmentDict_edit',
          name:'字典配置编辑',
          status: 'VALID',
          desc: '字典配置编辑、新增',
          hasLeaf: false,
          children: []
        },
    
        {
          key: 'departmentDict_delete',
          name:'字典配置删除',
          status: 'VALID',
          desc: '字典配置删除、包含编辑',
          hasLeaf: false,
          children: []
        },
    ]
        },
    
        {
          key: 'subsystem',
          name:'子系统',
          status: 'VALID',
          desc: '子系统配置',
          hasLeaf: false,
          children: []
        },
    ]
        },
    ]
        },
    ];

const permissionKeys = ["content","themeManage","themeAccess","themeAudit","infoLibrary","themeOperation","matters","matters_edit","matters_editmore","matters_split","matters_origin","matters_bluk","matters_delete","matters_publish","matters_operate","mattersSync","materialSplit","materialSplit_edit","materialSplit_delete","scenes","scenes_edit","scenes_bluk","scenes_delete","scenes_table","scenes_publish","scenes_operate","scenesAudit","oneFormManager","oneMatter","oneMatter_edit","oneMatter_delete","oneMatter_publish","oneMatter_operate","policyKnowledgeLib","policyContent","policyContent_edit","policyContent_delete","policyContent_publish","policyContent_operate","policyGraph","policyWord","policyWord_edit","policyWord_delete","policyWord_publish","policyWord_operate","institutionManage","institutionManage_edit","institutionManage_delete","institutionManage_publish","institutionManage_operate","article","article_edit","article_delete","article_publish","service","service_edit","service_bulk","service_delete","service_publish","service_operate","projectManage","projectManage_edit","projectManage_delete","projectManage_publish","projectManage_operate","policyProjectSync","synonyms","synonyms_edit","synonyms_delete","synonyms_publish","synonyms_operate","policyExplain","policyExplain_edit","policyExplain_delete","policyExplain_publish","policyExplain_operate","hotline","hotline_edit","hotline_delete","hotline_publish","hotline_operate","matterHandleGuide","matterHandleGuide_edit","matterHandleGuide_delete","matterHandleGuide_publish","matterHandleGuide_operate","smartQa","reviewPoint","reviewPoint_edit","qaManage","emoticon","emoticon_edit","emoticon_delete","emoticon_publish","dimensionManage","dimensionManage_edit","dimensionManage_delete","hotWords","hotWords_edit","hotWords_delete","synonymsSetting","synonymsSetting_edit","synonymsSetting_delete","chatLibrary","chatLibrary_edit","chatLibrary_delete","chatLibrary_publish","hotQuestion","hotQuestion_edit","hotQuestion_delete","qaRefresh","triggerWords","triggerWords_edit","triggerWords_delete","triggerWords_publish","functionWords","functionWords_edit","functionWords_delete","professionalWords","rubbishWords","rubbishWords_edit","rubbishWords_delete","archiveManage","archiveLib","archiveLib_edit","menuSetting","menuSetting_edit","menuSetting_delete","menuSetting_publish","standardMaterial","standardMaterial_edit","standardMaterial_delete","standardMaterial_publish","standardFieldStore","standardFieldStore_edit","standardFieldStore_delete","efficacy","themeOpen","themeDo","workOrder","workOrderCommit","workOrderConfirm","workOrderKnowledge","portraitMenu","tagManage","tagManage_edit","tagManage_delete","tagManage_detail_expandInfo","tagManage_detail_reviewRecord","portraitSelf","portraitLegal","ruleManage","ruleManage_conditionView","ruleManage_conditionEdit","ruleManage_conditionDelete","ruleManage_funView","ruleManage_funEdit","ruleManage_funPublish","tableManage","tableManage_edit","tableManage_delete","minimalCondition","tagAudit","tagAudit_detail_expandInfo","tagAudit_detail_reviewRecord","tagSync","outputModule","outputModule_edit","outputModule_delete","recommendTest","paramsManage","sceneData","sceneDataManage","recommendManage","modules","modules_edit","modules_delete","strategy","suggestTest","messageMenu","message","message_edit","message_delete","message_publish","certification","certificationManage","certificationSync","tool","dictManage","summaryInfo","app","appManager","appRegister","applicationAudit","model","modelManager","commonModel","subscription","system","systemManage","users","role","department","operatingManual","logRecord","taskManage","systemConfig","themeConfig","loginConfig","auditChain","departmentDict","departmentDict_edit","departmentDict_delete","subsystem"];

const authEnum = {"content":"content","themeManage":"themeManage","themeAccess":"themeAccess","themeAudit":"themeAudit","infoLibrary":"infoLibrary","themeOperation":"themeOperation","matters":"matters","matters_edit":"matters_edit","matters_edit_alias":["matters_edit","matters_bluk","matters_delete","matters_publish","matters_editmore"],"matters_editmore":"matters_editmore","matters_split":"matters_split","matters_origin":"matters_origin","matters_bluk":"matters_bluk","matters_delete":"matters_delete","matters_publish":"matters_publish","matters_operate":"matters_operate","mattersSync":"mattersSync","materialSplit":"materialSplit","materialSplit_edit":"materialSplit_edit","materialSplit_edit_alias":["materialSplit_edit","materialSplit_delete"],"materialSplit_delete":"materialSplit_delete","scenes":"scenes","scenes_edit":"scenes_edit","scenes_edit_alias":["scenes_edit","scenes_bluk","scenes_delete"],"scenes_bluk":"scenes_bluk","scenes_delete":"scenes_delete","scenes_table":"scenes_table","scenes_publish":"scenes_publish","scenes_operate":"scenes_operate","scenesAudit":"scenesAudit","oneFormManager":"oneFormManager","oneMatter":"oneMatter","oneMatter_edit":"oneMatter_edit","oneMatter_edit_alias":["oneMatter_edit","oneMatter_delete","oneMatter_publish"],"oneMatter_delete":"oneMatter_delete","oneMatter_publish":"oneMatter_publish","oneMatter_operate":"oneMatter_operate","policyKnowledgeLib":"policyKnowledgeLib","policyContent":"policyContent","policyContent_edit":"policyContent_edit","policyContent_edit_alias":["policyContent_edit","policyContent_delete","policyContent_publish"],"policyContent_delete":"policyContent_delete","policyContent_publish":"policyContent_publish","policyContent_operate":"policyContent_operate","policyGraph":"policyGraph","policyWord":"policyWord","policyWord_edit":"policyWord_edit","policyWord_edit_alias":["policyWord_edit","policyWord_delete","policyWord_publish"],"policyWord_delete":"policyWord_delete","policyWord_publish":"policyWord_publish","policyWord_operate":"policyWord_operate","institutionManage":"institutionManage","institutionManage_edit":"institutionManage_edit","institutionManage_edit_alias":["institutionManage_edit","institutionManage_delete","institutionManage_publish"],"institutionManage_delete":"institutionManage_delete","institutionManage_publish":"institutionManage_publish","institutionManage_operate":"institutionManage_operate","article":"article","article_edit":"article_edit","article_edit_alias":["article_edit","article_delete","article_publish"],"article_delete":"article_delete","article_publish":"article_publish","service":"service","service_edit":"service_edit","service_edit_alias":["service_edit","service_delete","service_publish"],"service_bulk":"service_bulk","service_delete":"service_delete","service_publish":"service_publish","service_operate":"service_operate","projectManage":"projectManage","projectManage_edit":"projectManage_edit","projectManage_edit_alias":["projectManage_edit","projectManage_delete","projectManage_publish","projectManage_operate"],"projectManage_delete":"projectManage_delete","projectManage_publish":"projectManage_publish","projectManage_operate":"projectManage_operate","policyProjectSync":"policyProjectSync","synonyms":"synonyms","synonyms_edit":"synonyms_edit","synonyms_edit_alias":["synonyms_edit","synonyms_delete","synonyms_publish"],"synonyms_delete":"synonyms_delete","synonyms_publish":"synonyms_publish","synonyms_operate":"synonyms_operate","policyExplain":"policyExplain","policyExplain_edit":"policyExplain_edit","policyExplain_edit_alias":["policyExplain_edit","policyExplain_delete","policyExplain_publish"],"policyExplain_delete":"policyExplain_delete","policyExplain_publish":"policyExplain_publish","policyExplain_operate":"policyExplain_operate","hotline":"hotline","hotline_edit":"hotline_edit","hotline_edit_alias":["hotline_edit","hotline_delete","hotline_publish"],"hotline_delete":"hotline_delete","hotline_publish":"hotline_publish","hotline_operate":"hotline_operate","matterHandleGuide":"matterHandleGuide","matterHandleGuide_edit":"matterHandleGuide_edit","matterHandleGuide_edit_alias":["matterHandleGuide_edit","matterHandleGuide_delete","matterHandleGuide_publish"],"matterHandleGuide_delete":"matterHandleGuide_delete","matterHandleGuide_publish":"matterHandleGuide_publish","matterHandleGuide_operate":"matterHandleGuide_operate","smartQa":"smartQa","reviewPoint":"reviewPoint","reviewPoint_edit":"reviewPoint_edit","qaManage":"qaManage","emoticon":"emoticon","emoticon_edit":"emoticon_edit","emoticon_edit_alias":["emoticon_edit","emoticon_delete","emoticon_publish"],"emoticon_delete":"emoticon_delete","emoticon_publish":"emoticon_publish","dimensionManage":"dimensionManage","dimensionManage_edit":"dimensionManage_edit","dimensionManage_edit_alias":["dimensionManage_edit","dimensionManage_delete"],"dimensionManage_delete":"dimensionManage_delete","hotWords":"hotWords","hotWords_edit":"hotWords_edit","hotWords_edit_alias":["hotWords_edit","hotWords_delete"],"hotWords_delete":"hotWords_delete","synonymsSetting":"synonymsSetting","synonymsSetting_edit":"synonymsSetting_edit","synonymsSetting_edit_alias":["synonymsSetting_edit","synonymsSetting_delete"],"synonymsSetting_delete":"synonymsSetting_delete","chatLibrary":"chatLibrary","chatLibrary_edit":"chatLibrary_edit","chatLibrary_edit_alias":["chatLibrary_edit","chatLibrary_delete"],"chatLibrary_delete":"chatLibrary_delete","chatLibrary_publish":"chatLibrary_publish","hotQuestion":"hotQuestion","hotQuestion_edit":"hotQuestion_edit","hotQuestion_edit_alias":["hotQuestion_edit","hotQuestion_delete"],"hotQuestion_delete":"hotQuestion_delete","qaRefresh":"qaRefresh","triggerWords":"triggerWords","triggerWords_edit":"triggerWords_edit","triggerWords_edit_alias":["triggerWords_edit","triggerWords_delete","triggerWords_publish"],"triggerWords_delete":"triggerWords_delete","triggerWords_publish":"triggerWords_publish","functionWords":"functionWords","functionWords_edit":"functionWords_edit","functionWords_edit_alias":["functionWords_edit","functionWords_delete"],"functionWords_delete":"functionWords_delete","professionalWords":"professionalWords","rubbishWords":"rubbishWords","rubbishWords_edit":"rubbishWords_edit","rubbishWords_edit_alias":["rubbishWords_edit","rubbishWords_delete"],"rubbishWords_delete":"rubbishWords_delete","archiveManage":"archiveManage","archiveLib":"archiveLib","archiveLib_edit":"archiveLib_edit","menuSetting":"menuSetting","menuSetting_edit":"menuSetting_edit","menuSetting_edit_alias":["menuSetting_edit","menuSetting_delete","menuSetting_publish"],"menuSetting_delete":"menuSetting_delete","menuSetting_publish":"menuSetting_publish","standardMaterial":"standardMaterial","standardMaterial_edit":"standardMaterial_edit","standardMaterial_edit_alias":["standardMaterial_edit","standardMaterial_delete"],"standardMaterial_delete":"standardMaterial_delete","standardMaterial_publish":"standardMaterial_publish","standardFieldStore":"standardFieldStore","standardFieldStore_edit":"standardFieldStore_edit","standardFieldStore_edit_alias":["standardFieldStore_edit","standardFieldStore_delete"],"standardFieldStore_delete":"standardFieldStore_delete","efficacy":"efficacy","themeOpen":"themeOpen","themeDo":"themeDo","workOrder":"workOrder","workOrderCommit":"workOrderCommit","workOrderConfirm":"workOrderConfirm","workOrderKnowledge":"workOrderKnowledge","portraitMenu":"portraitMenu","tagManage":"tagManage","tagManage_edit":"tagManage_edit","tagManage_edit_alias":["tagManage_edit","tagManage_delete"],"tagManage_delete":"tagManage_delete","tagManage_detail_expandInfo":"tagManage_detail_expandInfo","tagManage_detail_reviewRecord":"tagManage_detail_reviewRecord","portraitSelf":"portraitSelf","portraitLegal":"portraitLegal","ruleManage":"ruleManage","ruleManage_conditionView":"ruleManage_conditionView","ruleManage_conditionView_alias":["ruleManage_conditionView","ruleManage_conditionEdit","ruleManage_conditionDelete"],"ruleManage_conditionEdit":"ruleManage_conditionEdit","ruleManage_conditionEdit_alias":["ruleManage_conditionEdit","ruleManage_conditionDelete"],"ruleManage_conditionDelete":"ruleManage_conditionDelete","ruleManage_funView":"ruleManage_funView","ruleManage_funView_alias":["ruleManage_funView","ruleManage_funEdit","ruleManage_funPublish"],"ruleManage_funEdit":"ruleManage_funEdit","ruleManage_funEdit_alias":["ruleManage_funEdit","ruleManage_funPublish"],"ruleManage_funPublish":"ruleManage_funPublish","tableManage":"tableManage","tableManage_edit":"tableManage_edit","tableManage_edit_alias":["tableManage_edit","tableManage_delete"],"tableManage_delete":"tableManage_delete","minimalCondition":"minimalCondition","tagAudit":"tagAudit","tagAudit_detail_expandInfo":"tagAudit_detail_expandInfo","tagAudit_detail_reviewRecord":"tagAudit_detail_reviewRecord","tagSync":"tagSync","outputModule":"outputModule","outputModule_edit":"outputModule_edit","outputModule_edit_alias":["outputModule_edit","outputModule_delete"],"outputModule_delete":"outputModule_delete","recommendTest":"recommendTest","paramsManage":"paramsManage","sceneData":"sceneData","sceneDataManage":"sceneDataManage","recommendManage":"recommendManage","modules":"modules","modules_edit":"modules_edit","modules_edit_alias":["modules_edit","modules_delete"],"modules_delete":"modules_delete","strategy":"strategy","suggestTest":"suggestTest","messageMenu":"messageMenu","message":"message","message_edit":"message_edit","message_edit_alias":["message_edit","message_delete","message_publish"],"message_delete":"message_delete","message_publish":"message_publish","certification":"certification","certificationManage":"certificationManage","certificationSync":"certificationSync","tool":"tool","dictManage":"dictManage","summaryInfo":"summaryInfo","app":"app","appManager":"appManager","appRegister":"appRegister","applicationAudit":"applicationAudit","model":"model","modelManager":"modelManager","commonModel":"commonModel","subscription":"subscription","system":"system","systemManage":"systemManage","users":"users","role":"role","department":"department","operatingManual":"operatingManual","logRecord":"logRecord","taskManage":"taskManage","systemConfig":"systemConfig","themeConfig":"themeConfig","loginConfig":"loginConfig","auditChain":"auditChain","departmentDict":"departmentDict","departmentDict_edit":"departmentDict_edit","departmentDict_edit_alias":["departmentDict_edit","departmentDict_delete"],"departmentDict_delete":"departmentDict_delete","subsystem":"subsystem"}

const global = {
    viewPermissions,
    treePermissions, 
    permissionKeys,
    authEnum,
}

export default global;
    