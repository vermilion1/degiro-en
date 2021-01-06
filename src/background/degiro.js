export const bootstrap = () => {
  chrome.webRequest.onBeforeRequest.addListener(
    ({ method, url }) => {
      const defaultMessages =
        "https://trader.degiro.nl/i18n/messages_default_default";

      if (
        method?.toLowerCase() === "get" &&
        url.startsWith("https://trader.degiro.nl/i18n/messages_") &&
        url !== defaultMessages
      ) {
        return {
          redirectUrl: defaultMessages,
        };
      }
    },
    {
      urls: ["<all_urls>"],
    },
    ["blocking"]
  );
};
