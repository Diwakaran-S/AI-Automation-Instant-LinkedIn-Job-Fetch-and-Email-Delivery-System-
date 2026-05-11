// This step automates LinkedIn job search using Puppeteer and collects the main page HTML for later extraction.
// It runs once for each keyword+location combo and shares the combined results for further processing.
const puppeteer = require("puppeteer")

async function fetchJobSearchPages(keywords, locations) {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setJavaScriptEnabled(true)

  let results = []
  for (const keyword of keywords) {
    for (const location of locations) {
      const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
      console.log(`Searching jobs: ${keyword} in ${location}`)
      await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 45000 })
      const screenshot = await page.screenshot({ encoding: "base64" })
      await publishScreenshot(screenshot)
      const pageHtml = await page.content()
      results.push({ keyword, location, html: pageHtml })
      console.log(`Fetched LinkedIn jobs page for: ${keyword}@${location}`)
      // Wait 3 seconds between requests to avoid being flagged
      await new Promise(res => setTimeout(res, 3000))
    }
  }
  await browser.close()
  return results
}

const keywords = getContext("search_keywords")
const locations = getContext("search_locations")

fetchJobSearchPages(keywords, locations)
  .then(resultPages => {
    setContext("linkedin_pages", resultPages)
    console.log("All LinkedIn job search pages fetched.")
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
