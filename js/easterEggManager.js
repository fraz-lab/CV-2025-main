class EasterEggManager {
  static initialize() {
    this.initializeFaceImageToggle();
    this.initializePersonalDetailsCode();
    this.initializeKonamiCode();
    this.isPersonalDetailsRevealed = false;
  }

  static initializeFaceImageToggle() {
    const faceImage = document.querySelector("header img");
    if (faceImage) {
      faceImage.addEventListener("click", () => {
        faceImage.classList.toggle("grayscale");
      });
    }
  }

  static initializePersonalDetailsCode() {
    let position = 0;
    const code = CONFIG.easterEggs.personalDetails;
    let keySequence = [];

    document.addEventListener("keydown", (event) => {
      // Add the pressed key to the sequence
      keySequence.push(event.code);

      // Keep only the last 4 keys
      if (keySequence.length > code.length) {
        keySequence = keySequence.slice(-code.length);
      }

      // Check if the sequence matches
      if (
        keySequence.length === code.length &&
        keySequence.every((key, index) => key === code[index])
      ) {
        if (!this.isPersonalDetailsRevealed) {
          this.revealPersonalDetails();
        } else {
          this.hidePersonalDetails();
        }
        keySequence = []; // Reset sequence
      }
    });

    // Also add visual feedback for debugging (remove in production)
    if (CONFIG.debug) {
      document.addEventListener("keydown", (event) => {
        console.log(
          `Key pressed: ${event.code}, Sequence: [${keySequence.join(", ")}]`
        );
      });
    }
  }

  static revealPersonalDetails() {
    const personalDetails = document.querySelectorAll(".personal-detail");
    const faceImage = document.querySelector("header img");

    personalDetails.forEach((element) => {
      element.classList.remove("hidden");
      element.classList.add("revealed");
    });

    if (faceImage) {
      faceImage.style.display = "block";
      faceImage.classList.add("show");
    }

    const qrContainer = document.getElementById("qr-code-container");
    if (qrContainer) {
      qrContainer.classList.add("below-face");
    }

    this.isPersonalDetailsRevealed = true;

    // Optional: Show a subtle notification
    this.showNotification("Personal details revealed! 🔓");
  }

  static hidePersonalDetails() {
    const personalDetails = document.querySelectorAll(".personal-detail");
    const faceImage = document.querySelector("header img");

    personalDetails.forEach((element) => {
      element.classList.add("hidden");
      element.classList.remove("revealed");
    });

    if (faceImage) {
      faceImage.style.display = "none";
      faceImage.classList.remove("show");
    }

    const qrContainer = document.getElementById("qr-code-container");
    if (qrContainer) {
      qrContainer.classList.remove("below-face");
    }

    this.isPersonalDetailsRevealed = false;

    // Optional: Show a subtle notification
    this.showNotification("Personal details hidden! 🔒");
  }

  static showNotification(message) {
    // Create a temporary notification element
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      z-index: 1000;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => (notification.style.opacity = "1"), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  static initializeKonamiCode() {
    let position = 0;
    const code = CONFIG.easterEggs.konami;

    document.addEventListener("keydown", (event) => {
      if (event.key === code[position]) {
        position++;
        if (position === code.length) {
          window.location.href = "https://dn.ht/picklecat/";
        }
      } else {
        position = 0;
      }
    });
  }
}
