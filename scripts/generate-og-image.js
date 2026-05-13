const puppeteer = require('puppeteer');
const path = require('path');

const cards = [
  {
    url: 'https://ppclanding.online/tarjeta-francisco.html?og=1',
    output: '../assets/tarjeta-francisco-og.png',
  },
  {
    url: 'https://ppclanding.online/tarjeta-salvador.html?og=1',
    output: '../assets/tarjeta-salvador-og.png',
  },
];

(async () => {
  const browser = await puppeteer.launch();

  for (const card of cards) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.goto(card.url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500)); // espera que el QR se genere
    await page.screenshot({
      path: path.join(__dirname, card.output),
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });
    await page.close();
    console.log(`OG image generada: ${card.output}`);
  }

  await browser.close();
})();
