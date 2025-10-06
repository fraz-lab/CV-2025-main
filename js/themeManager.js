class ThemeManager {
  constructor() {
    this.currentStyle = 0;
    this.isDarkMode = false;
  }

  toggleStyle() {
    const cvContainer = document.querySelector(".cv-container");
    const header = document.querySelector("header");
    const body = document.body;

    // Remove all existing styles
    cvContainer.classList.remove(...CONFIG.styles.themes);
    header.classList.remove("left-align", "center-align");
    body.classList.remove("animated-background", "bold");

    this.currentStyle = (this.currentStyle + 1) % CONFIG.styles.count;

    // Apply new style
    this.applyStyle(cvContainer, header, body);
    this.toggleTheme();
  }

  applyStyle(cvContainer, header, body) {
    const styleConfig = {
      0: { container: "style1", header: "left-align" },
      1: { container: "style2", header: "left-align" },
      2: { container: "style3", header: "center-align" },
      3: { container: "style4", header: "center-align", special: true },
    };

    const config = styleConfig[this.currentStyle];
    cvContainer.classList.add(config.container);
    header.classList.add(config.header);

    if (config.special) {
      body.classList.add("animated-background", "bold");
      this.isDarkMode = true;
    }
  }

  toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode", this.isDarkMode);
    body.classList.toggle("light-mode", !this.isDarkMode);
    this.isDarkMode = !this.isDarkMode;

    IconManager.updateIconColors();
  }
}
