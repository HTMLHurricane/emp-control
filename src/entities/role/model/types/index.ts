export interface IRole {
  id: number
  name: string
}

export interface IRoleForm {
  id?: number
  name: string
}

export interface IRoleSliceState {
  isCreatingRole: boolean
  isUpdatingRole: boolean
  roleForm: IRoleForm | null
  roleTablePage: number
  roleTableLimit: number
}
