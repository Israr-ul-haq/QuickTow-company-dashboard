import React, { useEffect, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import profilService from "../../services/profileService"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"


function Profile() {
  const profileservice = new profilService()

  const logout = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    localStorage.removeItem("companyQuickTowImage")
    localStorage.removeItem("companyQuickTowName")
    localStorage.removeItem("companyQuickTowId")
    localStorage.removeItem("companyQuickTowToken")
    localStorage.removeItem("companyQuickCompanyId")
    // document.querySelector(".userdropdownmenu").remove()
    history.push("/account/login")
  }
  const [loader, setLoader] = useState(true)
  const [btnlock, setBtnLock] = useState(false)
  const [companydata, setCompanyData] = useState({})
  const [accountData, setAccountData] = useState({})
  const [userData, setUserData] = useState({})

  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  

  useEffect(() => {
    if (dataCount === 0) {
      getUserData()
      setDataCount(1)
    }
  }, [companydata, accountData, userData]) // eslint-disable-line react-hooks/exhaustive-deps

  const getUserData = async () => {
    setBtnLock(true)
    const response = await profileservice.getProfileUser(localStorage.getItem("companyQuickTowId"))
    debugger
    if (response.data.code === 1) {
      setBtnLock(false)
      setCompanyData(response.data.data.companies[0])
      setAccountData(response.data.data.accounts[0])
      setUserData(response.data.data)
      setLoader(false)
    }
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link className="arrow-container_link" >

                  <h1 className="headertopbar_title">Profile</h1>
                </Link>
                < div className="primary-multiple-btns">
                  <Link to="/account/login">
                    <button type="button" className="headertopbar_btn btn_primary" onClick={logout}>
                      Logout
                    </button>
                  </Link>
                  <Link to="/EditProfile" className="profile-business-accept btn btn-primary btnAddnew">Edit Profile</Link>
                </div>
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
                        src={userData.profilePhoto}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            First Name</h3>
                          <h4 className="view-profile-user-name">{userData.firstName}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Password</h3>
                            <h4 className="view-profile-user-name">{userData.password}</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            Last Name</h3>
                          <h4 className="view-profile-user-name">{userData.lastName}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name"> Phone Number</h3>
                            <h4 className="view-profile-user-name">{userData.phoneNumber}</h4>
                          </div>

                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            Email</h3>
                          <h4 className="view-profile-user-name">{userData.email}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Number of Drivers</h3>
                            <h4 className="view-profile-user-name">{userData.noOfDrivers}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                        Company Details</h3>
                    </div>

                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <h3 className="view-profile-name">
                            Company Name</h3>
                          <h4 className="view-profile-user-name">{companydata.companyName}</h4>
                        </div>
                        <div className="col-md-3">
                          <h3 className="view-profile-name">
                            Company Email</h3>
                          <h4 className="view-profile-user-name">{companydata.companyEmail}</h4>

                        </div>
                        <div className="col-md-3">
                          <h3 className="view-profile-name">
                            Phone Number</h3>
                          <h4 className="view-profile-user-name">{companydata.companyPhoneNumber}</h4>
                        </div>
                        <div className="col-md-3">
                          <h3 className="view-profile-name">
                            Address</h3>
                          <h4 className="view-profile-user-name">{companydata.address}</h4>
                        </div>
                        <div className="col-md-3">
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">
                              Company website</h3>
                            <h4 className="view-profile-user-name">{companydata.website}</h4>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
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
                      Account Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Bank Name</h3>
                        <h4 className="view-profile-user-name">{accountData.bankName}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Name</h3>
                        <h4 className="view-profile-user-name">{accountData.accountName}</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Number</h3>
                        <h4 className="view-profile-user-name">{accountData.accountNumber}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </main>

    </div>

  )
}
export default Profile;
