import axios from "axios"

const instance = axios.create({
  baseURL: "https://quicktow.jinnbytedev.com",
})

export default instance
