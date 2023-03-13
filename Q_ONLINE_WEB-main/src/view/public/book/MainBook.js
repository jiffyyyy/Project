import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../service/User.Service';
import prefixUser from '../../../data/prefixUser.json';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextSelect } from '../../../components/TextSelect';
import { getAddressThai } from '../../../service/Address.Service';
import prefixReligion from '../../../data/prefixReligion.json';
import prefixNationality from '../../../data/prefixNationality.json';
import prefixCondi from '../../../data/prefixCondi.json';
import prefixRelation from '../../../data/prefixRelation.json';
import prefixdepartment from '../../../data/prefixDepartment.json';

function MainBook ()  {
    // const [dataTreatment, setDataTreatment] = useState([]);
    const [data, setData] = useState([]);
   
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
      birthday: '',
      age:'',
      weight:'',
      height:'',
      phoneNumber: '',
      religionId:'',
      nationalityId:'',
      congenital_disease:'',
      drug_allergy:'',
      prifixContactId: '',
      nameContact: '',
      lastnameContact: '',
      prifixRelationId:'',
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
                        value={values.lastname}
                        className={`form-input ${touched.lastname ? (errors.lastname ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('lastname', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="lastname" className="text-invalid" />
                    </div>
                   
                    <div className="col-3 px-1 mt-2">
                      <label>วันเดือนปีเกิด</label>
                      <input
                        name="birthday"
                        type="date"
                        value={values.birthday ? new Date(values.birthday).toISOString().slice(0, 10) : values.birthday}
                        className={`form-input ${touched.birthday ? (errors.birthday ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('birthday', e.target.value);
                        }}
                      />
                      
                    </div>
                    <div className="col-1 px-1 mt-2">
                      <label>อายุ</label>
                      <input
                        name="age"
                        type="text"
                        value={values.age}
                        className={`form-input ${touched.age ? (errors.age ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('age', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="age" className="text-invalid" />
                    </div>
                    <div className="col-1 px-1 mt-2">
                      <label>น้ำหนัก</label>
                      <input
                        name="weight"
                        type="text"
                        value={values.weight}
                        className={`form-input ${touched.weight ? (errors.weight ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('weight', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="weight" className="text-invalid" />
                    </div>
                    <div className="col-1 px-1 mt-2">
                      <label>ส่วนสูง</label>
                      <input
                        name="height"
                        type="text"
                        value={values.height}
                        className={`form-input ${touched.height ? (errors.height ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('height', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="height" className="text-invalid" />
                    </div>

                    <div className="col-6 px-1 mt-2">
                      <label>เบอร์โทร</label>
                      <input
                        name="phoneNumber"
                        type="text"
                        value={values.phoneNumber}
                        className={`form-input ${touched.phoneNumber ? (errors.phoneNumber ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('phoneNumber', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="phoneNumber" className="text-invalid" />
                    </div>
                    <div className="col-2 px-1 mt-2">
                      <label>ศาสนา</label>
                      <TextSelect
                        id="religionId"
                        name="religionId"
                        options={prefixReligion}
                        value={prefixReligion.filter((a) => a.id === values.religionId)}
                        onChange={(item) => {
                          setFieldValue('religionId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-2 px-1 mt-2">
                      <label>สัญชาติ</label>
                      <TextSelect
                        id="nationalityId"
                        name="nationalityId"
                        options={prefixNationality}
                        value={prefixNationality.filter((a) => a.id === values.nationalityId)}
                        onChange={(item) => {
                          setFieldValue('nationalityId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>โรคประจำตัว</label>
                      <TextSelect
                        id="congenital_disease"
                        name="congenital_disease"
                        options={prefixCondi}
                        value={prefixCondi.filter((a) => a.id === values.congenital_disease)}
                        onChange={(item) => {
                          setFieldValue('congenital_disease', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>ประวัติการแพ้ยา</label>
                      <input
                        name="drug_allergy"
                        type="text"
                        value={values.drug_allergy}
                        className={`form-input ${touched.drug_allergy ? (errors.drug_allergy ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('drug_allergy', e.target.value);
                        }}
                      />
              
                    </div>
                   
                    <div className="col-2 px-1 mt-2">
                      <label>คำนำหน้า</label>
                      <TextSelect
                        id="prifixContactId"
                        name="prifixContactId"
                        options={prefixUser}
                        value={prefixUser.filter((a) => a.id === values.prifixContactId)}
                        onChange={(item) => {
                          setFieldValue('prifixContactId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-3 px-1 mt-2">
                      <label>ชื่อผู้ติดต่อ</label>
                      <input
                        name="nameContact"
                        type="text"
                        value={values.nameContact}
                        className={`form-input ${touched.nameContact ? (errors.nameContact ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('nameContact', e.target.value);
                        }}
                      />
                     
                    </div>
                    <div className="col-3 px-1 mt-2">
                      <label>นามสกุลผู้ติดต่อ</label>
                      <input
                        name="lastnameContact"
                        type="text"
                        value={values.lastnameContact}
                         className={`form-input ${touched.lastnameContact ? (errors.lastnameContact ? 'invalid' : 'valid') : ''}`}
                          onChange={(e) => {
                         setFieldValue('lastnameContact', e.target.value);
                         }}
                      />
                      
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>ความสัมพันธ์</label>
                      <TextSelect
                        id="prifixRelationId"
                        name="prifixRelationId"
                        options={prefixRelation}
                        value={prefixRelation.filter((a) => a.id === values.prefixRelation)}
                        onChange={(item) => {
                          setFieldValue('prefixRelation', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-6 px-1 mt-2">
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
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary mx-1">
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