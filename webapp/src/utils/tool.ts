import _ from 'lodash';
import type { RcFile } from 'antd/lib/upload';

export function groupBy(
  dataToGroupOn: {
    id: number;
    name: string;
    templateId: number;
    paramGroup: string;
    ocrDataId: null;
    defaultValue: null;
    paramId: null;
    createdAt: string;
    updatedAt: string;
    createBy: number;
    updatedBy: number;
  }[],
  fieldNameToGroupOn: string | number | symbol | _.PartialShallow<any> | undefined,
  fieldNameForGroupName: _.PropertyName,
  fieldNameForChildren: _.PropertyName,
) {
  const result = _.chain(dataToGroupOn)
    .groupBy(fieldNameToGroupOn)
    .toPairs()
    .map(function (currentItem) {
      return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
    })
    .value();
  return result;
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
