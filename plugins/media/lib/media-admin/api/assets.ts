import ApiInstanceClass from '../class/ApiInstanceClass'

class AssetsApi extends ApiInstanceClass {
  async getAsset(asset_id: string) {
    const { data } = await this.apiClient.get(`/asset/${asset_id}`)
    return data
  }
}

export default AssetsApi
