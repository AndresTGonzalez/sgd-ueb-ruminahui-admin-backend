export type JustificationSupabaseFetch = {
  id: number;
  userId: string;
  justificationTypeId: number;
  affair: string;
  fromDate: Date;
  toDate: Date;
  applicationDate: Date;
  exitHour: string;
  returnHour: string;
  extraInfo: string;
}