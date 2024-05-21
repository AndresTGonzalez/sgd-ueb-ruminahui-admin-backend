export type Assistance = {
  id: number;
  clockCheck: Date;
  assistancePersonalIdentificatorId: number;
};

export type createAssistance = {
  clockCheck: Date;
  assistancePersonalIdentificatorId: number;
};
