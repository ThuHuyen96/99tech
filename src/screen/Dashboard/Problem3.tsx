import { usePrices, useWalletBalances } from "@/hook/useDashboard"
import { useMemo } from "react"

interface WalletBalance {
  blockchain: string
  currency: string
  amount: number
}

export const WalletPage: React.FC = () => {
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100
      case "Ethereum":
        return 50
      case "Arbitrum":
        return 30
      case "Zilliqa":
        return 20
      case "Neo":
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        if (balancePriority > -99 && balance.amount > 0) {
          return true
        }
        return false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }
        return 0
      })
  }, [balances])

  return (
    <div>
      <h3>Problem 3: Messy React</h3>
      <ul className="text-[14px]">
        <li>Bỏ khai báo interface FormattedWalletBalance bị dư thừa không cần thiết</li>
        <li>khai báo thêm trong interface WalletBalance biến blockchain kiểu string</li>
        <li>Bỏ function formattedBalances không sử dụng tới việc format hiển thị có thể thực hiện ở bước render</li>
        <li>
          Function getPriority biến blockchain: any nên đổi thành khai báo kiểu string để any đoạn code vẫn hoạt động được nhưng nên thay vì:{" "}
          <ul>
            <li>TypeScript sẽ kiểm tra kiểu dữ liệu mà bạn truyền vào hàm. Điều này giúp phát hiện lỗi khi biên dịch nếu bạn truyền sai kiểu dữ liệu</li>
            <li>Tăng cường khả năng bảo trì và đọc hiểu mã nguồn</li>
            <li>Phát hiện lỗi sớm: TypeScript có thể cảnh báo sớm về các lỗi tiềm ẩn trong quá trình phát triển</li>
          </ul>
        </li>
        <li>
          Trong hàm sortedBalances
          <ul>
            <li>
              balance.amount nhoe hơn hoặc bằng 0 nếu để vậy thì số lượng nhỏ hơn 0 mới được filter nên để lớn hơn 0 thì balance nào có số lượng sẽ được hiển
              thị
            </li>
            <li>Hai điều kiện if lồng nhau này có thể gộp làm một sử dụng toán tử && để gộp if (balancePriority &gt; -99 && balance.amount &gt; 0)</li>
            <li>
              sort trong hàm này đang thiếu điều kiện nếu bằng đang chỉ trả về giá trị lớn hơn hoặc nhỏ hơn phải thêm return 0 nếu không có sẽ trả về undefined
              gây ra lỗi vì hàm sort yêu cầu kết quả luôn phải là một number return 0 mục đích là để giữ nguyên thứ tự
            </li>
            <li>
              Sử dụng prices trong đối số của useMemo là không cần thiết, vì prices không được sử dụng ở bất kỳ đâu trong hàm callback của useMemo và còn làm
              giảm hiệu suất
            </li>
          </ul>
        </li>
        <li>Đoạn code refactored trong file Problem3</li>
      </ul>
      <div className="grid gap-4 md:grid-cols-2">
        {sortedBalances.map((balance: WalletBalance, index: number) => {
          let usdValue: any = null
          if (prices[balance.currency]) usdValue = prices[balance.currency] * balance.amount
          return (
            <div
              key={index}
              className="bg-gray-300 rounded p-2">
              <p>{balance.currency}</p>
              <p>amount: {balance.amount}</p>
              <p>usdValue: {usdValue}</p>
              <p>formattedAmount: {balance.amount.toFixed()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
