export const useTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    changeLanguage: () => new Promise(() => undefined),
  },
});
