export enum EventTypes {
  Success = 'Success',
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error'
}

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
