export interface IBranch {
  all_comers: number
  id: number
  late_comers: number
  location: string
  name: string
  not_comers: number
  workers_count: number
}

export interface IBranchForm {
  id?: number
  name: string
  location: string
}

export interface IBranchSliceState {
  isCreatingBranch: boolean
  isUpdatingBranch: boolean
  branchForm: IBranchForm | null
  branchDate: string | string[]
  branchComeModal: boolean
  branchNotComeModal: boolean
  branchLateModal: boolean
  selectedBranchID: number
}

export interface IBranchParams {
  day?: string | string[]
}
