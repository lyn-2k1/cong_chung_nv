import { getStaffListByRole, getStaffs } from '@/services/api/staffs';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { useCallback, useEffect, useState } from 'react';
const { Option } = Select;

interface SelectSearchProps extends SelectProps {
  searchParams: string;
  initialValue: any,
  onGetValue: (value: string) => void;
}

const SelectSearch = ({ searchParams, onGetValue, initialValue }: SelectSearchProps) => {
  const [options, setOptions] = useState<any[]>([]);

  const getListOption = useCallback(async (role: string) => {
    if (role === "all") {
      const res = await getStaffs();
      if (res.totalDocs > 0) {
        const optionList = res.data.map(
          (item: any) => {
            return { label: item.name, value: item.name, id: item.id };
          },
        );
        setOptions(optionList);
      }
    } else {
      const res = await getStaffListByRole(role);
      if (res.totalDocs > 0) {
        const optionList = res.data.map(
          ({ User }: any) => {
            return { label: User.name, value: User.name, id: User.id };
          },
        );
        setOptions(optionList);
      }
    }


  }, []);

  const handleSelect = (value: any) => {
    onGetValue(value);
  };

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getListOption(searchParams);
    }

    return () => {
      isApiSubscribed = false
    }

  }, [getListOption, searchParams]);
  return (
    <Select
      showSearch
      defaultValue={initialValue}
      onSelect={handleSelect}
      className="full-width"
      optionFilterProp="children"
      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
    >
      {options.map((item) => {
        return (
          <Option value={item.id} key={item.id}>
            {item.value}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectSearch;
