import request from '@/utils/request';
interface IResponse {
  code: string;
  data: any;
  msg: string;
}

const DemoService = {
  getIssues(params: any): Promise<IResponse> {
    return request.get('https://gitee.com/api/v5/repos/sentsin/layui/issues', { params });
  },
  getIssuesDetail(id: string): Promise<IResponse> {
    return request.get('https://gitee.com/api/v5/repos/sentsin/layui/issues/' + id);
  },
  getUserInfo(access: string): Promise<IResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: '200',
          data: {
            premission: ['edit-btn'],
            access: access
          },
          msg: 'succes'
        });
      }, 1000);
    });
  }
};

export default DemoService;
