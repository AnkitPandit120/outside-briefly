---
title: "Outside, briefly: a tiny offline AI coach for getting off the screen"
published: false
tags: devchallenge, hf26challenge, opensource, ai
---

## What I Built

I built **Outside, briefly**, a small outdoor activity planner. You describe your mood in a sentence, choose how much time you have, and get a short mission that sends you outside. The goal is for the screen to be the shortest part of the experience.

It offers four kinds of mission: noticing nature, moving, caring for a place, and connecting with someone. There is an accessible or seated option. A printable card lets you leave the browser behind.

## Demo

[Try the live demo](https://ankitpandit120.github.io/outside-briefly/). Type “I want a peaceful walk with birds and trees” to see a noticing mission.

## Code

[View the MIT-licensed source code](https://github.com/AnkitPandit120/outside-briefly).

## How I Built It

The AI core is a transparent, locally trained multinomial Naive Bayes classifier. Forty labeled example phrases in `model.js` teach it the four outing types. The model estimates probabilities from the words in your sentence and selects a mission. The interface shows matched words so its decision is inspectable. The result is assembled from short mission steps, adjusted for time and accessibility. This is intentionally a small classifier, not a language model.

The app is plain HTML, CSS, and JavaScript with no build step or API key. A service worker caches its files after the first visit, allowing the same flow to work offline. There is no geolocation request, analytics call, or account.

## Why Does Open Innovation Matter?

The model, training examples, and mission rules are all in the public code. Anyone can see what it learned, improve examples for their own community, or replace the classifier without depending on a hosted AI service. The small local model also lets people plan an outing without sending personal text or location to a server. It works without a signal after the first visit.

## What Happened Outdoors

I tested all four model intents and the 10-minute accessible mission in the browser and in automated tests. I have not yet taken a mission outside, so I cannot claim an outdoor field test.

## Prize Categories

Overall challenge only. No partner technology is claimed.
