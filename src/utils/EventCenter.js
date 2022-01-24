import { EventEmitter } from 'events';
import { Modal, message, notification } from 'antd';

const OUTER_PRE = '_OUTER_';

const globalEventEmitter = new EventEmitter();

export default globalEventEmitter;

const outerEventEmitter = new EventEmitter();

outerEventEmitter.on(`${OUTER_PRE}LOGIN`, () => {
  globalEventEmitter.emit('401');
});

outerEventEmitter.on(`${OUTER_PRE}MODAL`, ({ type = 'info', params }) => {
  Modal[type](params);
});

outerEventEmitter.on(`${OUTER_PRE}MESSAGE`, ({ type = 'info', str }) => {
  message[type](str);
});

outerEventEmitter.on(`${OUTER_PRE}NOTIFICATION`, ({ type = 'info', params }) => {
  notification[type](params);
});

window._EVENT_ = outerEventEmitter;

export { outerEventEmitter };
