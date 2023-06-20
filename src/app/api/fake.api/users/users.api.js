import { accounts } from "";

export const users = [
  {
    _id: "user-id-1",
    name: "Джон Дориан",
    email: "Jony7351@tw.com",
    password: "jony7351",
    gender: "male",
    accounts: accounts.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  }
];
