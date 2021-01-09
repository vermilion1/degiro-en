const settingsTemplate = ({ enabled }) => `
    <h2 class="status-title">${enabled ? "Enabled" : "Disabled"}</h2>
    <button data-toggle>${enabled ? "Disable" : "Enable"}</button>
`;

const tabTemplate = ({ name, symbol }) => `
    ${symbol} ${name}
`;

const contentsTemplate = ({ name, symbol, address }) => `
    <div class="contents-box">
        <div class="contents-column">
            <img class="qr" src="/assets/qrs/${address}.png" alt="${name} address: ${address}" />
        </div>
        <div class="contents-column">
            <h3>Donate ${name} to this address</h3>
            <div class="instructions">
                Scan the QR code or copy the address below into your wallet to send some ${name}
            </div>
            <input type="text" value="${address}" />
            <button data-copy="${address}">Copy</button>
        </div>
    </div>
`;

const donationTemplate = (methods, selected) => `
    <div data-selected="${selected}">
        <div class="intro">
            This extension is completely free but if you feel like you want to thank me for it -
            below is the list of cryptocurrencies you may donate to cheer me up :)
        </div>
        <ul class="tabs">
            ${methods
              .map(
                (method) =>
                  `<li data-symbol="${method.symbol}">${tabTemplate(
                    method
                  )}</li>`
              )
              .join("")}
        </ul>
        <ul class="contents">
            ${methods
              .map(
                (method) =>
                  `<li data-symbol="${method.symbol}">${contentsTemplate(
                    method
                  )}</li>`
              )
              .join("")}
        </ul>
    </div>
`;

const updateDonation = () => {
  document.querySelector('[data-type="donation"]').innerHTML = donationTemplate(
    [
      {
        name: "Bitcoin",
        symbol: "BTC",
        address: "18DziL5jbpo8HFhw4jN6KxhSq65T5w18Sk",
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        address: "0xd39e8091b0b1a1e537845d56f9429e82f6310764",
      },
      {
        name: "Litecoin",
        symbol: "LTC",
        address: "LUtfLUDbhxHBTxMzYyKrNnTB8KxAuqyquT",
      },
    ],
    selectedDonationMethod
  );

  Array.from(
    document.querySelectorAll('[data-type="donation"] .tabs li')
  ).forEach((el) =>
    el.addEventListener("click", (e) => {
      document
        .querySelector("[data-selected]")
        .setAttribute("data-selected", e.target.dataset.symbol);
    })
  );

  Array.from(document.querySelectorAll("[data-copy]")).forEach((el) =>
    el.addEventListener("click", (e) => {
      const { copy: text } = e.target.dataset;
      const oncopy = document.oncopy;
      document.oncopy = (event) => {
        event.clipboardData.setData("text/plain", text);
        event.preventDefault();
      };
      document.execCommand("copy", false, null);
      document.oncopy = oncopy;
    })
  );
};

let selectedDonationMethod = "BTC";

(() => {
  updateDonation();
})();
