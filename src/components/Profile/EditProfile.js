import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import AuthService from "../../services/AuthService"
import profilService from "../../services/profileService"
import Loader from "../../shared/Loader"
function EditProfile() {
	//State
	const ProfileService = new profilService()
	const authService = new AuthService()
	const { UserId } = useParams()
	const history = useHistory()
	const [dataCount, setDataCount] = useState(0)
	const [loader, setLoader] = useState(true)
	const [picture, setPicture] = useState(null)
	const [imgData, setImgData] = useState("/img/icon_upload_add_load (2).svg")

	const [btnLock, setBtnLock] = useState(false)
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
	const [companydata, setCompanyData] = useState({
	})
	const [accountData, setAccountData] = useState({})
	const [userData, setUserData] = useState({
		id: localStorage.getItem("companyQuickTowId"),
		email: "",
		// password: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		profilePhoto: imgData,
		companies: [],
		accounts: []
	})


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
	const deleteItem = () => {
		setPicture(null)
		setImgData(null)
	}
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
	const CompanyemailValid = () => {
		let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		var email = document.getElementById("email-address").value
		if (!pattern.test(email)) {
			document.querySelector("#tick-company").style.display = "none"
		} else {
			document.querySelector("#tick-company").style.display = "block"
		}
	}




	const handleSubmit = async (e) => {
		e.preventDefault()
		let validCount = 0
		let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		const c = { ...emptyValidation }


		if (userData.email === "") {
			c.emailEmpty = "Email is Required"
			validCount++
		} else if (!pattern.test(userData.email)) {
			validCount++
			c.emailEmpty = "Email should Be Valid"
		} else {
			c.emailEmpty = ""
		}

		// if (userData.password === "") {
		// 	c.passwordEmpty = true
		// 	validCount++
		// } else {
		// 	c.passwordEmpty = false
		// }
	

		if (userData.firstName === "") {
			c.firstNameEmpty = true
			validCount++
		} else {
			c.firstNameEmpty = false
		}
		if (userData.lastName === "") {
			c.lastNameEmpty = true
			validCount++
		} else {
			c.lastNameEmpty = false
		}

		if (userData.phoneNumber === "") {
			c.phoneNumberEmpty = true
			validCount++
		} else {
			c.phoneNumberEmpty = false
		}

		if (imgData === null) {
			c.profilePhotoEmpty = true
			validCount++
		} else {
			c.profilePhotoEmpty = false
		}

		if (companydata.companyName === "") {
			c.companyNameEmpty = true
			validCount++
		} else {
			c.companyNameEmpty = false
		}
		if (companydata.companyEmail === "") {
			c.companyEmailEmpty = "Email is Required"
			validCount++
		} else if (!pattern.test(companydata.companyEmail)) {
			validCount++
			c.companyEmailEmpty = "Email should Be Valid"
		} else {
			c.companyEmailEmpty = ""
		}


		if (companydata.companyPhoneNumber === "") {
			c.companyPhoneNumberEmpty = true
			validCount++
		} else {
			c.companyPhoneNumberEmpty = false
		}
		if (companydata.address === "") {
			c.addressEmpty = true
			validCount++
		} else {
			c.addressEmpty = false
		}
		if (accountData.bankName === "") {
			c.bankNameEmpty = true
			validCount++
		} else {
			c.bankNameEmpty = false
		}
		if (accountData.accountName === "") {
			c.accountNameEmpty = true
			validCount++
		} else {
			c.accountNameEmpty = false
		}
		if (accountData.accountNumber === "") {
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
		userData.companies = []
		userData.accounts = []
		userData.companies.push(companydata)
		userData.accounts.push(accountData)
		debugger
		const response = await ProfileService.updateProfile(userData)
		if (response.data.code === 1) {
			if (!(picture === null)) {
				const formData = new FormData()
				formData.append("file", picture)
				const imageResponse = await authService.uploadImage(formData, response.data.data.id)
				if (imageResponse.data.code === 1) {
					localStorage.setItem("companyQuickTowImage", (imageResponse.data.data))
					history.push("/Profile")
					setBtnLock(false)
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Profile has been updated",
						showConfirmButton: true,
						timer: 5000,
					})
				}

				if (response.data.code === 0) {
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

			else {
				history.push("/Profile")
				setBtnLock(false)
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Profile has been updated",
					showConfirmButton: true,
					timer: 5000,
				})
			}
		}
	}


	useEffect(() => {
		if (dataCount === 0) {
			getUserData()
			setDataCount(1)
		}
	}, [companydata, accountData, userData]) // eslint-disable-line react-hooks/exhaustive-deps

	const getUserData = async () => {
		debugger
		setBtnLock(true)
		setLoader(true)
		const response = await ProfileService.getProfileUser(localStorage.getItem("companyQuickTowId"))
		if (response.data.code === 1) {
			setBtnLock(false)
			setCompanyData(response.data.data.companies[0])
			setAccountData(response.data.data.accounts[0])
			setUserData(response.data.data)
			setImgData(response.data.data.profilePhoto)
			setLoader(false)
		}
	}


	return (
		<div>
			<main>
				<div className="container-fluid" style={{ paddingBottom: "50px" }}>
					<form className="myform" onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-12">
								<div className="headertopbar">
									<Link to="/Profile" className="headertopbar_title">
										{" "}
										<img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Profile
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
												<div style={{ position: "relative" }}>
                                                    <label for="upload-image"> <img src="/img/edit (2).svg" alt="" className="edit_img" /></label>
                                                </div>
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
														const x = { ...userData }
														x.firstName = e.target.value
														setUserData(x)
													}}
													value={userData.firstName}
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
													placeholder="Enter name"
													onChange={(e) => {
														const x = { ...userData }
														x.lastName = e.target.value
														setUserData(x)
													}}
													value={userData.lastName}
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
													disabled
														onKeyUp={emailValid}
														type="text"
														name="uname"
														placeholder="Enter email address"
														className="form_control"
														id="email-address"
														onChange={(e) => {
															const x = { ...userData }
															x.email = e.target.value
															setUserData(x)
														}}
														value={userData.email}

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
													placeholder="Enter phone number"
													maxLength="11"
													onInput={maxLengthCheck}
													className="form_control"
													onChange={(e) => {
														const x = { ...userData }
														x.phoneNumber = e.target.value
														setUserData(x)
													}}
													value={userData.phoneNumber}

												/>
												{emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* update password start */}

							{/* <div className="col-12 column_margin">
								<div className="card_custom">
									<h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Update Password</h3>
									<div className="form-row">

										<div className="form-group col-md-4">
											<div className="name">
												<label htmlfor="username">Current Password</label>
												<input
													type="password"
													name="username"
													className="form_control"
													placeholder="Enter your current password"
													onChange={(e) => {
														debugger
														const x = { ...userData }
														x.password = e.target.value

														setUserData(x)
													}}
													id="password"
													value={userData.password}
												/>
												<div className="tick-icon-absolute">
                                                        <div className="eye-icon">
                                                            <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandler} />
                                                        </div>
                                                    </div>
												{emptyValidation.passwordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Current password is required</p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="email-container position-relative">
												<label htmlfor="uname" className="w-100 email-label">
													New Password
												</label>
												<div>
													<input
														type="password"
														name="uname"
														placeholder="Enter your new password"
														className="form_control inputEnable"
														id="email-address"
														onChange={(e) => {
															const x = { ...userData }
															x.password = e.target.value
															setUserData(x)
														}}
													/>
													<div className="tick-icon-absolute">
														<img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
													</div>
												</div>
												{emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>New password is required</p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="phone-container position-relative">
												<label htmlfor="tel" className="number-label">
													Confirm Password
												</label>
												<input

													type="password"
													placeholder="Confirm password"
													className="form_control"
												// onChange={(e) => setConfirmPassword(e.target.value)}
												// value={confirmPassword}
												/>
												{emptyValidation.confirmPasswordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password not matching </p> : ""}
											</div>
										</div>
									</div>

								</div>
							</div> */}
							{/* update password end */}


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
														const x = { ...companydata }
														x.companyName = e.target.value
														setCompanyData(x)
													}}
													value={companydata.companyName}
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
														onKeyUp={CompanyemailValid}
														type="text"
														name="uname"
														placeholder="Enter email address"
														className="form_control"
														id="email-address"
														onChange={(e) => {
															const x = { ...companydata }
															x.companyEmail = e.target.value
															setCompanyData(x)
														}}
														value={companydata.companyEmail}
													/>
													<div className="tick-icon-absolute">
														<img className="tick-email" src="./img/Tick.svg" id="tick-company" alt="tickicon" />
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
													placeholder="Enter phone number"
													maxLength="11"
													onInput={maxLengthCheck}
													className="form_control"
													onChange={(e) => {

														const x = { ...companydata }
														x.companyPhoneNumber = e.target.value
														setCompanyData(x)
													}}
													value={companydata.companyPhoneNumber}
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
														const x = { ...companydata }
														x.address = e.target.value
														setCompanyData(x)
													}}
													value={companydata.address}
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
														const x = { ...companydata }
														x.website = e.target.value
														setCompanyData(x)
													}}
													value={companydata.website}

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
												const x = { ...accountData }
												x.bankName = e.target.value
												setAccountData(x)
											}}
											value={accountData.bankName}
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
												const x = { ...accountData }
												x.accountName = e.target.value
												setAccountData(x)
											}}
											value={accountData.accountName}

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
												const x = { ...accountData }
												x.accountNumber = e.target.value
												setAccountData(x)
											}}
											value={accountData.accountNumber}

										/>
										{emptyValidation.accountNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Account number is required </p> : ""}
									</div>
								</div>

							</div>

						</div>

						{/* Attached Documents End */}


						<div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
							<div className="formbtncontainer">
								<button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
									Update  {btnLock ? <div className="btnloader">{Loader}</div> : ""}
								</button>
								<Link to="/Profile" className="btn_primary btn_email_primary view_user_cancel">
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
export default EditProfile
