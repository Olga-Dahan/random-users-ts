export interface User {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
  gender: string;
  dob: { age: number };
}