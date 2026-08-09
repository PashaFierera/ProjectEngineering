/* =========================================================
   ENGINEERING FUTURES 2026
   charts.js
   Chart.js visualizations
   ========================================================= */


/* =========================================================
   01. CHART.JS LOADER
   ========================================================= */

function loadChartJS() {

    return new Promise((resolve, reject) => {

        if (window.Chart) {
            resolve(window.Chart);
            return;
        }

        const existing =
            document.querySelector(
                'script[data-chartjs]'
            );

        if (existing) {

            existing.addEventListener(
                "load",
                () => resolve(window.Chart)
            );

            existing.addEventListener(
                "error",
                reject
            );

            return;
        }

        const script =
            document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";

        script.async = true;

        script.dataset.chartjs = "true";

        script.onload =
            () => resolve(window.Chart);

        script.onerror =
            () => reject(
                new Error(
                    "Unable to load Chart.js"
                )
            );

        document.head.appendChild(
            script
        );

    });

}


/* =========================================================
   02. DEFAULT VISUALIZATION DATA
   ========================================================= */

/*
 * IMPORTANT
 *
 * These are PLACEHOLDER / DEMONSTRATION values.
 *
 * They are NOT official LinkedIn, WEF, UNESCO,
 * OECD, GitHub, IEEE, or Stack Overflow measurements.
 *
 * We will replace these with documented values
 * and source metadata from countries.json
 * and skills.json.
 */

const demoCountryData = {

    Indonesia: {
        readiness: 61,
        digital: 58,
        ai: 52,
        cloud: 55,
        automation: 57,
        sustainability: 63
    },

    Singapore: {
        readiness: 82,
        digital: 84,
        ai: 81,
        cloud: 86,
        automation: 83,
        sustainability: 78
    },

    India: {
        readiness: 73,
        digital: 78,
        ai: 74,
        cloud: 72,
        automation: 71,
        sustainability: 64
    },

    Japan: {
        readiness: 76,
        digital: 72,
        ai: 68,
        cloud: 67,
        automation: 84,
        sustainability: 79
    },

    "United States": {
        readiness: 88,
        digital: 91,
        ai: 94,
        cloud: 92,
        automation: 86,
        sustainability: 77
    },

    Germany: {
        readiness: 81,
        digital: 78,
        ai: 74,
        cloud: 76,
        automation: 88,
        sustainability: 91
    },

    "South Korea": {
        readiness: 83,
        digital: 86,
        ai: 82,
        cloud: 79,
        automation: 92,
        sustainability: 72
    },

    Malaysia: {
        readiness: 65,
        digital: 66,
        ai: 59,
        cloud: 62,
        automation: 64,
        sustainability: 67
    },

    Thailand: {
        readiness: 62,
        digital: 63,
        ai: 55,
        cloud: 58,
        automation: 61,
        sustainability: 68
    }

};


/* =========================================================
   03. CHART COLORS
   ========================================================= */

const chartColors = {

    blue:
        "#5963a8",

    blueDark:
        "#293379",

    red:
        "#d94a48",

    yellow:
        "#f2c34d",

    orange:
        "#ff9b45",

    green:
        "#899d50",

    lettuce:
        "#a6af32",

    white:
        "#f7f7f4",

    muted:
        "#858995",

    grid:
        "rgba(255,255,255,0.07)"

};


/* =========================================================
   04. GLOBAL CHART DEFAULTS
   ========================================================= */

function configureChartDefaults() {

    if (!window.Chart) {
        return;
    }

    Chart.defaults.font.family =
        "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

    Chart.defaults.color =
        chartColors.muted;

    Chart.defaults.borderColor =
        chartColors.grid;

    Chart.defaults.animation.duration =
        1000;

    Chart.defaults.animation.easing =
        "easeOutQuart";

}


/* =========================================================
   05. RADAR CHART
   ========================================================= */

function createCountryRadarChart() {

    const canvas =
        document.getElementById(
            "countryRadarChart"
        );

    if (!canvas) {
        return null;
    }


    const indonesia =
        demoCountryData.Indonesia;

    const singapore =
        demoCountryData.Singapore;

    const usa =
        demoCountryData["United States"];


    return new Chart(
        canvas,
        {

            type: "radar",

            data: {

                labels: [

                    "Digital Skills",
                    "AI",
                    "Cloud",
                    "Automation",
                    "Sustainability"

                ],

                datasets: [

                    {
                        label:
                            "Indonesia",

                        data: [

                            indonesia.digital,
                            indonesia.ai,
                            indonesia.cloud,
                            indonesia.automation,
                            indonesia.sustainability

                        ],

                        borderColor:
                            chartColors.green,

                        backgroundColor:
                            "rgba(96,120,41,0.16)",

                        borderWidth:
                            2,

                        pointRadius:
                            3,

                        pointHoverRadius:
                            5

                    },

                    {
                        label:
                            "Singapore",

                        data: [

                            singapore.digital,
                            singapore.ai,
                            singapore.cloud,
                            singapore.automation,
                            singapore.sustainability

                        ],

                        borderColor:
                            chartColors.yellow,

                        backgroundColor:
                            "rgba(229,163,0,0.08)",

                        borderWidth:
                            2,

                        pointRadius:
                            3,

                        pointHoverRadius:
                            5

                    },

                    {
                        label:
                            "United States",

                        data: [

                            usa.digital,
                            usa.ai,
                            usa.cloud,
                            usa.automation,
                            usa.sustainability

                        ],

                        borderColor:
                            chartColors.blue,

                        backgroundColor:
                            "rgba(41,51,121,0.08)",

                        borderWidth:
                            2,

                        pointRadius:
                            3,

                        pointHoverRadius:
                            5

                    }

                ]

            },

            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                scales: {

                    r: {

                        min:
                            0,

                        max:
                            100,

                        beginAtZero:
                            true,

                        grid: {

                            color:
                                chartColors.grid

                        },

                        angleLines: {

                            color:
                                chartColors.grid

                        },

                        pointLabels: {

                            color:
                                chartColors.white,

                            font: {

                                size:
                                    11,

                                weight:
                                    "500"

                            }

                        },

                        ticks: {

                            display:
                                false

                        }

                    }

                },

                plugins: {

                    legend: {

                        position:
                            "bottom",

                        labels: {

                            color:
                                chartColors.white,

                            usePointStyle:
                                true,

                            pointStyle:
                                "circle",

                            padding:
                                20

                        }

                    },

                    tooltip: {

                        backgroundColor:
                            "#181c27",

                        borderColor:
                            "rgba(255,255,255,0.12)",

                        borderWidth:
                            1,

                        titleColor:
                            chartColors.white,

                        bodyColor:
                            chartColors.muted,

                        padding:
                            12

                    }

                }

            }

        }

    );

}


/* =========================================================
   06. SKILLS GAP BAR CHART
   ========================================================= */

function createGapChart() {

    const canvas =
        document.getElementById(
            "gapChart"
        );

    if (!canvas) {
        return null;
    }


    const skills = [

        "AI Literacy",
        "Cloud",
        "Cybersecurity",
        "Data",
        "Automation",
        "Systems Thinking"

    ];


    /*
     * Demonstration values only.
     *
     * Interpreted as an illustrative
     * capability-gap index.
     */

    const indonesiaGap = [
        42,
        37,
        34,
        29,
        31,
        23
    ];

    const benchmarkGap = [
        20,
        18,
        17,
        15,
        16,
        13
    ];


    return new Chart(
        canvas,
        {

            type:
                "bar",

            data: {

                labels:
                    skills,

                datasets: [

                    {
                        label:
                            "Illustrative Indonesia Gap",

                        data:
                            indonesiaGap,

                        backgroundColor:
                            chartColors.red,

                        borderRadius:
                            7,

                        barThickness:
                            16

                    },

                    {
                        label:
                            "Illustrative Benchmark",

                        data:
                            benchmarkGap,

                        backgroundColor:
                            chartColors.blue,

                        borderRadius:
                            7,

                        barThickness:
                            16

                    }

                ]

            },

            options: {

                indexAxis:
                    "y",

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                scales: {

                    x: {

                        beginAtZero:
                            true,

                        max:
                            50,

                        grid: {

                            color:
                                chartColors.grid

                        },

                        ticks: {

                            color:
                                chartColors.muted

                        }

                    },

                    y: {

                        grid: {

                            display:
                                false

                        },

                        ticks: {

                            color:
                                chartColors.white

                        }

                    }

                },

                plugins: {

                    legend: {

                        position:
                            "bottom",

                        labels: {

                            color:
                                chartColors.white,

                            usePointStyle:
                                true,

                            padding:
                                18

                        }

                    },

                    tooltip: {

                        backgroundColor:
                            "#181c27",

                        titleColor:
                            chartColors.white,

                        bodyColor:
                            chartColors.muted,

                        padding:
                            12

                    }

                }

            }

        }

    );

}


/* =========================================================
   07. COUNTRY READINESS BAR CHART
   ========================================================= */

function createReadinessChart() {

    const canvas =
        document.getElementById(
            "readinessChart"
        );

    if (!canvas) {
        return null;
    }


    const countries =
        Object.keys(
            demoCountryData
        );


    const values =
        countries.map(
            country =>
                demoCountryData[country]
                    .readiness
        );


    return new Chart(
        canvas,
        {

            type:
                "bar",

            data: {

                labels:
                    countries,

                datasets: [

                    {
                        label:
                            "Illustrative Readiness Index",

                        data:
                            values,

                        backgroundColor:
                            countries.map(
                                country => {

                                    if (
                                        country ===
                                        "Indonesia"
                                    ) {
                                        return chartColors.green;
                                    }

                                    if (
                                        country ===
                                        "Singapore"
                                    ) {
                                        return chartColors.yellow;
                                    }

                                    if (
                                        country ===
                                        "United States"
                                    ) {
                                        return chartColors.blue;
                                    }

                                    return chartColors.blueDark;

                                }
                            ),

                        borderRadius:
                            8,

                        borderSkipped:
                            false

                    }

                ]

            },

            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        ticks: {

                            color:
                                chartColors.muted,

                            maxRotation:
                                45,

                            minRotation:
                                35

                        }

                    },

                    y: {

                        min:
                            0,

                        max:
                            100,

                        grid: {

                            color:
                                chartColors.grid

                        },

                        ticks: {

                            color:
                                chartColors.muted

                        }

                    }

                },

                plugins: {

                    legend: {

                        display:
                            false

                    },

                    tooltip: {

                        backgroundColor:
                            "#181c27",

                        titleColor:
                            chartColors.white,

                        bodyColor:
                            chartColors.muted,

                        padding:
                            12

                    }

                }

            }

        }

    );

}


/* =========================================================
   08. CHART INSTANCE STORAGE
   ========================================================= */

const chartInstances = {};


/* =========================================================
   09. INITIALIZE ALL CHARTS
   ========================================================= */

async function initCharts() {

    try {

        await loadChartJS();

        configureChartDefaults();


        chartInstances.radar =
            createCountryRadarChart();


        chartInstances.gap =
            createGapChart();


        chartInstances.readiness =
            createReadinessChart();


        console.log(
            "Engineering Futures charts initialized."
        );


    } catch (error) {

        console.error(
            "Chart initialization failed:",
            error
        );

    }

}


/* =========================================================
   10. COUNTRY CHANGE HANDLER
   ========================================================= */

document.addEventListener(
    "countrySelected",
    event => {

        const country =
            event.detail.country;

        updateChartsForCountry(
            country
        );

    }
);


/* =========================================================
   11. UPDATE RADAR BY COUNTRY
   ========================================================= */

function updateChartsForCountry(
    countryCode
) {

    /*
     * This maps the country selector
     * to the demo data.
     *
     * The real mapping will be loaded
     * from countries.json later.
     */

    const codeToName = {

        ID:
            "Indonesia",

        SG:
            "Singapore",

        IN:
            "India",

        JP:
            "Japan",

        US:
            "United States",

        DE:
            "Germany",

        KR:
            "South Korea",

        MY:
            "Malaysia",

        TH:
            "Thailand"

    };


    const countryName =
        codeToName[countryCode];


    const data =
        demoCountryData[
            countryName
        ];


    if (!data) {
        return;
    }


    const radar =
        chartInstances.radar;


    if (!radar) {
        return;
    }


    /*
     * Add selected country
     * as a highlighted dataset.
     */

    const selectedDataset = {

        label:
            countryName,

        data: [

            data.digital,
            data.ai,
            data.cloud,
            data.automation,
            data.sustainability

        ],

        borderColor:
            chartColors.orange,

        backgroundColor:
            "rgba(238,115,2,0.12)",

        borderWidth:
            3,

        pointRadius:
            4,

        pointHoverRadius:
            6

    };


    /*
     * Keep the chart readable by
     * replacing the first dataset.
     */

    radar.data.datasets[0] =
        selectedDataset;


    radar.update();

}


/* =========================================================
   12. CAREER CHANGE HANDLER
   ========================================================= */

document.addEventListener(
    "careerSelected",
    event => {

        const role =
            event.detail.role;

        updateGapChartForCareer(
            role
        );

    }
);


/* =========================================================
   13. CAREER GAP UPDATE
   ========================================================= */

function updateGapChartForCareer(
    role
) {

    const chart =
        chartInstances.gap;

    if (!chart) {
        return;
    }


    /*
     * Demonstration mappings.
     *
     * Replace with skills.json.
     */

    const careerGaps = {

        software: [
            42,
            37,
            34,
            29,
            31,
            23
        ],

        mechanical: [
            28,
            24,
            21,
            31,
            18,
            25
        ],

        civil: [
            25,
            21,
            18,
            29,
            24,
            20
        ],

        electrical: [
            32,
            28,
            30,
            25,
            16,
            22
        ],

        industrial: [
            35,
            27,
            22,
            18,
            15,
            17
        ],

        chemical: [
            24,
            20,
            18,
            27,
            17,
            24
        ],

        environmental: [
            30,
            22,
            17,
            25,
            21,
            18
        ],

        biomedical: [
            34,
            24,
            26,
            20,
            18,
            23
        ]

    };


    const values =
        careerGaps[role];


    if (!values) {
        return;
    }


    chart.data.datasets[0].data =
        values;

    chart.update();

}


/* =========================================================
   14. RESPONSIVE CHART RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    debounceCharts
);


let chartResizeTimeout;

function debounceCharts() {

    clearTimeout(
        chartResizeTimeout
    );

    chartResizeTimeout =
        setTimeout(
            () => {

                Object.values(
                    chartInstances
                ).forEach(chart => {

                    if (chart) {
                        chart.resize();
                    }

                });

            },
            150
        );

}


/* =========================================================
   15. START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initCharts
    );

} else {

    initCharts();

}


/* =========================================================
   16. PUBLIC API
   ========================================================= */

window.EngineeringCharts = {

    instances:
        chartInstances,

    updateCountry:
        updateChartsForCountry,

    updateCareer:
        updateGapChartForCareer

};


/* =========================================================
   END OF CHARTS.JS
   ========================================================= */
