const CONFIG = {
  debug: false, // Set to true for development, false for production

  sections: [
    { file: "sections/intro.html", target: "intro-section" },
    { file: "sections/experience.html", target: "experience-section" },
    { file: "sections/projects.html", target: "projects-section" },
    { file: "sections/education.html", target: "education-section" },
    { file: "sections/skills.html", target: "skills-section" },
    { file: "sections/languages.html", target: "languages-section" },
  ],

  icons: {
    location: "images/globe-icon.svg",
    phone: "images/phone-icon.svg",
    email: "images/email-icon.svg",
    linkedin: "images/linkedin-icon.svg",
    github: "images/github-icon.svg",
    qr: "images/qr-code.svg",
    dob: "images/dob-icon.svg",
  },

  styles: {
    count: 4,
    themes: ["style1", "style2", "style3", "style4"],
  },

  easterEggs: {
    personalDetails: ["Numpad1", "Numpad0"],
    konami: [
      "c","t"
    ],
  },
};
