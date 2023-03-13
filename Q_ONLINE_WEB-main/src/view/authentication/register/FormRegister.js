import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../service/User.Service';
import prefixUser from '../../../data/prefixUser.json';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextSelect } from '../../../components/TextSelect';
import { getAddressThai } from '../../../service/Address.Service';
import Schema from './Validation';
import prefixCondi from '../../../data/prefixCondi.json';
import prefixRelation from '../../../data/prefixRelation.json';


function FormRegister() {
  const navigate = useNavigate();
  const [searchAddress, setSearchAddress] = useState('');
  const [address, setAddress] = useState([]);

  const dataGender = [
    {
      id: '1',
      title: 'ชาย',
    },
    {
      id: '2',
      title: 'หญิง',
    },
    {
      id: '3',
      title: 'อื่น ๆ',
    },
  ];

  useEffect(() => {
    if (searchAddress) {
      getAddressList(searchAddress);
    }
  }, [searchAddress]);

  function getAddressList(search) {
    let res = getAddressThai(search);
    if (res) {
      setAddress(res);
    }
  }

  async function save(data) {
    let res = await createUser(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'ลงทะเบียนสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ลงทะเบียนไม่สำเร็จ !!',
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !!',
        text: 'Server Error',
        showConfirmButton: true,
      });
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-center">
          <h2 className="title-content">สมัครสมาชิก</h2>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            idCard: '',
            password:'',
            prefixId: '',
            name: '',
            lastname: '', 
            gender: '',
            birthday: '',
            weight:'',
            height:'',
            phoneNumber: '',
           congenital_disease:'',
             drug_allergy:'',
            prifixContactId: '',
          nameContact: '',
          lastnameContact: '',
          prifixRelationId:'',
          ContactPhoneNumber: '',
            address: '',
            subdistrict: '',
            district: '',
            province: '',
            postcode: '',
            password: '',
            fullAddress: '',
            subdistrictsId: '',
          }}
          onSubmit={(value) => {
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className='card align-items-center' style={{border: "1px solid gray", width: "900px", height:"750px",backgroundColor:"lightblue"}}>
                  
                <div className="col- col-md-8 col-lg-6 ">
                  <div className="row">
                   
                   
                    <div className="col-6 px-1 mt-2">
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

                    <div className="col-6 px-1 mt-2">
                      <label>รหัสผ่าน</label>
                      <input
                        name="password"
                        type="text"
                        value={values.password}
                        className={`form-input ${touched.password ? (errors.password ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('password', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="password" className="text-invalid" />
                    </div>

                    <div className="col-4 px-1 mt-2">
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

                    <div className="col-4 px-1 mt-2">
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
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                    
                    
                    <div className="col-4 px-1 mt-2">
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
                   
                   
                    <div className="col-4 px-1 mt-2">
                      <label>เพศ</label>
                      <TextSelect
                        id="gender"
                        name="gender"
                        options={dataGender}
                        value={dataGender.filter((a) => a.id === values.gender)}
                        onChange={(item) => {
                          setFieldValue('gender', item.id);
                        }}
                        getOptionLabel={(z) => z.title}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    
                    
                    <div className="col-4 px-1 mt-2">
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
                      <ErrorMessage component="div" name="birthday" className="text-invalid" />
                    </div>
                    
                    
                    <div className="col-2 px-1 mt-2">
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
                    
                    
                    <div className="col-2 px-1 mt-2">
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
                    
                    
                    <div className="col-4 px-1 mt-2">
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
                     
                     <div className="col-4 px-1 mt-2">
                      <label>คำนำหน้าผู้ติดต่อ</label>
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
                    
                    <div className="col-4 px-1 mt-2">
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
                      <ErrorMessage component="div" name="nameContact" className="text-invalid" />
                    </div>
                   
                   
                    <div className="col-4 px-1 mt-2">
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
                      <ErrorMessage component="div" name="lastnameContact" className="text-invalid" />
                    </div>
                     
                     
                      <div className="col-6 px-1 mt-2">
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
                      <label>เบอร์โทรผู้ติดต่อ</label>
                      <input
                        name="ContactPhoneNumber"
                        type="text"
                        value={values.ContactPhoneNumber}
                        className={`form-input ${touched.ContactPhoneNumber ? (errors.ContactPhoneNumber ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('ContactPhoneNumber', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="ContactPhoneNumber" className="text-invalid" />
                    </div>
                   
                   
                   
                    <div className="col-12 px-1 mt-2">
                      <label>ค้นหาที่อยู่</label>
                      <TextSelect
                        id="subdistrictsId"
                        name="subdistrictsId"
                        isClearable={true}
                        options={address}
                        value={address.filter((a) => a.SubdistrictsId === values.subdistrictsId)}
                        onInputChange={(inputValue) => {
                          if (inputValue) {
                            setSearchAddress(inputValue);
                          } else {
                            setAddress([]);
                          }
                        }}
                        onMenuClose={() => {
                          setSearchAddress('');
                          setAddress([]);
                        }}
                        onChange={(e) => {
                          if (e && e.SubdistrictsId) {
                            setFieldValue('subdistrictsId', e.SubdistrictsId);
                            setFieldValue('subdistrict', e.SubdistrictsNameTh);
                            setFieldValue('district', e.DistrictsNameTh);
                            setFieldValue('province', e.ProvincesNameTh);
                            setFieldValue('postcode', e.PostCode);
                            setFieldValue('fullAddress', `ต.${e.SubdistrictsNameTh} อ.${e.DistrictsNameTh} จ.${e.ProvincesNameTh} ${e.PostCode}`);
                          } else {
                            setFieldValue('subdistrictsId', '');
                            setFieldValue('subdistrict', '');
                            setFieldValue('district', '');
                            setFieldValue('province', '');
                            setFieldValue('postcode', '');
                            setFieldValue('fullAddress', '');
                          }
                        }}
                        getOptionLabel={(z) => `ต.${z.SubdistrictsNameTh} อ.${z.DistrictsNameTh} จ.${z.ProvincesNameTh} ${z.PostCode}`}
                        getOptionValue={(x) => x.SubdistrictsId}
                      />
                    </div>

                    <div className="col-12 px-1 mt-2">
                      <label>ที่อยู่</label>
                      <input
                        name="address"
                        type="text"
                        value={values.address}
                        className={`form-input ${touched.address ? (errors.address ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('address', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="address" className="text-invalid" />
                    </div>

                    <div className="col-12 px-1 mt-2">
                      <label>ตำบล / อำเภอ / จังหวัด/ รหัสไปรษณีย์</label>
                      <input name="fullAddress" type="text" disabled={true} className={`form-input ${touched.fullAddress ? (errors.fullAddress ? 'invalid' : 'valid') : ''}`} value={values.fullAddress} />
                      <ErrorMessage component="div" name="fullAddress" className="text-invalid" />
                    </div>

                  
                  </div>
                  
                  
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary mx-1">
                      ลงทะเบียน
                    </button>
                    <button type="reset" className="btn btn-secondary mx-1">
                      ล้างค่า
                    </button>
                    
                  </div>
                </div>
              </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default FormRegister;
