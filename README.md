# reacting-next
having fun learning react and nextjs (and typescript)
# Next's boilerplate
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
nvm use
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Docker commands

### Building Image

Taken primarily from [the nextjs deployment site.](https://nextjs.org/docs/deployment)

```javascript
docker build -t reacting-next .
docker run -p 3000:3000 reacting-next
```

### Tagging/Pushing to aws

These steps were ripped-off of the push commands/instructions from AWS ECR

1. use snippet awsecr 1 (w/o a space) - this will "retrieve an authentication token and authenticate your Docker client to your registry."
Use the AWS CLI
2. build the image you wanna deploy
3. use snippet awsecr 2 (w/o a space) - this'll "tag your image so you can push the image to [your] repository"
4. use snippet awsecr 3 (w/o a space) - this'll push your image to your AWS repository