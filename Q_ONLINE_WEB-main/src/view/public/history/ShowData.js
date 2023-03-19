import React from 'react';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';


function ShowData({ pagin, changePage, changePageSize }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="d-flex justify-content-between mb-2">
        <div className="w-pagesize">
          <TextSelect
            id="pagesize"
            name="pagesize"
            options={PageSize}
            value={PageSize.filter((a) => a.id === pagin.pageSize)}
            onChange={(item) => {
              changePageSize(item.id);
            }}
            getOptionLabel={(z) => z.label}
            getOptionValue={(x) => x.id}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate('/admin/open-schedule/form');
            }}
          >
            <i className="fa-solid fa-plus mx-1"></i>
            เพิ่ม
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
                ลำดับ
              </th>
              <th scope="col" style={{ width: '25%' }}>
                ชื่อแพทย์
              </th>
              <th scope="col" style={{ width: '15%' }}>
                ประเภทการรักษา
              </th>
              <th scope="col" style={{ width: '20%' }}>
                วันที่เปิดจองคิว
              </th>
              <th scope="col" style={{ width: '10%' }}>
                คิวที่
              </th>
              <th scope="col" style={{ width: '10%' }}>
                สถานะการใช้งาน
              </th>
            
            </tr>
          </thead>
          <tr>
                <td colSpan={7}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td>
              </tr>
       
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div>จำนวน {/*pagin.totalRow*/} รายการ</div>
        <div>
          <Pagination
            activePage={pagin.currentPage}
            itemsCountPerPage={pagin.pageSize}
            totalItemsCount={pagin.totalRow}
            pageRangeDisplayed={pagin.totalPage}
            onChange={(page) => {
              changePage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowData;
