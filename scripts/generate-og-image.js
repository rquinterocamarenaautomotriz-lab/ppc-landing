const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 780, deviceScaleFactor: 2 });
  await page.goto('https://ppclanding.online/tarjeta-francisco.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500)); // espera que el QR se genere
  await page.screenshot({
    path: path.join(__dirname, '../assets/tarjeta-francisco-og.png'),
    fullPage: false,
    clip: { x: 0, y: 0, width: 420, height: 780 }
  });
  await browser.close();
  console.log('OG image generada: assets/tarjeta-francisco-og.png');
})();
