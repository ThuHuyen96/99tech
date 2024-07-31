import DashboardApi from "@/api/DashboardApi"
import { IPriceToken } from "@/types/Dashboard"
import { useQuery } from "@tanstack/react-query"

export const useGetListPrices = () => {
    return useQuery( {
        queryKey: [ "dashboard.listPrices" ],
        queryFn: async (): Promise<Array<IPriceToken>> => {
            const res = await DashboardApi.getListPrices()
            return res.data
        }
    } )
}


export const usePrices = (): { [ key: string ]: number } => {
    return {
        ETH: 1645.9337373737374,
        GMX: 36.345114372881355,
        STEVMOS: 0.07276706779661017,
        BLUR: 0.20811525423728813
    }
}

export const useWalletBalances = () => {
    return [
        { currency: "ETH", blockchain: "Ethereum", amount: 43.6 },
        { currency: "GMX", blockchain: "Arbitrum", amount: 20.2 },
        { currency: "STEVMOS", blockchain: "Zilliqa", amount: 67.775 },
        { currency: "BLUR", blockchain: "Neo", amount: 12.34 }
    ]
}