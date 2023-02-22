
export type TSpecResult = {
  type:string
  action:string
  description:string
  status?:`passed`|`failed`
}

export type TSpec = {
  result: TSpecResult
  disable: () => void
}

export type TSuite = {
  description: string
  children: TSpec[]
}
