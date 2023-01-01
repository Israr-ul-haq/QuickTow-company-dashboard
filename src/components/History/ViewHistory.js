import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
function ViewHistory() {
    // SERVICES


    //State
    // const [user, setUser] = useState({})
    // const [eventCount, setEventCount] = useState(0)
    // const [loader, setLoader] = useState(true)
    // const { UserId } = useParams()

    // //UseEffect
    // useEffect(() => {
    //   if (eventCount === 0) {
    //     getEvent()
    //     setEventCount(1)
    //   }
    // }, [user, eventCount]) // eslint-disable-line react-hooks/exhaustive-deps

    // //Functions

    // const getEvent = async () => {
    //   const response = await userService.getById(UserId)
    //   if (response.data.Code === 1) {
    //     setUser(response.data.Data)
    //     setLoader(false)
    //   }

    //   if (response.data.Code === 0) {
    //     Swal.fire({
    //       position: "center",
    //       icon: "error",
    //       title: response.data.Data.Message,
    //       showConfirmButton: true,
    //       timer: 5000,
    //     })
    //   }
    // }

    return (
        <div>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <Link className="arrow-container_link" to="/ManageHistory">
                                    <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />
                                    <h1 className="headertopbar_title">View Booking History</h1>
                                </Link>

                            </div>
                        </div>
                        <div className="col-12 column_margin">
                            <div className="card_custom">


                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="User_Profile_Name">
                                            Ride Details</h3>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Driver Name</h3>
                                                <h4 className="view-profile-user-name">Lahaina Grill</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    User Name</h3>
                                                <h4 className="view-profile-user-name">Lahaina Grill</h4>

                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Price</h3>
                                                <h4 className="view-profile-user-name">$500</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Vehicle Type</h3>
                                                <h4 className="view-profile-user-name">FWD</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="view-profile-pwd">
                                                    <h3 className="view-profile-name">
                                                        Vehicle Number</h3>
                                                    <h4 className="view-profile-user-name">Honda</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="view-profile-pwd">
                                                    <h3 className="view-profile-name">
                                                        Date</h3>
                                                    <h4 className="view-profile-user-name">22-04-2022</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="view-profile-pwd">
                                                    <h3 className="view-profile-name">
                                                        Time</h3>
                                                    <h4 className="view-profile-user-name">6:38 pm</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-12 column_margin">
                            <div className="card_custom">


                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="User_Profile_Name">
                                            Ride Locations</h3>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h3 className="view-profile-name">
                                                    Pickup Location</h3>
                                                <h4 className="view-profile-user-name">227 Sector FF DHA Phase 4 Qatar</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <h3 className="view-profile-name">
                                                    Drop off Location</h3>
                                                <h4 className="view-profile-user-name">Marsa Malaz Kempinski Hotel Lower Ground Floor The Pearl, Doha, Qatar</h4>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-12 column_margin">
                            <div className="card_custom">

                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="User_Profile_Name">
                                            Services Fee</h3>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Tire Change</h3>
                                                <h4 className="view-profile-user-name">$75</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Lockout Service</h3>
                                                <h4 className="view-profile-user-name">$52</h4>

                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Fuel Delivery</h3>
                                                <h4 className="view-profile-user-name">$24</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <h3 className="view-profile-name">
                                                    Jumpstart</h3>
                                                <h4 className="view-profile-user-name">$120</h4>
                                            </div>
                                            <div className="col-md-12">
                                            <div className="view-profile-pwd">
                                                <h3 className="view-profile-name">
                                                    Additional Notes</h3>
                                                    <h4 className="view-profile-user-name">here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>

    )
}
export default ViewHistory;
