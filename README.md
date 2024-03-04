<a id="readme-top"></a>

# Generate Titles and Hashtags for Your Video

## 👋 Introduction

You can count on this app to whip up a snazzy topic, a catchy title, and some trending hashtags for any video you fancy. Whether you're a content creator always on the hunt for a killer video title and hashtags, this app's got you covered. It's a quick and easy way to get the job done in a matter of seconds!

<div style="border: 1px solid black;">
  <img src="public/generate-titles-hashtags-app.JPG" alt="app screenshot" />
</div>

### Built With

- [Twelve Labs API](https://docs.twelvelabs.io/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://react.dev/)
- [React Player](https://www.npmjs.com/package/react-player)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Getting Started

### Step 1. Clone the repo

```sh
   git clone git@github.com:mrnkim/generate-titles-and-hashtags.git
```

### Step 2. Generate API Key & Create an Index

1. Visit [Twelve Labs Playground](https://playground.twelvelabs.io/) to generate your API Key
   - Once you sign up, you'll receive complimentary credits allowing you to index up to 10 hours of video content!
2. Check the current API Base URL at [Twelve Labs API Reference](https://docs.twelvelabs.io/reference/api-reference) and update the version as needed
3. Create an index and save the index id (Visit [Twelve Labs Docs](https://docs.twelvelabs.io/docs/create-indexes) for details)
4. Create `.env` file at the root level and store/update the values of API_URL, API_KEY, and INDEX_ID.

   ```

   .env

    REACT_APP_API_URL=https://api.twelvelabs.io/v1.2
    REACT_APP_API_KEY=YOUR_API_KEY
    REACT_APP_INDEX_ID=YOUR_INDEX_ID

   ```

### Step 3. Start the App

```sh
npm install
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎯 What's Next?

- Add (or automate) test
- Improve error handling and add data validations

<p align="right">(<a href="#readme-top">back to top</a>)</p>
