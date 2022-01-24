import _ from 'lodash';

const defaultScore = 100;
const minScore = 0;

class StageHelper {
  defaultStage = [
    {
      max: defaultScore,
      stageMin: minScore,
      min: minScore,
      num: defaultScore,
      name: 'stage_1',
      index: 1,
    },
  ];

  score = null;

  scoreStage = null;

  static create(score = 100, scoreStage = []) {
    return new StageHelper(
      score,
      scoreStage.length === 0
        ? [
            {
              max: score,
              stageMin: minScore,
              min: minScore,
              num: score,
              name: 'stage_1',
              index: 1,
            },
          ]
        : scoreStage,
    );
  }

  constructor(score, scoreStage) {
    this.score = score || defaultScore;
    this.scoreStage = scoreStage || this.defaultStage;
  }

  setScore(score) {
    this.score = score;
    this.scoreStage = [
      { max: score, stageMin: minScore, min: minScore, num: score, name: 'stage_1', index: 1 },
    ];
    return this;
  }

  deleteStage(index) {
    this.scoreStage[index - 1].num = this.scoreStage[index].num;
    const removeIndex = this.scoreStage[index].index;
    const nextScoreStage = _.remove(this.scoreStage, ({ index: i }) => i !== removeIndex);
    this.scoreStage = nextScoreStage;
    return this;
  }

  setStageName(index, name) {
    this.scoreStage[index].name = name;
    return this;
  }

  changeStageStart(index, num) {
    if (index === 0) {
      this.scoreStage[index].stageMin = num;
    }
    return this;
  }

  changeStage(index, num) {
    this.scoreStage[index].num = num;
    const nextStage = this.scoreStage[index + 1];
    if (nextStage) {
      nextStage.stageMin = num + 1;
    } else {
      this.scoreStage.push({
        min: minScore,
        max: this.score,
        stageMin: num + 1,
        num: this.score,
        name: `stage_${this.scoreStage[index].index + 1}`,
        index: this.scoreStage[index].index + 1,
      });
    }
    return this;
  }

  val() {
    return [this.score, [...this.scoreStage]];
  }
}

export default StageHelper;
