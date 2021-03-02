# self host expo bundles and assets (bare workflow)

## usage

> note: requires aws cli. set up and configure bucket permissions to suit your needs.

- create s3 bucket
- create `.env` with bucket name and url (see `.env.example`)
- update `EXPO_UPDATE_URL` value in `android/app/src/main/AndroidManifest.xml` to `{BUNDLE_URL}android-index.json`
- update `EXUpdatesURL` value in `/ios/ExpoSelfHostedUpdates/Supporting/Expo.plist` to `{BUNDLE_URL}ios-index.json`
- start app in release mode (eg. `yarn ios:release`)
- bump version number
- upload update assets and js bundles with `yarn update`
