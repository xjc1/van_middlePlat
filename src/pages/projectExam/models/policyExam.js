import _ from 'lodash';
import { DECLAREPROJECT, PROJECTOVERVIEWS } from '@/services/api';
import { message } from 'antd';
import { QuestionType } from '../Question';
import StageHelper from '@/pages/projectExam/StageHelper';
import { policyexamNecessary } from '@/utils/constantEnum';
import { utils } from '@/components/tis_ui';
import generateExamFormData from '../utils/generateExamFormData';

const { IDGenerator } = utils;

const minScore = 0;

const questionIDGenerator = new IDGenerator('question');
const ruleIDGenerator = new IDGenerator('rule');
const ruleItemIDGenerator = new IDGenerator('rule_item');
const optionIdGenerator = new IDGenerator('option');

const initTemp = `/*
   代码格式要求：仅支持es5语法
   输入参数说明: formData   对象  包含用户表单录入数据.
               extraData   对象  包含此体检用户配置信息.
*/

/* ↓↓↓↓↓↓计算逻辑写到这里↓↓↓↓↓↓↓↓ */
 console.log('formData ==> ',formData);
 console.log('extraData ==> ',extraData);

/* 记得返回值(一个对象) */
return {};
`;

const defaultMockUserData = `{
    "description": "extraData 模拟数据, (注意: 只能是key,value的json格式)"

}`;

const defaultValue = {
  remarks: '',
  customize: '',
  policyWords: null,
  scoreStageHelper: StageHelper.create(),
  accordScoreStageHelper: StageHelper.create(),
  questions: [],
  currentQuestionForm: null,
  temp: initTemp,
  mockUserData: defaultMockUserData,
};

function initExamData(
  pName,
  {
    remarks,
    customize,
    schema,
    score,
    accordScore,
    policyWords = [],
    scoreRule,
    accordScoreRule,
    jsExpression = {},
    questionGroups = [],
  },
) {
  const { jsScript, extraData } = jsExpression;
  return {
    currentProject: {
      name: pName,
    },
    questionGroups: _.map(questionGroups, group => {
      const { questions = [], ...others } = group;
      return {
        ...others,
        questionIds: _.map(questions, ({ id }) => {
          return id;
        }),
      };
    }),
    remarks,
    customize,
    temp: jsScript || initTemp,
    previewFormData: {},
    mockUserData: JSON.stringify(extraData) || defaultMockUserData,
    policyWords: _.map(policyWords, ({ id: wid }) => wid),
    scoreStageHelper: StageHelper.create(
      score,
      _.map(scoreRule, ({ max, min, name: stageName }, i) => {
        return {
          max: score,
          stageMin: min,
          min: minScore,
          num: max,
          name: stageName,
          index: i + 1,
        };
      }),
    ),
    accordScoreStageHelper: StageHelper.create(
      accordScore,
      _.map(accordScoreRule, ({ max, min, name: stageName }, i) => {
        return {
          max: accordScore,
          stageMin: min,
          min: minScore,
          num: max,
          name: stageName,
          index: i + 1,
        };
      }),
    ),
    questions: _.map(
      schema,
      ({
        id,
        items,
        name,
        policyWords: qPolicyWords = [],
        type,
        remarks: qRemarks,
        rules,
        required,
      }) => ({
        id,
        qid: questionIDGenerator.next(),
        name,
        remarks: qRemarks,
        type,
        required,
        policyWords: _.map(qPolicyWords, ({ id: wid }) => wid),
        rules: _.map(rules, rule => {
          const { items: ruleItems = [] } = rule;
          return {
            ...rule,
            items: _.map(ruleItems, item => ({ ...item, id: ruleItemIDGenerator.next() })),
            id: ruleIDGenerator.next(),
          };
        }),
        items: _.map(
          items,
          ({
            policyWords: oPolicyWords,
            remarks: oRemarks,
            score: oScore,
            accordScore: oAccordScore,
            accord,
            text,
            value,
            cue,
            mutex,
            aliasCode,
          }) => ({
            policyWords: _.map(oPolicyWords, ({ id: wid }) => wid),
            remarks: oRemarks,
            score: oScore,
            accordScore: oAccordScore,
            accord,
            text,
            value,
            cue,
            mutex,
            aliasCode,
            id: optionIdGenerator.next(),
          }),
        ),
      }),
    ),
  };
}

function createQuestion({
  id,
  type = QuestionType.OneOf.id,
  required = policyexamNecessary.default,
  content,
  remarks,
  wiki,
}) {
  return {
    id,
    qid: questionIDGenerator.next(),
    content,
    remarks,
    wiki,
    required,
    type,
    items: [],
  };
}

function createRuleItem() {
  return { rule: '>', value: 0, id: ruleItemIDGenerator.next() };
}

function createRule() {
  return {
    items: [createRuleItem()],
    tip: '',
    score: 0,
    id: ruleIDGenerator.next(),
  };
}

const PolicyExam = {
  namespace: 'policyExam',
  state: null,
  effects: {
    *flushDeclareProject({ id, examType }, { put }) {
      let res = {};
      if (examType === 'projectView') {
        res = yield PROJECTOVERVIEWS.findAllProjectOverviewUsingGET(id);
      } else {
        res = yield DECLAREPROJECT.getProjectDetailUsingGET(id);
      }
      const { name, exam, jsExpression } = res;
      const examData = { ...exam, jsExpression };
      if (exam) {
        const data = initExamData(name, examData);
        yield put({
          type: 'init',
          data,
        });
      } else {
        yield put({
          type: 'init',
          data: {
            currentProject: {
              name,
            },
            ...defaultValue,
          },
        });
      }
    },

    *submitProjectExam({ id, examType }, { select }) {
      const exam = yield select(({ policyExam }) => policyExam);
      const {
        remarks,
        customize,
        scoreStageHelper,
        accordScoreStageHelper,
        questions,
        mockUserData,
        temp: jsScript,
        questionGroups,
      } = exam;
      const [score, scoreStage] = scoreStageHelper.val();
      const [accordScore, accordScoreStage] = accordScoreStageHelper.val();

      const body = generateExamFormData({
        projectId: id,
        accordScore,
        accordScoreStage,
        remarks,
        customize,
        questions,
        score,
        scoreStage,
        mockUserData,
        jsScript,
        questionGroups,
      });
      try {
        if (examType === 'projectView') {
          yield PROJECTOVERVIEWS.examinationProjectUsingPUT({ body });
        } else {
          yield DECLAREPROJECT.examinationProjectUsingPOST({ body });
        }
        message.success('保存成功');
      } catch (e) {
        message.error(`保存失败，失败原因：${e.msg}`);
      }
    },
  },
  reducers: {
    init(state, { data }) {
      return data;
    },

    resetState() {
      return null;
    },

    changeQuestion(state, { questionId }) {
      const { questions } = state;
      const question = _.find(questions, { id: questionId });
      return {
        ...state,
        currentQuestionForm: question,
      };
    },

    setScore(state, { payload }) {
      return {
        ...state,
        scoreStageHelper: payload,
      };
    },

    setAccordScore(state, { payload }) {
      return {
        ...state,
        accordScoreStageHelper: payload,
      };
    },

    removeQuestion(state, { removeId }) {
      const { questions } = state;
      return {
        ...state,
        currentQuestionForm: null,
        questions: _.filter(questions, ({ qid }) => qid !== removeId),
      };
    },

    changeQuestionType(state, { nextType }) {
      const { currentQuestionForm, questions } = state;
      switch (nextType) {
        case QuestionType.OneOf.id:
          currentQuestionForm.type = QuestionType.OneOf.id;
          currentQuestionForm.items = [];
          delete currentQuestionForm.rules;
          break;
        case QuestionType.SomeOf.id:
          currentQuestionForm.type = QuestionType.SomeOf.id;
          currentQuestionForm.items = [];
          delete currentQuestionForm.rules;
          break;
        case QuestionType.NumInput.id:
          currentQuestionForm.type = QuestionType.NumInput.id;
          currentQuestionForm.rules = [createRule()];
          delete currentQuestionForm.items;
          break;
        default:
      }
      return {
        ...state,
        currentQuestionForm,
        questions,
      };
    },

    setProjectRemarks(state, { remarks }) {
      return {
        ...state,
        remarks,
      };
    },

    setProjectCustomize(state, { customize }) {
      return {
        ...state,
        customize,
      };
    },

    setProjectPolicyWords(state, { policyWords }) {
      return {
        ...state,
        policyWords,
      };
    },

    newQuestion(state, { id }) {
      const { questions } = state;
      questions.push(createQuestion({ id }));
      return {
        ...state,
        questions,
        currentQuestionForm: questions[questions.length - 1],
      };
    },

    setQuestion(state, { payload: { qid, id, name, remarks, type, policyWords, required } }) {
      const { questions } = state;
      const questionForm = _.find(questions, { qid });
      questionForm.id = id;
      questionForm.name = name;
      questionForm.remarks = remarks;
      questionForm.policyWords = policyWords;
      questionForm.type = type;
      questionForm.required = required;
      if (required === policyexamNecessary.default) {
        questionForm.items = _.map(questionForm.items, item => {
          return {
            ...item,
            accordScore: undefined,
          };
        });
      }
      return {
        ...state,
        currentQuestionForm: questionForm,
      };
    },

    changeQuestionIndex(state, { questions }) {
      return { ...state, questions };
    },

    addQuestionGroup(state, { id }) {
      const { questionGroups } = state;
      return {
        ...state,
        questionGroups: [...questionGroups, { id }],
      };
    },

    reduceQuestionGroup(state, { id: nextId }) {
      const { questionGroups } = state;
      return { ...state, questionGroups: _.filter(questionGroups, ({ id }) => id !== nextId) };
    },

    updateQuestionGroups(state, { payload }) {
      const { questionGroups } = state;
      return {
        ...state,
        questionGroups: _.map(questionGroups, group => {
          const { id } = group;
          return {
            ...group,
            ...payload[id],
          };
        }),
      };
    },

    newOption(state, { value }) {
      const { currentQuestionForm } = state;
      currentQuestionForm.items = [
        ...currentQuestionForm.items,
        {
          id: optionIdGenerator.next(),
          remarks: null,
          policyWords: [],
          value,
          score: 0,
          accordScore: 0,
          text: '',
          cue: null,
        },
      ];
      return {
        ...state,
        currentQuestionForm,
      };
    },

    setOption(state, { payload: { id, ...others } }) {
      const { currentQuestionForm } = state;
      const { items } = currentQuestionForm;
      currentQuestionForm.items = _.map(items, item => {
        if (item.id === id) {
          return {
            ...item,
            ...others,
          };
        }
        return item;
      });
      return {
        ...state,
        currentQuestionForm,
      };
    },

    removeOption(state, { id }) {
      const { currentQuestionForm } = state;
      currentQuestionForm.items = _.filter(currentQuestionForm.items, item => item.id !== id);
      return {
        ...state,
        currentQuestionForm,
      };
    },

    setOptionRichText(state, { payload: { id, cue } }) {
      const { currentQuestionForm } = state;
      const { items } = currentQuestionForm;
      const option = _.find(items, { id });
      option.cue = cue;
      return {
        ...state,
        currentQuestionForm,
      };
    },

    setRules(state, { rules }) {
      const { currentQuestionForm } = state;
      delete currentQuestionForm.items;
      currentQuestionForm.rules = rules;
      return {
        ...state,
        currentQuestionForm,
      };
    },

    removeRule(state, { removeId }) {
      const { currentQuestionForm } = state;
      currentQuestionForm.rules = _.filter(currentQuestionForm.rules, rule => rule.id !== removeId);
      return {
        ...state,
        currentQuestionForm,
      };
    },

    removeRuleItem(state, { payload: { id, removeId } }) {
      const { currentQuestionForm } = state;
      const rule = _.find(currentQuestionForm.rules, { id });
      rule.items = _.filter(rule.items, item => item.id !== removeId);
      currentQuestionForm.rules = [...currentQuestionForm.rules];
      return {
        ...state,
        currentQuestionForm,
      };
    },

    addRuleItem(state, { id }) {
      const { currentQuestionForm } = state;
      const rule = _.find(currentQuestionForm.rules, { id });
      rule.items = [...rule.items, createRuleItem()];
      currentQuestionForm.rules = [...currentQuestionForm.rules];
      return {
        ...state,
        currentQuestionForm: { ...currentQuestionForm },
      };
    },

    addRule(state) {
      const { currentQuestionForm } = state;
      currentQuestionForm.rules = [...currentQuestionForm.rules, createRule()];
      return {
        ...state,
        currentQuestionForm,
      };
    },

    setTemp(state, { temp }) {
      return {
        ...state,
        temp,
      };
    },

    updateFormData(state, { previewFormData }) {
      return {
        ...state,
        previewFormData: _.reduce(
          previewFormData,
          (result, v, k) => {
            if (!_.isNil(v)) {
              // eslint-disable-next-line no-param-reassign
              result[k] = String(v);
            }
            return result;
          },
          {},
        ),
      };
    },

    setUserData(state, { mockUserData }) {
      return {
        ...state,
        mockUserData,
      };
    },
  },
};
export default PolicyExam;
