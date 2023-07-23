import ApiInstanceClass from '../class/ApiInstanceClass'

class MeApi extends ApiInstanceClass {
  async info() {
    const { data } = await this.apiClient.get('/me/info')
    return data
  }
}

export default MeApi
