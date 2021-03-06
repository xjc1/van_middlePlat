import * as React from 'react';
import { shallowEqual } from '@react-dnd/shallowequal';
import hoistStatics from 'hoist-non-react-statics';
import { invariant } from '@react-dnd/invariant';
import { DndContext } from '../common/DndContext';
import { isPlainObject } from '../utils/js_utils';
import { isRefable, checkDecoratorArguments } from './utils';
export function DragLayer(collect, options = {}) {
  checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options);
  invariant(
    typeof collect === 'function',
    'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ',
    'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer',
    collect,
  );
  invariant(
    isPlainObject(options),
    'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' +
      'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer',
    options,
  );
  return function decorateLayer(DecoratedComponent) {
    const Decorated = DecoratedComponent;
    const { arePropsEqual = shallowEqual } = options;
    const displayName = Decorated.displayName || Decorated.name || 'Component';
    let DragLayerContainer = /** @class */ (() => {
      class DragLayerContainer extends React.Component {
        constructor() {
          super(...arguments);
          this.isCurrentlyMounted = false;
          this.ref = React.createRef();
          this.handleChange = () => {
            if (!this.isCurrentlyMounted) {
              return;
            }
            const nextState = this.getCurrentState();
            if (!shallowEqual(nextState, this.state)) {
              this.setState(nextState);
            }
          };
        }
        getDecoratedComponentInstance() {
          invariant(
            this.ref.current,
            'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()',
          );
          return this.ref.current;
        }
        shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
        }
        componentDidMount() {
          this.isCurrentlyMounted = true;
          this.handleChange();
        }
        componentWillUnmount() {
          this.isCurrentlyMounted = false;
          if (this.unsubscribeFromOffsetChange) {
            this.unsubscribeFromOffsetChange();
            this.unsubscribeFromOffsetChange = undefined;
          }
          if (this.unsubscribeFromStateChange) {
            this.unsubscribeFromStateChange();
            this.unsubscribeFromStateChange = undefined;
          }
        }
        render() {
          return React.createElement(DndContext.Consumer, null, ({ dragDropManager }) => {
            if (dragDropManager === undefined) {
              return null;
            }
            this.receiveDragDropManager(dragDropManager);
            // Let componentDidMount fire to initialize the collected state
            if (!this.isCurrentlyMounted) {
              return null;
            }
            return React.createElement(
              Decorated,
              Object.assign({}, this.props, this.state, {
                ref: isRefable(Decorated) ? this.ref : null,
              }),
            );
          });
        }
        receiveDragDropManager(dragDropManager) {
          if (this.manager !== undefined) {
            return;
          }
          this.manager = dragDropManager;
          invariant(
            typeof dragDropManager === 'object',
            'Could not find the drag and drop manager in the context of %s. ' +
              'Make sure to render a DndProvider component in your top-level component. ' +
              'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context',
            displayName,
            displayName,
          );
          const monitor = this.manager.getMonitor();
          this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
          this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);
        }
        getCurrentState() {
          if (!this.manager) {
            return {};
          }
          const monitor = this.manager.getMonitor();
          return collect(monitor, this.props);
        }
      }
      DragLayerContainer.displayName = `DragLayer(${displayName})`;
      DragLayerContainer.DecoratedComponent = DecoratedComponent;
      return DragLayerContainer;
    })();
    return hoistStatics(DragLayerContainer, DecoratedComponent);
  };
}
