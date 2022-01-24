import React, { useEffect, useState } from 'react';
import { Popover, notification } from 'antd';
import { TButton, EmptyFn } from '@/components/tis_ui';
import { CORE } from '@/services/api';
import commonDownload from '@/services/commonDownload';
import PropTypes from 'prop-types';
import style from './index.less';

function defaultDownLoad(
  { url = '/download/asyncExportFile', id, fileName = '数据.xlsx' },
  handleCancel = EmptyFn,
) {
  commonDownload({
    url,
    name: fileName,
    method: 'GET',
    condition: { asyncExportRecordId: id },
  });
  handleCancel();
}

let timer = null;

async function defaultFetchExportList(type) {
  const info = await CORE.findDeptExportRecordUsingGET({
    params: {
      resource: type,
    },
  });
  return info;
}
function AsyncExportFile({
  fetchExportList,
  applyDerive,
  download,
  type,
  statusList,
  btnText,
  btnDerive,
  btnExport,
  ...others
}) {
  const [exportInfo, setExportInfo] = useState({});
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [loadStatus, setLoadStatus] = useState(-1);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  const closeModal = () => {
    setPopoverVisible(false);
    if (timer) {
      clearInterval(timer);
    }
  };

  const setTimerFetch = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(fetchExportInfo, 5000);
  };

  function fetchExportInfo() {
    fetchExportList(type).then((data = {}) => {
      const { status = statusList.noStatus } = data;
      setLoadStatus(status);
      if (status === statusList.fail || status === statusList.success) {
        clearInterval(timer);
      } else {
        setTimerFetch();
      }
      setExportInfo(data);
    });
  }

  const handleExport = () => {
    applyDerive().then(() => {
      notification.success({ message: '执行成功' });
      setLoadStatus(statusList.exporting);
    });
    setTimerFetch();
  };

  return (
    <Popover
      visible={popoverVisible}
      trigger="click"
      onVisibleChange={visible => {
        if (!visible) {
          closeModal();
        } else {
          setPopoverVisible(visible);
        }
      }}
      title={btnText}
      content={
        <div className={style.asyncExportContent}>
          <p>最新提交申请时间：{exportInfo.startTime}</p>
          <TButton.Button
            type="primary"
            ghost
            disabled={loadStatus === statusList.exporting}
            loading={loadStatus === statusList.exporting}
            onClick={() => handleExport()}
          >
            {loadStatus === statusList.exporting ? '正在导出' : btnDerive}
          </TButton.Button>
          <p>最新生成文件：{exportInfo.fileName}</p>
          <TButton.Download
            disabled={loadStatus === statusList.exporting || loadStatus === statusList.noStatus}
            onClick={() =>
              download(exportInfo, () => {
                closeModal();
              })
            }
          >
            {btnExport}
          </TButton.Download>
        </div>
      }
      {...others}
    >
      <TButton.Output
        onClick={() => {
          setPopoverVisible(true);
          fetchExportInfo();
        }}
      >
        {btnText}
      </TButton.Output>
    </Popover>
  );
}

AsyncExportFile.propTypes = {
  download: PropTypes.func,
  fetchExportList: PropTypes.func,
  applyDerive: PropTypes.func.isRequired,
  btnText: PropTypes.string,
  btnExport: PropTypes.string,
  btnDerive: PropTypes.string,
  type: PropTypes.string,
  statusList: PropTypes.object,
};

AsyncExportFile.defaultProps = {
  fetchExportList: defaultFetchExportList,
  download: defaultDownLoad,
  type: '',
  btnText: '导出',
  btnDerive: '申请导出',
  btnExport: '下载',
  statusList: {
    noStatus: -1,
    exporting: 0,
    success: 1,
    fail: 2,
  },
};

export default AsyncExportFile;
