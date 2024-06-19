<a id="readme-top"></a>

# Generate Titles and Hashtags for Your Video

## 👋 Introduction

You can count on this app to whip up a snazzy topic, a catchy title, and some trending hashtags for any video you fancy. Whether you're a content creator always on the hunt for a killer video title and hashtags, this app's got you covered. It's a quick and easy way to get the job done in a matter of seconds!

📌 Check out the [Demo](https://generate-titles-and-hashtags-vercel-client.vercel.app/)! (_Note: This simplified version of the app does not include the video upload form_)

<div align="center">
  <a href="https://generate-titles-and-hashtags-vercel-client.vercel.app/">
    <img src="public/generate-titles-hashtags-app.JPG" alt="search result screenshot" style="border: 1px solid black;" />
  </a>
</div>

### Built With

- [Twelve Labs API](https://docs.twelvelabs.io/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://react.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Getting Started

### Step 1. Generate Twelve Labs API Key

Visit [Twelve Labs Playground](https://playground.twelvelabs.io/) to generate your API Key

- Upon signing up, you'll receive free credits to index up to 10 hours of video content!

### Step 2 (Option 1). Start the App on Replit

1. Click the button below

   [![Run on Replit](https://replit.com/badge/github/mrnkim/generate-titles-and-hashtags)](https://replit.com/new/github/mrnkim/generate-titles-and-hashtags)

2. Add Secrets (equivalent to .env), which is located in the Tools pane

   ```
   REACT_APP_API_KEY=<YOUR API KEY>
   REACT_APP_INDEX_ID=<YOUR INDEX ID>
   ```

3. Run the Repl

### Step 2 (Option 2). Start the App Locally

1. Clone the current repo

   ```sh
   git clone git@github.com:mrnkim/generate-titles-and-hashtags.git
   ```

2. Create `.env` file in the root directory and provide the values for each key

   ```
    REACT_APP_API_KEY=<YOUR_API_KEY>
    REACT_APP_INDEX_ID=<YOUR_INDEX_ID>
    REACT_APP_SERVER_URL=<YOUR_SERVER_URL> //e.g., http://localhost
    REACT_APP_PORT_NUMBER=<YOUR_PORT_NUMBER> //e.g., 4001
   ```

3. Start the server

   ```sh
   node server.js
   ```

4. Install and start the client

   ```sh
   npm install
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎯 What's Next?

- Add more tests
- Improve error handling and add data validations

<p align="right">(<a href="#readme-top">back to top</a>)</p>
