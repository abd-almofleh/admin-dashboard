interface ILanguage {
  readonly name: string;
  readonly direction: "rtl" | "ltr";
  readonly countryCode: string;
  readonly code: string;
}
interface IConfig {
  appName: string;
  defaultPath: string;
  fontFamily: string;
  mode: string;
  presetColor: string;
  appDirection: ILanguage["direction"];
}

export const sideBarWidth = 260;
export const miniSideBarWidth = 60;

export const twitterColor = "#1DA1F2";
export const facebookColor = "#3b5998";
export const linkedInColor = "#0e76a8";

export const supportedLanguages = {
  ar: {
    name: "العربية",
    direction: "rtl",
    countryCode: "sy",
    code: "ar",
  } as ILanguage,
  en: {
    name: "English",
    direction: "ltr",
    countryCode: "gb",
    code: "en",
  } as ILanguage,
};

export type SupportedLanguagesType = keyof typeof supportedLanguages;

export const getSupportedLanguages = function (): string[] {
  return Object.keys(supportedLanguages);
};

const config: IConfig = {
  appName: "Almofleh Corp",
  defaultPath: "/dashboard",
  fontFamily: `'Public Sans', sans-serif`,
  mode: "light",
  presetColor: "default",
  appDirection: "ltr",
};
export default config;
