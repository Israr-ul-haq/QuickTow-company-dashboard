import axios from "../shared/AxiosConfig"

export default class AuthService {
  login = async (data) => {
    try {
      const response = await axios.post("api/Account/LoginCompany", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  recoveryEmail = async (data) => {
    try {
      const response = await axios.post("api/Account/ForgotPassword", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  userRegister = async (data) => {
    try {
      const response = await axios.post("api/Account/RegisterCompany", data)
      return response
    } catch (error) {
      return error.response
    }
  }

  uploadImage = async (data, userId) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post(`api/Account/UploadProfile/${userId}`, data, config)
      return response
    } catch (error) {
      return error.response
    }
  }
}
