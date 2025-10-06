let themeManager;

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize theme manager
  themeManager = new ThemeManager();

  // Make toggleStyle globally available
  window.toggleStyle = () => themeManager.toggleStyle();

  // Load all sections and icons
  await Promise.all([
    SectionLoader.loadAllSections(),
    IconManager.initializeAllIcons(),
  ]);

  // Initialize event handlers after content is loaded
  EasterEggManager.initialize();
});
