import { Select } from 'antd';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import type { IBranch } from '@/types/branch';
import { getBranches } from '@/services/api/branch/index';
import { useModel } from 'umi';
import { Roles } from '@/common/constants';
const { Option } = Select;

const HeaderBranch: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [checkDisable, setCheckDisable] = useState<boolean>(true);
  const [branchList, setBranchList] = useState<IBranch[]>([]);
  const [branchChoose, setBranchChoose] = useState<number>(1);
  const handleChange = (e: any) => {
    console.log("BRANCHCHOOOSE",e);
    localStorage.setItem('branch', e);
  };

  useEffect(() => {
    //     getBranchList();
    console.log('CURRENTUSER::', initialState?.currentUser);
    initialState?.currentUser?.UserRole?.forEach(({ roleName }) => {
      if (roleName === Roles.superAdmin) {
        setCheckDisable(false);
      }
    });
    
    const doFunc = async () => {
      const res = await getBranches();
      localStorage.setItem('branch',branchChoose);
      setBranchList(res.data);
    };
    doFunc();
  }, []);
  console.log('DISABLE', checkDisable, branchList);
  return branchList && branchList.length > 0 ? (
    <>
      {checkDisable ? (
        <span style={{ color: 'white' }}>
          <Select defaultValue={branchList[0]?.id} className="max-w-max" disabled>
            {branchList?.map((branch: any) => (
              <Option key={branch.id} value={branch.id}>
                {branch.name}
              </Option>
            ))}
          </Select>
        </span>
      ) : (
        <Select
          defaultValue={branchList[0]?.id}
          className="max-w-max"
          onChange={handleChange}
          allowClear
        >
          {branchList?.map((branch: any) => (
            <Option key={branch.id} value={branch.id}>
              {branch.name}
            </Option>
          ))}
        </Select>
      )}
    </>
  ) : (
    <></>
  );
};

export default React.memo(HeaderBranch);
