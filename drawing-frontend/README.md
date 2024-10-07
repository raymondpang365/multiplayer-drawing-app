# Multiplayer Drawing App

### Setup

1. Clone the repo
2. Install node 18.X
3. npm install -g yarn
4. Install npm project dependencies  with
> yarn
5. Ask your team member for a config file. Name the file as ```.env.development``` and
   place it in the root project directory.

####  Development Environment

Store your environment variable in `.env.development`

> yarn dev

#### Production Environment

Store your environment variable in `.env.production`

> yarn pro

### Environment variables

```
NEXT_PUBLIC_API_URL=<Full api domain name or ip including prefix path>
NEXT_PUBLIC_DOMAIN=<Domain name of the website (If it is local ip, do not include port)>
```