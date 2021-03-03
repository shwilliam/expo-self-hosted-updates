# self hosted RN ota updates with `expo-updates`

example react native app using `expo-updates` to fetch self-hosted js bundles and assets from s3 bucket.

## usage

> note: requires aws cli. set up and configure bucket permissions to suit your needs.

- create s3 bucket
- create `.env` with bucket name and url (see `.env.example`)
- run `yarn ota:init` to update url to look for updates in native config (in `android/app/src/main/AndroidManifest.xml` and `/ios/ExpoSelfHostedUpdates/Supporting/Expo.plist`)
- start app in release mode (eg. `yarn ios:release`)

## patch

- bump version number in `app.json`
- export and upload update assets and js bundles with `yarn ota`

## incompatible changes

> note: updates involving native code changes should be indicated by a major version bump. though incompatible updates won't be installed, this workflow allows outdated clients to continue to get past updates relevant to their major version.

- update version in `app.json` and `MAJOR_VERSION` in `.env`
- run `yarn ota:init` to update updates url in native config
- upload update assets and js bundles with `yarn update`
