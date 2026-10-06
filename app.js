import {classify} from './model.js';
import {makeMission} from './activities.js';

const form = document.querySelector('#mission-form');
const result = document.querySelector('#result');
const status = document.querySelector('#status');

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const intent = document.querySelector('#intent').value.trim();
  if (!intent) return;
  const prediction = classify(intent);
  const mission = makeMission(prediction.label, document.querySelector('#minutes').value, document.querySelector('#accessible').checked);
  const reason = prediction.matched.length ? `The model noticed: ${prediction.matched.map(escapeHTML).join(', ')}.` : 'The model made a best guess from your words.';
  result.className = `result ${mission.color}`;
  result.innerHTML = `<div class="result-top"><span class="kicker">YOUR ${mission.duration}-MINUTE MISSION</span><span class="result-icon" aria-hidden="true">${mission.icon}</span></div><h2>${mission.name}</h2><p class="result-intro">${mission.intro}</p><ol>${mission.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol><div class="result-bottom"><p><strong>When you get back</strong><br>${mission.reflection}</p><p class="model-note">${reason} <span title="A tiny locally trained probabilistic classifier, not a large language model.">How was this chosen? ⓘ</span></p></div><button type="button" class="print" id="print-mission">Print or save mission ↗</button>`;
  result.querySelector('#print-mission').addEventListener('click', () => window.print());
  result.scrollIntoView({behavior: 'smooth', block: 'start'});
});

function updateStatus() { status.textContent = navigator.onLine ? 'Ready for the outdoors' : 'Offline and ready'; }
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => { status.textContent = 'Online only in this browser'; });
}
