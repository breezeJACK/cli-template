import request from '@/utils/request';
interface IResponse {
  code: string;
  data: any;
  msg: string;
}

const DemoService = {
  getAnt(params: any): Promise<IResponse> {
    return request.get('https://api.github.com/repos/ant-design/ant-design/issues', { params });
  },
  getVue(params: any): Promise<IResponse> {
    return request.get('https://api.github.com/repos/vuejs/vue/issues', { params });
  },
  getSvelte(params: any): Promise<IResponse> {
    return request.get('https://api.github.com/repos/sveltejs/svelte/issues', { params });
  },
  getIssues(id: string): Promise<IResponse> {
    return request.get('https://api.github.com/repos/ant-design/ant-design/issues/' + id);
  }
};

export default DemoService;
