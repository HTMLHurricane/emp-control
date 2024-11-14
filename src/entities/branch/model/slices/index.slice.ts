import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBranchForm, IBranchSliceState } from '../types'

const currentDate = new Date()

const initialState: IBranchSliceState = {
  isCreatingBranch: false,
  isUpdatingBranch: false,
  branchForm: null,
  branchDate: currentDate.toISOString().split('T')[0],
  branchComeModal: false,
  branchLateModal: false,
  branchNotComeModal: false,
  selectedBranchID: 0,
}

const BranchSlice = createSlice({
  name: 'Branch',
  initialState,
  reducers: {
    setIsCreatingBranch(state, { payload }: PayloadAction<boolean>) {
      state.isCreatingBranch = payload
    },
    setIsUpdatingBranch(state, { payload }: PayloadAction<boolean>) {
      state.isUpdatingBranch = payload
    },
    setBranchForm(state, { payload }: PayloadAction<IBranchForm>) {
      state.branchForm = payload
    },
    setBranchDate(state, { payload }: PayloadAction<any>) {
      state.branchDate = payload
    },
    setBranchComeModal(state, { payload }: PayloadAction<boolean>) {
      state.branchComeModal = payload
    },
    setBranchNotComeModal(state, { payload }: PayloadAction<boolean>) {
      state.branchNotComeModal = payload
    },
    setBranchLateModal(state, { payload }: PayloadAction<boolean>) {
      state.branchLateModal = payload
    },
    setSelectedBranchID(state, { payload }: PayloadAction<number>) {
      state.selectedBranchID = payload
    },
  },
})
export const { reducer, actions } = BranchSlice
