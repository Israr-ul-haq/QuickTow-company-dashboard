import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import AuthService from "../../services/AuthService"
import DriversService from "../../services/DriversService"

import Loader from "../../shared/Loader"
import { dataTypes } from "../DataType/truckTypes"
function EditTrucker() {
  //State
  const authService = new AuthService()
  const driverService = new DriversService()
  const { driverId } = useParams()
  const [userData, setUserData] = useState({})
  const [imgData, setImgData] = useState("/img/icon_upload_add_load.png")
  const [backLisencePicture, setBackLisencePicture] = useState(null)
  const [backlicenseImagData, setBackLisenceImgData] = useState("/img/placeholderImage.jpg")
  const [licenseImagData, setLisenceImgData] = useState("/img/placeholderImage.jpg")
  const [lisencePicture, setLisencePicture] = useState(null)
  const [insurenceImgData, setInsurenceImgData] = useState("/img/placeholderImage.jpg")
  const [insurencePicture, setInsurencePicture] = useState(null)
  const [vahicleData, setVahicleData] = useState({})
  const [driverInfos, setDriverInfos] = useState({})
  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [picture, setPicture] = useState(null)
  const [insurenceInfo, setInsurenceInfo] = useState()
  const [multipleVehicles, setMultipleVehicles] = useState([])
  const [multipleVehicleData, setMultipleVehicleData] = useState({
    make: "",
    model: "",
    licensePlateNumber: "",
    transmissionTypeId: "",
    userId: driverId,
  })

  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    lisencePictureEmpty: false,
    backLisencePictureEmpty: false,
    insurencePictureEmpty: false,
    pictureEmpty: false,
    firstNameEmpty: "",
    lastNameEmpty: "",
    emailEmpty: "",
    phoneEmpty: "",
    passwordEmpty: "",
    confirmPasswordEmpty: "",
    phoneNumberEmpty: "",
    makeEmpty: "",
    modelEmpty: "",
    licensePlateNumberEmpty: "",
    transmissionTypeIdEmpty: "",
    insurenceInfoEmpty: "",
  })
  // SERVICES
  const [companydrivers, setcompanydrivers] = useState({
    CompanyId: localStorage.getItem("companyQuickCompanyId"),
  })

  useEffect(() => {
    if (dataCount === 0) {
      getDriver()
      setDataCount(1)
    }
  }, [imgData, multipleVehicles, multipleVehicleData]) // eslint-disable-line react-hooks/exhaustive-deps
  // const [multipleVehicleId, setMultipleVehicleId] = useState(1)
  // const loopItems = () => {
  // 	debugger
  // 	let multipleVehicleDataId = {
  // 		id: multipleVehicleId,
  // 	}
  // 	if(multipleVehicleId === 1){
  // 		setMultipleVehicleId(multipleVehicleId + 1)
  // 		const c = [...multipleVehicles]
  // 		c.push(multipleVehicleDataId)
  // 		setMultipleVehicles(c)
  // 	}else{
  // 		Swal.fire({
  // 			position: "center",
  // 			icon: "error",
  // 			title: "One driver can only Add two vehicles",
  // 			showConfirmButton: true,
  // 			timer: 5000,
  // 		})
  // 	}
  // }

  // const removeVehicle = (id) => {
  // 	debugger
  // 	let removeIndex = multipleVehicles.filter((item) => {
  // 		return id !== item.id
  // 	})

  // 	setMultipleVehicles(removeIndex)
  // }
  // const addVahicleData = (val, index) => {
  // 	let temp = multipleVehicleData
  // 	temp[index] = val.target.value
  // 	setMultipleVehicleData(temp)
  // }

  // const vehicleCard = () => {
  //   document.querySelector(".multipleVehicle").style.display = "block"
  //   document.querySelector(".AddVehicle").style.display = "none"
  // }
  // const disableCard = () => {
  //   document.querySelector(".multipleVehicle").style.display = "none"
  //   document.querySelector(".AddVehicle").style.display = "block"

  //   const c = { ...multipleVehicleData }
  //   c.make = ""
  //   c.model = ""
  //   c.licensePlateNumber = ""
  //   c.transmissionTypeId = ""
  //   // const vehicleCopy = [...userData]
  //   // vehicleCopy.pop()
  //   // setUserData(vehicleCopy)
  //   setMultipleVehicleData(c)
  // }
  const getDriver = async () => {
    debugger
    const response = await driverService.getDriverById(driverId)
    setUserData(response.data.data[0])
    // setVahicleData(response.data.data[0].vehicles[0])
    // if (response.data.data[0].vehicles[1]) {
    //   vehicleCard()
    //   setMultipleVehicleData(response.data.data[0].vehicles[1])
    // } else {
    //   disableCard()
    // }
    setDriverInfos(response.data.data[0].driverInfos[0])
    // setInsurenceInfo(response.data.data[0].driverInfos[0].insuranceInfo)
    setImgData(response.data.data[0].profilePhoto)
    setLisenceImgData(response.data.data[0].driverInfos[0].licenseFrontPicture)
    setBackLisenceImgData(response.data.data[0].driverInfos[0].licenseBackPicture)
    // setInsurenceImgData(response.data.data[0].driverInfos[0].insurancePicture)
  }

  //Functions
  const imagesPreview = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  ///License Image Preview
  const FrontLisenceimagesPreview = (e) => {
    if (e.target.files[0]) {
      setLisencePicture(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setLisenceImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
      // document.querySelector()
    }
  }

  const backLisenceimagesPreview = (e) => {
    if (e.target.files[0]) {
      setBackLisencePicture(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setBackLisenceImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
      // document.querySelector()
    }
  }

  // /// Insurence Image Previewf
  // const insurenceimagesPreview = (e) => {
  //   if (e.target.files[0]) {
  //     setInsurencePicture(e.target.files[0])
  //     const reader = new FileReader()
  //     reader.addEventListener("load", () => {
  //       setInsurenceImgData(reader.result)
  //     })
  //     reader.readAsDataURL(e.target.files[0])
  //     // document.querySelector()
  //   }
  // }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const emailValid = () => {
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    var email = document.getElementById("email-address").value
    if (!pattern.test(email)) {
      document.querySelector("#tick-1").style.display = "none"
    } else {
      document.querySelector("#tick-1").style.display = "block"
    }
  }

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault()
    let validCount = 0
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const c = { ...emptyValidation }

    if (userData.email === "") {
      c.emailEmpty = "Email is Required"
      validCount++
    } else if (!pattern.test(userData.email)) {
      validCount++
      c.emailEmpty = "Email should Be Valid"
    } else {
      c.emailEmpty = ""
    }

    if (imgData === null) {
      c.pictureEmpty = true
      validCount++
    } else {
      c.pictureEmpty = false
    }
    if (licenseImagData === null) {
      c.lisencePictureEmpty = true
      validCount++
    } else {
      c.lisencePictureEmpty = false
    }
    if (backlicenseImagData === null) {
      c.backLisencePictureEmpty = true
      validCount++
    } else {
      c.backLisencePictureEmpty = false
    }
    // if (insurenceImgData === null) {
    //   c.insurencePictureEmpty = true
    //   validCount++
    // } else {
    //   c.insurencePictureEmpty = false
    // }

    if (userData.firstName === "") {
      c.firstNameEmpty = true
      validCount++
    } else {
      c.firstNameEmpty = false
    }
    if (userData.lastName === "") {
      c.lastNameEmpty = true
      validCount++
    } else {
      c.lastNameEmpty = false
    }

    if (userData.phoneNumber === "") {
      c.phoneNumberEmpty = true
      validCount++
    } else {
      c.phoneNumberEmpty = false
    }

    // if (vahicleData.make === "") {
    //   c.makeEmpty = true
    //   validCount++
    // } else {
    //   c.makeEmpty = false
    // }

    // if (vahicleData.model === "") {
    //   c.modelEmpty = true
    //   validCount++
    // } else {
    //   c.modelEmpty = false
    // }
    // if (vahicleData.licensePlateNumber === "") {
    //   c.licensePlateNumberEmpty = true
    //   validCount++
    // } else {
    //   c.licensePlateNumberEmpty = false
    // }
    // if (userData.insuranceInfo === null) {
    //   c.insurenceInfoEmpty = true
    //   validCount++
    // } else {
    //   c.insurenceInfoEmpty = false
    // }
    // if (vahicleData.transmissionTypeId === 0) {
    //   c.transmissionTypeIdEmpty = true
    //   validCount++
    // } else {
    //   c.transmissionTypeIdEmpty = false
    // }
    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)

    // userData.companydrivers = []
    userData.companydrivers = []
    // userData.vehicles = [vahicleData]
    // if (multipleVehicleData.make !== "") {
    //   userData.vehicles.push(multipleVehicleData)
    // }
    // userData.insurenceInfo = driverInfos.insuranceInfo

    userData.companydrivers.push(companydrivers)
    debugger
    const response = await driverService.update(userData)
    if (response.data.code === 1) {
      if (!(picture === null)) {
        const formData1 = new FormData()
        formData1.append("file", picture)
        const imageResponse = await authService.uploadImage(formData1, driverId)
      }
      if (!(backLisencePicture === null && lisencePicture === null)) {
        const formData2 = new FormData()
        formData2.append("front", lisencePicture)
        formData2.append("back", backLisencePicture)
        const LicenseimageResponse = await driverService.UploadDrivingLicense(driverId, formData2)
      }

      // if (!(insurencePicture === null)) {
      //   const formData4 = new FormData()
      //   formData4.append("file", insurencePicture)
      //   // formData4.append("info", insurenceInfo)
      //   const InsurenseResponse = await driverService.UploadInsurece(formData4, driverId)
      // }
      //   } else if (insurenceInfo !== "") {
      //     const formData4 = new FormData()
      //     formData4.append("file", insurencePicture)
      //     formData4.append("info", insurenceInfo)
      //     const InsurenseResponse1 = await driverService.UploadInsurece(formData4, driverId)
      //     console.log(InsurenseResponse1)
      //   }

      history.push("/ManageTruckers")
      setBtnLock(false)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Trucker has been updated",
        showConfirmButton: true,
        timer: 5000,
      })
    } else {
      setBtnLock(false)
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }

  return (
    <div>
      <main>
        {/* person Details start */}
        <div className="container-fluid" style={{ paddingBottom: "50px" }}>
          <form className="myform" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="headertopbar">
                  <Link to="/ManageTruckers" className="headertopbar_title">
                    {" "}
                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Profile- Truckers
                  </Link>
                </div>
              </div>
              <div className="col-12 column_margin">
                <div className="card_custom">
                  <h3 className="User_Profile_Name" style={{ paddingBottom: "30px" }}>
                    User Details
                  </h3>

                  <div className="form-row">
                    <div className="form-group col-md-12 form-group--uploadimage">
                      <div className="file-upload position-relative">
                        <div class="imagecontainer">
                          <label for="upload-image" class="upload-image-label">
                            <div className="file-pic">
                              <h5 className="upload-image-title">Upload Image</h5>
                              <div class="uploadedimages">
                                <img class="uploadedimage" src={imgData} alt="uploaded_image" />
                              </div>
                            </div>
                          </label>
                        </div>
                        <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                        {emptyValidation.pictureEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}

                        <div style={{ position: "relative" }}>
                          <label for="upload-image">
                            {" "}
                            <img src="/img/edit (2).svg" alt="" className="edit_img" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username">First Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter name"
                          onChange={(e) => {
                            const c = { ...userData }
                            c.firstName = e.target.value
                            setUserData(c)
                          }}
                          value={userData.firstName}
                        />
                        {emptyValidation.firstNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username">Last Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter name"
                          onChange={(e) => {
                            const c = { ...userData }
                            c.lastName = e.target.value
                            setUserData(c)
                          }}
                          value={userData.lastName}
                        />
                        {emptyValidation.lastNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="email-container position-relative">
                        <label htmlfor="uname" className="w-100 email-label">
                          Email
                        </label>
                        <div>
                          <input
                            onKeyUp={emailValid}
                            type="text"
                            name="uname"
                            placeholder="Enter email Address"
                            className="form_control"
                            id="email-address"
                            onChange={(e) => {
                              const c = { ...userData }
                              c.email = e.target.value
                              setUserData(c)
                            }}
                            value={userData.email}
                          />
                          <div className="tick-icon-absolute">
                            <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                          </div>
                        </div>
                        {emptyValidation.emailEmpty.length !== 0 ? (
                          <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.emailEmpty} </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="phone-container position-relative">
                        <label htmlfor="tel" className="number-label">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          placeholder="Enter phoneNumber"
                          maxLength="11"
                          onInput={maxLengthCheck}
                          className="form_control"
                          onChange={(e) => {
                            const c = { ...userData }
                            c.phoneNumber = e.target.value
                            setUserData(c)
                          }}
                          value={userData.phoneNumber}
                        />
                        {emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* person detail End */}

              {/* Vahicle Card Start */}
              {/* 
              <div className="col-12 column_margin">
                <div className="card_custom">
                  <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
                    Vehicle Details
                  </h3>

                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username"> Vehicle Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter  vehicle name"
                          onChange={(e) => {
                            const c = { ...vahicleData }
                            c.make = e.target.value
                            setVahicleData(c)
                          }}
                          value={vahicleData.make}
                        />
                        {emptyValidation.makeEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle name is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="email-container position-relative">
                        <label htmlfor="uname" className="w-100 email-label">
                          Vehicle Model
                        </label>
                        <div>
                          <input
                            onKeyUp={emailValid}
                            type="text"
                            name="uname"
                            placeholder="Enter vahicle model"
                            className="form_control"
                            id="email-address"
                            onChange={(e) => {
                              const c = { ...vahicleData }
                              c.model = e.target.value
                              setVahicleData(c)
                            }}
                            value={vahicleData.model}
                          />
                          {emptyValidation.modelEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle model is required </p> : ""}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="phone-container position-relative">
                        <label htmlfor="tel" className="number-label">
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          placeholder=" Enter vahicle number"
                          className="form_control"
                          onChange={(e) => {
                            const c = { ...vahicleData }
                            c.licensePlateNumber = e.target.value
                            setVahicleData(c)
                          }}
                          value={vahicleData.licensePlateNumber}
                        />
                        {emptyValidation.licensePlateNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle number is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Vehicle Category
                        </label>
                        <div>
                          <select
                            onChange={(e) => {
                              const c = { ...vahicleData }
                              c.transmissionTypeId = e.target.value
                              setVahicleData(c)
                            }}
                            className="form_control"
                          >
                            <option selected={vahicleData.transmissionTypeId === 1 ? "true" : "false"} value={dataTypes.AWD}>
                              AWD
                            </option>
                            <option selected={vahicleData.transmissionTypeId === 2 ? "true" : "false"} value={dataTypes.FWD}>
                              FWD
                            </option>
                          </select>
                          {emptyValidation.transmissionTypeIdEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle type is required </p> : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* {multipleVehicles.map((item, i) => { */}
              {/* return <> */}
              {/* <div className="col-12 column_margin multipleVehicle">
                <img src="./img/crossIcon.svg" alt="crossicon" className="cross_Icon_Image"  />
                <div className="card_custom">
                  <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
                    Vehicle Details
                  </h3>
                  <div className="form-row" id="vehicle_Inputs">
                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username">Vehicle Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter  vehicle name"
                          id="vahicleName"
                          onChange={(e) => {
                            const c = { ...multipleVehicleData }
                            c.make = e.target.value
                            setMultipleVehicleData(c)
                          }}
                          value={multipleVehicleData?.make}
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="email-container position-relative">
                        <label htmlfor="uname" className="w-100 email-label">
                          Vehicle Model
                        </label>
                        <div>
                          <input
                            type="text"
                            name="uname"
                            placeholder="Enter vahicle model"
                            className="form_control"
                            id="vehicle_Model"
                            onChange={(e) => {
                              const c = { ...multipleVehicleData }
                              c.model = e.target.value
                              setMultipleVehicleData(c)
                            }}
                            value={multipleVehicleData?.model}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="phone-container position-relative">
                        <label htmlfor="tel" className="number-label">
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          placeholder=" Enter vahicle number"
                          className="form_control"
                          id="vehicle_Number"
                          onChange={(e) => {
                            const c = { ...multipleVehicleData }
                            c.licensePlateNumber = e.target.value
                            setMultipleVehicleData(c)
                          }}
                          value={multipleVehicleData?.licensePlateNumber}
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Vehicle Category
                        </label>
                        <div>
                          <select
                            id="vehicle_Number"
                            onChange={(e) => {
                              const c = { ...multipleVehicleData }
                              c.transmissionTypeId = e.target.value
                              setMultipleVehicleData(c)
                            }}
                            className="form_control"
                          >
                            <option selected={multipleVehicleData?.transmissionTypeId === 1 ? "true" : "false"} value={dataTypes.AWD}>
                              AWD
                            </option>
                            <option selected={multipleVehicleData?.transmissionTypeId === 2 ? "true" : "false"} value={dataTypes.FWD}>
                              FWD
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* </> */}
              {/* })} */}
              {/* <div className="col-12 column_margin AddVehicle">
                <div className="card_custom" style={{ padding: "30px" }}>
                  <div className="vahicle_section" onClick={vehicleCard}>
                    <img src="/img/Icon feather-plus.svg" alt="plus" />
                    <p className="vahicle_title">Add Vehicle</p>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Attached Document Start */}

            <div className="card_custom">
              <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
                Attach Documents
              </h3>

              <div className="form-row">
                <div className="col-md-12">
                  <div className="section_images" style={{ paddingBottom: "30px" }}>
                    <div className="position_relative_card">
                      <label for="upload_Image">
                        <img src="/img/pic_edit.svg" alt="edit" className="edit_position_absolute" />
                      </label>
                    </div>
                    <img alt="id" src={licenseImagData} className="doc_Sec_img" />
                    <input onChange={FrontLisenceimagesPreview} id="upload_Image" name="upload_Image" hidden type="file" accept=".png, .jpg, .jpeg" />

                    <div className="position_relative_card">
                      <label for="upload_License">
                        <img src="/img/pic_edit.svg" alt="edit" className="edit_position_absolute" />
                      </label>
                    </div>
                    <img alt="license" src={backlicenseImagData} className="doc_Sec_img" />
                    <input
                      onChange={backLisenceimagesPreview}
                      id="upload_License"
                      name="upload_License"
                      hidden
                      type="file"
                      accept=".png, .jpg, .jpeg"
                    />

                    {/* <div className="position_relative_card">
                      <label for="upload_insurence">
                        {" "}
                        <img src="/img/pic_edit.svg" alt="edit" className="edit_position_absolute" />
                      </label>
                    </div>
                    <img alt="license" src={insurenceImgData} className="doc_Sec_img" />
                    <input
                      onChange={insurenceimagesPreview}
                      id="upload_insurence"
                      name="upload_insurence"
                      hidden
                      type="file"
                      accept=".png, .jpg, .jpeg"
                    /> */}
                  </div>
                </div>
                {/* <div className="form-group col-md-12">
                  <div className="phone-container position-relative">
                    <label htmlfor="tel" className="number-label">
                      Insurance Information
                    </label>
                    <textarea
                      onChange={(e) => {
                        const c = { ...userData }
                        c.insuranceInfo = e.target.value
                        setUserData(c)
                      }}
                      value={driverInfos.insuranceInfo}
                      id="w3review"
                      rows="30"
                      cols="50"
                      placeholder="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                      className="form_control text_area_input"
                      style={{ height: "80px" }}
                    ></textarea>

                    {emptyValidation.insurenceInfoEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Insurance information is required </p> : ""}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Attached Documents End */}

            <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
              <div className="formbtncontainer">
                <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                  Update {btnLock ? <div className="btnloader">{Loader}</div> : ""}
                </button>
                <Link to="/ManageTruckers" className="btn_primary btn_email_primary view_user_cancel">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
export default EditTrucker
