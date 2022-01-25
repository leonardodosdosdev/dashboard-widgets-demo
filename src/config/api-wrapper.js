import axios from 'axios'
import config from './env-config'

class RestApiWrapper {
  static getInstance() {
    if (!RestApiWrapper.instance) {
      RestApiWrapper.instance = RestApiWrapper.createInstance()
    }
    return RestApiWrapper.instance
  }

  static createInstance() {
    return new RestApiWrapper()
  }

  constructor() {
    const axiosInstance = axios.create({
      baseURL: config.SERVER_URI,
    })
    return axiosInstance
  }
}

export default RestApiWrapper.getInstance()
