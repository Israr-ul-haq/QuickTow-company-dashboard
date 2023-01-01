import { NavLink, useHistory } from "react-router-dom"
import React, { useEffect } from "react"
import PerfectScrollbar from "perfect-scrollbar"
function Sidebar() {
  //State

  // Functions

  // const handleScroll = (e) => {
  //   document.querySelector(".userdropdownmenu").style.cssText = "position: fixed; left:95px;"
  //   document.querySelector(".userdropdownmenu").style.top = document.querySelector(".userdropdownli").getBoundingClientRect().top + "px"
  // }

  const addClass = (e) => {
    document.querySelectorAll(".main-menu li a").forEach((item) => {
      item.closest("li").classList.remove("active")
    })
    // document.querySelector(".userdropdowncontainer").closest("li").classList.remove("active")
    e.target.closest("li").className = "active"
  }

  //UseEffect

  useEffect(() => {
    //To initialise:

    const container = document.querySelector("#menuScroll")
    const ps = new PerfectScrollbar(container)
  })

  return (
    <div>
      <div className="menu">
        <div className="main-menu">
          <div id="menuScroll" className="scroll">
            <ul className="list-unstyled">
              <li onClick={addClass}>
                <NavLink exact to="/">
                  <img src="img/Icon material-dashboard.svg" alt="sidebar-icon" />
                  <span>Dashboards</span>
                </NavLink>
              </li>

              <li onClick={addClass}>
                <NavLink to="/ManageTruckers">
                  <img src="img/user.svg" alt="sidebar-icon" style={{ height: "28px" }} />
                  <span>Truckers</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageTrucks">
                  <img src="img/Truckers.svg" style={{ width: "30px", height: "30px" }} alt="sidebar-icon" />
                  <span>Trucks</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageHistory">
                  <img src="img/Subscription.svg" alt="sidebar-icon" style={{ width: "29px", height: "21px" }} />
                  <span>History</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
