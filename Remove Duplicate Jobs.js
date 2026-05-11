// This step removes duplicate jobs based on title, company, and applyUrl.
const allJobs = getContext("extracted_jobs")
const seen = new Set()
const dedupedJobs = []
for (const job of allJobs) {
  const key = `${job.role}|${job.company}|${job.applyUrl}`
  if (!seen.has(key)) {
    seen.add(key)
    dedupedJobs.push(job)
  }
}
console.log(`Deduplicated jobs: ${dedupedJobs.length} unique from ${allJobs.length} total.`)
setContext("unique_jobs", dedupedJobs)
