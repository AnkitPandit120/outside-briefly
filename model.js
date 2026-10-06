// Open, inspectable training data for a tiny multinomial Naive Bayes text model.
// No requests or user text leave the browser.
export const training = {
  notice: [
    'I want a quiet walk to notice birds and trees', 'help me slow down and observe nature',
    'I want to listen to birdsong', 'look for leaves flowers and insects',
    'I need a mindful outdoor break', 'watch the sky and clouds',
    'I want to explore a nearby park', 'spot colors shapes and textures outside',
    'I feel stressed and want calm air', 'take a gentle sensory walk'
  ],
  move: [
    'I want to get moving and exercise outside', 'a short brisk walk sounds good',
    'give me a running challenge', 'I have energy for a fast outdoor activity',
    'help me stretch and walk', 'I want to climb a hill or stairs',
    'make my walk more active', 'I need movement after sitting all day',
    'I want a playful fitness mission', 'a quick energetic walk'
  ],
  care: [
    'I want to care for plants and a garden', 'help me water my plants',
    'I want to collect litter safely', 'do something kind for my neighborhood',
    'check the soil and leaves', 'I want to tend a small garden',
    'help pollinators in my yard', 'I want to clean up a path',
    'care for a tree near home', 'find a practical outdoor task'
  ],
  connect: [
    'I want to go outside with a friend', 'plan a walk with my family',
    'give us something to talk about outdoors', 'I feel lonely and want company',
    'I want a social activity in the park', 'explore outside with my child',
    'invite someone for a neighborhood walk', 'I want to share a nature discovery',
    'a group outdoor game would be fun', 'spend time outside together'
  ]
};

const stop = new Set('i a an the to for me my and of in on with from want need have help give get do something outside outdoor go make it after all be'.split(' '));
export function tokens(text) {
  return (text.toLowerCase().match(/[a-z]+/g) || []).filter(word => word.length > 2 && !stop.has(word));
}

export function trainModel(examples = training) {
  const labels = Object.keys(examples);
  const counts = {};
  const totals = {};
  const vocab = new Set();
  for (const label of labels) {
    counts[label] = {};
    totals[label] = 0;
    for (const phrase of examples[label]) {
      for (const word of tokens(phrase)) {
        counts[label][word] = (counts[label][word] || 0) + 1;
        totals[label]++;
        vocab.add(word);
      }
    }
  }
  return {labels, counts, totals, vocabSize: vocab.size, examples};
}

export const model = trainModel();

export function classify(text, fitted = model) {
  const words = tokens(text);
  const scores = fitted.labels.map(label => {
    const prior = fitted.examples[label].length / fitted.labels.reduce((sum, key) => sum + fitted.examples[key].length, 0);
    let score = Math.log(prior);
    for (const word of words) {
      score += Math.log(((fitted.counts[label][word] || 0) + 1) / (fitted.totals[label] + fitted.vocabSize));
    }
    return {label, score};
  }).sort((a, b) => b.score - a.score);
  const max = scores[0].score;
  const probabilities = scores.map(item => Math.exp(item.score - max));
  const sum = probabilities.reduce((a, b) => a + b, 0);
  return {
    label: scores[0].label,
    confidence: probabilities[0] / sum,
    matched: [...new Set(words.filter(word => fitted.counts[scores[0].label][word]))].slice(0, 5),
    scores: scores.map((item, index) => ({label: item.label, probability: probabilities[index] / sum}))
  };
}
