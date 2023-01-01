import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import DriversService from "../../services/DriversService"
import Loader from "../../shared/Loader"
import { dataTypes } from "../DataType/truckTypes"
import AuthService from "../../services/AuthService"

function AddNewTrucker() {
  //State
  const driverService = new DriversService()
  const authService = new AuthService()

  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [picture, setPicture] = useState(null)
  const [lisencePicture, setLisencePicture] = useState(null)
  const [insurencePicture, setInsurencePicture] = useState(null)
  const [backLisencePicture, setBackLisencePicture] = useState(null)
  const [imgData, setImgData] = useState("/img/icon_upload_add_load.png")
  const [licenseImagData, setLisenceImgData] = useState()
  const [backlicenseImagData, setBackLisenceImgData] = useState()
  const [insurenceImgData, setInsurenceImgData] = useState()
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
  })

  const [driver, setDriver] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePhoto: imgData,
    companydrivers: [],
  })

  const [vehicles, setVehicles] = useState({
    make: "",
    model: "",
    licensePlateNumber: "",
    transmissionTypeId: 0,
  })

  const [testInfo, setTestInfo] = useState()

  const [companydrivers, setcompanydrivers] = useState({
    CompanyId: localStorage.getItem("companyQuickCompanyId"),
  })

  //images preview

  /// Profile Image Preview
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
    debugger
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

  ////Back License Image Preview
  const backLisenceimagesPreview = (e) => {
    debugger
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

  /// Insurence Image Previewf
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

  const [confirmPassword, setConfirmPassword] = useState("")

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const passwordhandler = () => {
    const password = document.querySelector("#password")
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password"
    password.setAttribute("type", type)
  }

  const passwordhandlerconfirm = () => {
    const password = document.querySelector("#confirm-password")
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password"
    password.setAttribute("type", type)
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
    e.preventDefault()
    let validCount = 0
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const c = { ...emptyValidation }

    if (driver.email === "") {
      c.emailEmpty = "Email is Required"
      validCount++
    } else if (!pattern.test(driver.email)) {
      validCount++
      c.emailEmpty = "Email should Be Valid"
    } else {
      c.emailEmpty = ""
    }

    if (driver.password === "") {
      c.passwordEmpty = true
      validCount++
    } else {
      c.passwordEmpty = false
    }
    if (picture === null) {
      c.pictureEmpty = true
      validCount++
    } else {
      c.pictureEmpty = false
    }
    if (lisencePicture === null) {
      c.lisencePictureEmpty = true
      validCount++
    } else {
      c.lisencePictureEmpty = false
    }
    if (backLisencePicture === null) {
      c.backLisencePictureEmpty = true
      validCount++
    } else {
      c.backLisencePictureEmpty = false
    }
    // if (insurencePicture === null) {
    //   c.insurencePictureEmpty = true
    //   validCount++
    // } else {
    //   c.insurencePictureEmpty = false
    // }

    if (driver.password !== confirmPassword) {
      c.confirmPasswordEmpty = true
      validCount++
    } else {
      c.confirmPasswordEmpty = false
    }

    if (driver.firstName === "") {
      c.firstNameEmpty = true
      validCount++
    } else {
      c.firstNameEmpty = false
    }
    if (driver.lastName === "") {
      c.lastNameEmpty = true
      validCount++
    } else {
      c.lastNameEmpty = false
    }

    if (driver.phoneNumber === "") {
      c.phoneNumberEmpty = true
      validCount++
    } else {
      c.phoneNumberEmpty = false
    }

    // if (vehicles.make === "") {
    //   c.makeEmpty = true
    //   validCount++
    // } else {
    //   c.makeEmpty = false
    // }

    // if (vehicles.model === "") {
    //   c.modelEmpty = true
    //   validCount++
    // } else {
    //   c.modelEmpty = false
    // }
    // if (vehicles.licensePlateNumber === "") {
    //   c.licensePlateNumberEmpty = true
    //   validCount++
    // } else {
    //   c.licensePlateNumberEmpty = false
    // }
    // if (vehicles.transmissionTypeId === 0) {
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
    driver.companydrivers = []
    driver.companydrivers = []
    // driver.vehicles = [vehicles]
    driver.companydrivers.push(companydrivers)
    debugger
    const response = await driverService.save(driver)
    if (response.data.code === 1) {
      const formData1 = new FormData()
      const formData2 = new FormData()
      const formData4 = new FormData()
      formData1.append("file", picture)
      const imageResponse = await authService.uploadImage(formData1, response.data.data.user.id)
      debugger
      formData2.append("front", lisencePicture)
      formData2.append("back", backLisencePicture)
      const LicenseimageResponse = await driverService.UploadDrivingLicense(response.data.data.user.id, formData2)
      // formData4.append("file", insurencePicture)
      // formData4.append("info", testInfo)
      // const InsurenseResponse = await driverService.UploadInsurece(formData4, response.data.data.user.id)
      // if (InsurenseResponse.data.code === 1) {
      if (LicenseimageResponse.data.code === 1) {
        if (imageResponse.data.code === 1) {
          history.push("/ManageTruckers")
          setBtnLock(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Trucker has been created",
            showConfirmButton: true,
            timer: 5000,
          })
        }
      }
      // }

      if (LicenseimageResponse.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: LicenseimageResponse.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        })
      }
      // if (InsurenseResponse.data.code === 0) {
      //   setBtnLock(false)
      //   Swal.fire({
      //     position: "center",
      //     icon: "error",
      //     title: LicenseimageResponse.data.data.message,
      //     showConfirmButton: true,
      //     timer: 5000,
      //   })
      // }
      if (imageResponse.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: imageResponse.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        })
      }
    }

    if (response.data.code === 0) {
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
        <div className="container-fluid" style={{ paddingBottom: "50px" }}>
          <form className="myForm" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="headertopbar">
                  <Link to="/ManageTruckers" className="headertopbar_title">
                    {" "}
                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Add Trucker
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
                              {imgData ? (
                                <div class="uploadedimages">
                                  <img class="uploadedimage" src={imgData} alt="uploaded_image" />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </label>
                        </div>
                        <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                        {emptyValidation.pictureEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username">First Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter first name"
                          onChange={(e) => {
                            const c = { ...driver }
                            c.firstName = e.target.value
                            setDriver(c)
                          }}
                          value={driver.firstName}
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
                          placeholder="Enter last name"
                          onChange={(e) => {
                            const c = { ...driver }
                            c.lastName = e.target.value
                            setDriver(c)
                          }}
                          value={driver.lastName}
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
                            placeholder="Enter email address"
                            className="form_control"
                            id="email-address"
                            onChange={(e) => {
                              const c = { ...driver }
                              c.email = e.target.value
                              setDriver(c)
                            }}
                            value={driver.email}
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
                            const c = { ...driver }
                            c.phoneNumber = e.target.value
                            setDriver(c)
                          }}
                          value={driver.phoneNumber}
                        />
                        {emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Password
                        </label>
                        <div>
                          <input
                            type="password"
                            name="pwd"
                            className="form_control"
                            id="password"
                            placeholder="Enter password"
                            onChange={(e) => {
                              const c = { ...driver }
                              c.password = e.target.value
                              setDriver(c)
                            }}
                            value={driver.password}
                          />
                          <div className="tick-icon-absolute">
                            <div className="eye-icon">
                              <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandler} />
                            </div>
                          </div>
                        </div>
                        {emptyValidation.passwordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password is required </p> : ""}
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Confirm Password
                        </label>
                        <div>
                          <input
                            type="password"
                            name="pwd"
                            className="form_control"
                            id="confirm-password"
                            placeholder="Enter password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
                          <div className="tick-icon-absolute">
                            <div className="eye-icon">
                              <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandlerconfirm} />
                            </div>
                          </div>
                        </div>

                        {emptyValidation.confirmPasswordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password not matching </p> : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vahicle Card Start */}

              {/* <div className="col-12 column_margin">
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
                          placeholder="Enter vehicle name"
                          onChange={(e) => {
                            const c = { ...vehicles }
                            c.make = e.target.value
                            setVehicles(c)
                          }}
                          value={vehicles.make}
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
                            type="text"
                            name="uname"
                            placeholder="Enter vehicle model"
                            className="form_control"
                            onChange={(e) => {
                              const c = { ...vehicles }
                              c.model = e.target.value
                              setVehicles(c)
                            }}
                            value={vehicles.model}
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
                          placeholder="Enter vehicle number"
                          className="form_control"
                          onChange={(e) => {
                            const c = { ...vehicles }
                            c.licensePlateNumber = e.target.value
                            setVehicles(c)
                          }}
                          value={vehicles.licensePlateNumber}
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
                              const c = { ...vehicles }
                              c.transmissionTypeId = e.target.value
                              setVehicles(c)
                            }}
                            className="form_control"
                          >
                            <option value="0" selected>
                              Select Vehicle Type
                            </option>
                            <option value={dataTypes.AWD}>AWD</option>
                            <option value={dataTypes.FWD}>FWD</option>
                          </select>
                          {emptyValidation.transmissionTypeIdEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle type is required </p> : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Vahicle Cars End */}

            {/* Attached Document Start */}

            <div className="card_custom">
              <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
                Attach Documents
              </h3>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <div className="name">
                    <label htmlfor="username"> Driver Lisence Front Image</label>
                    {licenseImagData ? (
                      <div class="uploadedimages_lisence">
                        <img class="uploadedimage_lisence" src={licenseImagData} alt="uploaded_image" />
                        <div className="position_relative_card"></div>
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      type="file"
                      className="form_control form_control_file"
                      onChange={FrontLisenceimagesPreview}
                      accept=".png, .jpg, .jpeg"
                      id="upload-image"
                      name="upload-image"
                    />

                    {emptyValidation.lisencePictureEmpty ? <p style={{ marginTop: "5px", color: "red" }}>License image is required </p> : ""}
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <div className="name">
                    <label htmlfor="username">Driver Lisence Back Image </label>
                    {backlicenseImagData ? (
                      <div class="uploadedimages_lisence">
                        <img class="uploadedimage_lisence" src={backlicenseImagData} alt="uploaded_image" />
                        <div className="position_relative_card"></div>
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      type="file"
                      className="form_control form_control_file"
                      onChange={backLisenceimagesPreview}
                      accept=".png, .jpg, .jpeg"
                      name="new-upload-image"
                    />

                    {emptyValidation.backLisencePictureEmpty ? <p style={{ marginTop: "5px", color: "red" }}>License image is required </p> : ""}
                  </div>
                </div>
                {/* <div className="form-group col-md-4">
                  <div className="name">
                    <label htmlfor="username">Vehicle Insurance</label>
                    {insurenceImgData ? (
                      <div class="uploadedimages_lisence">
                        <img class="uploadedimage_lisence" src={insurenceImgData} alt="uploaded_image" />
                        <div className="position_relative_card"></div>
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      type="file"
                      className="form_control form_control_file"
                      // onChange={insurenceimagesPreview}
                      accept=".png, .jpg, .jpeg"
                      name="upload-image"
                    /> */}
                {/* <input id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" /> */}
                {/* {emptyValidation.insurencePictureEmpty ? <p style={{ marginTop: "5px", color: "red" }}>License image is required </p> : ""}
                  </div>
                </div> */}
                {/* <div className="form-group col-md-12">
                  <div className="phone-container position-relative">
                    <label htmlfor="tel" className="number-label">
                      Insurance Information
                    </label>
                    <textarea
                      onChange={(e) => {
                        let c = { ...testInfo }
                        c = e.target.value
                        setTestInfo(c)
                      }}
                      id="w3review"
                      rows="30"
                      cols="50"
                      placeholder="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                      className="form_control text_area_input"
                      style={{ height: "80px" }}
                    ></textarea>

                    {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Attached Documents End */}

            <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
              <div className="formbtncontainer">
                <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                  Save {btnLock ? <div class="btnloader">{Loader}</div> : ""}
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
export default AddNewTrucker
