import ApiInstanceClass from '../class/ApiInstanceClass'

class ClientApi extends ApiInstanceClass {
  async createClientToken(): Promise<{ token: string }> {
    const { data } = await this.apiClient.post('/client/create-token')
    return data
  }
}

export default ClientApi
