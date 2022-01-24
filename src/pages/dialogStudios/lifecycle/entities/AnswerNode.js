/* eslint-disable class-methods-use-this */
import BaseNode from "../BaseNode";
import { qaAnswerSource } from "@/utils/constantEnum";

function getConf(nextSetting = {}) {
  const { knowledge = {}, type, url, code, source, rickText } = nextSetting;
  switch (type) {
    case qaAnswerSource.RichText:
      return {
        type,
        content: rickText,
      };
    case qaAnswerSource.Knowledge: {
      const { type: contentType, value } = knowledge;
      return {
        type,
        content: {
          id: value,
          type: contentType,
        },
      };
    }
    case qaAnswerSource.Service: {
      return {
        type,
        content: {
          type: source,
          code,
          url,
        }
      };
    }
    default: {
      return {};
    }
  }
}

export default class AnswerNode extends BaseNode {

  formData({ setting, ...others }) {
    return {
      ...this.commonOper(others),
      conf: getConf(setting),
    };
  }

  initSetting(conf) {
    const { type, content, name } = conf;
    switch (type) {
      case qaAnswerSource.Knowledge: {
        return {
          name,
          type,
          knowledge: {
            value: content.id,
            type: content.type,
          },
        };
      }
      case qaAnswerSource.RichText: {
        return {
          name,
          type,
          rickText: content,
        };
      }
      case qaAnswerSource.Service: {
        const { type: type2, url, code } = content;
        return {
          name,
          type,
          source: type2,
          url,
          code
        };
      }
      default:
        return {
          name,
          type: qaAnswerSource.Knowledge,
        };
    }
  }

  create(nextNode, label) {
    return {
      ...nextNode,
      setting: {
        name: label,
        type: qaAnswerSource.Knowledge,
      },
    };
  }

}
