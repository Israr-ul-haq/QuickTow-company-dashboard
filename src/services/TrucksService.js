import axios from "../shared/AxiosConfig"

export default class TruckService {
  getDrivers = async () => {
    try {
      const response = await axios.get(`api/Vehicle/GetAllDrivers`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getDriverById = async (driverId) => {
    try {
      const response = await axios.get(`api/Driver/GetById/${driverId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  save = async (data) => {
    try {
      const response = await axios.post("api/Driver/AddDriver", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  update = async (data) => {
    try {
      const response = await axios.put("api/Driver/UpdateDriver", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  UploadDrivingLicense = async (userId, data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post(`api/Account/UploadDrivingLicense/${userId}`, data, config)
      return response
    } catch (error) {
      return error.response
    }
  }
  UploadInsurece = async (data, userId) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }

    try {
      const response = await axios.post(`api/Account/UploadInsuranceInfo/${userId}`, data, config)
      debugger
      return response
    } catch (error) {
      return error.response
    }
  }
  delete = async (driverId) => {
    try {
      const response = await axios.delete(`api/Driver/DeleteDriver/${driverId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
}
