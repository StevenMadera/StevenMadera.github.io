export function createScrollProgressBar() {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.innerHTML = '<span class="scroll-progress__bar" aria-hidden="true"></span>';
    document.body.prepend(progress);
    return progress.querySelector(".scroll-progress__bar");
}

export function initScrollUI({ navbar, btnTop, progressBar }) {
    const update = () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

        btnTop?.classList.toggle("is-visible", scrollTop > 380);
        navbar?.classList.toggle("is-scrolled", scrollTop > 24);

        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
        }
    };

    btnTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    update();
    return update;
}

export function createRafScrollHandler(callbacks) {
    let ticking = false;

    const run = () => {
        callbacks.forEach((callback) => callback());
        ticking = false;
    };

    return () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(run);
    };
}
