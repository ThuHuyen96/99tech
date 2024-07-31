import React, { ReactElement } from "react"
import { Dashboard } from "@screen/Dashboard"

export interface IRouteConfig {
  name: string
  path: string
  component: ReactElement
}

export const routes: Array<IRouteConfig> = [
  {
    name: "dashboard",
    path: "/",
    component: <Dashboard />
  }
]
