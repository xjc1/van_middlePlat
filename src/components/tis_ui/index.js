/* eslint-disable import/no-extraneous-dependencies */
import Title from './Title';
import TCard from './TCard';
import OperateBar from './OperateBar';
import TransportBox from './TransportBox';
import QueryBarCard from './QueryBarCard';
import TButton, { confirmAble, EXButton } from './TButton';
import SearchSelector from './Form/SearchSelector';
import FormItemWithTable from './Form/FormItemWithTable';
import EditCellAbleTable from './EditCellAbleTable';
import FormCard from './FormCard';
import FormBtnGp from './TabForm/FormBtnGp';
import TabForm from './TabForm';
import InputMultiTable from './Form/InputMultiTable';
import MultiFormItem from './Form/MultiFormItem';
import TCheckbox from './TCheckbox';
import TSelect from './Form/TSelect';
import Checkbox from './Form/TCheckbox';
import ModalForm from './Form/ModalForm';
import FormHint from './Form/FormHint';
import SwitchWrapper from './Form/SwitchWrapper';
import CheckboxGroup from './Form/CheckboxGroup';
// import RichText from './richTextEditor';
import RichText from './RichTextEditorTinymce';
import TItem from './Form/TItem';
import TLink from './Form/TLink';
import TFormList from './Form/TFormList';
import TSwitch from './TSwitch';
import TControlItem from './Form/TControlItem';
import FormTable from './Form/FormTable';
import CardCheckbox from './CardCheckbox';
import UploadImage from './upload/UploadImage';
// import FileUpload from './upload/FileUpload';
import AsySelector from './AsySelector';
import DrawerSelect from './DrawerSelect';
import TTable from './TTable';
import SortColumnTitle from './TTable/SortColumnTitle';
import FormRules from './Form/FormRules';
import TIcon from './TIcon';
import DateTools from './Date/DateTools';
import BulkEdit from './bulk';
import BulkItem from './bulk/BuilkItem';
import Iframe from './Iframe';
import SelectTable from './SelectTable';
import EditTags from './EditTags';
import DataImport from './upload/DataImport';
import AsySearchSelector from './AsySearchSelector';
import PopoverMultiTable from './PopoverMultiTable';
import CodeCard from './CodeCard';
import TurboTree from './TurboTree';
import CodeEditor from './CodeEditor';
import EmptyFn, { EmptyAsyncFn } from './utils/EmptyFn';
import isEmptyArray from './utils/isEmptyArray';
import DoNothingFn from './utils/DoNothingFn';
import EventCenter from './utils/EventCenter';
import onceFunc from './utils/onceFunc';
import Base64 from './utils/Base64';
import IDGenerator from './utils/IDGenerator';
import ArrayTools from './utils/ArrayTools';
// import UploadImageUseFs from './upload/UploadImageUseFS';
import useUnmount from './hooks/useUnmount';
import ArrayTextArea from './ArrayTextArea';
import SummaryInfo from './SummaryInfo';
import PageTab from './PageTab';
import ArrayFormatTextArea from './ArrayFormatTextArea';
import HighLightRichText from './HighLightRichText';
import TRadioWithText from './TRadioWithText';

export {
  QueryBarCard,
  TButton,
  CardCheckbox,
  confirmAble,
  EXButton,
  RichText,
  TCheckbox,
  Checkbox,
  ModalForm,
  TSelect,
  FormCard,
  FormTable,
  TabForm,
  TItem,
  TLink,
  TControlItem,
  MultiFormItem,
  OperateBar,
  FormRules,
  UploadImage,
  InputMultiTable,
  AsySearchSelector,
  BulkEdit,
  BulkItem,
  FormBtnGp,
  Iframe,
  SelectTable,
  EditTags,
  DataImport,
  AsySelector,
  Title,
  TransportBox,
  SearchSelector,
  TTable,
  TIcon,
  DateTools,
  TCard,
  PopoverMultiTable,
  FormHint,
  CodeCard,
  TurboTree,
  ArrayTextArea,
  SummaryInfo,
  PageTab,
  ArrayFormatTextArea,
  SortColumnTitle,
  DrawerSelect,
  FormItemWithTable,
  SwitchWrapper,
  CheckboxGroup,
  CodeEditor,
  EditCellAbleTable,
  TSwitch,
  TFormList,
  HighLightRichText,
  TRadioWithText,
};

const utils = {
  Base64,
  IDGenerator,
  ArrayTools,
  isEmptyArray,
  onceFunc,
};

const hooks = {
  useUnmount,
};

export { utils, hooks, EmptyFn, EmptyAsyncFn, DoNothingFn, EventCenter };
