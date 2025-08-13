const puppeteer = require('puppeteer');
const fs = require('fs'); 
async function scrapeData() {
    var url = "https://books.toscrape.com/";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    await page.waitForSelector('.product_pod');

    const products = await page.$$eval('.product_pod', productElements => {
        return productElements.map(product => {
            //titulo
            const titleElement = product.querySelector('h3 a');
            const title = titleElement ? titleElement.getAttribute('title') : null;
            //url
            const url = titleElement ? titleElement.getAttribute('href') : null;
            //imagen
            const imageElement = product.querySelector('.image_container img');
            const imageUrl = imageElement ? imageElement.getAttribute('src') : null;
            const imageAlt = imageElement ? imageElement.getAttribute('alt') : null;
            //rating
            const ratingElement = product.querySelector('.star-rating');
            const rating = ratingElement ? ratingElement.className.split(' ')[1] : null;
            //precio
            const priceElement = product.querySelector('.price_color');
            const price = priceElement ? priceElement.textContent.trim() : null;

            return {
                title,
                url,
                image: {
                    url: imageUrl,
                    alt: imageAlt
                },
                rating,
                price
            };
        });
    });
    await browser.close(); 
    return products;
}


(async () => {
    const data = await scrapeData();
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log('Datos guardados en data.json');
})();