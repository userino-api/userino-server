import { AxiosInstance } from 'axios'

abstract class ApiInstanceClass {
  apiClient: AxiosInstance

  constructor({ client }: { client: AxiosInstance }) {
    this.apiClient = client
  }
}

export default ApiInstanceClass
