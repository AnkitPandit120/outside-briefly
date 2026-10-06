import test from 'node:test';
import assert from 'node:assert/strict';
import {classify, model} from './model.js';
import {makeMission} from './activities.js';

test('model learns all four outdoor intents', () => {
  assert.equal(classify('I want a peaceful walk to listen to birds').label, 'notice');
  assert.equal(classify('I want to run and get exercise').label, 'move');
  assert.equal(classify('Let me water garden plants').label, 'care');
  assert.equal(classify('I want a walk with my friend and family').label, 'connect');
});
test('classification returns bounded probabilities and does not require remote data', () => {
  const result = classify('a quick outdoor activity');
  assert.equal(model.labels.length, 4);
  assert.ok(result.confidence > 0 && result.confidence <= 1);
  assert.ok(Math.abs(result.scores.reduce((sum, score) => sum + score.probability, 0) - 1) < 1e-9);
});
test('accessibility and duration alter a mission', () => {
  const mission = makeMission('move', 10, true);
  assert.equal(mission.duration, 10);
  assert.match(mission.steps[0], /accessible/);
  assert.ok(mission.steps.some(step => /seated/.test(step)));
});
