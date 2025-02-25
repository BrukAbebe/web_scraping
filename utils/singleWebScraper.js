const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const singleWebScraper = async () => {
  try {
    const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });

    const page = await browser.newPage();
    const url = "https://books.toscrape.com/";
    await page.goto(url);

    const books = await page.evaluate(() => {
      const productElements = document.querySelectorAll(".product_pod");
      return Array.from(productElements).map((book) => {
        const title = book.querySelector("h3 a")?.getAttribute("title");
        const price = book.querySelector(".price_color")?.textContent;
        const stock = book.querySelector(".instock.availability")
          ? "In Stock"
          : "Out of Stock";
        const rating = book
          .querySelector(".star-rating")
          ?.className.split(" ")[1];
        const link = book.querySelector("h3 a")?.getAttribute("href");
        return { title, price, stock, rating, link };
      });
    });

    fs.writeFileSync(path.join(process.cwd(), "s-data.json"), JSON.stringify(books, null, 2));

    console.log(books);
    await browser.close();
  } catch (error) {
    console.error('Error during scraping:', error);
  }
};


module.exports = singleWebScraper;
