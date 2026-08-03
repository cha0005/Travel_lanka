(function () {
  const POPUP_CLOSE_MS = 300;
  const BACKDROP_CLOSE_MS = 280;

  const sigiriyaTrigger = document.getElementById("sigiriya-essentials-trigger");
  const sigiriyaPanel = document.getElementById("sigiriya-essentials-panel");
  const sigiriyaPopup = document.getElementById("sigiriya-essentials-popup");
  const ellaTrigger = document.getElementById("ella-rest-trigger");
  const ellaPanel = document.getElementById("ella-rest-panel");
  const ellaPopup = document.getElementById("ella-rest-popup");
  const trigger = document.getElementById("rest-areas-trigger");
  const panel = document.getElementById("rest-areas-panel");
  const popup = document.getElementById("rest-areas-popup");
  const featureCardTriggers = document.querySelectorAll(".feature-card[data-popup-target]");
  const closeButtons = document.querySelectorAll("[data-close-popup]");
  const backdrop = document.getElementById("popup-backdrop");
  const linkList = document.querySelector(".link-list");
  const panelDock = document.querySelector(".destination-panels");

  if (!trigger || !panel || !ellaTrigger || !ellaPanel || !sigiriyaTrigger || !sigiriyaPanel || !sigiriyaPopup || !ellaPopup || !popup || !backdrop) {
    return;
  }

  const inlinePanels = [
    { trigger: sigiriyaTrigger, panel: sigiriyaPanel },
    { trigger: ellaTrigger, panel: ellaPanel },
    { trigger: trigger, panel: panel }
  ];

  let backdropCloseTimer = null;

  const closeInlinePanel = (entry) => {
    if (!entry || !entry.trigger || !entry.panel) return;

    if (entry.panel.classList.contains("is-open")) {
      entry.panel.classList.remove("is-open");
      entry.panel.classList.add("is-closing");
      setTimeout(() => {
        entry.panel.classList.remove("is-closing");
        entry.panel.classList.remove("inline-mounted");
        entry.panel.setAttribute("aria-hidden", "true");
        if (panelDock && entry.panel.parentElement !== panelDock) {
          panelDock.appendChild(entry.panel);
        }
      }, 600);
    } else {
      entry.panel.classList.remove("inline-mounted");
      entry.panel.setAttribute("aria-hidden", "true");
      if (panelDock && entry.panel.parentElement !== panelDock) {
        panelDock.appendChild(entry.panel);
      }
    }
    entry.trigger.classList.remove("is-active");
    entry.trigger.setAttribute("aria-expanded", "false");
  };

  const closeAllInlinePanels = () => {
    inlinePanels.forEach(closeInlinePanel);
  };

  const closePopup = (element) => {
    if (element._closeTimer) {
      window.clearTimeout(element._closeTimer);
      element._closeTimer = null;
    }

    if (element.classList.contains("is-open")) {
      element.classList.remove("is-open");
      element.classList.add("is-closing");

      element._closeTimer = window.setTimeout(() => {
        element.classList.remove("is-closing");
        element._closeTimer = null;
      }, POPUP_CLOSE_MS);
    }

    element.setAttribute("aria-hidden", "true");
  };

  const openBackdrop = () => {
    if (backdropCloseTimer) {
      window.clearTimeout(backdropCloseTimer);
      backdropCloseTimer = null;
    }

    backdrop.classList.remove("is-closing");
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
  };

  const closeBackdrop = () => {
    backdrop.classList.remove("is-open");
    backdrop.classList.add("is-closing");
    backdrop.setAttribute("aria-hidden", "true");

    if (backdropCloseTimer) {
      window.clearTimeout(backdropCloseTimer);
    }

    backdropCloseTimer = window.setTimeout(() => {
      backdrop.classList.remove("is-closing");
      backdropCloseTimer = null;
    }, BACKDROP_CLOSE_MS);
  };

  const closeAllPopups = () => {
    closePopup(sigiriyaPopup);
    closePopup(ellaPopup);
    closePopup(popup);
    closeBackdrop();
  };

  const openPopupFromCard = (popupId) => {
    const target = document.getElementById(popupId);
    if (!target) return;

    closeAllPopups();
    if (target._closeTimer) {
      window.clearTimeout(target._closeTimer);
      target._closeTimer = null;
    }

    target.classList.remove("is-closing");
    target.classList.add("is-open");
    target.setAttribute("aria-hidden", "false");
    openBackdrop();
  };

  const openInlinePanel = (entry) => {
    if (!entry || !entry.trigger || !entry.panel) return;

    const willOpen = !entry.panel.classList.contains("is-open");
    closeAllInlinePanels();

    if (!willOpen) return;

    if (linkList && entry.trigger.parentElement === linkList) {
      entry.trigger.insertAdjacentElement("afterend", entry.panel);
      entry.panel.classList.add("inline-mounted");
    }

    // Remove closing state if present
    entry.panel.classList.remove("is-closing");
    // Trigger reflow for restart animation
    void entry.panel.offsetWidth;
    entry.panel.classList.add("is-open");
    entry.panel.setAttribute("aria-hidden", "false");
    entry.trigger.classList.add("is-active");
    entry.trigger.setAttribute("aria-expanded", "true");
    entry.panel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  featureCardTriggers.forEach((card) => {
    card.addEventListener("click", function () {
      const popupId = card.getAttribute("data-popup-target");
      if (!popupId) return;
      openPopupFromCard(popupId);
    });
  });

  inlinePanels.forEach((entry) => {
    entry.trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openInlinePanel(entry);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeAllPopups);
  });

  backdrop.addEventListener("click", closeAllPopups);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllPopups();
      closeAllInlinePanels();
    }
  });
})();
