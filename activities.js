export const activities = {
  notice: {
    name: 'The noticing walk', icon: '✳', color: 'sage',
    intro: 'A short walk with your attention tuned to the living world.',
    steps: [
      'Step outside and choose a familiar, accessible path.',
      'Find three different leaf shapes or textures. Leave them where they are.',
      'Pause for one minute and listen. Count distinct sounds without naming them.',
      'Notice one thing you missed on the way out as you return.'
    ],
    reflection: 'What changed when you slowed down?'
  },
  move: {
    name: 'The movement loop', icon: '↗', color: 'clay',
    intro: 'Turn a small amount of free time into a refreshing outdoor loop.',
    steps: [
      'Choose a nearby route you can comfortably return from.',
      'Start at an easy pace for two minutes.',
      'Alternate one minute of brisk movement with one minute easy.',
      'Finish slowly and notice how your breathing feels.'
    ],
    reflection: 'Which part of the loop gave you energy?'
  },
  care: {
    name: 'The care mission', icon: '❋', color: 'gold',
    intro: 'Give a little care to a place you share.',
    steps: [
      'Visit a plant, tree, garden, or public path nearby.',
      'Look for one small need you can safely address.',
      'Water a plant you care for, or collect only litter that is safe to handle.',
      'Leave wildlife and unfamiliar plants undisturbed.'
    ],
    reflection: 'What did you learn about this place?'
  },
  connect: {
    name: 'The shared discovery', icon: '◌', color: 'blue',
    intro: 'Invite someone into a tiny adventure close to home.',
    steps: [
      'Ask a friend or family member to join you for a short walk.',
      'Each person picks one thing to find: a color, a sound, or a shape.',
      'Swap observations halfway through.',
      'Choose one place you would both like to revisit.'
    ],
    reflection: 'What did your companion notice that you missed?'
  }
};

export function makeMission(label, minutes = 15, accessibility = false) {
  const activity = activities[label] || activities.notice;
  const duration = Math.max(5, Math.min(60, Number(minutes) || 15));
  const steps = [...activity.steps];
  if (accessibility) {
    steps[0] = 'Choose an accessible outdoor spot, doorway, balcony, or window with fresh air.';
    if (label === 'move') steps[2] = 'Alternate comfortable movement with rest; seated movement counts.';
  }
  if (duration <= 10) steps.pop();
  if (duration >= 30) steps.splice(steps.length - 1, 0, 'Repeat your favorite part once, taking a different path or perspective.');
  return {...activity, duration, steps};
}
