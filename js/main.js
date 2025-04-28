// Global variables
let currentLanguage = "en"
let langData = {}
let cvData = {}

// DOM Elements
const themeToggleBtn = document.getElementById("theme-toggle-btn")
const languageButtons = document.querySelectorAll(".language-selector button")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")

// Initialize the application
async function initApp() {
  // Load default language data
  await loadLanguageData(currentLanguage)

  // Set up event listeners
  setupEventListeners()

  // Check for saved theme preference
  checkThemePreference()
}

// Load language data
async function loadLanguageData(lang) {
  try {
    // Load language UI strings
    const langResponse = await fetch(`data/lang-${lang}.json`)
    langData = await langResponse.json()

    // Load CV data
    const cvResponse = await fetch(`data/cv-${lang}.json`)
    cvData = await cvResponse.json()

    // Update UI with loaded data
    updateUI()
  } catch (error) {
    console.error("Error loading language data:", error)
  }
}

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggleBtn.addEventListener("click", toggleTheme)

  // Language selection
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang")
      if (lang !== currentLanguage) {
        currentLanguage = lang

        // Update active language button
        languageButtons.forEach((btn) => {
          btn.classList.remove("active")
        })
        button.classList.add("active")

        // Load new language data
        loadLanguageData(lang)
      }
    })
  })

  // Tab navigation
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Update active tab button
      tabButtons.forEach((btn) => {
        btn.classList.remove("active")
      })
      button.classList.add("active")

      // Show selected tab content
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === tabId) {
          content.classList.add("active")
        }
      })
    })
  })
}

// Check for saved theme preference
function checkThemePreference() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme")
  }
}

// Toggle theme
function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle("dark-theme")
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
}

// Update UI with loaded data
function updateUI() {
  // Update tab labels
  document.getElementById("education-tab").textContent = langData.tabs.education
  document.getElementById("experience-tab").textContent = langData.tabs.experience
  document.getElementById("portfolio-tab").textContent = langData.tabs.portfolio

  // Update section titles
  document.getElementById("education-title").textContent = langData.sections.education
  document.getElementById("experience-title").textContent = langData.sections.experience
  document.getElementById("portfolio-title").textContent = langData.sections.portfolio

  // Update skills and languages titles
  document.getElementById("skills-title").textContent = langData.skills
  document.getElementById("languages-title").textContent = langData.languages

  // Update download text
  document.getElementById("download-text").textContent = langData.downloadCV

  // Update candidate information
  document.getElementById("candidate-name").textContent = cvData.candidate.name
  document.getElementById("introduction-text").textContent = cvData.candidate.introduction_text
  //document.getElementById("telephone").textContent = cvData.candidate.contact.telephone
  document.getElementById("email").textContent = cvData.candidate.contact.email
  document.getElementById("location").textContent = cvData.candidate.contact.location

  // Update CV download link
  const cvLink = document.getElementById("cv-download-link")
  cvLink.href = cvData.candidate["cv-link"]

  // Update profile picture
  document.getElementById("profile-pic").src = cvData.candidate.pic

  // Render languages
  renderLanguages()

  // Render skills
  renderSkills()

  // Render social links
  renderSocialLinks()

  // Render education items
  renderEducation()

  // Render experience items
  renderExperience()

  // Render portfolio items
  renderPortfolio()
}

// Render languages
function renderLanguages() {
  const languagesList = document.getElementById("languages-list")
  languagesList.innerHTML = ""

  cvData.candidate.languages.forEach((language) => {
    const li = document.createElement("li")
    li.textContent = language
    languagesList.appendChild(li)
  })
}

// Render skills
function renderSkills() {
  const skillsList = document.getElementById("skills-list")
  skillsList.innerHTML = ""

  cvData.candidate.skills.forEach((skill) => {
    const skillTag = document.createElement("div")
    skillTag.className = "skill-tag"
    skillTag.textContent = skill
    skillsList.appendChild(skillTag)
  })
}

// Render social links
function renderSocialLinks() {
  const socialLinks = document.getElementById("social-links")
  socialLinks.innerHTML = ""

  cvData.candidate.contact.links.forEach((link) => {
    const a = document.createElement("a")
    a.className = "social-link"
    a.href = link.url
    a.target = "_blank"
    a.rel = "noopener noreferrer"

    // Create icon
    const icon = document.createElement("img")
    icon.src = link.icon
    icon.alt = link.name

    // Create text
    const span = document.createElement("span")
    span.textContent = link.name

    a.appendChild(icon)
    a.appendChild(span)
    socialLinks.appendChild(a)
  })
}

// Render education items
function renderEducation() {
  const educationItems = document.getElementById("education-items")
  educationItems.innerHTML = ""
  educationItems.className = "card-grid"

  cvData.sections.formation.forEach((item) => {
    const cardItem = document.createElement("div")
    cardItem.className = "card-item"

    const cardContent = document.createElement("div")
    cardContent.className = "card-content"

    const period = document.createElement("div")
    period.className = "card-period"
    period.textContent = item.period

    const title = document.createElement("h3")
    title.className = "card-title"
    title.textContent = item.title

    const center = document.createElement("div")
    center.className = "card-subtitle"
    center.textContent = item.center

    const location = document.createElement("div")
    location.className = "card-location"
    location.textContent = item.location

    cardContent.appendChild(period)
    cardContent.appendChild(title)
    cardContent.appendChild(center)
    cardContent.appendChild(location)

    cardItem.appendChild(cardContent)
    educationItems.appendChild(cardItem)
  })
}

// Render experience items
function renderExperience() {
  const experienceItems = document.getElementById("experience-items")
  experienceItems.innerHTML = ""
  experienceItems.className = "card-grid"

  cvData.sections.experience.forEach((item) => {
    const cardItem = document.createElement("div")
    cardItem.className = "card-item"

    const cardContent = document.createElement("div")
    cardContent.className = "card-content"

    const period = document.createElement("div")
    period.className = "card-period"
    period.textContent = item.period

    const title = document.createElement("h3")
    title.className = "card-title"
    title.textContent = item.title

    const company = document.createElement("div")
    company.className = "card-subtitle"
    company.textContent = item.company

    const location = document.createElement("div")
    location.className = "card-location"
    location.textContent = item.location

    cardContent.appendChild(period)
    cardContent.appendChild(title)
    cardContent.appendChild(company)
    cardContent.appendChild(location)

    // Add bullets if available
    if (item.bullets && item.bullets.length > 0) {
      const bulletsList = document.createElement("ul")
      bulletsList.className = "card-bullets"

      item.bullets.forEach((bullet) => {
        const li = document.createElement("li")
        li.textContent = bullet
        bulletsList.appendChild(li)
      })

      cardContent.appendChild(bulletsList)
    }

    cardItem.appendChild(cardContent)
    experienceItems.appendChild(cardItem)
  })
}

// Render portfolio items
function renderPortfolio() {
  const portfolioItems = document.getElementById("portfolio-items")
  portfolioItems.innerHTML = ""

  cvData.sections.portfolio.forEach((item) => {
    const portfolioItem = document.createElement("div")
    portfolioItem.className = "portfolio-item"

    const portfolioContent = document.createElement("div")
    portfolioContent.className = "portfolio-content"

    const company = document.createElement("div")
    company.className = "portfolio-company"
    company.textContent = item.company

    const title = document.createElement("h3")
    title.className = "portfolio-title"
    title.textContent = item.title

    const description = document.createElement("p")
    description.className = "portfolio-description"
    description.textContent = item.description

    portfolioContent.appendChild(company)
    portfolioContent.appendChild(title)
    portfolioContent.appendChild(description)

    portfolioItem.appendChild(portfolioContent)
    portfolioItems.appendChild(portfolioItem)
  })
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp)
