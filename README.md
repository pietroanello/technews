# TechNews ⬜️🟥

React Native [Expo](https://expo.dev) project that shows the top 20 stories from the HackerNews public API.

## Requirements

- Node.js (LTS)
- macOS, Windows (Powershell and WSL 2), and Linux are supported.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

You can then scan the QR code with the Expo Go app to test the app on your phone, press `i`/`a` to open iOS/Android simulator (or on your phone, if it is connected via USB), `w` to open the web version, or read all the other options in the output.

For a complete list of expo commands read about Expo CLI [here](https://docs.expo.dev/more/expo-cli/)

## Tech stack

The App use [Expo Router](https://docs.expo.dev/router/introduction/) for navigation, [Tanstack Query](https://tanstack.com/query/latest) for server state management and [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for the transitions.

> [!NOTE]  
> Transitions are available only on the app version.

### About text, comments and webviews

Text and comments for each story are not displayed inside the single story view. The main reason is that they are strings that may have html tags inside. Using webviews (or the expo DOM components) could be a solution that works fine on the Expo Go app versions, but some options like `matchContents` or `onShouldStartLoadWithRequest` should be tested better on release builds. Additionally, the API structure requires to traverse a tree of comments to load everything, and in some cases this can result in a lot of server requests.

Comments can be read on news.ycombinator.com by clicking the comment count.
