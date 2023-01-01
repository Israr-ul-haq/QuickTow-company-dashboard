import { map } from "jquery"
import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import TruckService from "../../services/TrucksService"
import Loader from "../../shared/Loader"
import { dataTypes } from "../DataType/truckTypes"
function AddNewTruck() {
  //State
  const truckService = new TruckService()
  const [data, setData] = useState({})
  const [drivers, setDrivers] = useState([])
  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    makeEmpty: false,
    modelEmpty: false,
    licensePlateNumberEmpty: false,
    transmissionTypeIdEmpty: false,
    userIdEmpty: false,
  })
  // SERVICES

  //Functions

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (data.make === "") {
      c.makeEmpty = true
      validCount++
    } else {
      c.makeEmpty = false
    }

    if (data.model === "") {
      c.modelEmpty = true
      validCount++
    } else {
      c.modelEmpty = false
    }

    if (data.licensePlateNumber === "") {
      c.licensePlateNumberEmpty = true
      validCount++
    } else {
      c.licensePlateNumberEmpty = false
    }

    if (data.userId === "") {
      c.userIdEmpty = true
      validCount++
    } else {
      c.userIdEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)
  }

  useEffect(() => {
    if (dataCount === 0) {
      getDrivers()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const getDrivers = async () => {
    setLoader(true)
    debugger
    const response = await truckService.getDrivers()
    setDrivers(response.data.data)
    setLoader(false)
  }

  return (
    <div>
      <main>
        <div className="container-fluid" style={{ paddingBottom: "50px" }}>
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link to="/ManageTrucks" className="headertopbar_title">
                  {" "}
                  <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Add Vehicle
                </Link>
              </div>
            </div>

            {/* Vahicle Card Start */}

            <div className="col-12 column_margin">
              <div className="card_custom">
                <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
                  Vehicle Details
                </h3>
                <form className="myform" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <div className="name">
                        <label htmlfor="username"> Vehicle Name</label>
                        <input
                          type="text"
                          name="username"
                          className="form_control"
                          placeholder="Enter name"
                          onChange={(e) => {
                            const c = { ...data }
                            c.firstName = e.target.value
                            setData(c)
                          }}
                          value={data.make}
                        />
                        {emptyValidation.makeEmpty ? <p style={{ marginTop: "5px", color: "red" }}>vehicle name is required </p> : ""}
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
                            placeholder="Enter email address"
                            className="form_control"
                            onChange={(e) => {
                              const c = { ...data }
                              c.model = e.target.value
                              setData(c)
                            }}
                            value={data.model}
                          />
                          {emptyValidation.modelEmpty ? <p style={{ marginTop: "5px", color: "red" }}>vehicle model is required </p> : ""}
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
                            const c = { ...data }
                            c.licensePlateNumber = e.target.value
                            setData(c)
                          }}
                          value={data.licensePlateNumber}
                        />
                        {emptyValidation.licensePlateNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle number is required </p> : ""}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Vehicle Type
                        </label>
                        <div>
                          <select
                            onChange={(e) => {
                              const c = { ...data }
                              c.transmissionTypeId = e.target.value
                              setData(c)
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
                    <div className="form-group col-md-4">
                      <div className="password-container position-relative">
                        <label htmlfor="pwd" className="100">
                          Assign To
                        </label>
                        <div>
                          <select
                            onChange={(e) => {
                              const c = { ...data }
                              c.userId = e.target.value
                              setData(c)
                            }}
                            className="form_control"
                          >
                            <option selected value="0">
                              Select Driver
                            </option>
                            {drivers.map((item) => {
                              return (
                                <>
                                  <option value={item.id}>{item.title}</option>
                                </>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Vahicle Cars End */}

          {/* Attached Document Start */}

          <div className="card_custom">
            <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>
              Attach Documents
            </h3>
            <form className="myform" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <div className="name">
                    <label htmlfor="username"> Driver Lisence</label>
                    <input type="file" className="form_control form_control_file" />
                    {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <div className="email-container position-relative">
                    <label htmlfor="uname" className="w-100 email-label">
                      Vehicle Insurance
                    </label>
                    <div>
                      <input type="file" className="form_control form_control_file" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <div className="phone-container position-relative">
                    <label htmlfor="tel" className="number-label">
                      Insurance Information
                    </label>
                    <textarea
                      id="w3review"
                      rows="30"
                      cols="50"
                      placeholder="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                      className="form_control text_area_input"
                      style={{ height: "80px" }}
                    ></textarea>

                    {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Attached Documents End */}

          <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
            <div className="formbtncontainer">
              <button type="submit" className="profile-business-accept btn btn-primary">
                Save
              </button>
              <Link to="/ManageTrucks" className="btn_primary btn_email_primary view_user_cancel">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default AddNewTruck
