/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Highlighter from 'web-highlighter';
import EmptyFn from '../utils/EmptyFn';
import Styles from './index.less';

function getPosition($node) {
  return {
    top: $node.offsetTop,
    left: $node.offsetLeft + $node.offsetWidth / 2,
  };
}

const colorClass = {
  blue: Styles.highLightRichTextLineBlue,
  red: Styles.highLightRichTextLineRed,
  purple: Styles.highLightRichTextLinePurple,
  green: Styles.highLightRichTextLineGreen,
};

function cleanClasses(highlighter, id) {
  highlighter.removeClass(Styles.highLightRichTextLineActive, id);
  _.forEach(colorClass, v => {
    highlighter.removeClass(v, id);
  });
}

/**
 * initData 初始化选中数据
 * 示例
 * [{
        endMeta: { parentIndex: 0, parentTagName: 'P', textOffset: 9 },
        startMeta: { parentIndex: 0, parentTagName: 'P', textOffset: 6 },
        id: 'test999',
        text: '的天路',
      }]
 */

function Index({ html, onCreate, deleteIds = [], initData = [], handleCreate = EmptyFn }) {
  const mainRef = useRef({ current: {} });
  const [tip, setTip] = useState();
  let isInit = false;
  const cHighlighter = useRef();

  const addTipStyle = tipItem => {
    const { color, id } = tipItem;
    cleanClasses(cHighlighter.current, id);
    cHighlighter.current.addClass(colorClass[color], id);
    mainRef.current.store = _.map(mainRef.current.store, nextTip => {
      if (nextTip.id === id) {
        return {
          ...nextTip,
          color,
        };
      }
      return nextTip;
    });
  };

  const createTooltip = (highlighter, tag) => {
    const position = getPosition(highlighter.getDoms(tag.id)[0]);
    const newTip = {
      ...position,
      ...tag,
      show: true,
    };
    // 判断是否初始化，已初始化走新增逻辑
    if (isInit) {
      setTip(newTip);
    } else {
      addTipStyle(newTip);
    }
  };

  const initSelected = (instance, selectedData = []) => {
    selectedData.forEach(item => {
      instance.fromStore(item.startMeta, item.endMeta, item.text, item.id);
    });
    isInit = true;
  };

  useEffect(() => {
    if (tip) {
      addTipStyle(tip);
    }
  }, [tip]);

  useEffect(() => {
    mainRef.current.store = [];
    const highlighter = new Highlighter({
      $root: mainRef.current,
    });
    highlighter
      .on(Highlighter.event.HOVER, ({ id }) => {
        highlighter.addClass(Styles.highLightRichTextLine, id);
      })
      .on(Highlighter.event.HOVER_OUT, ({ id }) => {
        highlighter.removeClass(Styles.highLightRichTextLine, id);
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        const [source] = sources;
        const nextTag = {
          source,
          color: 'blue',
          id: source.id,
        };
        mainRef.current.isCreate = true;
        createTooltip(highlighter, nextTag);
        mainRef.current.store.push(nextTag);
      });
    highlighter.run();
    cHighlighter.current = highlighter;
    initSelected(highlighter, initData);
  }, []);

  useEffect(() => {
    _.map(deleteIds, id => {
      mainRef.current.store = _.filter(mainRef.current.store, item => {
        return item.id !== id;
      });
      cHighlighter.current.remove(id);
    });
  }, [deleteIds]);

  return (
    <div
      className={Styles.highLightRichText}
      onClick={event => {
        const { target } = event;
        if (target === mainRef.current && !mainRef.current.isCreate) {
          setTip(null);
        }
        mainRef.current.isCreate = false;
      }}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <div
        ref={mainRef}
        style={{
          height: '100%',
          fontSize: 16,
          padding: 16,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {tip &&
        handleCreate({
          tip,
          handleCancel: () => {
            cHighlighter.current.remove(tip.id);
            setTip(null);
          },
          onFinish: conditionInfo => {
            setTip(null);
            onCreate(conditionInfo);
          },
        })}
    </div>
  );
}

Index.defaultProps = {
  onCreate: EmptyFn,
  text: '',
};

export default Index;
