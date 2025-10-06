class IconManager {
  static async loadSVG(url, elementId) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;
        this.updateIconColors();
      }
    } catch (error) {
      console.error(`Error loading SVG: ${error}`);
    }
  }

  static updateIconColors() {
    const icons = document.querySelectorAll(
      "svg path:not(#qr-code-icon svg path)"
    );
    const qrIcon = document.querySelector("#qr-code-icon svg");

    let color = "#000000"; // Default black

    if (document.body.classList.contains("animated-background")) {
      color = "#00ff00"; // Neon green
    } else if (document.body.classList.contains("dark-mode")) {
      color = "#ffffff"; // White
    }

    icons.forEach((icon) => (icon.style.fill = color));
    if (qrIcon) qrIcon.style.fill = color;
  }

  static initializeAllIcons() {
    const iconMappings = [
      {
        svg: CONFIG.icons.location,
        targets: [
          "location-icon",
          "location-icon-education",
          "location-icon-pisj",
          "birthplace-icon",
          "location-icon-kips",
        ],
      },
      { svg: CONFIG.icons.phone, targets: ["phone-icon"] },
      { svg: CONFIG.icons.email, targets: ["email-icon"] },
      { svg: CONFIG.icons.linkedin, targets: ["linkedin-icon"] },
      { svg: CONFIG.icons.github, targets: ["github-icon"] },
      { svg: CONFIG.icons.qr, targets: ["qr-code-icon"] },
      { svg: CONFIG.icons.dob, targets: ["dob-icon"] },
    ];

    iconMappings.forEach(({ svg, targets }) => {
      targets.forEach((target) => this.loadSVG(svg, target));
    });
  }
}
