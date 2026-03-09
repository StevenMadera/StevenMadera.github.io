export function initRevealAnimations({ sections, cards }) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        },
        { threshold: 0.2, rootMargin: "-10% 0px -20% 0px" }
    );

    sections.forEach((section, index) => {
        section.classList.add("reveal");
        section.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        revealObserver.observe(section);
    });

    const itemObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.18 }
    );

    cards.forEach((card, index) => {
        card.style.setProperty("--stagger", `${(index % 6) * 60}ms`);
        itemObserver.observe(card);
    });
}

export function initCounters(counters) {
    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target || 0);
        const suffix = counter.dataset.suffix || "";
        const duration = 1300;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            counter.textContent = `${value}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
}
