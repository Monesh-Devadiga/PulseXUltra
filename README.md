# PulseX Ultra | Interactive Smartwatch Landing Page

An interactive smartwatch product landing page built as part of my frontend development internship.

## Project Overview

PulseX Ultra is a modern smartwatch landing page focused on demonstrating interactive JavaScript components using vanilla JavaScript.  
The project includes five required interactive components:  
1. Dark Mode Toggle
2. Image Carousel
3. Tabbed Interface
4. Modal/Dialog
5. Form Validation

## Features
#### Dark Mode
* Toggle between light and dark themes.
* Saves the user's theme preference using localStorage.

#### Image Carousel
* Four smartwatch product images.
* Previous and Next navigation.
* Clickable navigation dots.
* Automatic slide transition.
* Pauses while hovering over the carousel.
* Supports keyboard arrow navigation.

#### Tabbed Interface
Four feature categories:
* Health
* Fitness
* Connectivity
* Battery
Each tab displays its own content dynamically.

#### Modal/Dialog
The "Pre-Order Now" button opens a product pre-order modal.

#### Form Validation
The pre-order form validates:
* Full name (At least 2 characters)
* Email address
* Phone number
* Preferred color
* Terms and conditions

It provides:

* Error messages
* Real-time validation
* Valid field indicators
* Success message after valid submission

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* SVG
* LocalStorage

No frameworks or JavaScript libraries were used.

## Project Structure

```text
PulseX-Ultra/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

## JavaScript Structure

Each interactive component uses its own initialization function:

```text
initDarkMode()
initCarousel()
initTabs()
initModal()
initForm()
```

This keeps the JavaScript organized and easier to maintain. 

## Responsive Design

The page includes responsive styling for smaller screens, including adjusted hero typography, navigation spacing, carousel height, tabs, and modal content. 

## How to Run

1. Clone the repository.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder.

3. Open `index.html` in your browser.

No build tools or dependencies are required.

## Testing

The following interactions were tested:

* Dark mode toggle
* Carousel Previous and Next buttons
* First and last carousel slides
* Carousel navigation dots
* Keyboard carousel navigation
* Tab switching
* Modal opening and closing
* Escape key modal closing
* Empty form submission
* Invalid email validation
* Invalid phone validation
* Color selection validation
* Terms and conditions validation
* Successful form submission

## Internship

This project was developed as part of my frontend development internship at SkillAudit.

## Author

Monesh K D

GitHub: YOUR_GITHUB_PROFILE_URL

LinkedIn: YOUR_LINKEDIN_PROFILE_URL

## Project Demo

Live Demo: YOUR_LIVE_PROJECT_URL

Screen Recording: YOUR_SCREEN_RECORDING_URL

The HTML page contains the PulseX Ultra hero section, carousel, feature tabs, specifications, pre-order form, and modal components.  
