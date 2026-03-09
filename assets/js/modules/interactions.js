export function initParallax({ prefersReducedMotion, hero, heroContent, heroVisual, heroOverlay }) {
    if (prefersReducedMotion || !hero) {
        return () => {};
    }

    return () => {
        const offset = Math.min(window.scrollY, window.innerHeight);
        if (heroContent) heroContent.style.transform = `translateY(${offset * 0.14}px)`;
        if (heroVisual) heroVisual.style.transform = `translateY(${offset * 0.22}px)`;
        if (heroOverlay) heroOverlay.style.transform = `translateY(${offset * 0.08}px)`;
    };
}

export function initSectionParallax({ prefersReducedMotion }) {
    const layers = document.querySelectorAll("[data-parallax]");
    if (prefersReducedMotion || !layers.length) {
        return () => {};
    }

    const layerData = Array.from(layers).map((layer) => ({
        el: layer,
        speed: Number(layer.dataset.parallax || 0.08)
    }));

    return () => {
        const viewport = window.innerHeight;
        layerData.forEach(({ el, speed }) => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < -40 || rect.top > viewport + 40) return;

            const centerOffset = rect.top + rect.height * 0.5 - viewport * 0.5;
            const translateY = centerOffset * -speed;
            el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
    };
}

export function initHeroParticles({ hero, prefersReducedMotion }) {
    if (!hero || prefersReducedMotion) return;

    const container = document.createElement("div");
    container.className = "hero-particles";

    const particleCount = 14;
    for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement("span");
        const size = (Math.random() * 4 + 2).toFixed(2);
        const left = (Math.random() * 100).toFixed(2);
        const delay = (Math.random() * 6).toFixed(2);
        const duration = (Math.random() * 10 + 10).toFixed(2);

        particle.style.setProperty("--p-size", `${size}px`);
        particle.style.setProperty("--p-left", `${left}%`);
        particle.style.setProperty("--p-delay", `${delay}s`);
        particle.style.setProperty("--p-duration", `${duration}s`);
        container.appendChild(particle);
    }

    hero.appendChild(container);
}

export function initLoadState() {
    document.body.classList.add("preload");
    requestAnimationFrame(() => {
        document.body.classList.add("is-loaded");
    });
}

export function initTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]");
    if (!tooltipElements.length) return;

    const tooltip = document.createElement("div");
    tooltip.className = "modern-tooltip";
    document.body.appendChild(tooltip);

    let tooltipTarget = null;

    const placeTooltip = (event) => {
        if (!tooltipTarget) return;
        const offset = 14;
        tooltip.style.left = `${event.clientX + offset}px`;
        tooltip.style.top = `${event.clientY + offset}px`;
    };

    tooltipElements.forEach((element) => {
        element.addEventListener("mouseenter", (event) => {
            tooltipTarget = event.currentTarget;
            const text = tooltipTarget.getAttribute("data-tooltip");
            if (!text) return;
            tooltip.textContent = text;
            tooltip.classList.add("is-active");
        });

        element.addEventListener("mousemove", placeTooltip);
        element.addEventListener("mouseleave", () => {
            tooltipTarget = null;
            tooltip.classList.remove("is-active");
        });
    });
}

export function initRiskTooltip() {
    const riskImg = document.querySelector(".risk-img");
    const riskTooltip = document.getElementById("risk-tooltip");
    if (!riskImg || !riskTooltip) return;

    const show = () => riskTooltip.classList.add("is-visible");
    const hide = () => riskTooltip.classList.remove("is-visible");

    riskImg.addEventListener("mouseenter", show);
    riskImg.addEventListener("mouseleave", hide);
    riskImg.addEventListener("touchstart", show, { passive: true });
    riskImg.addEventListener("touchend", hide);
}

export function initCardTilt({ prefersReducedMotion, cards }) {
    if (prefersReducedMotion || !window.matchMedia("(pointer:fine)").matches) return;

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -4;
            const rotateY = ((x / rect.width) - 0.5) * 4;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

export function initClickFeedback() {
    const clickables = document.querySelectorAll(".btn, #btn-top, .navbar-menu a, .footer-social a");

    clickables.forEach((item) => {
        item.addEventListener("pointerdown", () => item.classList.add("is-pressed"));
        item.addEventListener("pointerup", () => item.classList.remove("is-pressed"));
        item.addEventListener("pointerleave", () => item.classList.remove("is-pressed"));
    });
}

export function initRipple() {
    const animatedButtons = document.querySelectorAll(".btn, #btn-top");

    animatedButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add("ripple");

            const existingRipple = button.querySelector(".ripple");
            if (existingRipple) existingRipple.remove();
            button.appendChild(circle);
        });
    });
}
