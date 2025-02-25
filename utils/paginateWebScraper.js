const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const paginateWebScraper = async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
        });

        const page = await browser.newPage();
        let currentPage = 1;
        const maxPages = 10;
        const allBooks = [];

        while (currentPage <= maxPages) {
            // Pagination URL
            const pageUrl = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;

            // Go to the specific URL
            await page.goto(pageUrl, { waitUntil: 'load', timeout: 0 });

            // Scrape book details
            const books = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".product_pod")).map(book => ({
                    title: book.querySelector("h3 a")?.getAttribute("title"),
                    price: book.querySelector(".price_color")?.textContent.trim(),
                    stock: book.querySelector(".instock.availability") ? "In Stock" : "Out of Stock",
                    rating: book.querySelector(".star-rating")?.className.split(" ")[1],
                    link: book.querySelector("h3 a")?.getAttribute("href")
                }));
            });

            console.log(`Books on page - ${currentPage}`);
            allBooks.push(...books);
            currentPage++;
        }

        // Save to file
        fs.writeFileSync(
            path.join(process.cwd(), "p-data.json"),
            JSON.stringify(allBooks, null, 2)
        );

        console.log("Scraping completed. Data saved to p-data.json");

        await browser.close();

    } catch (error) {
        console.error('Error during scraping:', error);
    }
};

module.exports = paginateWebScraper;
