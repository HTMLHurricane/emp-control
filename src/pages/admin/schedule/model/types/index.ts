export interface IScheduleFormCreate {
  name: string
  weekDays: {
    monday?: {
      startTime: any
      endTime: any
    }
    tuesday?: {
      startTime: any
      endTime: any
    }
    wednesday?: {
      startTime: any
      endTime: any
    }
    thursday?: {
      startTime: any
      endTime: any
    }
    friday?: {
      startTime: any
      endTime: any
    }
    saturday?: {
      startTime: any
      endTime: any
    }
    sunday?: {
      startTime: any
      endTime: any
    }
  }
}
