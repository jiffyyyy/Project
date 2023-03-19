import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../service/User.Service';
import prefixUser from '../../../data/prefixUser.json';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextSelect } from '../../../components/TextSelect';
import { getAddressThai } from '../../../service/Address.Service';
import prefixdepartment from '../../../data/prefixDepartment.json';



function MainBook ()  {
    // const [dataTreatment, setDataTreatment] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
   
  return (
    <Fragment>
    <div className="w-full">
    <div className="d-flex justify-content-center ">
      <h2 className="title-content">จองคิว</h2>
    </div>
    <Formik
    initialValues={{
      idCard: '',
      prefixId: '',
      name: '',
      lastname: '',
      phoneNumber: '',
     
      
      symptom:''
      
    }}onSubmit={(value) => {
      // save(value);
    }}
  >
        
        {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="row">
                    
    
                  <div className="col-4 px-1 mt-2">
                      <label>เลขบัตรประชาชน</label>
                      <input
                        name="idCard"
                        placeholder='ดึงข้อมูล'
                        type="text"
                        value={values.idCard}
                        className={`form-input ${touched.idCard ? (errors.idCard ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('idCard', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="idCard" className="text-invalid" />
                    </div>
                   

                    <div className="col-2 px-1 mt-2">
                      <label>คำนำหน้า</label>
                      <TextSelect
                        id="prefixId"
                        name="prefixId"
                        placeholder='ดึงข้อมูล'
                        options={prefixUser}
                        value={prefixUser.filter((a) => a.id === values.prefixId)}
                        onChange={(item) => {
                          setFieldValue('prefixId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>

                    <div className="col-3 px-1 mt-2">
                      <label>ชื่อ</label>
                      <input
                        name="name"
                        type="text"
                        placeholder='ดึงข้อมูล'
                        value={values.name}
                        className={`form-input ${touched.name ? (errors.name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('name', e.target.value);
                        }}
                      />
              
                    </div>
                    <div className="col-3 px-1 mt-2">
                      <label>นามสกุล</label>
                      <input
                        name="lastname"
                        type="text"
                        placeholder='ดึงข้อมูล'
                        value={values.lastname}
                        className={`form-input ${touched.lastname ? (errors.lastname ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('lastname', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="lastname" className="text-invalid" />
                    </div>
                  
                 
                    <div className="col-6 px-1 mt-2">
                      <label>เบอร์โทร</label>
                      <input
                        name="phoneNumber"
                        type="text"
                        placeholder='ดึงข้อมูล'
                        value={values.phoneNumber}
                        className={`form-input ${touched.phoneNumber ? (errors.phoneNumber ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('phoneNumber', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="phoneNumber" className="text-invalid" />
                    </div>
           
                  <div className="col-6 px-1 mt-2">
                      <label>แผนก</label>
                      <TextSelect
                        id="departmentId"
                        name="departmentId"
                        options={prefixdepartment}
                        value={prefixdepartment.filter((a) => a.id === values.prefixdepartment)}
                        onChange={(item) => {
                          setFieldValue('prefixdepartment', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                   
                  
                    <div className="col-12 px-1 mt-2">
                      <label>อาการเบื้องต้น</label>
                      <input
                        name="symptom"
                        type="text"
                        value={values.symptom}
                        className={`form-input ${touched.symptom? (errors.symptom ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('symptom', e.target.value);
                        }}
                      />
                    </div>
                   
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary mx-1"  
                    onClick={() => {
              navigate('/check-book-an-appointment');
            }}
           > 
                      จองคิว
                    </button>
                    <button type="reset" className="btn btn-secondary mx-1">
                      ล้างค่า
                    </button>
                  </div>
                </div>
                </div>
            </Form>
            )}
          
        </Formik>
    </div>
    </Fragment>
  )
}

export default MainBook