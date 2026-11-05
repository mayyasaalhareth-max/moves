export type Actor = {
  _id: string;
  name: string;
  birthDay: string;
  nationality: string;
};

export type ActorFormData = {
  name: string;
  birthDay: string;
  nationality: string;
};

export const emptyActor: ActorFormData = {
  name: '',
  birthDay: '',
  nationality: '',
};
