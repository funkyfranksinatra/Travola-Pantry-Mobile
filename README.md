# Travola Pantry — the counting app (iOS + Android)

A Capacitor app around one job: walk the shelves, type numbers, submit.
Staff sign in with the restaurant name and code; a manager approves in
Travola Pantry on the web.

## Why it exists as a native bundle

The walk-in is a Faraday cage. This app's offline model is the feature:

- **Starting a count needs signal** — it creates the count and caches the
  rooms and items.
- **Counting does not** — every entry writes to the phone first and
  queues; the ↻ icon means "on this phone, not yet on the server".
- **Submit flushes** — queued entries drain, then the count submits. If
  there is still no signal, the submission itself queues and fires on the
  next `online` event, with a banner saying so.

A dead spot costs nothing, which is the difference between a count that
happens and one that does not.

It is also why this is a **bundled app, not a URL wrapper**: Apple
rejects thin website shells (guideline 4.2); an app with real offline
behaviour is not one.

## Architecture

- `www/` — the entire app: one HTML file, no framework, Travola tokens.
- Talks to the Pantry API over HTTPS with a **bearer token** (webviews
  drop cross-origin cookies unpredictably; the token is the same signed
  value the web cookie carries, requested at sign-in with
  `client: "mobile"`).
- The server URL defaults to `https://pantry.travola.app` and can be
  changed from the sign-in screen (tap the server line) — useful for
  pointing a test build at a preview deployment.

## Building

After any change to `www/`: `npx cap sync`.

**Android** (Android Studio, or just the SDK):
```
npx cap open android        # opens Android Studio → Run
# or headless:
cd android && ./gradlew assembleDebug
# → android/app/build/outputs/apk/debug/app-debug.apk
```
Release builds for the Play Store need a signing keystore:
`./gradlew bundleRelease` after configuring `signingConfigs`.

**iOS** (requires a Mac with Xcode + CocoaPods):
```
cd ios/App && pod install
npx cap open ios            # → set your team, then Product → Archive
```

## Store submission notes

- App id `app.travola.pantry`, name "Travola Pantry".
- No camera, location, or tracking permissions are used — the privacy
  questionnaires are short.
- Expect at least one review rejection cycle; that is normal, plan for it.
