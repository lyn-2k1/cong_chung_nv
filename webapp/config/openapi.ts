import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';
import { URL_API } from '@/common/index';
const openAPI: IConfigFromPlugins['openAPI'] = [
  {
    requestLibPath: "import { request } from 'umi'",
    // schemaPath: 'http://107.191.60.27:4000/swagger-spec.json',
    schemaPath: 'http://localhost:4000/swagger-spec.json',
    projectName: 'api',
  },
];

export default openAPI;
