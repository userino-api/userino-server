import AssetsApi from './api/assets'
import ClientApi from './api/client'
import MeApi from './api/me'
import { ApiClient, ApiClientParams } from './apiClient'

export class MediaApi extends ApiClient {
  me: MeApi

  client: ClientApi

  assets: AssetsApi

  constructor(params?: ApiClientParams) {
    super(params)

    this.me = new MeApi({ client: this.apiClient })
    this.client = new ClientApi({ client: this.apiClient })
    this.assets = new AssetsApi({ client: this.apiClient })
  }
}

const api = new MediaApi()
export default api
