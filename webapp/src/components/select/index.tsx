import { Select as SelectAntd } from 'antd';
import type { SelectProps } from 'rc-select';
import './style.less';

type SelectOption = SelectProps & {
  mode?: 'multiple' | 'tags';
};

interface Props {
  label?: string;
  style?: object;
  selectOption: SelectOption;
  actions?: any;
}

const Select: React.FC<Props> = (props) => {
  return (
    <div style={props.style} className="select">
      {props.label && <span className="select-label">{props.label}:</span>}
      <div>
        <SelectAntd {...props.selectOption} />
      </div>
    </div>
  );
};

export default Select;
