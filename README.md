# Browser Widget App

This is a demo widget app that displays tabular browser data.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Components

The DataWidget is the main widget for this project. To use it, add:

```
<DataWidget colConfig={<colConfig>} data={<data>} />
```

to a parent container, where 'colConfig' and 'data' are returned from the backend API.

## Configuration

The .env file contains the backend server URI value which serves the data for the widget.


