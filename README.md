# Bitbucket Repository Update Monitor

A simple Node.js script that monitors a Bitbucket repository for updates and plays a notification sound when changes are detected.
The script will check for updates every 10 seconds and play a sound when a change is detected in the repository.

## Features

- Continuous monitoring of Bitbucket repository
- Sound notification when an update is detected
- Display of update timestamps

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Bitbucket account and access token

## Installation

1. Clone the repository:

```
git clone https://github.com/niceunderground/GitBotAlert
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the project root with your Bitbucket token:
```
BITBUCKET_TOKEN=your_token_here
```

## Configuration

The script requires the following packages:
- node-fetch
- dotenv
- sound-play

## Usage

To start monitoring:
```
node start.js
```

## Customization

- The notification sound file can be replaced by modifying the path in `soundFile`
- The check interval can be modified by changing the value in `setInterval` (currently set to 10000ms)

## License

MIT

## Author

niceunderground
