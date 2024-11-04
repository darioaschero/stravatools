# Strava Tools

A Next.js application that integrates with Strava's API to display and analyze your activities.

## Features

- OAuth2 authentication with Strava
- Some cool stuff soon..


## Prerequisites

- Node.js 18+ 
- A Strava account
- Strava API credentials (Client ID and Client Secret)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stravatools.git
cd stravatools
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example` and fill in your credentials:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Required environment variables are:

- `STRAVA_CLIENT_ID`: Your Strava API application client ID
- `STRAVA_CLIENT_SECRET`: Your Strava API application client secret
- `NEXTAUTH_SECRET`: A random string used to hash tokens
- `NEXTAUTH_URL`: Your application's URL (http://localhost:3000 for development)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Strava API](https://developers.strava.com/)

## License

MIT
