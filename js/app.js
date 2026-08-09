/* =========================================================
   ENGINEERING FUTURES 2026
   app.js — Part 1
   Core interactions
   ========================================================= */


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();
    initScrollReveal();
    initCounters();
    initCountrySelector();
    initCareerSelector();
    initSkillInteractions();

});


/* =========================================================
   02. NAVIGATION
   ========================================================= */

function initNavigation() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const updateNavbar = () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /*
     * Highlight the navigation item based
     * on the section currently visible.
     */

    const navLinks =
        document.querySelectorAll(
            ".navbar nav a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    if (!navLinks.length || !sections.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute(
                            "id"
                        );

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (href === `#${id}`) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   03. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".summary-card, " +
            ".chart-card, " +
            ".ranking-card, " +
            ".engineering-card, " +
            ".gap-card, " +
            ".source-card, " +
            ".timeline-item, " +
            ".recommendation-card, " +
            ".about-card"
        );

    if (!elements.length) {
        return;
    }


    elements.forEach((element, index) => {

        element.classList.add("reveal");

        /*
         * Small staggered delay creates
         * the "report loading" effect.
         */

        element.style.transitionDelay =
            `${Math.min(index * 45, 400)}ms`;

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   04. ANIMATED COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) {
        return;
    }


    const animateCounter =
        element => {

            const target =
                parseFloat(
                    element.dataset.counter
                );

            const suffix =
                element.dataset.suffix || "";

            const prefix =
                element.dataset.prefix || "";

            const decimals =
                element.dataset.decimals
                    ? parseInt(
                        element.dataset.decimals,
                        10
                    )
                    : 0;

            const duration = 1400;

            const startTime =
                performance.now();


            const update =
                currentTime => {

                    const elapsed =
                        currentTime -
                        startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );

                    /*
                     * Ease-out curve.
                     */

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    const value =
                        target * eased;

                    element.textContent =
                        prefix +
                        value.toFixed(
                            decimals
                        ) +
                        suffix;


                    if (progress < 1) {

                        requestAnimationFrame(
                            update
                        );

                    }

                };


            requestAnimationFrame(
                update
            );

        };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   05. COUNTRY SELECTOR
   ========================================================= */

function initCountrySelector() {

    const countries =
        document.querySelectorAll(
            ".country"
        );

    if (!countries.length) {
        return;
    }


    countries.forEach(country => {

        country.addEventListener(
            "click",
            () => {

                countries.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                country.classList.add(
                    "active"
                );


                const countryCode =
                    country.dataset.country;

                if (countryCode) {

                    updateCountryDashboard(
                        countryCode
                    );

                }

            }
        );

    });

}


/* =========================================================
   06. COUNTRY DASHBOARD UPDATE
   ========================================================= */

function updateCountryDashboard(
    countryCode
) {

    /*
     * This function is intentionally
     * data-source agnostic.
     *
     * The actual country data will come
     * from countries.json.
     */

    document.dispatchEvent(
        new CustomEvent(
            "countrySelected",
            {
                detail: {
                    country:
                        countryCode
                }
            }
        )
    );


    /*
     * Update visible country labels.
     */

    const labels =
        document.querySelectorAll(
            "[data-selected-country]"
        );

    labels.forEach(label => {

        label.textContent =
            formatCountryName(
                countryCode
            );

    });

}


/* =========================================================
   07. COUNTRY NAME FORMATTER
   ========================================================= */

function formatCountryName(
    code
) {

    const names = {

        ID: "🇮🇩 Indonesia",

        SG: "🇸🇬 Singapore",

        IN: "🇮🇳 India",

        JP: "🇯🇵 Japan",

        US: "🇺🇸 United States",

        DE: "🇩🇪 Germany",

        KR: "🇰🇷 South Korea",

        MY: "🇲🇾 Malaysia",

        TH: "🇹🇭 Thailand"

    };


    return (
        names[code] ||
        code
    );

}


/* =========================================================
   08. ENGINEERING CAREER SELECTOR
   ========================================================= */

function initCareerSelector() {

    const buttons =
        document.querySelectorAll(
            ".career-btn"
        );

    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const role =
                    button.dataset.role;


                updateCareerRecommendation(
                    role
                );

            }
        );

    });

}


/* =========================================================
   09. CAREER RECOMMENDATIONS
   ========================================================= */

const fallbackRecommendations = {

    software: {

        title:
            "Software Engineering",

        high: [
            "AI Literacy",
            "Cloud Computing",
            "Platform Engineering",
            "Cybersecurity",
            "System Design"
        ],

        medium: [
            "Technical Writing",
            "Product Thinking",
            "Leadership",
            "Data Engineering"
        ],

        emerging: [
            "Agentic AI",
            "MLOps",
            "AI Security",
            "FinOps"
        ]

    },


    mechanical: {

        title:
            "Mechanical Engineering",

        high: [
            "Automation",
            "Digital Manufacturing",
            "CAD / CAE",
            "Data Literacy",
            "Systems Thinking"
        ],

        medium: [
            "Robotics",
            "Simulation",
            "Project Management",
            "Sustainability"
        ],

        emerging: [
            "Digital Twins",
            "Generative Design",
            "Industrial AI",
            "Smart Factories"
        ]

    },


    civil: {

        title:
            "Civil Engineering",

        high: [
            "BIM",
            "Data Literacy",
            "Project Management",
            "Sustainability",
            "Digital Construction"
        ],

        medium: [
            "GIS",
            "Automation",
            "Systems Thinking",
            "Risk Management"
        ],

        emerging: [
            "Digital Twins",
            "Smart Infrastructure",
            "AI-assisted Design",
            "Climate Analytics"
        ]

    },


    electrical: {

        title:
            "Electrical Engineering",

        high: [
            "Power Systems",
            "Automation",
            "Embedded Systems",
            "Data Literacy",
            "Cybersecurity"
        ],

        medium: [
            "IoT",
            "Robotics",
            "Cloud Computing",
            "Systems Engineering"
        ],

        emerging: [
            "Edge AI",
            "Smart Grid",
            "EV Systems",
            "Digital Twins"
        ]

    },


    industrial: {

        title:
            "Industrial Engineering",

        high: [
            "Data Analytics",
            "Process Optimization",
            "Automation",
            "AI Literacy",
            "Systems Thinking"
        ],

        medium: [
            "Supply Chain Analytics",
            "Simulation",
            "Product Management",
            "Sustainability"
        ],

        emerging: [
            "Industrial AI",
            "Digital Twins",
            "Autonomous Operations",
            "Generative Optimization"
        ]

    },


    chemical: {

        title:
            "Chemical Engineering",

        high: [
            "Process Simulation",
            "Data Analytics",
            "Process Safety",
            "Automation",
            "Sustainability"
        ],

        medium: [
            "AI Literacy",
            "Advanced Materials",
            "Systems Thinking",
            "Project Management"
        ],

        emerging: [
            "Digital Twins",
            "Industrial AI",
            "Carbon Capture",
            "Green Chemistry"
        ]

    },


    environmental: {

        title:
            "Environmental Engineering",

        high: [
            "Climate Analytics",
            "Data Literacy",
            "Environmental Monitoring",
            "Sustainability",
            "Systems Thinking"
        ],

        medium: [
            "GIS",
            "Data Visualization",
            "Policy Literacy",
            "Project Management"
        ],

        emerging: [
            "Climate AI",
            "Remote Sensing",
            "Digital Twins",
            "Carbon Analytics"
        ]

    },


    biomedical: {

        title:
            "Biomedical Engineering",

        high: [
            "Data Science",
            "AI Literacy",
            "Medical Devices",
            "Systems Engineering",
            "Regulatory Literacy"
        ],

        medium: [
            "Signal Processing",
            "Biostatistics",
            "Cybersecurity",
            "Product Development"
        ],

        emerging: [
            "Generative AI",
            "Digital Health",
            "Medical Robotics",
            "AI Diagnostics"
        ]

    }

};


/* =========================================================
   10. UPDATE RECOMMENDATION UI
   ========================================================= */

function updateCareerRecommendation(
    role
) {

    const data =
        fallbackRecommendations[role];

    if (!data) {
        return;
    }


    const title =
        document.querySelector(
            "#selectedRole"
        );

    if (title) {

        title.textContent =
            data.title;

    }


    const sections =
        document.querySelectorAll(
            ".priority-section"
        );

    if (sections.length >= 3) {

        updateSkillTags(
            sections[0],
            data.high
        );

        updateSkillTags(
            sections[1],
            data.medium
        );

        updateSkillTags(
            sections[2],
            data.emerging
        );

    }


    /*
     * Notify charts / future modules.
     */

    document.dispatchEvent(
        new CustomEvent(
            "careerSelected",
            {
                detail: {
                    role,
                    data
                }
            }
        )
    );

}


/* =========================================================
   11. SKILL TAG RENDERER
   ========================================================= */

function updateSkillTags(
    section,
    skills
) {

    const container =
        section.querySelector(
            ".skill-tags"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    skills.forEach(skill => {

        const tag =
            document.createElement(
                "span"
            );

        tag.textContent =
            skill;

        tag.classList.add(
            "skill-tag"
        );

        container.appendChild(
            tag
        );

    });

}


/* =========================================================
   12. SKILL INTERACTIONS
   ========================================================= */

function initSkillInteractions() {

    document.addEventListener(
        "click",
        event => {

            const tag =
                event.target.closest(
                    ".skill-tags span"
                );

            if (!tag) {
                return;
            }


            const skill =
                tag.textContent.trim();


            /*
             * Small visual feedback.
             */

            tag.classList.add(
                "selected"
            );


            setTimeout(() => {

                tag.classList.remove(
                    "selected"
                );

            }, 500);


            /*
             * Make the selected skill
             * available to future modules.
             */

            document.dispatchEvent(
                new CustomEvent(
                    "skillSelected",
                    {
                        detail: {
                            skill
                        }
                    }
                )
            );

        }
    );

}


/* =========================================================
   13. UTILITY: SAFE NUMBER
   ========================================================= */

function safeNumber(
    value,
    fallback = 0
) {

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;

}


/* =========================================================
   14. UTILITY: DEBOUNCE
   ========================================================= */

function debounce(
    callback,
    delay = 200
) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout =
            setTimeout(
                () => callback(...args),
                delay
            );

    };

}


/* =========================================================
   15. EXPORT GLOBAL APP API
   ========================================================= */

window.EngineeringFutures = {

    updateCountryDashboard,

    updateCareerRecommendation,

    formatCountryName,

    safeNumber,

    debounce

};


/* =========================================================
   END OF APP.JS — PART 1
   ========================================================= */
