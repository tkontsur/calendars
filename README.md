# Новий календар українських свят

A React-based web application for displaying Ukrainian Orthodox holidays according to the New Julian calendar, with integrated Telegram bot notifications.

## Features

- **Interactive Calendar**: Browse Ukrainian Orthodox holidays with an intuitive interface
- **New Julian Calendar**: Displays holidays according to the reformed Orthodox calendar (13 days ahead of Julian)
- **Telegram Integration**: Automated daily/weekly holiday notifications via Telegram bot
- **Responsive Design**: Works on desktop and mobile devices
- **Holiday Management**: Add custom dates and view holiday details

## Tech Stack

- **Frontend**: React 18, Day.js, React Modal
- **Backend**: AWS Lambda functions (Node.js)
- **Storage**: AWS S3 for holiday data
- **Notifications**: Telegram Bot API
- **Deployment**: Static hosting with serverless functions

## Project Structure

```
├── src/                    # React application
│   ├── components/         # UI components
│   ├── data/              # Holiday data and selectors
│   └── App.js             # Main application
├── func/                  # AWS Lambda functions
│   ├── daily/             # Daily notification handler
│   └── weekly/            # Weekly notification handler
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 16+
- AWS CLI (for Lambda deployment)
- Telegram Bot Token (for notifications)

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

### Build

```bash
npm run build
```

### Lambda Functions

Build and deploy notification functions:

```bash
npm run build-daily-fn
npm run build-weekly-fn
```

## Environment Variables

For Lambda functions:
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `TELEGRAM_CHAT_ID`: Target chat ID for notifications

## License

Private project

## Author

Taras Kontsur