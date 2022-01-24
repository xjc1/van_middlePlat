/* eslint-disable class-methods-use-this */
import BaseEntity from "../BaseEntity";
import _ from "lodash";
import { utils } from '@/components/tis_ui';

const { IDGenerator } = utils;

const ruleIdGenerator = new IDGenerator('rule');
export default class Rule extends BaseEntity {

  initData({ triggerId, name, conf = {} }) {
    const { rules: innerRules = [], randomMatchCount } = conf;
    return {
      id: triggerId,
      name,
      innerRules: _.map(innerRules, (rule) => {
        return {
          ...rule,
          id: ruleIdGenerator.next(),
        };
      }),
      randomMatchCount,
    };
  }

  formData({ name, innerRules, id, randomMatchCount }) {
    return {
      name,
      triggerId: id,
      version: null,
      type: 2,
      conf: {
        rules: _.map(innerRules, ({ require, rule }) => {
          return { rule, require: !!require };
        }),
        randomMatchCount,
      }
    };
  }

}
