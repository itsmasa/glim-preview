const demo = document.querySelector('#demo-content');
const steps = [...document.querySelectorAll('[data-step]')];
const talk = document.querySelector('#talk-tab');
const brain = document.querySelector('#brain-tab');
const sourceIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6Z M14 3v5h4 M9 12h6 M9 16h6"/></svg>';
const sourceButton = `<button class="source-button" data-source>${sourceIcon} From your thought · Sep 12</button>`;
const scenes = [
  '<img class="demo-mascot" src="assets/glim.png" alt=""><h3>What’s on your mind?</h3><div class="thought-card"><span class="small-label">Your thought · Example</span><p>I loved having a slower morning today. Coffee, a little walk, no rushing. I want more of that.</p></div><div class="demo-compose">A little moment, worth keeping.</div>',
  `<h3 class="memory-heading">Your Brain</h3><p class="memory-subtitle">A little context, connected.</p><div class="memory-card"><span class="small-label">EVERYDAY LIFE</span><p>You’d like more slow, unhurried mornings.</p>${sourceButton}</div><p class="memory-foot">A memory is a starting point.<br>You get to decide if it still fits.</p>`,
  `<div class="chat-user">Help me think through this new job. The commute would be longer.</div><div class="chat-name"><img src="assets/glim.png" alt="" class="chat-avatar">glim</div><p class="chat-answer">You mentioned wanting <em>more unhurried mornings</em>. How would the new commute fit with that?</p><div class="chat-source">${sourceButton}</div><div class="demo-compose chat-compose">Space to see it a little differently.</div>`
];
let current = 0;
function setStep(index) {
  current = index;
  demo.innerHTML = scenes[index];
  demo.classList.remove('changed');
  void demo.offsetWidth;
  demo.classList.add('changed');
  steps.forEach((button, i) => {
    button.classList.toggle('active', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
  talk.classList.toggle('selected', index !== 1);
  brain.classList.toggle('selected', index === 1);
  talk.setAttribute('aria-pressed', String(index !== 1));
  brain.setAttribute('aria-pressed', String(index === 1));
}
steps.forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.step))));
talk.addEventListener('click', () => setStep(current === 1 ? 2 : 0));
brain.addEventListener('click', () => setStep(1));
setStep(0);
const signup = document.querySelector('#signup-dialog');
const source = document.querySelector('#source-dialog');
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('[data-signup]').forEach(button => button.addEventListener('click', () => openDialog(signup)));
demo.addEventListener('click', event => { if (event.target.closest('[data-source]')) openDialog(source); });
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
document.querySelector('#close-source').addEventListener('click', () => source.close());
document.querySelector('#signup-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#signup-form').hidden = true;
  document.querySelector('#signup-result').hidden = false;
  document.querySelector('#email').value = '';
  document.querySelector('#research').focus();
});
document.querySelector('#research').addEventListener('change', event => {
  document.querySelector('#research-feedback').textContent = event.target.value ? 'Thanks for trying the preview. This answer isn’t stored or sent.' : 'This optional question would help shape Glim.';
});
document.querySelector('#finish-preview').addEventListener('click', () => signup.close());
signup.addEventListener('close', () => {
  document.querySelector('#signup-form').reset();
  document.querySelector('#signup-form').hidden = false;
  document.querySelector('#signup-result').hidden = true;
  document.querySelector('#research').value = '';
  document.querySelector('#research-feedback').textContent = 'This optional question would help shape Glim.';
});
document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-idle', document.hidden));
