class SectionLoader {
  static async loadSection(url, elementId) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;
      }
    } catch (error) {
      console.error(`Error loading section ${url}:`, error);
    }
  }

  static async loadAllSections() {
    const loadPromises = CONFIG.sections.map(({ file, target }) =>
      this.loadSection(file, target)
    );
    await Promise.all(loadPromises);
  }
}
