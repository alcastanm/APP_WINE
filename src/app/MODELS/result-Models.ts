export interface ResultModel {
    data: any;
    isSuccess: boolean;
    returnedMessage: string;
    returnTechnicalMessage:string;
}

export interface Alert {
    type: string;
    message: string;
  }