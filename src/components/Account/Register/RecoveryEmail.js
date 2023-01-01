import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import AuthService from "../../../services/AuthService"
import Loader from "../../../shared/Loader"
import Login from "../Login/Login"



function RecoveryEmail() {

    const authservice = new AuthService()

    const [loade, setLoader] = useState(true)

    const [recoverEmail, setReacoverEmail] = useState({
        email: "",
    })
    const [emptyValidation, setEmptyValidation] = useState({
        emailEmpty: "",
    })
    const [btnLock, setBtnLock] = useState(false)
    const history = useHistory()

    /// Email Valid
    const emailValid = () => {
        let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        var email = document.getElementById("email-address").value
        if (!pattern.test(email)) {
            document.querySelector("#tick-1").style.display = "none"
        } else {
            document.querySelector("#tick-1").style.display = "block"
        }
    }


    ///Handle Submit
    const handSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        let validCount = 0;
        const c = { ...emptyValidation }
        if (recoverEmail.email === "") {
            c.emailEmpty = "Email is required"
            validCount++
        } else if (!pattern.test(recoverEmail.email)) {
            c.emailEmpty = "Email should be valid"
        } else {
            c.emailEmpty = ""
        }
        setEmptyValidation(c)
        if (validCount > 0) {
            return
        }

        setBtnLock(true)


        const response = await authservice.recoveryEmail(recoverEmail)
        if (response.data.code === 1) {
            setBtnLock(false)
            history.push("/account/login")
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.data.message,
                showConfirmButton: true,
                timer: 5000,
            })
        }
        if (response.data.code === 0) {
            setBtnLock(false)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Account does not exist",
                showConfirmButton: true,
                timer: 5000,
            })
        }
    }

    return (
        <div>
            <main className="signUp_Main">
                <div className="container-fluid" style={{ paddingBottom: "50px" }}>
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <Link to="/account/login" className="headertopbar_title">
                                    {" "}
                                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Forgot Password
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 column_margin">
                            <div className="card_custom">

                                <form className="myform" onSubmit={handSubmit}>
                                    <div className="form-group col-md-12">
                                        <div className="email-container position-relative">
                                            <label htmlfor="uname" className="w-100 email-label">
                                                Email
                                            </label>
                                            <div className="btn-container">
                                                <div className="password_email">
                                                    <input
                                                        onKeyUp={emailValid}
                                                        type="text"
                                                        name="uname"
                                                        placeholder="Enter Email Address"
                                                        className="form_control "
                                                        id="email-address"
                                                        onChange={(e) => {
                                                            const c = { ...recoverEmail }
                                                            c.email = e.target.value
                                                            setReacoverEmail(c)
                                                        }}
                                                    />
                                                    {emptyValidation.emailEmpty.length !== 0 ? (
                                                        <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.emailEmpty} </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <div className="tick-icon-absolute">
                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                                                    </div>
                                                </div>

                                                <div className="recoverBtn_contain">
                                                    <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                                                        Save
                                                        {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                                                    </button>
                                                    <Link to="/account/login" className="btn_primary btn_email_primary view_user_cancel">
                                                        Cancel
                                                    </Link>
                                                </div>



                                            </div>

                                        </div>


                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>














    )
}
export default RecoveryEmail
