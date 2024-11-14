export interface IData<T> {
  data: T
  success: boolean
  total?: number
}

export interface IdName {
  id: number
  name: string
}

export interface IdUrl {
  id: number
  url: string
}
