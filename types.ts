
export interface BirthdayData {
  name: string;
  age?: string;
  zodiac?: string;
  gender?: string;
  industry?: string;
  hobbies?: string;
  religion?: string;
  city?: string;
  country?: string;
  familyStatus?: string;
}

export enum FormStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
