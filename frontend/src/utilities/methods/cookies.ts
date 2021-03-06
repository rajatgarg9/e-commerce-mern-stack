import { isClient } from "./miscellaneous";

export enum CookieNames {
  AUTHORIZATION = "authorization",
}

export function setCookie(cname: CookieNames, cvalue: string, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  const cookie = `${cname}=${cvalue};${expires};path=/`;

  if (isClient()) {
    document.cookie = cookie;
  }

  return cookie;
}

export function getCookie(cname: CookieNames, cookie?: string): string {
  const name = `${cname}=`;
  let decodedCookie = cookie ? decodeURIComponent(cookie) : "";
  if (isClient()) {
    decodedCookie = decodeURIComponent(document.cookie);
  }
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; ++i) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
