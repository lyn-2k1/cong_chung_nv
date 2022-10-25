import { Button, Card, Dropdown, Input, Menu, Pagination, Space, Table } from 'antd';
import { columns } from '../userRole-column';
import React, { useCallback, useEffect, useState } from 'react';
import { UserRoleDto, UserRoleSearchBody } from '@/types';
// import { useSearchListUserRoleQuery } from '../services/query';
import LocalizedModal from '../components/modal';
import { searchUserRole } from '@/services/api/userRole/index';

// const searchReactQuery = (
//   skip: number,
//   take: number,
//   branchId?: string,
//   searchBy?: string,
//   value?: string,
// ) => {
//   return `?skip=${skip}&take=${take}&branchId=${branchId}&searchBy=${
//     searchBy ? searchBy : 'roleName'
//   }&value=${value ? value : ' '}`;
// };

const ListUserRole: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number | undefined>(0);
  const [valueSearch, setValueSearch] = useState<string>('');
  // const [search, setSearch] = useState<string>(
  //   '?skip=0&take=10&branchId=1&searchBy=roleName&value=%20',
  // );
  const [listUserRole, setListUserRole] = useState<UserRoleDto[]>([]);
  let objSearch: UserRoleSearchBody = {
    skip: '1',
    take: '10',
    branchId: '1',
    sreachBy: 'roleName',
    value: '',
  };

  useEffect(() => {
    const getListUserRole = async () => {
      let listUserRoleSearch = await searchUserRole(objSearch);
      console.log('--> listUserRoleSearch:', listUserRoleSearch);
      setListUserRole(listUserRoleSearch.data);
      setTotalItems(listUserRoleSearch.total);
    };
    getListUserRole();
  }, [page, pageSize]);
  const handleChangeValue = (e: any) => {
    setValueSearch(e.target.value);
  };
  useEffect(() => {
    handleSearch();
  }, [page, pageSize]);
  const handleSearch = async () => {
    objSearch = {
      skip: ((page - 1) * pageSize).toString(),
      take: pageSize.toString(),
      branchId: '1',
      sreachBy: 'roleName',
      value: valueSearch,
    };
    console.log('->objSearch:', objSearch);
    let listUserRoleSearch = await searchUserRole(objSearch);
    setListUserRole(listUserRoleSearch.data);
    setTotalItems(listUserRoleSearch.total);
  };
  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    // handleSearch();
  };
  return (
    <>
      <Card className="mb-2">
        <h1 style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: '10px' }}>
          DANH SÁCH QUYỀN
        </h1>
        <div style={{ margin: 'auto', display: 'flex', justifyContent: 'left' }}>
          <div style={{ display: 'flex' }}>
            <p style={{ margin: 'auto', marginRight: '5px' }}>
              <strong>Từ khóa:</strong>
            </p>
            <Input
              style={{ width: '25vw', marginRight: '10px' }}
              placeholder=""
              onChange={(e) => handleChangeValue(e)}
            />
          </div>
          <Button
            type="primary"
            style={{ borderRadius: '5px' }}
            onClick={() => {
              handleSearch();
            }}
          >
            Tìm kiếm
          </Button>
        </div>
        <LocalizedModal />
      </Card>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={listUserRole}
        pagination={{
          total: totalItems,
          showSizeChanger: true,
          showQuickJumper: true,
          current: page,
          pageSize: pageSize,
          onChange: handleChangePage,
        }}
      />
    </>
  );
};

export default ListUserRole;
