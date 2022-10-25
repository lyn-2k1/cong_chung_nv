import { Button, Card, Dropdown, Input, Menu, message, Pagination, Space, Table } from "antd";
import { columns } from "../staff-column";
import React, {useCallback, useEffect, useState} from 'react';
import { StaffDto } from "@/types";
import {useSearchSortStaffQuery} from "../../../services/api/staff/query";
import LocalizedModal from "../components/modal";
import style from "../style.less";

import { SearchOutlined } from "@ant-design/icons";
const searchReactQuery = (limit: number, offset: number,branchId?: string,searchBy?: string, value?: string, sortType:string, orderBy:string) => {
    return `limit=${limit}&offset=${offset}&branchId=${branchId}&searchBy=${searchBy|| ""}&value=${value || ""}&sortType=${sortType || ""}&orderBy=${orderBy||""}`
}


const ListStaff: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [valueSearch, setValueSearch] = useState<string>("");
    const [search, setSearch] = useState<string>(searchReactQuery(10,1,localStorage.getItem('branch') as string,"","","",""));
    const {data: listStaff} = useSearchSortStaffQuery(search);
    const handleChangeValue = (e: any) => {
        setValueSearch(e.target.value);
    }  
    const handleSearch = () => {     
        setSearch(searchReactQuery(pageSize,page,localStorage.getItem('branch') as string,"email",valueSearch,"",""));
    }
    const handleChangePage = (page: number, pageSize:number) => {  
        setPage(page);
        setPageSize(pageSize);
        setSearch(searchReactQuery(pageSize,page,localStorage.getItem('branch') as string,"email",valueSearch,"",""));
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log("abccc",sorter);
        if(sorter?.order){
            const order = sorter?.order === 'ascend' ? 'asc' : 'desc';
            setSearch(searchReactQuery(pageSize,page,localStorage.getItem('branch') as string,"email",valueSearch,order,sorter.columnKey));
        }    
    }

    return (
        <>
            <Card className={style.card} title={<h1>DANH SÁCH NHÂN VIÊN</h1>} type="inner">
                <div style={{ display: "block"}}>
                    <p>
                        <strong>
                            Từ khóa tìm kiếm: 
                        </strong>
                    </p>
                    <div style={{display: "flex"}}>     
                        <Input style={{width: "70vw", marginRight: "10px"}} placeholder="Tìm kiếm" onChange={(e:any) => handleChangeValue(e)} value={valueSearch}/>
                        <Button type="text" className={style.button} onClick={() => {handleSearch()}} icon={<SearchOutlined />}>Tìm kiếm</Button>
                    </div>
                </div>
            </Card>
                <LocalizedModal/>   
            <Table 
                columns={columns} 
                dataSource={listStaff?.data as StaffDto[]} 
                pagination = {{
                    total: listStaff?.totalDocs,
                    showSizeChanger:true,
                    // showQuickJumper:true,
                    current: page,
                    pageSize: pageSize,
                    onChange: handleChangePage
                }}
                onChange={handleTableChange}
            />
        </>
        
    )
}

export default ListStaff;
