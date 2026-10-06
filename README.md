# Outside, briefly

An offline-first outdoor mission planner built for the [Hacktoberfest Open-Source AI Challenge: Week 1](https://dev.to/challenges/hacktoberfest-week1-2026-10-05). [Try the live demo](https://ankitpandit120.github.io/outside-briefly/). Write a short sentence about what you want to do. A local, transparent text classifier picks one of four mission types: notice, move, care, or connect. The app then generates a short plan that encourages you to put the screen away.

## Run

No installation or API key is needed. From this directory, run `python3 -m http.server 8000`, then open `http://localhost:8000` in a browser. A local server is needed for the service worker. Open the page once online, then reload with network disabled to verify offline use. The static files can also be hosted on any HTTPS static host.

Run `npm test` for model and mission behavior checks. This project has no npm dependencies.

## How the AI works

[`model.js`](model.js) contains 40 labeled training phrases and an implementation of multinomial Naive Bayes with Laplace smoothing. At page load it fits word counts locally. When you enter text, it estimates the probability of each outing type and selects the highest. All training data and inference code are public and editable; no user text is sent to a server. This is a deliberately small classifier, not a large language model or a general-purpose assistant. It may misclassify unusual wording, so it displays its matched words and leaves the input editable.

The app does not request location, infer weather, or identify wildlife. Mission cards are general suggestions; users choose a safe, accessible place for their situation.

## Offline behavior

The service worker caches the app shell on first successful visit. Test by loading once through localhost or HTTPS, switching the browser offline, and reloading. Opening the HTML as a `file:` URL does not register the service worker.

## Challenge entry status

The app is public and its [DEV challenge article](https://dev.to/techsfc/outside-briefly-a-tiny-offline-ai-coach-for-getting-off-the-screen-6ef) is published. Outdoor testing has not been claimed. The article source is in [`submission-draft.md`](submission-draft.md).
