import { isClient } from "./miscellaneous";

export function setCookie(cname: string, cvalue: string, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  const cookie = `${cname}=${cvalue};${expires};path=/`;

  if (isClient()) {
    document.cookie = cookie;
  }

  return cookie;
}

export function getCookie(cname: string, cookie?: string): string {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(cookie || document.cookie);
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
