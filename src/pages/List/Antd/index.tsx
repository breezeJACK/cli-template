import React, { useRef, useMemo } from 'react';
import { Table, Button, Form, Select, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchOutlined } from '@ant-design/icons';
import useController from './controller';

const status = [
  { value: 'all', label: '全部' },
  { value: 'open', label: '正常' },
  { value: 'closed', label: '已关闭' }
];

const demoData = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
];

const List = () => {
  const [form] = Form.useForm();
  const { columns, data, loading, pageChange, current, pageSize, onFinish } = useController();

  return (
    <div>
      <PageHeaderWrapper title={false} />
      <div className="bg-white p-5 pb-0 my-24px">
        <Form
          labelCol={{ flex: '80px' }}
          form={form}
          name="horizontal_login"
          className="flex space-x-10px"
          onFinish={onFinish}
        >
          <Form.Item label="标题" className="w-1/4">
            <Input
              placeholder="请输入关键字"
              suffix={<SearchOutlined style={{ color: '#999' }} />}
            />
          </Form.Item>
          <Form.Item label="状态" name="state" className="w-1/4">
            <Select options={status} />
          </Form.Item>
          <Form.Item>
            <div className="space-x-10px">
              <Button>清除</Button>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="">
        <Table
          bordered
          columns={columns}
          dataSource={data}
          loading={loading}
          onChange={pageChange}
          rowKey="id"
          pagination={{
            total: 110,
            showQuickJumper: true,
            defaultCurrent: current,
            defaultPageSize: pageSize
          }}
        />
      </div>
    </div>
  );
};

export default List;
