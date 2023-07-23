import axios, { AxiosInstance } from 'axios'

export interface ApiClientParams {
  url?: string
}

export class ApiClient {
  apiClient: AxiosInstance

  constructor(params?: { url?: string }) {
    const { url = 'http://localhost:4503/admin-api' } = params || {}
    this.apiClient = axios.create({
      baseURL: url,
    })
  }

  setCredentials({ client_id, client_secret }: { client_id: string; client_secret: string }) {
    this.apiClient.defaults.headers.common['client-id'] = client_id
    this.apiClient.defaults.headers.common['secret-key'] = client_secret
  }
}

const apiClient = new ApiClient()

export default apiClient
