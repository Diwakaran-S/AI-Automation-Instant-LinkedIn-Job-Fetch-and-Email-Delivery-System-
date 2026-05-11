// This step extracts structured job details from LinkedIn job search page HTML, enhancing extraction of employment type and work mode with robust, broad logic and descriptive logging.
const cheerio = require("cheerio")

// Broader and more robust extraction of employment type and work mode from LinkedIn card
function extractJobDetailsFromLinkedIn(html, keyword, location) {
  const $ = cheerio.load(html)
  const jobs = []
  // LinkedIn job cards selectors can change; try to handle robustly:
  $(".jobs-search__results-list li").each((i, elem) => {
    const role = $(elem).find(".base-search-card__title").text().trim()
    const company = $(elem).find(".base-search-card__subtitle").text().trim()
    // Employment type and Work Mode - enhanced detection
    let employmentType = ""
    let workMode = ""
    let foundInsights = []

    // 1. Scan all insight and metadata elements, broadened class list
    $(elem)
      .find('[class*="insight"], .base-search-card__metadata > span, .job-search-card__job-insight, .job-search-card__info')
      .each((j, insight) => {
        const txt = $(insight).text().trim().toLowerCase()
        foundInsights.push(txt)
        // Employment type
        if (txt.includes("full-time")) employmentType = "Full-Time"
        if (txt.includes("part-time")) employmentType = "Part-Time"
        if (txt.includes("contract")) employmentType = "Contract"
        if (txt.includes("internship")) employmentType = "Internship"
        if (txt.includes("temporary")) employmentType = "Temporary"
        if (txt.includes("volunteer")) employmentType = "Volunteer"
        if (txt.includes("seasonal")) employmentType = "Seasonal"
        // Work mode
        if (txt.includes("remote")) workMode = "Remote"
        if (txt.includes("on-site")) workMode = "On-site"
        if (txt.includes("work from home")) workMode = "Work From Home"
        if (txt.includes("hybrid")) workMode = "Hybrid"
      })

    // 2. Fallback: look for employment type or work mode in description or hidden within metadata, if not found already
    if (!employmentType || !workMode) {
      const descText = $(elem).text().toLowerCase()
      if (!employmentType) {
        if (descText.includes("full-time")) employmentType = "Full-Time"
        else if (descText.includes("part-time")) employmentType = "Part-Time"
        else if (descText.includes("contract")) employmentType = "Contract"
        else if (descText.includes("internship")) employmentType = "Internship"
        else if (descText.includes("temporary")) employmentType = "Temporary"
        else if (descText.includes("volunteer")) employmentType = "Volunteer"
        else if (descText.includes("seasonal")) employmentType = "Seasonal"
      }
      if (!workMode) {
        if (descText.includes("remote")) workMode = "Remote"
        else if (descText.includes("on-site")) workMode = "On-site"
        else if (descText.includes("work from home")) workMode = "Work From Home"
        else if (descText.includes("hybrid")) workMode = "Hybrid"
      }
    }

    const jobLocation = $(elem).find(".job-search-card__location, .base-search-card__metadata > span").text().trim()
    const applyUrl = $(elem).find(".base-card__full-link").attr("href")
    if (role && company && applyUrl) {
      jobs.push({
        role,
        company,
        employmentType,
        workMode,
        location: jobLocation,
        applyUrl,
        sourceKeyword: keyword,
        sourceLocation: location
      })
    }
    // Logging for debug: raw found insights and extracted values
    console.log(`[Parsing #${i}]`, {
      foundInsights,
      extractedEmploymentType: employmentType,
      extractedWorkMode: workMode,
      role,
      company
    })
  })
  return jobs
}

const pages = getContext("linkedin_pages")
let allJobs = []
for (const result of pages) {
  const jobs = extractJobDetailsFromLinkedIn(result.html, result.keyword, result.location)
  allJobs = allJobs.concat(jobs)
}

console.log("Extracted", allJobs.length, "jobs from HTML")
setContext("extracted_jobs", allJobs)
