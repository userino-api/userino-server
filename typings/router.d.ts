type ResponseUpdate<T = {}> = { changed: number} & T

type ResponseDelete<T = {}> = { deleted: number} & T

type RouteErrorResponse = {
  error: string
  errorCode?: string
}
