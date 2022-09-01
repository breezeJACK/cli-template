import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { PaginationProps } from 'antd/es/pagination';
import { useRequest } from 'ahooks';

function useTable(service: any) {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [per_page, setPer_page] = useState(Number(searchParams.get('per_page')) || 10);
  const searchParmas = useRef(null);

  const { data, loading, run, params, refresh } = useRequest(service, {
    manual: true,
    onSuccess: (res, p) => {
      searchParmas.current = p;
      return res;
    }
  });

  console.log('state', state);
  function pageChange(v: PaginationProps) {
    const query = {
      page: v.current,
      per_page: v.pageSize
    };
    setPage(v.current || 1);
    setPer_page(v.pageSize || 10);

    navigate(`${pathname}?page=${v.current}&per_page=${v.pageSize}`, {
      replace: true,
      state: searchParmas.current
    });
    run(query);
  }

  useEffect(() => {
    console.log(params);
    run({ page, per_page });
    // refresh();
  }, []);

  return {
    data,
    loading,
    run,
    pageChange,
    current: page,
    pageSize: per_page
  };
}

export default useTable;
