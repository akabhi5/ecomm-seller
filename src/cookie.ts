import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

const now = new Date();
const timeIn45Minutes = new Date(now.getTime() + 45 * 60000); // 45 minutes in milliseconds

export const setCookie = (name: string, value: string) => {
  return Cookies.set(name, value, { expires: timeIn45Minutes });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

export const setAuthCookies = (name: string, email: string, token: string) => {
  setCookie("name", name);
  setCookie("email", email);
  setCookie("token", token);
};

export const clearAuthCookies = () => {
  removeCookie("name");
  removeCookie("email");
  removeCookie("token");
};

export const getAllAuthCookies = () => {
  const name = getCookie("name") ?? "";
  const email = getCookie("email") ?? "";
  const token = getCookie("token") ?? "";
  return { name, email, token };
};
