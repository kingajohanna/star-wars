# Running the app

## Step 0: Install dependencies

```bash
yarn

# install Pod files - only needed for iOS
npx pod-install
```

## Step 1: Start the Metro Server

First, you will need to start `Metro`, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# OR using Yarn
yarn android
```

### For iOS

```bash
# OR using Yarn
yarn ios
```

# Documentation

### Folder structure

The project is organized into these main folders under `./src`:

- `assets`: Images and other static files.
- `components`: Reusable UI parts.
- `constants`: Fixed values like API URLs.
- `network`: Code for fetching data.
- `screens`: Main pages of the app.
- `theme`: Colors and styles.
- `types`: TypeScript definitions.

### Network

`useSwapiSearch.ts`: contains a custom React hook for fetching search results from the SWAPI (Star Wars API). Using a hook makes it easier to handle data fetching and rerendering, thats why I prefer custom hooks.

### Components

`ButtonGroup.tsx`: This component has buttons for selecting how many results to show per page.

`ResultList.tsx`: This component shows the search results and includes sorting logic. It uses `useEffect` to handle component updates.

`SearchBar.tsx`: This component is the search bar where users enter their queries.

### Screens

`Search.tsx`: This screen uses the `useSwapiSearch` hook to get search results and shows them using `ResultList`, `SearchBar`, and `ButtonGroup`.
