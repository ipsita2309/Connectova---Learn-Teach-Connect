/* tutor_parent.js - AI Tutor for Parents (Digital Safety + Child Psychology) */

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname || window.location.href;
  const page = path.split('/').pop();

  const map = {
    'digital_safety_topics.html': {
      listId: 'parent-ds-topics',
      speechId: 'parent-speech',
      avatarId: 'parent-avatar',
      replayId: 'parent-replay',
      data: 'digital'
    },
    'child_psychology_topics.html': {
      listId: 'parent-cp-topics',
      speechId: 'parent-speech',
      avatarId: 'parent-avatar',
      replayId: 'parent-replay',
      data: 'psych'
    }
  };

  const cfg = map[page];
  if (!cfg) return;

  const topicsData = {
    digital: [
      { id: 'd1', title: 'Online Privacy', text: 'Teach your child not to share personal details like address or school on social media.' },
      { id: 'd2', title: 'Safe Browsing', text: 'Use parental controls and teach children to avoid suspicious websites or downloads.' },
      { id: 'd3', title: 'Cyberbullying', text: 'Encourage open talk about online behavior and teach them to report hurtful interactions.' },
      { id: 'd4', title: 'Screen Time Balance', text: 'Help your child manage online and offline time to stay healthy and active.' }
    ],
    psych: [
      { id: 'p1', title: 'Understanding Emotions', text: 'Recognize your child’s feelings and respond empathetically to build trust.' },
      { id: 'p2', title: 'Positive Reinforcement', text: 'Reward good behavior with praise to encourage repetition.' },
      { id: 'p3', title: 'Dealing with Tantrums', text: 'Stay calm, acknowledge emotions, and guide them toward better expression.' },
      { id: 'p4', title: 'Building Confidence', text: 'Support your child’s interests and allow them to make simple decisions.' }
    ]
  };

  const listEl = document.getElementById(cfg.listId);
  const speechBox = document.getElementById(cfg.speechId);
  const avatar = document.getElementById(cfg.avatarId);
  const replayBtn = document.getElementById(cfg.replayId);

  let synth = window.speechSynthesis;
  let utter, lastText = '', words = [], currentWordIndex = 0;

  function populateList(topics) {
    listEl.innerHTML = topics.map(t => `
      <li><span>${t.title}</span>
      <div>
        <button class="btn explain-btn" data-id="${t.id}">Explain</button>
        <button class="btn pause-btn">Pause</button>
        <button class="btn resume-btn">Resume</button>
        <button class="btn stop-btn">Stop</button>
        <button class="btn start-btn" data-id="${t.id}">Start Topic</button>
      </div></li>`).join('');

    listEl.querySelectorAll('.explain-btn').forEach(btn =>
      btn.addEventListener('click', e => {
        const topic = topics.find(x => x.id === e.currentTarget.dataset.id);
        explainTopic(topic);
      })
    );
    listEl.querySelectorAll('.pause-btn').forEach(btn => btn.addEventListener('click', pauseSpeech));
    listEl.querySelectorAll('.resume-btn').forEach(btn => btn.addEventListener('click', resumeSpeech));
    listEl.querySelectorAll('.stop-btn').forEach(btn => btn.addEventListener('click', stopSpeech));
    listEl.querySelectorAll('.start-btn').forEach(btn => btn.addEventListener('click', e => {
      const topic = topics.find(x => x.id === e.currentTarget.dataset.id);
      speechBox.textContent = `Starting ${topic.title}... (Coming soon!)`;
    }));
  }

  function explainTopic(topic) {
    lastText = `${topic.title}. ${topic.text}`;
    prepareAndSpeak(lastText);
  }

  function prepareAndSpeak(text) {
    if (synth.speaking) synth.cancel();
    words = text.split(' ');
    currentWordIndex = 0;
    speechBox.innerHTML = words.map((w, i) => `<span>${w}</span>`).join(' ');

    utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onstart = () => avatar.classList.add('speaking');
    utter.onboundary = () => highlightWord(currentWordIndex++);
    utter.onpause = () => avatar.classList.remove('speaking');
    utter.onresume = () => avatar.classList.add('speaking');
    utter.onend = () => avatar.classList.remove('speaking');
    synth.speak(utter);
  }

  function highlightWord(i) {
    const spans = speechBox.querySelectorAll('span');
    spans.forEach((s, idx) => s.style.background = idx === i ? '#ffff6b' : 'transparent');
  }

  function pauseSpeech() { if (synth.speaking) synth.pause(); avatar.classList.remove('speaking'); }
  function resumeSpeech() { if (synth.paused) synth.resume(); avatar.classList.add('speaking'); }
  function stopSpeech() { synth.cancel(); avatar.classList.remove('speaking'); speechBox.querySelectorAll('span').forEach(s => s.style.background='transparent'); }

  populateList(topicsData[cfg.data]);
  replayBtn?.addEventListener('click', () => { if (!lastText) return; prepareAndSpeak(lastText); });
});
