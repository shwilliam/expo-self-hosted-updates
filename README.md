# self host expo bundles and assets (bare workflow)

## usage

> note: requires aws cli. set up and configure bucket permissions to suit your needs.

- create s3 bucket
- create `.env` with bucket name and url (see `.env.example`)
- start app in release mode (eg. `yarn ios:release`)
- bump version number
- upload update assets and js bundles with `yarn update`
