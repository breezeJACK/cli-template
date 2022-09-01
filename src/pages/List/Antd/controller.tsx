import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useTable from '@/hooks/useTable';
import DemoService from '@/services/demo';
import dayjs from 'dayjs';
export interface RecordType {
  id: string;
  title: string;
  number: number;
  updated_at: string;
  state: string;
  labels: any[];
}
function Controller() {
  const navigate = useNavigate();
  const { data, loading, pageChange, run, current, pageSize } = useTable(DemoService.getIssues);

  function goDetail(item: RecordType) {
    navigate(`/list/antd/${item.number}`, { state: item });
  }
  const columns: ColumnsType<RecordType> = [
    {
      title: '编号',
      dataIndex: 'number',
      render: e => `#${e}`
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (e, record) => <a onClick={() => goDetail(record)}>{e}</a>
    },
    {
      title: '标签',
      dataIndex: 'labels',
      render: e => e.map(s => <Tag key={s.node_id}>{s.name}</Tag>)
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      render: e => dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '状态',
      dataIndex: 'state'
    }
  ];

  function onFinish(v) {
    console.log(v);
  }
  return {
    columns,
    data,
    loading,
    pageChange,
    current,
    pageSize,
    onFinish
  };
}

export default Controller;
