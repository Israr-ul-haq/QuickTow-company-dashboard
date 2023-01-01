import { relativeTimeRounding } from "moment"
import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import DriversService from "../../services/DriversService"


import Loader from "../../shared/Loader"
import { dataTypes } from "../DataType/truckTypes"
function ViewTrucker() {
  const driverService = new DriversService()
  const { driverId } = useParams()
  const [userData, setUserData] = useState({})
  const [dataCount, setDataCount] = useState(0)
  const [vahicleData, setVahicleData] = useState({})
  const [driverInfos, setDriverInfos] = useState({})
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (dataCount === 0) {
      getDriver()
      setDataCount(1)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const getDriver = async () => {
    setLoader(true)
    const response = await driverService.getDriverById(driverId)
    setUserData(response.data.data[0])
    setVahicleData(response.data.data[0].vehicles[0])
    setDriverInfos(response.data.data[0].driverInfos[0])
    setLoader(false)
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link className="arrow-container_link" to="/ManageTruckers">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />
                  <h1 className="headertopbar_title">Profile-Truckers</h1>
                </Link>
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
              {loader ? (
                  Loader
                ) : (
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      User Details</h3>
                  </div>
                  <div className="col-md-3">
                    <img
                      style={{ width: "70%", height: "190px", borderRadius: "15px" }}
                      alt="event_image"
                      src={driverInfos.licenseFrontPicture}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          First Name</h3>
                        <h4 className="view-profile-user-name">{userData.firstName}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Email</h3>
                          <h4 className="view-profile-user-name">{userData.email}</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Last Name</h3>
                        <h4 className="view-profile-user-name">{userData.lastName}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Password</h3>
                          <h4 className="view-profile-user-name">{userData.password}</h4>
                        </div>

                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Phone Number</h3>
                        <h4 className="view-profile-user-name">{userData.phoneNumber}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Rating</h3>
                          <h4 className="view-profile-user-name">{userData.ratings}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
            {/* User Details End */}

            {/* Vehicle Details Start */}
            <div className="col-12 column_margin">
              <div className="card_custom">
              {loader ? (
                  Loader
                ) : (

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Vehicle Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Name</h3>
                        <h4 className="view-profile-user-name">{vahicleData.make}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Model</h3>
                        <h4 className="view-profile-user-name">{vahicleData.model}</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Number</h3>
                        <h4 className="view-profile-user-name">{vahicleData.licensePlateNumber}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Category</h3>
                        <h4 className="view-profile-user-name">{vahicleData.transmissionTypeId === dataTypes.AWD ? "AWD" : "FWD"}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
            {/* Vehicle Details End */}


            {/* Attached Documents start */}
            <div className="col-12 column_margin">
              <div className="card_custom">
              {loader ? (
                  Loader
                ) : (
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Attached Documents</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="section_images" style={{ paddingBottom: "45px" }}>


                      <img alt="id" src={driverInfos.licenseFrontPicture} className="doc_Sec_img" />


                      <img alt="license" src={driverInfos.licenseBackPicture} className="doc_Sec_img" />
                      <img alt="license" src={driverInfos.insurancePicture} className="doc_Sec_img" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="view-profile-name">
                          Insurance Information</h3>
                        <h4 className="view-profile-user-name">{driverInfos.insuranceInfo}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
            {/* Attached Documents End */}



            {/* Card Details Start */}
            {/* <div className="col-12 column_margin">
              <div className="card_custom">

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Card Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Card Holder Name</h3>
                        <h4 className="view-profile-user-name">Mathew John</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Card Number</h3>
                        <h4 className="view-profile-user-name">5200828282828210</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Expiry Date</h3>
                        <h4 className="view-profile-user-name">22-04-2022</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* // Card Details End  */}
        <div className="col-12 column_margin">
          <div className="row">
            <div className="col-md-12">
              <h3 className="User_Profile_Name">
                Live Location</h3>
            </div>
            <div style={{ paddingBottom: "110px", width: "100%" }}>
              <img src="/img/Screenshot_2.png" alt="" style={{ width: "100%", height: "366px", borderRadius: "2px" }} />
            </div>
          </div>
        </div>
      </main>
    </div>



  )
}
export default ViewTrucker;
