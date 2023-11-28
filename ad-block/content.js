function disableClick(ad) {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.width = ad.offsetWidth + "px";
  overlay.style.height = ad.offsetHeight + "px";
  overlay.style.top = ad.offsetTop + "px";
  overlay.style.left = ad.offsetLeft + "px";
  overlay.style.zIndex = 1000;
  overlay.style.backgroundColor = "transparent";
  overlay.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();
    },
    true
  );
  ad.parentNode.insertBefore(overlay, ad);
}

function hide(ad) {
  ad.style.setProperty("opacity", "0.15", "important");
  ad.style.setProperty("filter", "blur(8px)", "important");
  ad.style.setProperty("filter", "brightness(0)", "important");
  disableClick(ad);
  ad.title = "";
  ad.alt = "";
  ad.style.cursor = "default";
  if (ad.tagName === "A") {
    ad.removeAttribute("href");
  }
}

function hideAds() {
  const imgs = document.getElementsByTagName("img");
  for (const img of imgs) {
    if (img.alt == "Advertisement" || img.classList.contains("img_ad")) {
      hide(img);
    }
  }
  const iframes = document.getElementsByTagName("iframe");
  for (const iframe of iframes) {
    let id = iframe.getAttribute("id");
    if (id !== null) {
      id = id.toLowerCase();
      if (id.startsWith("aswift")) {
        hide(iframe);
        continue;
      }
    }
    let title = iframe.getAttribute("title");
    if (title !== null) {
      title = title.toLowerCase();
      if (title == "advertisement" || title == "ad" || title == "ad content") {
        hide(iframe);
        continue;
      }
    }
    let aria_label = iframe.getAttribute("aria-label");
    if (aria_label !== null) {
      aria_label = aria_label.toLowerCase();
      if (
        aria_label == "advertisement" ||
        aria_label == "ad" ||
        aria_label == "ad content"
      ) {
        hide(iframe);
        continue;
      }
    }
    let filter = iframe.style.filter;
    if (filter !== null && filter.includes("brightness(0)")) {
      hide(iframe);
      continue;
    }
  }
}
hideAds();
setInterval(hideAds, 100);
