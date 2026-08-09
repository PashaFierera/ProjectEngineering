/* =========================================================
   ENGINEERING FUTURES 2026
   app.js
   Main application controller
   ========================================================= */

const APP = {

    data: {
        countries: null,
        skills: null
    },

    state: {
        country: "ID",
        engineeringRole: "software",
        activeView: "overview"
    },

    charts: {},

    config: {
        countriesPath: "data/countries.json",
        skillsPath: "data/skills.json"
    }

};


/* =========================================================
   01. DOM HELPERS
   ========================================================= */

function $(selector) {
    return document.querySelector(selector);
}


function $$(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


function setText(
    selector,
    value
) {

    const element =
        $(selector);

    if (!element) {
        return;
    }

    element.textContent =
        value ?? "—";

}


/* =========================================================
   02. FETCH JSON DATA
   ========================================================= */

async function loadJSON(path) {

    const response =
        await fetch(path);

    if (!response.ok) {

        throw new Error(
            `Unable to load ${path}`
        );

    }

    return response.json();

}


/* =========================================================
   03. LOAD APPLICATION DATA
   ========================================================= */

async function loadApplicationData() {

    try {

        const [
            countries,
            skills
        ] = await Promise.all([

            loadJSON(
                APP.config.countriesPath
            ),

            loadJSON(
                APP.config.skillsPath
            )

        ]);


        APP.data.countries =
            countries;

        APP.data.skills =
            skills;


        console.log(
            "Engineering Futures data loaded."
        );


        document.dispatchEvent(
            new CustomEvent(
                "engineeringDataLoaded"
            )
        );


        return true;

    } catch (error) {

        console.error(
            "Data loading failed:",
            error
        );


        showDataError(
            error
        );


        return false;

    }

}


/* =========================================================
   04. DATA ERROR STATE
   ========================================================= */

function showDataError(error) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        "data-error";


    message.innerHTML = `

        <strong>
            Data unavailable
        </strong>

        <span>
            The dashboard could not load
            its research dataset.
        </span>

    `;


    document.body.prepend(
        message
    );

}


/* =========================================================
   05. COUNTRY SELECTOR
   ========================================================= */

function initializeCountrySelector() {

    const selector =
        $(
            "#countrySelector"
        );


    if (!selector) {
        return;
    }


    const countries =
        APP.data.countries
            ?.countries;


    if (!countries) {
        return;
    }


    selector.innerHTML = "";


    Object.entries(
        countries
    ).forEach(
        ([code, country]) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                code;


            option.textContent =
                `${country.flag} ${country.name}`;


            selector.appendChild(
                option
            );

        }
    );


    selector.value =
        APP.state.country;


    selector.addEventListener(
        "change",
        event => {

            selectCountry(
                event.target.value
            );

        }
    );

}


/* =========================================================
   06. COUNTRY SELECTION
   ========================================================= */

function selectCountry(
    countryCode
) {

    const countries =
        APP.data.countries
            ?.countries;


    if (
        !countries ||
        !countries[countryCode]
    ) {
        return;
    }


    APP.state.country =
        countryCode;


    const country =
        countries[countryCode];


    updateCountryUI(
        country
    );


    updateCountryCharts(
        countryCode
    );


    updateRecommendations();


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

}


/* =========================================================
   07. UPDATE COUNTRY UI
   ========================================================= */

function updateCountryUI(
    country
) {

    setText(
        "#countryName",
        country.name
    );


    setText(
        "#countryFlag",
        country.flag
    );


    setText(
        "#countryRegion",
        country.region
    );


    setText(
        "#countryIncome",
        country.incomeGroup
    );


    setText(
        "#countryStatus",
        country.assessment?.status
    );


    setText(
        "#countryPriority",
        country.assessment?.priority
    );


    updateCountryMetrics(
        country
    );

}


/* =========================================================
   08. COUNTRY METRICS
   ========================================================= */

function updateCountryMetrics(
    country
) {

    const skills =
        country.skills || {};


    const digital =
        skills.digital;


    const ai =
        skills.ai;


    const cloud =
        skills.cloud;


    const automation =
        skills.automation;


    const sustainability =
        skills.sustainability;


    setMetric(
        "#digitalScore",
        digital
    );


    setMetric(
        "#aiScore",
        ai
    );


    setMetric(
        "#cloudScore",
        cloud
    );


    setMetric(
        "#automationScore",
        automation
    );


    setMetric(
        "#sustainabilityScore",
        sustainability
    );


    const values = [

        digital,
        ai,
        cloud,
        automation,
        sustainability

    ].filter(
        value =>
            typeof value === "number"
    );


    if (
        values.length > 0
    ) {

        const average =
            Math.round(

                values.reduce(
                    (
                        total,
                        value
                    ) =>
                        total + value,
                    0
                )
                /
                values.length

            );


        setMetric(
            "#overallScore",
            average
        );

    } else {

        setMetric(
            "#overallScore",
            null
        );

    }

}


/* =========================================================
   09. SET METRIC
   ========================================================= */

function setMetric(
    selector,
    value
) {

    const element =
        $(selector);


    if (!element) {
        return;
    }


    if (
        value === null ||
        value === undefined
    ) {

        element.textContent =
            "—";

        element.removeAttribute(
            "data-value"
        );

        return;

    }


    element.textContent =
        `${value}`;

    element.dataset.value =
        value;

}


/* =========================================================
   10. ENGINEERING ROLE SELECTOR
   ========================================================= */

function initializeEngineeringSelector() {

    const selector =
        $(
            "#engineeringSelector"
        );


    if (!selector) {
        return;
    }


    const roles =
        APP.data.skills
            ?.engineeringRoles;


    if (!roles) {
        return;
    }


    selector.innerHTML = "";


    Object.entries(
        roles
    ).forEach(
        ([role, information]) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                role;


            option.textContent =
                information.name;


            selector.appendChild(
                option
            );

        }
    );


    selector.value =
        APP.state.engineeringRole;


    selector.addEventListener(
        "change",
        event => {

            selectEngineeringRole(
                event.target.value
            );

        }
    );

}


/* =========================================================
   11. ENGINEERING ROLE SELECTION
   ========================================================= */

function selectEngineeringRole(
    role
) {

    const roles =
        APP.data.skills
            ?.engineeringRoles;


    if (
        !roles ||
        !roles[role]
    ) {
        return;
    }


    APP.state.engineeringRole =
        role;


    updateEngineeringUI(
        role
    );


    updateRecommendations();


    document.dispatchEvent(

        new CustomEvent(
            "careerSelected",
            {
                detail: {
                    role
                }
            }
        )

    );

}


/* =========================================================
   12. ENGINEERING UI
   ========================================================= */

function updateEngineeringUI(
    role
) {

    const information =
        APP.data.skills
            ?.engineeringRoles?.[
                role
            ];


    if (!information) {
        return;
    }


    setText(
        "#engineeringName",
        information.name
    );


    renderSkillPills(
        information.prioritySkills,
        "prioritySkills"
    );


    renderSkillPills(
        information.emergingSkills,
        "emergingSkills"
    );

}


/* =========================================================
   13. SKILL PILLS
   ========================================================= */

function renderSkillPills(
    skillIds,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!skillIds?.length) {

        container.innerHTML =
            `<span class="empty-state">
                No skills mapped yet.
             </span>`;

        return;

    }


    skillIds.forEach(
        skillId => {

            const skill =
                APP.data.skills
                    ?.skills?.[
                        skillId
                    ];


            if (!skill) {
                return;
            }


            const pill =
                document.createElement(
                    "span"
                );


            pill.className =
                `skill-pill priority-${skill.priority}`;


            pill.textContent =
                skill.name;


            pill.title =
                skill.description;


            container.appendChild(
                pill
            );

        }
    );

}


/* =========================================================
   14. RECOMMENDATION ENGINE
   ========================================================= */

function generateRecommendations() {

    const country =
        APP.data.countries
            ?.countries?.[
                APP.state.country
            ];


    const role =
        APP.data.skills
            ?.engineeringRoles?.[
                APP.state.engineeringRole
            ];


    if (
        !country ||
        !role
    ) {
        return [];
    }


    const skillDatabase =
        APP.data.skills
            ?.skills || {};


    const recommendations = [];


    const allSkills = [

        ...(role.prioritySkills || []),

        ...(role.emergingSkills || [])

    ];


    allSkills.forEach(
        skillId => {

            const skill =
                skillDatabase[
                    skillId
                ];


            if (!skill) {
                return;
            }


            const category =
                skill.category;


            const countrySkill =
                getCountrySkillValue(
                    country,
                    skillId
                );


            let score;


            if (
                typeof countrySkill ===
                "number"
            ) {

                score =
                    100 -
                    countrySkill;

            } else {

                score =
                    priorityToScore(
                        skill.priority
                    );

            }


            recommendations.push({

                id:
                    skillId,

                name:
                    skill.name,

                category,

                priority:
                    skill.priority,

                gap:
                    score,

                description:
                    skill.description,

                intervention:
                    skill.recommendedIntervention,

                roles:
                    skill.engineeringRoles

            });

        }
    );


    return recommendations
        .sort(
            (
                a,
                b
            ) =>
                b.gap -
                a.gap
        );

}


/* =========================================================
   15. COUNTRY SKILL VALUE
   ========================================================= */

function getCountrySkillValue(
    country,
    skillId
) {

    const mapping = {

        ai_literacy:
            "ai",

        generative_ai:
            "ai",

        agentic_ai:
            "ai",

        machine_learning:
            "ai",

        data_literacy:
            "data",

        data_analytics:
            "data",

        data_engineering:
            "data",

        cloud_computing:
            "cloud",

        platform_engineering:
            "cloud",

        devops:
            "cloud",

        cybersecurity:
            "cybersecurity",

        secure_by_design:
            "cybersecurity",

        automation:
            "automation",

        robotics:
            "automation",

        digital_twins:
            "automation",

        sustainability:
            "sustainability",

        climate_analytics:
            "sustainability",

        systems_thinking:
            "systemsThinking"

    };


    const countryField =
        mapping[skillId];


    if (!countryField) {
        return null;
    }


    return country
        ?.skills?.[
            countryField
        ] ?? null;

}


/* =========================================================
   16. PRIORITY → SCORE
   ========================================================= */

function priorityToScore(
    priority
) {

    const scores = {

        critical:
            90,

        high:
            70,

        emerging:
            45

    };


    return scores[
        priority
    ] || 50;

}


/* =========================================================
   17. RENDER RECOMMENDATIONS
   ========================================================= */

function updateRecommendations() {

    const recommendations =
        generateRecommendations();


    renderRecommendations(
        recommendations
    );


    updateRecommendationSummary(
        recommendations
    );

}


/* =========================================================
   18. RECOMMENDATION CARDS
   ========================================================= */

function renderRecommendations(
    recommendations
) {

    const container =
        $(
            "#recommendationList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !recommendations.length
    ) {

        container.innerHTML = `

            <div class="empty-state">

                No recommendations
                available yet.

            </div>

        `;

        return;

    }


    recommendations
        .slice(0, 8)
        .forEach(
            recommendation => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "recommendation-card";


                const priorityLabel =
                    getPriorityLabel(
                        recommendation.priority
                    );


                card.innerHTML = `

                    <div class="recommendation-top">

                        <span class="recommendation-category">
                            ${escapeHTML(
                                recommendation.category
                            )}
                        </span>

                        <span class="
                            recommendation-priority
                            priority-${recommendation.priority}
                        ">
                            ${priorityLabel}
                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(
                            recommendation.name
                        )}
                    </h3>


                    <p>
                        ${escapeHTML(
                            recommendation.description
                        )}
                    </p>


                    <div class="recommendation-gap">

                        <span>
                            Priority signal
                        </span>

                        <strong>
                            ${recommendation.gap}
                        </strong>

                    </div>


                    <div class="recommendation-action">

                        <span>
                            Recommended intervention
                        </span>

                        <strong>
                            ${escapeHTML(
                                recommendation.intervention
                            )}
                        </strong>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );

}


/* =========================================================
   19. RECOMMENDATION SUMMARY
   ========================================================= */

function updateRecommendationSummary(
    recommendations
) {

    const critical =
        recommendations.filter(
            item =>
                item.priority ===
                "critical"
        ).length;


    const high =
        recommendations.filter(
            item =>
                item.priority ===
                "high"
        ).length;


    const emerging =
        recommendations.filter(
            item =>
                item.priority ===
                "emerging"
        ).length;


    setText(
        "#criticalSkillCount",
        critical
    );


    setText(
        "#highSkillCount",
        high
    );


    setText(
        "#emergingSkillCount",
        emerging
    );


    const top =
        recommendations[0];


    if (top) {

        setText(
            "#topRecommendation",
            top.name
        );

    }

}


/* =========================================================
   20. PRIORITY LABEL
   ========================================================= */

function getPriorityLabel(
    priority
) {

    const labels = {

        critical:
            "PRIORITY NOW",

        high:
            "BUILD NEXT",

        emerging:
            "EXPERIMENT"

    };


    return (
        labels[priority] ||
        "REVIEW"
    );

}


/* =========================================================
   21. COUNTRY CHART UPDATE
   ========================================================= */

function updateCountryCharts(
    countryCode
) {

    if (
        !window.EngineeringCharts
    ) {
        return;
    }


    window.EngineeringCharts
        .updateCountry(
            countryCode
        );

}


/* =========================================================
   22. CAREER CHART UPDATE
   ========================================================= */

function updateCareerChart(
    role
) {

    if (
        !window.EngineeringCharts
    ) {
        return;
    }


    window.EngineeringCharts
        .updateCareer(
            role
        );

}


/* =========================================================
   23. NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navigation =
        $$(
            "[data-view]"
        );


    navigation.forEach(
        item => {

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const view =
                        item.dataset.view;


                    switchView(
                        view
                    );

                }
            );

        }
    );

}


/* =========================================================
   24. SWITCH VIEW
   ========================================================= */

function switchView(
    view
) {

    APP.state.activeView =
        view;


    $$(
        "[data-view]"
    ).forEach(
        item => {

            item.classList.toggle(
                "active",
                item.dataset.view ===
                view
            );

        }
    );


    $$(
        "[data-section]"
    ).forEach(
        section => {

            section.classList.toggle(
                "active",
                section.dataset.section ===
                view
            );

        }
    );


    const target =
        $(
            `[data-section="${view}"]`
        );


    if (target) {

        target.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });

    }

}


/* =========================================================
   25. DATA SOURCE DISPLAY
   ========================================================= */

function renderSources() {

    const container =
        $(
            "#sourceList"
        );


    if (!container) {
        return;
    }


    const sources =
        APP.data.countries
            ?.sources;


    if (!sources) {
        return;
    }


    container.innerHTML = "";


    Object.values(
        sources
    ).forEach(
        source => {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "source-card";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(
                            source.name
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            source.organization
                        )}
                    </span>

                </div>


                <p>
                    ${escapeHTML(
                        source.relevance
                    )}
                </p>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   26. ESCAPE HTML
   ========================================================= */

function escapeHTML(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(
        value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   27. ANIMATED NUMBER
   ========================================================= */

function animateNumber(
    element,
    target,
    duration = 900
) {

    if (!element) {
        return;
    }


    if (
        typeof target !==
        "number"
    ) {

        element.textContent =
            "—";

        return;

    }


    const start =
        performance.now();


    function frame(
        timestamp
    ) {

        const progress =
            Math.min(
                (
                    timestamp -
                    start
                ) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                target *
                eased
            );


        element.textContent =
            value;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                frame
            );

        }

    }


    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   28. INTERSECTION OBSERVER
   ========================================================= */

function initializeAnimations() {

    const elements =
        $$(
            "[data-animate]"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   29. MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const button =
        $(
            "#mobileMenuButton"
        );


    const menu =
        $(
            "#mobileMenu"
        );


    if (
        !button ||
        !menu
    ) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "open"
            );


            button.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   30. SEARCH
   ========================================================= */

function initializeSearch() {

    const input =
        $(
            "#skillSearch"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            $$(".recommendation-card")
                .forEach(
                    card => {

                        const text =
                            card.textContent
                                .toLowerCase();


                        card.style.display =
                            !query ||
                            text.includes(
                                query
                            )
                                ? ""
                                : "none";

                    }
                );

        }
    );

}


/* =========================================================
   31. RESET FILTERS
   ========================================================= */

function resetFilters() {

    APP.state.country =
        "ID";

    APP.state.engineeringRole =
        "software";


    const countrySelector =
        $(
            "#countrySelector"
        );


    const engineeringSelector =
        $(
            "#engineeringSelector"
        );


    if (countrySelector) {

        countrySelector.value =
            "ID";

    }


    if (engineeringSelector) {

        engineeringSelector.value =
            "software";

    }


    selectCountry(
        "ID"
    );


    selectEngineeringRole(
        "software"
    );

}


/* =========================================================
   32. RESET BUTTON
   ========================================================= */

function initializeReset() {

    const button =
        $(
            "#resetFilters"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        resetFilters
    );

}


/* =========================================================
   33. DATA STATUS
   ========================================================= */

function updateDataStatus() {

    const element =
        $(
            "#dataStatus"
        );


    if (!element) {
        return;
    }


    element.textContent =
        "Research framework loaded";


    element.classList.add(
        "loaded"
    );

}


/* =========================================================
   34. INITIALIZE APP
   ========================================================= */

async function initializeApp() {

    console.log(
        "Initializing Engineering Futures..."
    );


    const loaded =
        await loadApplicationData();


    if (!loaded) {
        return;
    }


    initializeCountrySelector();

    initializeEngineeringSelector();

    initializeNavigation();

    initializeMobileMenu();

    initializeSearch();

    initializeReset();

    initializeAnimations();

    renderSources();


    selectCountry(
        APP.state.country
    );


    selectEngineeringRole(
        APP.state.engineeringRole
    );


    updateDataStatus();


    console.log(
        "Engineering Futures initialized."
    );

}


/* =========================================================
   35. DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}


/* =========================================================
   36. PUBLIC APP API
   ========================================================= */

window.EngineeringFutures = {

    state:
        APP.state,

    data:
        APP.data,

    selectCountry,

    selectEngineeringRole,

    generateRecommendations,

    resetFilters

};


/* =========================================================
   END OF APP.JS
   ========================================================= */
