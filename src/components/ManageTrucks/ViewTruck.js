import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
function ViewTruck() {
  

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link className="arrow-container_link" to="/ManageTruckers">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />
                  <h1 className="headertopbar_title">View Vehicle</h1>
                </Link>

              </div>
            </div>


            {/* Vehicle Details Start */}
            <div className="col-12 column_margin">
              <div className="card_custom">


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
                        <h4 className="view-profile-user-name">Honda</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Model</h3>
                        <h4 className="view-profile-user-name">City 2000</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Number</h3>
                        <h4 className="view-profile-user-name">ABC 857</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Category</h3>
                        <h4 className="view-profile-user-name">Car</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* Vehicle Details End */}
               {/* Attached Documents start */}
               <div className="col-12 column_margin">
              <div className="card_custom">

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Attached Documents</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="section_images" style={{ paddingBottom: "45px" }}>

                      <div className="position_relative_card">

                      </div>
                      <img alt="id" src="/img/Insurance info.png" className="doc_Sec_img" />

                      <div className="position_relative_card">

                      </div>
                      <img alt="license" src="/img/License.png" className="doc_Sec_img" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="view-profile-name">
                          Insurance Information</h3>
                        <h4 className="view-profile-user-name">here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form. here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* Attached Documents End */}
            </div>
            </div>
            </main>
            </div>

  )
}
export default ViewTruck;
