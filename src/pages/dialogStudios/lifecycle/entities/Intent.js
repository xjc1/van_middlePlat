/* eslint-disable class-methods-use-this */
import BaseEntity from '../BaseEntity';
import _ from "lodash";
import { utils } from "@/components/tis_ui";

const { IDGenerator } = utils;
const similarIdGenerator = new IDGenerator('similar');
const slotIdGenerator = new IDGenerator('slot');

export default class Intent extends BaseEntity {

  initData({ triggerId, name, conf: { similarList = [], slots: innerSlots = [] } }) {
    return {
      id: triggerId,
      name,
      similarList: _.map(similarList, ({ content, threshold = 0 }) => {
        return {
          content,
          threshold,
          id: similarIdGenerator.next(),
        };
      }),
      slots: _.map(innerSlots, (slot) => {
        return {
          ...slot,
          id: slotIdGenerator.next(),
        };
      })
    };
  }

  formData({ similarList, slots: slotsConfig, id, name }) {
    return {
      name,
      triggerId: id,
      version: null,
      type: 1,
      conf: {
        similarList: _.map(similarList, ({ id: unuseid, ...similarOthers }) => similarOthers),
        slots: _.map(slotsConfig, ({ id: unuseid, ...slotOthers }) => slotOthers),
      }
    };
  }
}
