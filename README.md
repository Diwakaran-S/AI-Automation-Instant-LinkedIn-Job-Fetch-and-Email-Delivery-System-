 LinkedIn Job Automation System

An automated LinkedIn job collection and email notification system built using Python automation tools.

This project automatically searches LinkedIn jobs, extracts important job details, removes duplicate postings, and sends structured job updates directly through email.

Features
Automated LinkedIn job search
Collects latest job postings
Extracts structured job information
Removes duplicate jobs
Instant email notification system
Simple automation workflow
Configurable job keywords and locations
Job Details Collected

The system extracts:

Job Role / Title
Company Name
Employment Type
Job Location
Work Mode
Remote
On-site
Work From Home
Apply Link
Tech Stack
Python
Playwright / Selenium
Gmail SMTP
Automation Workflow
Workflow
Search LinkedIn jobs
Extract job details
Remove duplicates
Structure the data
Send email notification
Project Structure
project/
│
├── main.py
├── scraper.py
├── email_sender.py
├── requirements.txt
├── .env
└── README.md
Installation
Clone the Repository
git clone https://github.com/your-username/linkedin-job-automation.git
Navigate to the Project
cd linkedin-job-automation
Install Dependencies
pip install -r requirements.txt
Environment Variables

Create a .env file and add:

GMAIL_USER=yourgmail@gmail.com
GMAIL_PASS=your_app_password
TO_EMAIL=receiver@gmail.com
Gmail Setup

If using Gmail with 2-Step Verification:

Enable 2-Step Verification
Generate an App Password
Use the generated App Password in .env

Google Account Security:
https://myaccount.google.com/security

Run the Project
python main.py
Example Email Output
Role: AI Engineer
Company: OpenAI
Type: Full-Time
Work Mode: Remote
Location: Bangalore, India
Apply Link: https://...
Future Improvements
Scheduled automation
More job platforms support
AI-based filtering
Resume matching
Dashboard integration
License

This project is for learning and automation purposes.