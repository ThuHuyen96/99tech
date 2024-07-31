import { IPriceToken } from "@/types/Dashboard";
import { defaultApiClient } from "@/util/ApiClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend( utc );

export default class DashboardApi {
    static getListPrices() {
        return defaultApiClient.get<Array<IPriceToken>>("https://interview.switcheo.com/prices.json")
    }
}