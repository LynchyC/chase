# Chase

![Build Status](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWDB3bVM4UUFRZXFUeTZvRFRGUGQ5UFRzYlBBY0kraEc2SThGQnNuRXh4RlVQcXpjWEdJU1o4bWcwVHFCZjZIcldGKzRJZVMweDJMcTRqZWJDKzVsWms0PSIsIml2UGFyYW1ldGVyU3BlYyI6InZOM0hiZXh3S0gwMmlNd1UiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

Real time log retrieval application built using Electron

## Installation
Install the dependencies with the command `npm install`

## Development
To start the application, open two separate terminals and run one of the following in each:

- `npm start`
- `npm run serve`

## Deployment
This project uses the [electron-builder](https://github.com/electron-userland/electron-builder) library to build the distribution packages. 

To minimise on installed system dependencies, I would recommend using the [multi-platform approach with Docker](https://www.electron.build/multi-platform-build#docker)

## Testing

To execute the tests, run the command `npm run test`
