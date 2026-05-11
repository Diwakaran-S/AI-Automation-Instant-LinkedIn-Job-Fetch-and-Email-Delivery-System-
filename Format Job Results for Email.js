// Formats the deduped job list as HTML and text for email notification.
const jobs = getContext("unique_jobs")
const now = new Date()
const dtString = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

let textBody = `LinkedIn Job Updates — Test Report\nTotal jobs found: ${jobs.length}\nDate & Time: ${dtString}\n\n`
let htmlBody = `<h2>LinkedIn Job Updates — Test Report</h2>` + `<strong>Total jobs found:</strong> ${jobs.length}<br>` + `<strong>Date & Time:</strong> ${dtString}<br><br>`

for (const job of jobs) {
  const employmentTypeLabel = job.employmentType && job.employmentType.trim() !== "" ? job.employmentType : "N/A"
  const workModeLabel = job.workMode && job.workMode.trim() !== "" ? job.workMode : "N/A"
  textBody += `Role: ${job.role}\nCompany: ${job.company}\nType: ${employmentTypeLabel}\nWork Mode: ${workModeLabel}\nLocation: ${job.location}\nApply Link: ${job.applyUrl}\n---\n`
  htmlBody += `<div style='margin-bottom:20px;'><strong>Role:</strong> ${job.role}<br>` + `<strong>Company:</strong> ${job.company}<br>` + `<strong>Type:</strong> ${employmentTypeLabel}<br>` + `<strong>Work Mode:</strong> ${workModeLabel}<br>` + `<strong>Location:</strong> ${job.location}<br>` + `<strong>Apply Link:</strong> <a href='${job.applyUrl}'>Apply</a><br></div>`
}

setContext("email_job_subject", "LinkedIn Job Updates — Test Report")
setContext("email_job_text", textBody)
setContext("email_job_html", htmlBody)
console.log("Email body prepared with", jobs.length, "jobs.")
