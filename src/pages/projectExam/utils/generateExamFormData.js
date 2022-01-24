import _ from 'lodash';

function generateExamFormData({
  projectId: id,
  accordScore,
  accordScoreStage = [],
  remarks,
  customize = '',
  questions = [],
  score,
  scoreStage = [],
  mockUserData = '{}',
  jsScript,
  questionGroups = [],
}) {
  return {
    examinationForm: {
      accordScore,
      accordScoreRule: _.map(accordScoreStage, ({ stageMin, num, name }) => {
        return {
          min: stageMin,
          max: num,
          name,
        };
      }),
      projectId: id,
      remarks,
      customize,
      questionGroups: _.map(questionGroups, group => {
        const { questionIds = [], ...others } = group;
        return {
          ...others,
          questions: _.map(questionIds, qid => {
            return { id: qid };
          }),
        };
      }),
      schema: _.map(
        questions,
        ({
          id: qid,
          name: qname,
          remarks: qRemarks,
          required,
          policyWords: rPolicyWords = [],
          items,
          type,
          rules: rRules,
        }) => {
          return {
            id: qid,
            type,
            name: qname,
            remarks: qRemarks,
            policyWords: _.map(rPolicyWords, val => ({ id: val })),
            rules: rRules || null,
            required,
            items: items
              ? _.map(
                  items,
                  ({
                    text,
                    policyWords: oPolicyWords = [],
                    value,
                    score: oScore,
                    remarks: oRemarks,
                    accord,
                    cue,
                    mutex,
                    aliasCode,
                    accordScore: oAccordScore,
                  }) => {
                    return {
                      value,
                      text,
                      remarks: oRemarks,
                      score: oScore,
                      accordScore: oAccordScore,
                      accord,
                      cue,
                      mutex,
                      aliasCode,
                      policyWords: _.map(oPolicyWords, val => ({ id: val })),
                    };
                  },
                )
              : null,
          };
        },
      ),
      score,
      scoreRule: _.map(scoreStage, ({ stageMin, num, name }) => {
        return {
          min: stageMin,
          max: num,
          name,
        };
      }),
    },
    jsExpression: {
      extraData: JSON.parse(mockUserData),
      jsScript,
    },
    projectId: id,
  };
}

export default generateExamFormData;
