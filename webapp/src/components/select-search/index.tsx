import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

interface Props extends SelectProps {
    initialoptions: Record<string, any>[];
    initialValue?: Record<string, any>;
    onGetValue: (value: string | number) => void
}

export default function SelectSearch({ initialValue, initialoptions, onGetValue }: Props) {

    const initialOptionsKey = initialoptions.map((item, index) => { return { ...item, key: index } })

    const handleSelect = (value: any, options: Record<string, any>) => {
        onGetValue(value)
    }

    return <Select
        allowClear
        defaultValue={initialValue || undefined}
        showSearch
        style={{ width: "100%" }}
        optionFilterProp="children"
        onSelect={handleSelect}
        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
    >
        {initialOptionsKey.map((item: any) => {
            return (
                <Select.Option value={item.value} key={item.value}>
                    {item.label}
                </Select.Option>
            );
        })}
    </Select>
}