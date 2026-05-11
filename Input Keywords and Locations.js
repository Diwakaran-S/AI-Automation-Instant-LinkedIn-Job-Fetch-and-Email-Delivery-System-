// This step defines job search keywords and locations for LinkedIn job collection

// You can later modify these arrays or collect them as input/env variables
const keywords = ["AI Engineer", "Python Developer", "Data Scientist", "Full Stack Developer"]
const locations = ["India", "Remote", "Chennai", "Bangalore"]

console.log("Collected keywords:", keywords)
console.log("Collected locations:", locations)

// Pass to next step
setContext("search_keywords", keywords)
setContext("search_locations", locations)
