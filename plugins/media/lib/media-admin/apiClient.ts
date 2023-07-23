import axios, { AxiosInstance } from 'axios'

export interface ApiClientParams {
  url?: string
}

export class ApiClient {
  apiClient: AxiosInstance

  constructor(params?: { url?: string }) {
    const { url = process.env.MEDIA_ADMIN_URL || 'http://localhost:4503' } = params || {}
    this.apiClient = axios.create({
      baseURL: url,
    })
  }

  setCredentials({ client_id, client_secret }: { client_id: string; client_secret: string }) {
    let authBuffer = Buffer.from(`${client_id}:${client_secret}`)
    const authorization = authBuffer.toString('base64')

    this.apiClient.defaults.headers.common['authorization'] = authorization
  }
}

const apiClient = new ApiClient()

export default apiClient
