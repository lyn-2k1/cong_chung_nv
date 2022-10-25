/* eslint-disable */
import { searchByCollection } from '@/services/common';
import type { AutoCompleteProps } from 'antd';
import { AutoComplete, Empty, message, Spin } from 'antd';
// import { debounce } from 'lodash';
import { useRef, useState } from 'react';

interface ISearchInput extends AutoCompleteProps {
  searchFor: string;
  searchBy: string;
  onGetValue: (value: any) => void;
  initialValue?: any,
}
function SearchInput({ searchFor, searchBy, onGetValue, initialValue }: ISearchInput) {
  const [options, setOptions] = useState<any[]>([initialValue] || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue.value || "")

  const typingTimeoutRef = useRef<any>(null)

  const handleSelect = (value: any, option: any) => {
    onGetValue(option)
  };

  const handleBlur = () => {
    if (options?.length === 0) {
      setValue('')
      onGetValue(null)
    }
  }

  const handleChange = (value: string) => {
    setValue(value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      handleSearch(value)
    }, 500)
    if (!value) {
      onGetValue(null)
    }
  }
  const handleSearch = async (searchString: string) => {
    setLoading(true);

    try {
      const res = await searchByCollection(searchFor, { searchBy: searchBy, value: searchString });
      const searchList = res.data.map((item: any) => {
        return { label: item[searchBy], value: item[searchBy], id: item.id, key: item.id };
      });
      setOptions(!searchString ? [] : searchList);

    } catch (error) {
      message.error("Không thể tìm kiếm thông tin khách hàng")
    }

    setLoading(false);
  };
  return (
    <AutoComplete
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      defaultActiveFirstOption
      style={{ width: '100%' }}
      options={options}
      onSelect={handleSelect}
      notFoundContent={loading ? <Spin style={{ display: 'flex', justifyContent: "center" }} /> : <Empty />}
    />
  );
}

export default SearchInput;
