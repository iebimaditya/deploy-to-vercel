const app = require("express")();
const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

app.get("/api", async (req, res) => {

    const options = {
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    };
  

    try {
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.goto("https://www.google.com");
        
        res.send(await page.title());
    } catch (err) {
        console.error(err);
        return null;
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});

module.exports = app;