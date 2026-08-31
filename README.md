# MediNova Health Hub

Absolutely. Here is a ready-to-copy Lovable prompt for creating a premium Hospital Management System website using HTML, CSS, and JavaScript.

Create a complete, modern, premium Hospital Management System website called “MediNova” using HTML5, CSS3, and vanilla JavaScript.

The website should look like a professional real-world hospital administration dashboard, not like a basic student project.

DESIGN STYLE

Use a dark premium theme + glassmorphism throughout the website.

Design requirements:

Dark navy/black background

Glassmorphism cards with transparent backgrounds

backdrop-filter: blur()

Subtle borders and shadows

Cyan/blue as the primary accent

Purple and pink as secondary accent colors

Soft glowing gradients

Rounded corners

Modern typography

Plenty of whitespace

Smooth hover effects

Smooth page transitions

Micro-interactions

Responsive design for desktop, tablet and mobile

Use CSS animations wherever appropriate

Avoid excessive visual clutter

The final UI should feel similar to a modern SaaS healthcare dashboard.

MAIN LAYOUT

Create a fixed left sidebar and a main dashboard area.

SIDEBAR

Add the MediNova logo with a medical cross icon.

Navigation items:

Dashboard

Patients

Doctors

Appointments

Departments

Rooms & Beds

Pharmacy

Billing

Laboratory

Reports

Settings

At the bottom:

User profile

Dark/Light theme toggle

Logout button

The sidebar should collapse into a hamburger menu on mobile.

TOP NAVBAR

Create a modern top navigation bar containing:

Page title

Search box

Notification icon

Messages icon

User avatar

Admin name

Current date

Add subtle glass effect to the navbar.

DASHBOARD HERO SECTION

Create a large welcome card:

“Good Morning, Admin 👋”

Subtitle:

“Manage your hospital operations smarter, faster and more efficiently.”

Add:

“Add New Patient” button

“Schedule Appointment” button

Use a glowing healthcare-inspired background with subtle animated elements.

STATISTICS CARDS

Create four premium glass cards:

Total Patients

2,486
+12.5% this month

Available Doctors

64
+4 new doctors

Today's Appointments

128
18 pending confirmation

Available Beds

42
7 critical care occupied

Each card should have:

Icon

Number

Description

Percentage/change indicator

Animated number counter

PATIENT MANAGEMENT

Create a complete Patients page.

Display a modern table containing:

Patient ID

Patient Name

Age

Gender

Phone

Department

Assigned Doctor

Status

Actions

Statuses:

Stable

Observation

Critical

Discharged

Add:

Search patients

Filter by department

Filter by status

Add Patient button

Edit patient

Delete patient

View patient details

When “Add Patient” is clicked, open a beautiful glassmorphism modal form.

Form fields:

Full Name

Age

Gender

Phone

Email

Blood Group

Department

Doctor

Address

Medical Notes

Use JavaScript for form validation and dynamically add patients to the table.

DOCTORS PAGE

Create a professional Doctors management page.

Doctor cards should contain:

Profile avatar

Doctor name

Specialization

Experience

Rating

Availability status

Number of patients

View Profile button

Example doctors:

Dr. Ananya Sharma — Cardiologist
Dr. Vikram Rao — Orthopedic Surgeon
Dr. Sneha Mehta — Neurologist
Dr. Arjun Patel — General Physician

Use elegant hover animations.

APPOINTMENTS PAGE

Create an appointment management interface.

Include:

Calendar-style date selector

Today's appointments

Upcoming appointments

Appointment status

Appointment information:

Patient

Doctor

Department

Date

Time

Appointment type

Status

Statuses:

Confirmed

Pending

Completed

Cancelled

Add a “Schedule Appointment” modal.

DEPARTMENTS PAGE

Create department cards for:

Cardiology

Neurology

Orthopedics

Pediatrics

Emergency

General Medicine

Dermatology

Radiology

Each card should display:

Department icon

Doctors count

Patients count

Available beds

Occupancy percentage

Use animated progress bars.

ROOMS & BEDS

Create a hospital bed management page.

Display:

Total beds

Available beds

Occupied beds

ICU beds

Emergency beds

Create visual bed cards with statuses:

🟢 Available
🔵 Occupied
🔴 Critical
🟡 Cleaning

Allow filtering by ward.

PHARMACY

Create a pharmacy management page containing:

Medicine name

Category

Stock

Price

Expiry date

Supplier

Status

Highlight low-stock medicines with warning colors.

Add:

Add Medicine

Edit Medicine

Delete Medicine

Search

Filter

BILLING

Create a billing management page.

Display:

Invoice ID

Patient

Treatment

Doctor

Amount

Payment status

Date

Payment statuses:

Paid

Pending

Overdue

Include a billing summary:

Today's Revenue

Monthly Revenue

Pending Payments

Total Revenue

LABORATORY

Create a laboratory dashboard.

Show:

Pending Tests

Completed Tests

Critical Results

Total Tests

Create a test table with:

Test ID

Patient

Test Name

Doctor

Date

Result

Status

REPORTS

Create a Reports & Analytics page.

Include modern charts using CSS/JavaScript or a lightweight chart library if necessary.

Show:

Patient growth

Appointment statistics

Department occupancy

Revenue overview

Doctor performance

Use animated charts and glass cards.

SETTINGS

Create a Settings page with:

Hospital information

Admin profile

Notification preferences

Security settings

Theme settings

System preferences

JAVASCRIPT FUNCTIONALITY

The website must not be static.

Implement functional JavaScript for:

Sidebar navigation

Mobile hamburger menu

Dark/light theme toggle

Search

Filters

Add patient

Edit patient

Delete patient

Add appointment

Appointment status changes

Modal open/close

Form validation

Toast notifications

Animated statistics counters

Active navigation state

Dashboard interactions

Basic localStorage persistence

Use localStorage so newly added patients, appointments and settings remain after refreshing the page.

ANIMATIONS

Use professional animations, including:

Fade-in

Slide-up

Scale-in

Card hover lift

Glowing borders

Animated progress bars

Number counters

Button hover effects

Modal transitions

Sidebar transitions

Floating background gradient/orbs

Subtle pulse animation

Loading skeleton where appropriate

Animations should be smooth and professional, not excessive.

RESPONSIVE DESIGN

The website must work perfectly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Sidebar becomes a hamburger menu

Tables become horizontally scrollable or responsive cards

Dashboard cards become one-column

Modals fit the screen

Typography scales appropriately

CODE REQUIREMENTS

Use:

HTML5

CSS3

Vanilla JavaScript

Organize the project cleanly:

/index.html
/style.css
/script.js
/assets/

Use semantic HTML.

Use CSS variables for colors, spacing and theme values.

Write clean, reusable and well-commented code.

Do not create a basic template. Make it look like a polished commercial hospital administration product.

IMPORTANT

The final website should immediately look impressive when opened in the browser.

Prioritize:

Premium visual design

Dark glassmorphism UI

Smooth animations

Excellent responsive layout

Functional interactions

Clean code

Professional hospital dashboard experience

Brand name: MediNova
Tagline: “Healthcare, Reimagined.”

Use realistic sample hospital data throughout the dashboard.

Make the final result visually impressive enough for a college project demonstration, portfolio, LinkedIn project showcase, and viva presentation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://medinova-prime-dashboard.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/569afdec-2559-4a3f-872e-a5af7d7f81cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
