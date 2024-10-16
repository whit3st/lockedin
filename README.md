# LockedIn

### Description

A tool for comparing resumes and job descriptions on LinkedIn using AI for free.  

Extension uses [Open Router](https://openrouter.ai) API which host multiple different LLM models.
Some of those models have free API for testing and using. We are basically using these free LLM's to compare your resume and job description.

### Installation

You need to build this extension on your local machine to use.

1. Clone the repository with `git clone [repo URL]`
2. Install the dependencies with `pnpm install`
3. Run `pnpm build`

### Requirements

1. OpenRouter API key.
2. A resume in text format.
3. A LLM model name from OpenRouter.

### How Can I Install this on X Browser?

<details>
  <summary>Chrome</summary>

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the folder containing the extension's `manifest.json` file.
5. The extension should now appear in your extension list.

</details>

<details>
  <summary>Firefox</summary>

1. Open Firefox and go to `about:debugging`.
2. Click on **This Firefox** in the left sidebar.
3. Click **Load Temporary Add-on**.
4. Choose the `manifest.json` file from the extension's directory.
5. The extension will be temporarily loaded and will stay active until you restart Firefox.

</details>

<details>
  <summary>Microsoft Edge</summary>

1. Open Edge and navigate to `edge://extensions/`.
2. Enable **Developer Mode** (toggle in the bottom left).
3. Click **Load unpacked**.
4. Select the folder containing the extension's `manifest.json` file.
5. The extension should now appear in your extension list.

</details>

<details>
  <summary>Brave</summary>

1. Open Brave and go to `brave://extensions/`.
2. Enable **Developer Mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the folder containing the extension's `manifest.json` file.
5. The extension will appear in the list of extensions.

</details>

<details>
  <summary>Opera</summary>

1. Open Opera and navigate to `opera://extensions/`.
2. Enable **Developer Mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the folder containing the extension's `manifest.json` file.
5. The extension will be loaded in Opera.

</details>

<details>
  <summary>Vivaldi</summary>

1. Open Vivaldi and go to `vivaldi://extensions/`.
2. Enable **Developer Mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the folder with your `manifest.json` file.
5. The extension will appear in your extension list.

</details>

### Usage

1. Go to any job posting on LinkedIn
2. You will see two buttons next to **Apply** and **Save** called **Compare with LockedIn** and **Reset Data**. (*See screnshot section*)
3. You can add or change your data or see your current data. (*Like youR API key or your selected LLM model*)
4. Click **Compare with LockedIn** button, after few seconds, you will see your comparison.

### Screenshot

![screenshot of the buttons](./public//screenshots/screenshot_1.png)

### Development

```
git clone [repo URL]
cd lockedin
pnpm install
pnpm start
```

### Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
