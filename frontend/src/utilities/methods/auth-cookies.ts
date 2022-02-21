import { getCookie, setCookie, CookieNames } from "@utilities/methods/cookies";

import { IAuthReducerMainData } from "@src/action-reducers/auth/interfaces/auth-reducer-state.interface";
import { IAuthTokenRefreshSuccessActionResponse } from "@src/action-reducers/auth/interfaces/auth-action.interface";
import { isClient, getDaysFromSeconds } from "./miscellaneous";

export function setClientAuthCookies(authData: IAuthReducerMainData): void {
  if (isClient()) {
    setCookie(
      CookieNames.AUTHORIZATION,
      JSON.stringify(authData),
      getDaysFromSeconds(authData.expiresIn),
    );
  }
}

export function setClientAuthRefreshCookies(
  authData: IAuthTokenRefreshSuccessActionResponse["payload"],
): void {
  try {
    if (isClient()) {
      const savedCookies = getCookie(CookieNames.AUTHORIZATION);
      const parsedCookies = JSON.parse(savedCookies) as IAuthReducerMainData;

      setClientAuthCookies({
        ...parsedCookies,
        ...authData,
      });
    }
  } catch (e) {
    //
  }
}

export function deleteClientAuthCookies(): void {
  setCookie(CookieNames.AUTHORIZATION, "", -1);
}
