// 官网只保留导航和渐入两类轻交互，不采集事件，也不向任何分析服务发送数据。
const navigationToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".primary-navigation");

if (navigationToggle && navigation) {
  const closeNavigation = () => {
    navigationToggle.setAttribute("aria-expanded", "false");
    navigationToggle.setAttribute("aria-label", "打开导航菜单");
    navigation.classList.remove("is-open");
  };

  navigationToggle.addEventListener("click", () => {
    const willOpen = navigationToggle.getAttribute("aria-expanded") !== "true";
    navigationToggle.setAttribute("aria-expanded", String(willOpen));
    navigationToggle.setAttribute("aria-label", willOpen ? "关闭导航菜单" : "打开导航菜单");
    navigation.classList.toggle("is-open", willOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

// 仅让视口之外的区块进入等待态，避免脚本加载前隐藏主要内容或造成首屏闪烁。
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = [...document.querySelectorAll(".reveal")];

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("is-pending");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  for (const element of revealElements) {
    if (element.getBoundingClientRect().top > window.innerHeight * 0.88) {
      element.classList.add("is-pending");
      revealObserver.observe(element);
    }
  }
}

for (const year of document.querySelectorAll("[data-current-year]")) {
  year.textContent = String(new Date().getFullYear());
}
