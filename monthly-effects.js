(function () {
  if (!document.body) return;

  const monthNames = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const monthIndex = resolveMonthIndex();
  const monthKey = monthNames[monthIndex];
  document.body.classList.add("season-" + monthKey);

  const mountPoint = document.querySelector(".destinations-main") || document.body;
  let layer = document.getElementById("season-effect-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "season-effect-layer";
    layer.setAttribute("aria-hidden", "true");
    mountPoint.appendChild(layer);
  }

  function resolveMonthIndex() {
    const urlMonth = new URLSearchParams(window.location.search).get("month");
    if (!urlMonth) return new Date().getMonth();

    const byNumber = Number(urlMonth);
    if (Number.isInteger(byNumber) && byNumber >= 1 && byNumber <= 12) {
      return byNumber - 1;
    }

    const normalized = String(urlMonth).trim().toLowerCase().slice(0, 3);
    const idx = monthNames.indexOf(normalized);
    return idx >= 0 ? idx : new Date().getMonth();
  }
})();
