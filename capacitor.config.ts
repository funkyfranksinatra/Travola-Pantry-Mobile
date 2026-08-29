import type { CapacitorConfig } from "@capacitor/cli";

// The whole app is the bundled counting UI in www/ — no dev server, no
// remote URL. Apple's guideline 4.2 (minimum functionality) is the
// reason this is a real bundled app with offline behaviour rather than
// a shell pointed at the website: a URL wrapper gets rejected; an app
// that keeps counting when the walk-in has no signal does not.
const config: CapacitorConfig = {
  appId: "app.travola.pantry",
  appName: "Travola Pantry",
  webDir: "www",
  backgroundColor: "#0b0b0f",
  ios: { contentInset: "always" },
  android: { allowMixedContent: false },
};

export default config;
