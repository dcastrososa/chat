import { getCookie } from "./../uitl/util";

export const IP = 'http://localhost:3000';
export const IP_WS = 'ws://localhost:3000/cable';
export const HEADERS = {
  "Content-Type": "application/json",
  "Accept": 'application/json',
  "access-token": getCookie("access-token"),
  "client": getCookie("client"),
  "uid" : getCookie("uid")
};