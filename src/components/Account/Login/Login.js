import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import AuthService from "../../../services/AuthService"
import Loader from "../../../shared/Loader"

const Login = () => {
  //Services
  const authservice = new AuthService()

  //State
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const [loader, setloader] = useState(true)
  const [btnLock, setBtnLock] = useState(false)
  const history = useHistory()
  const [emptyValidation, setEmptyValidation] = useState({
    emailEmpty: "",
    passwordEmpty: false,
  })

  //UseEffect
  useEffect(() => {
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    if (JSON.parse(localStorage.getItem("user"))) {
      history.push("/")

    } else {
      setloader(false)
    }
  }, [])
  const passwordhandler = () => {
    const password = document.querySelector("#password")
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
    debugger
    e.preventDefault()
    e.stopPropagation()
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let validCount = 0
    const c = { ...emptyValidation }
  

    if (login.email === "") {
      c.emailEmpty = "Email is required"
      validCount++
    } else if (!pattern.test(login.email)) {
      c.emailEmpty = "Email should be valid"
    } else {
      c.emailEmpty = ""
    }

    if (login.password === "") {
      c.passwordEmpty = true
      validCount++
    } else {
      c.passwordEmpty = false
    }
    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    

    setBtnLock(true)
    const response = await authservice.login(login)
    debugger
    if (response.data.code === 1) {
      setBtnLock(false)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In",
        showConfirmButton: true,
        timer: 5000,
      })
      localStorage.setItem("companyQuickTowImage", (response.data.data.user.profilePhoto))
      localStorage.setItem("companyQuickTowName", (response.data.data.user.firstName))
      localStorage.setItem("companyQuickTowId", (response.data.data.user.accounts[0].userId))
      localStorage.setItem("companyQuickTowToken",(response.data.data.token))
      localStorage.setItem("companyQuickCompanyId",(response.data.data.user.companies[0].companyId))
      history.push('/')
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
    <>
      {loader ? (
        <div className="loadercontainer">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="background_color_login">
        <section className="login">
          <div className="login-content">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                <div className="login-header">
                  <h3 className="login-header_title">Login</h3>
                </div>
                <form className="form-login" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label htmlFor="uname" className="w-100">
                        Email
                      </label>
                      <div>
                        <input
                          onKeyUp={emailValid}
                          type="text"
                          name="uname"
                          placeholder="randy.hudson@mail.com"
                          className="form_control form_control_email email_image"
                          onChange={(e) => {
                            const c = {...login}
                            c.email = e.target.value
                            setLogin(c)
                          }}
                          id="email-address"
                        />
                        <div className="email-contain">
                          <img className="email-icon" src="/img/Email_login.svg" alt="tickicon" />
                        </div>
                        <div className="tick-icon-absolute">
                          <img className="tick-email_login" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                        </div>
                      </div>
                      {emptyValidation.emailEmpty.length !== 0 ? (
                        <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.emailEmpty} </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="pwd">Password</label>
                      <div>
                        <input
                          type="password"
                          name="uname"
                          className="form_control form_control_email email_image"
                          placeholder="Enter Password"
                          id="password"
                          onChange={(e) =>{
                            const c = {...login}
                          c.password = e.target.value
                          setLogin(c)
                          }}
                        />
                        <div className="email-contain">
                          <img className="email-icon" src="/img/Password_login.svg" alt="tickicon" />
                        </div>
                        <div className="tick-icon-absolute">
                          <div className="eye-icon_login">
                            <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandler} />
                          </div>
                        </div>
                        {emptyValidation.passwordEmpty ? <p style={{ marginTop: "5px", color: "red" }}> Password is required
                        </p> : ""}
                      </div>
                    </div>
                  </div>
                  <div className="login-button">
                    <button disabled={btnLock} type="submit" className="btn btn-primary login-btn">
                      Login
                      {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                    </button>
                  </div>
                  <div className="authentication_section">
                    <Link to="/account/RecoveryEmail">
                      <p className="authentication_password">Forgot Password?</p>
                    </Link>
                  </div>
                  <div className="sign">
                    <p className="authentication">
                      Don’t have an account?{" "}
                    </p>
                    <Link className="authentication_signup" to="/account/register">Sign Up</Link>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                <div className="logo1">
                  <img alt="logo" src="/img/Logo.svg" className="main-logo" />

                </div>
                <p className="logo_text">Tow Truck Operators</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login
