# ForexApp
## See it live [here](http://167.99.63.194/)

------

Forexapp - Currency changer app, built with with React, Docker from scratch.

## Folder structure

```sh
lite/
├── nginx            # Nginx configurations
├── web            # Service: React Frontend
      └── src         # Frontend SPA
└── graphql             # GraphQL service
```

## Requirements

1. **Docker**: App is powered by [Docker](https://www.docker.com/).

## Workflow

After all things are setup, you can run this in terminal to execute development workflow of Docker.

```bash
$ sh ./kit.sh upbuild
```

Client app will be live on `http://localhost:3000` while GraphQL service will run on `http://localhost:3030/graphql`.

## Deployment

Deployment are done in DigitalOcean with `docker-machine`, see [here](https://docs.docker.com/machine/examples/ocean/#step-2-generate-a-personal-access-token). There is a shellscript to run a simple deployment setup. Create a machine with your own token, edit `eval $(docker-machine env forexapp-prod)` this line in `/kit.sh`, and run `sh ./kit.sh deploy`.

Nginx will serve static files from the `/dist` folder (no proxy pass yet).

## Scripts

You can also run the app without Docker by running this script.

| `yarn <script>`       | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `test`   | @TODO: Run the jest test suites |
| `coverage`   | @TODO: Run the jest test coverage |
| `web:dev` | Develop the client-side rendered App                               |
| `web:build` | To build the client-side rendered App                             |
| `graphql:dev`      | Develop the GraphQL service                       |
| `graphql:build`      | Build the GraphQL service                     |

## Improvements to do

- Server side rendering
- Route based chunking
- Separate container for nginx and web with proxy pass
- Unit testing with jest
- E2E testing with cypress

------
