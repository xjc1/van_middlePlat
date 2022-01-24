/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, memo, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Select, Drawer, Input } from 'antd';
import TagItem from './TagItem';
import ArrayItems from '../DrawerSelect/ArrayItems';
import Styles from './index.less';
import EmptyFn from '../utils/EmptyFn';

const toUnityArray = value => {
  if (value && _.isArray(value)) {
    return _.chain(value)
      .filter(val => val)
      .map(item => {
        if (_.isString(item)) {
          return {
            value: item,
            label: item,
            key: item,
          };
        }
        return item;
      })
      .value();
  }
  return value;
};

function Index({
  onChange,
  onAddGroup,
  onCleanGroup = EmptyFn,
  onQueryAllGroup = EmptyFn,
  onQueryItems = EmptyFn,
  translate = EmptyFn,
  groups = [],
  value = [],
  mode = 'multiple',
  ...others
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [options, setOptions] = useState([]);

  const [isSingleMode] = useState(mode === 'single');

  useEffect(() => {
    if (isSingleMode) {
      const option = options[options.length - 1];
      onChange(option && { value: option.id, key: option.id });
    } else {
      onChange(
        _.map(options, ({ id }) => {
          return { value: id, key: id };
        }),
      );
    }
  }, [options]);

  const selectOptions = useMemo(() => {
    return _.map(options, ({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });
  }, [options]);

  useEffect(() => {
    if (!_.isEmpty(value)) {
      translate(value).then(nextOptions => {
        setOptions(nextOptions);
      });
    }
  }, []);

  const selectedOptions = _.reduce(
    options,
    (syncOptions, option) => {
      const selectedKeys = _.map(isSingleMode ? [value] : value, ({ key }) => key);
      if (_.includes(selectedKeys, option.id)) {
        syncOptions.push(option);
      }
      return syncOptions;
    },
    [],
  );

  return (
    <div>
      <Select
        mode={mode}
        optionLabelProp="label"
        open={false}
        labelInValue
        value={toUnityArray(value)}
        options={selectOptions}
        onFocus={() => {
          setDrawerOpen(true);
        }}
        onChange={onChange}
        {...others}
      />
      <Drawer
        destroyOnClose
        className={Styles.groupDrawer}
        placement="right"
        title={
          <div>
            <Input.Search
              addonBefore="标签"
              allowClear
              onSearch={(txt = '') => {
                if (_.isEmpty(txt.trim())) {
                  onQueryAllGroup();
                } else {
                  onQueryItems(txt);
                }
              }}
              enterButton="搜索"
            />
            <div style={{ marginTop: '10px' }}>
              {_.map(selectedOptions, ({ id, name }) => (
                <TagItem
                  key={id}
                  type="active"
                  closable
                  text={name}
                  onClose={() => {
                    setOptions(
                      _.filter(selectedOptions, ({ id: key }) => {
                        return key !== id;
                      }),
                    );
                  }}
                />
              ))}
            </div>
          </div>
        }
        width={620}
        closable={false}
        onClose={() => {
          setDrawerOpen(false);
        }}
        visible={drawerOpen}
      >
        <ArrayItems
          excludeItems={selectedOptions}
          groups={groups}
          onCollapseGroup={onCleanGroup}
          onAddGroup={onAddGroup}
          onSelectedTag={({ id, name }) => {
            setOptions([...selectedOptions, { id, name }]);
          }}
          onUnSelectedTag={({ id: rmId }) => {
            setOptions(_.filter(selectedOptions, ({ id }) => id !== rmId));
          }}
        />
      </Drawer>
    </div>
  );
}

export default memo(Index);
