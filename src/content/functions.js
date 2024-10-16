/**
 * @description Retrieves data from the Open Router API using the provided API key, model name, and resume content.
 *
 * @param {string} API_KEY - The API key used for authentication.
 * @param {string} MODEL_NAME - The name of the model to use for the API request.
 * @param {string} RESUME - The contents of the user's resume.
 * @param {string} JOB_DESCRIPTION - The contents of the current job description.
 * @param {string} SYSTEM_PROMPT - The system prompt to be used in the API request.
 * @return {Promise<string>} A promise that resolves to the content of the API response.
 */
const fetchComparisonData = async (API_KEY, MODEL_NAME, RESUME, JOB_DESCRIPTION, SYSTEM_PROMPT) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: "user",
                        content: `My Resume:\n ${RESUME}\n Job Description:\n ${JOB_DESCRIPTION}`,
                    },
                ],
            }),
        });
        const data = await response.json();

        if (data.error) {
            const error = JSON.parse(data.error.message).error.message;
            return error;
        } else {
            return data.choices[0].message.content;
        }
    } catch (e) {
        console.error(e);
        return "Error occurred";
    }
};

/**
 * @description
 * Retrieves the job description from the HTML element with the ID "job-details"
 *
 * @return {string} The job description.
 */
const getJobDescription = () => {
    const jobDetailsElement = document.getElementById("job-details");
     const jobDetailsContentAsText = jobDetailsElement.innerText;
     return jobDetailsContentAsText.replace(/\n/g, "");
};


/**
 * Sets the API key, resume, and model name in the browser's local storage.
 * Prompts the user to enter the values if they are not already set.
 *
 * There are some checks to ensure that the values are valid:
 * - API keys must be 64 characters long and start with "sk-or-v1-"
 * - Resume must be at least 400 characters long
 * - Model name must not be empty, obviously.
 *
 *
 * @return {void}
 */
const setCredentials = () => {
    const APIKEY = prompt("Please set your API Key", localStorage.getItem("user-api-key") || "");
    const RESUME = prompt("Please set your resume", localStorage.getItem("user-resume") || "");
    const MODEL_NAME = prompt(
        "Please set your model name",
        localStorage.getItem("model-name") || ""
    );

    const APIKEYIsValid = APIKEY && APIKEY.trim().match(/^sk-or-v1-[0-9a-f]{64}$/);
    const RESUMEIsValid = RESUME && RESUME.trim().length >= 400;
    const MODEL_NAMEIsValid = MODEL_NAME && MODEL_NAME.trim().length > 0;

    if (!APIKEYIsValid || !RESUMEIsValid || !MODEL_NAMEIsValid) {
        alert(
            `
            ${!APIKEYIsValid ? "Invalid API key." : "API key is valid."}
            ${!RESUMEIsValid ? "Invalid resume." : "Resume is valid."}
            ${!MODEL_NAMEIsValid ? "Invalid model name." : "Model name is valid."}`
        );
    }
    APIKEYIsValid && localStorage.setItem("user-api-key", APIKEY);
    RESUMEIsValid && localStorage.setItem("user-resume", RESUME);
    MODEL_NAMEIsValid && localStorage.setItem("model-name", MODEL_NAME);
};

/**
 * Retrieves the API key, resume, and model name from the browser's local storage.
 *
 * @typedef {Object} Credentials
 * @property {string|null} APIKEY - The user's API key
 * @property {string|null} RESUME - The user's resume
 * @property {string|null} MODEL_NAME - The selected model name
 *
 * @returns {Credentials} An object containing:
 *   - APIKEY: The user's API key (string or null)
 *   - RESUME: The user's resume (string or null)
 *   - MODEL_NAME: The selected model name (string or null)
 */
const getCredentials = () => {
    const APIKEY = localStorage.getItem("user-api-key");
    const RESUME = localStorage.getItem("user-resume");
    const MODEL_NAME = localStorage.getItem("model-name");
    return { APIKEY, RESUME, MODEL_NAME };
};

/**
 * Removes an element with the given id if it exists in the DOM.
 * @param {string} id - The id of the element to remove
 * @returns {void}
 */
const removeContainerIfExists = (id) => {
    const existingContainer = document.querySelector(`#${id}`);
    if (existingContainer) {
        console.log(`Removing ${id}`);
        existingContainer.remove();
    } else {
        console.log(`No ${id} to remove`);
    }
};

/**
 * Returns a debounced version of the given function.
 * The returned function will only call the underlying function
 * after the specified delay has passed since the last time it was called.
 *
 * @param {function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {function} A debounced version of the function
 */
const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

export {
    fetchComparisonData,
    getJobDescription,
    setCredentials,
    getCredentials,
    removeContainerIfExists,
    debounce,
};
