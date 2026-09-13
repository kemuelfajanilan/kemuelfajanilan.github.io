# STEP 2 — CUSTOMIZE & TEST LOCALLY

## 1. Add your real professional photo

Rename your chosen photo to:

    profile.png

Then place it here:

    images/profile.png

Recommended:
- Portrait orientation
- Clear face
- Professional attire
- At least 1000 px tall
- PNG or high-quality JPG source
- Keep the final website filename exactly as `profile.png`

The site automatically uses the photo when `images/profile.png` exists.

---

## 2. Add your actual resume

Rename your PDF to:

    Kemuel-Fajanilan-Resume.pdf

Place it here:

    resume/Kemuel-Fajanilan-Resume.pdf

Both "Download Resume" buttons already point to this file.

---

## 3. Contact details

The portfolio is already configured with:

Email:
    kemuel.faala.fajanilan@gmail.com

LinkedIn:
    https://www.linkedin.com/in/kemuel-fajanilan-3420b72b7/

GitHub:
    https://github.com/kemuelfajanilan73-lang

You do not need to replace these unless you want to change them later.

---

## 4. Contact-form destination

The contact form in:

    js/script.js

is already configured to send to:

    kemuel.faala.fajanilan@gmail.com

Note:
The current static contact form opens the visitor's default email application using `mailto:`.

---

## 5. Update project links

The QNHS-EduHub project currently still contains placeholder links for:

- Live Demo
- Source Code / GitHub Repository

Replace the relevant:

    href="#"

values in `index.html` when you have the actual public URLs.

Do the same for other projects when you have deployed versions or public repositories.

---

## 6. Test locally

### Quick method

Double-click:

    index.html

It should open in Chrome, Edge, Firefox, or another browser.

### Recommended method in VS Code

Install the "   " extension.

Then:
1. Open the portfolio folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

This typically gives you a local address similar to:

    http://127.0.0.1:5500/

---

## 7. Local testing checklist

Desktop:
- Navigation links scroll to the correct sections
- Dark/light mode works
- Accent colors work
- Profile photo appears correctly
- Resume button opens the PDF
- Project cards display correctly
- Contact form opens the default email app
- LinkedIn link opens correctly
- GitHub link opens correctly

Mobile:
- Resize the browser below 720 px
- Mobile menu opens/closes
- No horizontal scrolling
- Text remains readable
- Buttons do not overflow
- Project cards stack vertically
- Profile photo is not distorted

Files:
- No spaces or unusual characters in filenames
- All image paths use relative paths
- Resume PDF opens from the project folder
- No local Windows paths such as `C:\Users\...`

---

## 8. Important before GitHub Pages

GitHub Pages paths are case-sensitive.

These are different:

    images/profile.png
    images/Profile.png

Keep the exact filename:

    images/profile.png

Also keep:

    index.html

at the root of the repository.

---

## Current project structure

kemuel-portfolio/
├── index.html
├── README.md
├── STEP-2-CHECKLIST.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.png                  <- ADD YOUR PHOTO
│   └── projects/
└── resume/
    └── Kemuel-Fajanilan-Resume.pdf  <- ADD YOUR RESUME
