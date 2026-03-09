export function initNavigation({ navLinks, navbarMenu, navbarToggle, spyTargets, onSectionChange }) {
    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isActive);
        });

        spyTargets.forEach((section) => {
            section.classList.toggle("is-current", section.id === id);
        });

        if (typeof onSectionChange === "function") {
            onSectionChange(id);
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href")?.slice(1);
            const target = targetId ? document.getElementById(targetId) : null;
            if (!target) return;

            target.scrollIntoView({ behavior: "smooth", block: "start" });
            navbarMenu?.classList.remove("active");
            navbarToggle?.classList.remove("is-active");
        });
    });

    navbarToggle?.addEventListener("click", () => {
        navbarToggle.classList.toggle("is-active");
        navbarMenu?.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!navbarMenu?.classList.contains("active")) return;
        const clickedInsideMenu = navbarMenu.contains(event.target);
        const clickedToggle = navbarToggle?.contains(event.target);
        if (!clickedInsideMenu && !clickedToggle) {
            navbarMenu.classList.remove("active");
            navbarToggle?.classList.remove("is-active");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        navbarMenu?.classList.remove("active");
        navbarToggle?.classList.remove("is-active");
    });

    const spyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting || !entry.target.id) return;
                setActiveLink(entry.target.id);
            });
        },
        { threshold: 0.55, rootMargin: "-8% 0px -35% 0px" }
    );

    spyTargets.forEach((target) => spyObserver.observe(target));

    return {
        onResize: () => {
            if (window.innerWidth > 760) {
                navbarMenu?.classList.remove("active");
                navbarToggle?.classList.remove("is-active");
            }
        }
    };
}
