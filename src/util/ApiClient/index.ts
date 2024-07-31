import { apiClient } from "./ApiClient"
import appConfig from "@config/app"

const defaultApiClient = apiClient({
    baseURL: appConfig.apiUrl
})

export { defaultApiClient }
