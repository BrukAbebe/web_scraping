# Web Scraping Project

📌 **Overview**

This project is a web scraper for books.toscrape.com using Puppeteer. It includes:

- **Single page scraping**: Scrapes book details from the homepage.
- **Paginated scraping**: Scrapes multiple pages of book listings.
- **Automated scheduling**: Uses a cron job to run the scraper at a specified time.



🔧 **Installation**

Clone the repository:
`git clone https://github.com/BrukAbebe/web_scraping.git`
`cd web_scraping`

**Install dependencies:**
`npm install`


🚀 **Usage**

1️⃣ **Run the Single Page Scraper**

`node utils/singleWebScraper.js`

The results will be saved in `s-data.json`.

2️⃣ **Run the Paginated Scraper**

`node utils/paginateWebScraper.js`

The results will be saved in `p-data.json`.

3️⃣ **Start the Cron Job**

To start the cron job that runs the scraper every hour at minute 2:

`node index.js start`

To stop the cron job:

`node index.js stop`


🛠 **Configuration**

The cron job is scheduled to run at `2 * * * *`, meaning every hour at minute 2. You can update this in `scheduler.js`:

```js
scheduledTask = cron.schedule('2 * * * *', () => {
    console.log(' Running scraper at 0:20 AM...');
    singleWebScraper();
});
