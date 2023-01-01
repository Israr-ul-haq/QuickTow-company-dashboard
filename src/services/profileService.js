import axios from "../shared/AxiosConfig"

export default class profilService {
    getProfileUser = async (userId) => {
        try{
            const response = await axios.get(`api/Account/GetById/${userId}`)
            return response
        } catch(error){
            return error.response
        }
    }

    updateProfile = async (data) => {
        try{
            const response = await axios.put(`api/Account/UpdateCompany`,data)
            return response
        } catch(error){
            return error.response
        }
    }
}