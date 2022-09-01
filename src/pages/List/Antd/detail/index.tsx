import React, { useRef, useEffect } from 'react';
import { Table, Button, Card, Tag } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { Loading } from '@/components';
import DemoService from '@/services/demo';

interface RecordType {
  issue_state_detail: any;
  user: any;
  number: string;
  created_at: string;
  body: string;
}

const List = () => {
  const navigation = useNavigate();
  const { state } = useLocation();
  const { data, run, loading } = useRequest<RecordType>(DemoService.getIssuesDetail, {
    manual: true
  });

  useEffect(() => {
    run(state.number);
  }, []);

  return (
    <div>
      <PageHeaderWrapper
        title="issues详情"
        extra={<Button onClick={() => navigation(-1)}>返回</Button>}
      />
      {!data && <Loading />}
      {data && (
        <div className="mt-5 bg-white p-5">
          <Card title={state.title}>
            <div className="mb-10px">
              <Tag color="#108ee9">{data.issue_state_detail.title}</Tag>
              <Tag>#{data.number}</Tag>
              <span className="text-theme-gray">
                <UserOutlined />
                {data.user.name} 创建于：{dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default List;
