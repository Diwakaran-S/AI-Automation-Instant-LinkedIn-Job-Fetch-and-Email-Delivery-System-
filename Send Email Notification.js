// Send the formatted email with job results using Gmail SMTP via nodemailer.
const nodemailer = require("nodemailer")

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS
const EMAIL_TO = process.env.JOB_RESULTS_TO_EMAIL || GMAIL_USER // Allow override or send to self

if (!GMAIL_USER || !GMAIL_PASS) {
  throw new Error("GMAIL_USER and GMAIL_PASS environment variables are required (use App Password for Gmail accounts with 2FA). Set JOB_RESULTS_TO_EMAIL for recipient, if different.")
}

const subject = getContext("email_job_subject")
const html = getContext("email_job_html")
const text = getContext("email_job_text")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
})

const mailOpts = {
  from: GMAIL_USER,
  to: EMAIL_TO,
  subject,
  text,
  html
}

transporter.sendMail(mailOpts, (err, info) => {
  if (err) {
    console.error("Error sending job email:", err)
    process.exit(1)
  } else {
    console.log("Job results sent:", info.response)
  }
})
