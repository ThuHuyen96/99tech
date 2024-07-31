import React, { useEffect } from "react"
import { dashboardCss } from "./style"
import { Problem1 } from "./Problem1"
import { Problem2 } from "./Problem2"
import { WalletPage } from "./Problem3"

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  return (
    <div
      css={dashboardCss}
      className="container mx-auto">
      <Problem1 />
      <Problem2 />
      <WalletPage />
    </div>
  )
}
