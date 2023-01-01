import React, {  useState } from "react"
import { Link,  useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import Loader from "../../../shared/Loader"
import AuthService from "../../../services/AuthService"

function Register() {
    //State

    const history = useHistory()
   
    const [picture, setPicture] = useState(null)
    
    const [btnLock, setBtnLock] = useState(false)
    const [imgData, setImgData] = useState("/img/icon_upload_add_load.png")
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        profilePhoto: imgData,
        companies: [],
        accounts: []
    })

    const [company, setCompany] = useState({
        companyName: "",
        companyEmail: "",
        companyPhoneNumber: "",
        address: "",
        website: ""

    })

    const [account, setAccount] = useState({
        bankName: "",
        accountName: "",
        accountNumber: ""
    })
    
    const [emptyValidation, setEmptyValidation] = useState({
        profilePhotoEmpty: false,
        firstNameEmpty: "",
        lastNameEmpty: "",
        emailEmpty: "",
        phoneEmpty: "",
        passwordEmpty: "",
        confirmPasswordEmpty: "",
        phoneNumberEmpty: "",
        companyNameEmpty: "",
        companyEmailEmpty: "",
        companyPhoneNumberEmpty: "",
        addressEmpty: "",
        bankNameEmpty: "",
        accountNameEmpty: "",
        accountNumberEmpty: "",
    })

    const authservice = new AuthService()

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


        if (user.email === "") {
            c.emailEmpty = "Email is Required"
            validCount++
        } else if (!pattern.test(user.email)) {
            validCount++
            c.emailEmpty = "Email should Be Valid"
        } else {
            c.emailEmpty = ""
        }

        if (user.password === "") {
            c.passwordEmpty = true
            validCount++
        } else {
            c.passwordEmpty = false
        }
        if (user.password !== confirmPassword) {
            c.confirmPasswordEmpty = true
            validCount++
        } else {
            c.confirmPasswordEmpty = false
        }

        if (user.firstName === "") {
            c.firstNameEmpty = true
            validCount++
        } else {
            c.firstNameEmpty = false
        }
        if (user.lastName === "") {
            c.lastNameEmpty = true
            validCount++
        } else {
            c.lastNameEmpty = false
        }

        if (user.phoneNumber === "") {
            c.phoneNumberEmpty = true
            validCount++
        } else {
            c.phoneNumberEmpty = false
        }

        if (picture === null) {
            c.profilePhotoEmpty = true
            validCount++
        } else {
            c.profilePhotoEmpty = false
        }

        if (company.companyName === "") {
            c.companyNameEmpty = true
            validCount++
        } else {
            c.companyNameEmpty = false
        }
        if (company.companyEmail === "") {
            c.companyEmailEmpty = "Email is required"
            validCount++
        } else if (!pattern.test(company.companyEmail)) {
            validCount++
            c.companyEmailEmpty = "Email should be valid"
        } else {
            c.companyEmailEmpty = ""
        }


        if (company.companyPhoneNumber === "") {
            c.companyPhoneNumberEmpty = true
            validCount++
        } else {
            c.companyPhoneNumberEmpty = false
        }
        if (company.address === "") {
            c.addressEmpty = true
            validCount++
        } else {
            c.addressEmpty = false
        }
        if (account.bankName === "") {
            c.bankNameEmpty = true
            validCount++
        } else {
            c.bankNameEmpty = false
        }
        if (account.accountName === "") {
            c.accountNameEmpty = true
            validCount++
        } else {
            c.accountNameEmpty = false
        }
        if (account.accountNumber === "") {
            c.accountNumberEmpty = true
            validCount++
        } else {
            c.accountNumberEmpty = false
        }
        setEmptyValidation(c)

        if (validCount > 0) {
            return
        }
        setBtnLock(true)
        user.companies = []
        user.accounts = []
        user.companies.push(company)
        user.accounts.push(account)
        debugger
        const response = await authservice.userRegister(user)
        if (response.data.code === 1) {
            const formData = new FormData()
            formData.append("file", picture)
            const imageResponse = await authservice.uploadImage( formData, response.data.data.user.companies[0].userId)
            if (imageResponse.data.code === 1) {
                history.push("/account/login")
                setBtnLock(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thanks for registration",
                    showConfirmButton: true,
                    timer: 5000,
                })
            }

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
            <main className="signUp_Main">
                <div className="container-fluid">
                    <form className="myform" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <div className="headertopbar">
                                    <Link to="/account/login" className="headertopbar_title">
                                        {" "}
                                        <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />Sign up
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 column_margin">
                                <div className="card_custom">
                                    <h3 className="User_Profile_Name" style={{ paddingBottom: "30px" }}>Personal Information</h3>

                                    <div className="form-row">
                                        <div className="form-group col-md-12 form-group--uploadimage">
                                            <div className="file-upload position-relative">
                                                <div class="imagecontainer">
                                                    <label for="upload-image" class="upload-image-label">
                                                        <div className="file-pic">
                                                            <h5 className="upload-image-title">Upload Image</h5>
                                                            {imgData ? (
                                                                <div class="uploadedimages">
                                                                    <img
                                                                        class="uploadedimage"
                                                                        src={imgData}
                                                                        alt="uploaded_image"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                                                {emptyValidation.profilePhotoEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
                                              
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
                                                        const c = { ...user }
                                                        c.firstName = e.target.value
                                                        setUser(c)
                                                    }}
                                                    value={user.firstName}
                                                />
                                                {emptyValidation.firstNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username">last Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter name"
                                                    onChange={(e) => {
                                                        const c = { ...user }
                                                        c.lastName = e.target.value
                                                        setUser(c)
                                                    }}
                                                    value={user.lastName}
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
                                                            const c = { ...user }
                                                            c.email = e.target.value
                                                            setUser(c)
                                                        }}
                                                        value={user.email}
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
                                                    placeholder="Enter number"
                                                    maxLength="11"
                                                    onInput={maxLengthCheck}
                                                    selected={user.Phone}
                                                    className="form_control"
                                                    onChange={(e) => {
                                                        const c = { ...user }
                                                        c.phoneNumber = e.target.value
                                                        setUser(c)
                                                    }}
                                                    value={user.phoneNumber}
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
                                                            const c = { ...user }
                                                            c.password = e.target.value
                                                            setUser(c)
                                                        }}
                                                        value={user.password}

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


                            {/*Company Information Start */}

                            <div className="col-12 column_margin">
                                <div className="card_custom">
                                    <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Company Information</h3>

                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Company Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter name"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.companyName = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.companyName}
                                                />
                                                {emptyValidation.companyNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Company name is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="email-container position-relative">
                                                <label htmlfor="uname" className="w-100 email-label">
                                                    Company Email
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
                                                            const c = { ...company }
                                                            c.companyEmail = e.target.value
                                                            setCompany(c)
                                                        }}
                                                        value={company.companyEmail}
                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                                                    </div>
                                                </div>
                                                {emptyValidation.companyEmailEmpty.length !== 0 ? (
                                                    <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.companyEmailEmpty} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="phone-container position-relative">
                                                <label htmlfor="tel" className="number-label">
                                                    Company Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter number"
                                                    maxLength="11"
                                                    onInput={maxLengthCheck}
                                                    className="form_control"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.companyPhoneNumber = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.companyPhoneNumber}

                                                />
                                                {emptyValidation.companyPhoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Address</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter address"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.address = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.address}
                                                />
                                                {emptyValidation.addressEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Address is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Company website</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="www.quick-tow.com/"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.website = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.website}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Vahicle Cars End */}

                        {/* Attached Document Start */}

                        <div className="card_custom">
                            <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Account information</h3>

                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Bank Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="Bank of USA"
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.bankName = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.bankName}
                                        />
                                        {emptyValidation.bankNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Bank name is required </p> : ""}
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username"> Account Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="Regular Account"
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.accountName = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.accountName}

                                        />
                                        {emptyValidation.accountNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}> Account name is required </p> : ""}
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Account Number</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="5200828282828210"
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.accountNumber = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.accountNumber}
                                        />
                                        {emptyValidation.accountNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Account Number </p> : ""}
                                    </div>
                                </div>

                            </div>

                        </div>


                        {/* Attached Documents End */}


                        <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                            <div className="formbtncontainer">
                                <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                                    Sign up {btnLock ? <div className="btnloader">{Loader}</div> : ""}
                                </button>
                                <Link to="/account/login" className="btn_primary btn_email_primary view_user_cancel">
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
export default Register
