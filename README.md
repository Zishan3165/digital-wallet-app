# Digital Wallet App (DWAPP)

A simple Web app (using NextJs v14)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY` from https://newsapi.org/

# Demo

https://digital-wallet-app.vercel.app/ or https://digital-wallet-5ooh2kyx2-zishans-projects-87457693.vercel.app/

## Features

- MetaMask login integration
- Light/dark mode toggle
- News List with option to view in iframe (using API from https://newsapi.org/)
- About page with user details

## Run Locally

Clone the project

```bash
  git clone https://github.com/Zishan3165/digital-wallet-app.git
```

Go to the project directory

```bash
  cd digital-wallet-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Libraries used

- Tailwind, shadcn for styling and theming
- zod, zod-fetch for type safety when using fetch
- Prettier for file formatting
- lucide-react for icons
- react-lottie for json based animation
- @metamask/sdk for integrating MetaMask
- react-window, react-window-infinite-loader for virtualization (not implemented yet)
- jest/testing-library for testing

## Future Work/Improvements

- Add news Api (Currently not available)
- Edit news Api (Currently not available)
- Delete news API (Currently not available)
- Virtualization of news using react-window
- Infinite scroll instead of button using react-window-infinite-loader
- Add more tests
