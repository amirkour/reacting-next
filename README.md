# reacting-next
having fun learning react and nextjs (and typescript)

NOTE: This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

# Getting Started

## Required Environment Variables

For the tic-tac-toe game to work, you'll need to set some environment variables ...

### in dev

- create a file named `.env.development` 👈🏻 this is where env vars go for your dev environment
- `TIC_TAC_TOE_API_URL` = the URL to the docker container running on your machine that's hosting the lambda Runtime Interface Emulator

### in prod

- `TIC_TAC_TOE_API_URL`: URL to the api gateway that's sending requests to the tic-tac-toe lambda
- `TIC_TAC_TOE_API_KEY`: the API key of the tic-tac-toe api gateway service

### In elastic beanstalk

navigate to the prod environment, then "Configuration" along the left, then click the "Edit" button next to "Software," then scroll to the bottom to define application variables.

## Dev Server

```zsh
nvm use
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start to play w/ your local dev site.

## Docker Environment

You'll need to build the min-max-tic-tac-toe project, then the tic-tac-toe-handler project, then get docker up and running in the top-level `reacting` folder - see those project notes/readmes on how to get up and running there.

# AWS Stuff
## Elastic Beanstalk stuff

I'm currently hosting this app on Elastic Beanstalk!

### To publish the app to EB:

1. `npm run build`
2. zip the `.next` folder and `package.json` file into a zip file/archive
3. upload that zip file to EB

### Environment Variables

See notes above on required environment variables and how to define them.

## Tagging/Pushing image to aws/ecr

***DEPRECATED*** - i'm using elastic beanstalk now, but i'm gonna leave these here incase i want/need 'em again ...

These steps were ripped-off of the push commands/instructions from AWS ECR

1. use snippet awsecr 1 (w/o a space) - this will "retrieve an authentication token and authenticate your Docker client to your registry."
2. build the image you wanna deploy
3. use snippet awsecr 2 (w/o a space) - this'll "tag your image so you can push the image to [your] repository"
4. use snippet awsecr 3 (w/o a space) - this'll push your image to your AWS repository

## ECS Stuff

***DEPRECATED*** - i'm using elastic beanstalk now, but i'm gonna leave these here incase i want/need 'em again ...
### Updating ECS Service to latest image


1. Pullup the cluster in ECS
2. Check the service checkbox and click the 'update' button
3. Ensure the 'force deployment' checbox is checked, then skip to the end and deploy (this'll force a re-pull of the latest image)
