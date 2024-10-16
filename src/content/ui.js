import {
    fetchComparisonData,
    getJobDescription,
    setCredentials,
    getCredentials,
} from "./functions";
import loadingAnimation from "../loading-anim.gif";
import SYSTEM_PROMPT from "../system-prompt.yaml";

const createButton = (id, text, className, onClick) => {
    const existingButton = document.getElementById(id);
    if (existingButton) {
        return existingButton;
    }

    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
};

const getTargetElement = (isIndividualJobPage) => {
    return isIndividualJobPage
        ? document.querySelector(".jobs-s-apply.jobs-s-apply--fadein.inline-flex.mr2")
        : document.querySelector(
              ".jobs-save-button.artdeco-button.artdeco-button--secondary.artdeco-button--3"
          );
};

const getResultsTargetElement = (isIndividualJobPage) => {
    return isIndividualJobPage
        ? document.querySelector(
              ".job-details-jobs-unified-top-card__primary-description-container"
          ).parentElement
        : document.querySelector(
              ".relative.job-details-jobs-unified-top-card__container--two-pane"
          );
};

const renderButton = (id, text, className, onClick, isIndividualJobPage) => {
    const targetElement = getTargetElement(isIndividualJobPage);

    if (targetElement) {
        const button = createButton(id, text, className, onClick);
        if (!document.getElementById(id)) {
            targetElement.parentElement.appendChild(button);
        }
        console.log(`Rendering ${id}`, isIndividualJobPage);
    } else {
        console.log("Parent element not found");
        setTimeout(() => renderButton(id, text, className, onClick, isIndividualJobPage), 1000);
    }
};

const renderResetButton = (isIndividualJobPage = false) => {
    renderButton(
        "reset-button",
        "Reset Data",
        "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view ml2",
        () => {
            if (window.confirm("Are you sure you want to reset?")) {
                setCredentials();
            }
        },
        isIndividualJobPage
    );
};

const renderCompareButton = (isIndividualJobPage = false) => {
    renderButton(
        "compare-button",
        "Compare with LockedIn",
        "artdeco-button artdeco-button--premium artdeco-button--3 ml2",
        () => renderResults(isIndividualJobPage),
        isIndividualJobPage
    );
};

const renderResults = async (isIndividualJobPage = false) => {
    const { APIKEY, RESUME, MODEL_NAME } = getCredentials();
    const JOB_DESCRIPTION = getJobDescription();

    /*
     * CHECK IF TARGET DOM ELEMENT EXISTS
     */

    const targetElement = getResultsTargetElement(isIndividualJobPage);

    if (!targetElement) {
        console.log("Target element not found");
        setTimeout(() => renderResults(isIndividualJobPage), 1000);
        return;
    }

    /*
     * CHECK IF CONTAINER EXISTS
     * IF EXISTS REMOVE IT TO PREVENT DUPLICATE
     */

    const existingContainer = targetElement.querySelector("#lockedin-results-container");

    if (existingContainer) {
        existingContainer.remove();
    }

    const container = document.createElement("div");
    container.id = "lockedin-results-container";
    container.classList =
        "job-details-top-card-tip__tip-content-container job-details-top-card-tip__tip-container--premium mt5";
    container.style =
        "border-radius: 0.8rem; background-color: var(--color-background-accent-strong-1); border: 1px solid #e2e8f0; flex-direction: column !important; align-items: start !important; list-style: none !important; gap: 0.8rem !important; padding: 1.5rem !important;";
    targetElement.appendChild(container);

    /*
     * CHECK IF CREDENTIALS ARE SET
     */

    const errorMessageParag = (reason) => {
        return `<p style='color: red; font-weight: 500; align-self: center;'>Please set your ${reason} in the settings.</p>`;
    };

    if (!APIKEY) {
        container.innerHTML = errorMessageParag("API key");
        return;
    } else if (!RESUME) {
        container.innerHTML = errorMessageParag("resume");
        return;
    } else if (!MODEL_NAME) {
        container.innerHTML = errorMessageParag("model name");
        return;
    }

    /*
     * LOADING ANIMATION
     */

    // text
    const loadingTextElement = document.createElement("p");
    loadingTextElement.textContent = "Loading...";
    loadingTextElement.style =
        "margin-top: 1rem; margin-left: auto; margin-right: auto; font-weight: 500; color: black; font-size: 18px !important;";
    container.appendChild(loadingTextElement);

    // animation
    const loadingAnimationElement = document.createElement("img");
    loadingAnimationElement.src = loadingAnimation;
    loadingAnimationElement.style =
        "width: 80px; height: 80px; margin-left: auto; margin-right: auto;";
    container.appendChild(loadingAnimationElement);

    /*
     *  FETCH DATA
     */

    try {
        const comparisonData = await fetchComparisonData(
            APIKEY,
            MODEL_NAME,
            RESUME,
            JOB_DESCRIPTION,
            JSON.stringify(SYSTEM_PROMPT)
        );
        loadingAnimationElement.remove();
        loadingTextElement.remove();
        container.innerHTML = comparisonData;
    } catch (e) {
        loadingAnimationElement.remove();
        loadingTextElement.remove();
        container.textContent = "Error occurred: " + e.message;
        console.error(e);
    }
};

export { renderResetButton, renderCompareButton };
