import { initNavigation } from "./modules/navigation.js";
import { initRevealAnimations, initCounters } from "./modules/observers.js";
import { createScrollProgressBar, initScrollUI, createRafScrollHandler } from "./modules/scroll.js";
import {
    initParallax,
    initSectionParallax,
    initHeroParticles,
    initLoadState,
    initTooltips,
    initRiskTooltip,
    initCardTilt,
    initClickFeedback,
    initRipple
} from "./modules/interactions.js";

document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = {
        navbar: document.querySelector(".navbar"),
        navbarMenu: document.querySelector(".navbar-menu"),
        navbarToggle: document.getElementById("navbar-toggle"),
        navLinks: document.querySelectorAll(".navbar-menu a"),
        sections: document.querySelectorAll(".section"),
        spyTargets: document.querySelectorAll("header[id], section[id]"),
        btnTop: document.getElementById("btn-top"),
        hero: document.querySelector(".hero"),
        heroContent: document.querySelector(".hero-content"),
        heroVisual: document.querySelector(".hero-visual"),
        heroOverlay: document.querySelector(".hero-overlay"),
        cards: document.querySelectorAll(".card, .metric-card, .media-card"),
        counters: document.querySelectorAll(".counter")
    };

    initLoadState();
    initHeroParticles({ hero: nodes.hero, prefersReducedMotion });

    const progressBar = createScrollProgressBar();

    const navigation = initNavigation({
        navLinks: nodes.navLinks,
        navbarMenu: nodes.navbarMenu,
        navbarToggle: nodes.navbarToggle,
        spyTargets: nodes.spyTargets
    });

    initRevealAnimations({ sections: nodes.sections, cards: nodes.cards });
    initCounters(nodes.counters);

    initTooltips();
    initRiskTooltip();
    initCardTilt({ prefersReducedMotion, cards: nodes.cards });
    initClickFeedback();
    initRipple();

    const updateScrollUI = initScrollUI({
        navbar: nodes.navbar,
        btnTop: nodes.btnTop,
        progressBar
    });

    const updateParallax = initParallax({
        prefersReducedMotion,
        hero: nodes.hero,
        heroContent: nodes.heroContent,
        heroVisual: nodes.heroVisual,
        heroOverlay: nodes.heroOverlay
    });

    const updateSectionParallax = initSectionParallax({ prefersReducedMotion });

    const onScroll = createRafScrollHandler([updateScrollUI, updateParallax, updateSectionParallax]);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateSectionParallax();

    window.addEventListener("resize", () => {
        navigation.onResize();
        updateScrollUI();
        updateSectionParallax();
    });
});
