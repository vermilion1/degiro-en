export const bootstrap = () => {
  chrome.webRequest.onBeforeRequest.addListener(
    ({ method, url }) => {
      const urlInstance = new URL(url);
      if (
        method?.toLowerCase() === 'get' &&
        urlInstance.hostname.includes('trader.degiro.') &&
        urlInstance.pathname === '/translations/' &&
        urlInstance.searchParams.get('language') != null
      ) {
        urlInstance.searchParams.set('language', 'en');
        return {
          redirectUrl: urlInstance.toString(),
        };
      }
    },
    {
      urls: ["<all_urls>"],
    },
    ["blocking"]
  );
};
