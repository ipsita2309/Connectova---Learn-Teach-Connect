/* tutor_student.js - AI Tutor for Students (Maths + English) */

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname || window.location.href;
  const page = path.split('/').pop();

  const map = {
    'math_topics.html': {
      listId: 'student-math-topics',
      speechId: 'student-speech',
      avatarId: 'student-avatar',
      replayId: 'student-replay',
      data: 'maths'
    },
    'english_topics.html': {
      listId: 'student-eng-topics',
      speechId: 'student-speech',
      avatarId: 'student-avatar',
      replayId: 'student-replay',
      data: 'english'
    }
  };

  const cfg = map[page];
  if (!cfg) return;

  const topicsData = {
    maths: [
      { id: 'm1', title: 'Fractions and Decimals', text: 'Fractions and decimals represent parts of a whole. Learn to convert between them and perform basic operations.' },
      { id: 'm2', title: 'Algebraic Expressions', text: 'Algebra involves using symbols and letters to represent numbers and relationships between them.' },
      { id: 'm3', title: 'Geometry Basics', text: 'Study shapes, angles, lines, and properties of figures like triangles, circles, and polygons.' },
      { id: 'm4', title: 'Trigonometry', text: 'Trigonometry deals with relationships between the sides and angles of triangles using ratios like sine, cosine, and tangent.' },
      { id: 'm5', title: 'Probability and Statistics', text: 'Probability measures the chance of an event, while statistics deals with collecting and analyzing data.' }
    ],
    english: [
      { id: 'e1', title: 'Parts of Speech', text: 'Nouns name things, verbs show actions, adjectives describe nouns, and adverbs describe verbs.' },
      { id: 'e2', title: 'Sentence Structure', text: 'Sentences can be simple, compound, or complex. Each has a subject and a predicate.' },
      { id: 'e3', title: 'Vocabulary Building', text: 'Enhance your vocabulary by learning prefixes, suffixes, and using new words in writing.' },
      { id: 'e4', title: 'Paragraph Writing', text: 'A paragraph includes a topic sentence, supporting ideas, and a conclusion.' }
    ]
  };

  const listEl = document.getElementById(cfg.listId);
  const speechBox = document.getElementById(cfg.speechId);
  const avatar = document.getElementById(cfg.avatarId);
  const replayBtn = document.getElementById(cfg.replayId);

  let synth = window.speechSynthesis;
  let utter, lastText = '', words = [], currentWordIndex = 0;

  /** Populate topic list **/
  function populateList(topics) {
    listEl.innerHTML = topics.map(t => `
      <li data-id="${t.id}">
        <span>${t.title}</span>
        <div class="btn-group">
          <button class="btn explain-btn" data-id="${t.id}">Explain</button>
          <button class="btn pause-btn">Pause</button>
          <button class="btn resume-btn">Resume</button>
          <button class="btn stop-btn">Stop</button>
          <button class="btn start-btn" data-id="${t.id}">Start Topic</button>
        </div>
      </li>
    `).join('');

    listEl.querySelectorAll('.explain-btn').forEach(btn =>
      btn.addEventListener('click', e => {
        const topic = topics.find(x => x.id === e.currentTarget.dataset.id);
        if (topic) explainTopic(topic);
      })
    );

    listEl.querySelectorAll('.pause-btn').forEach(btn =>
      btn.addEventListener('click', pauseSpeech)
    );

    listEl.querySelectorAll('.resume-btn').forEach(btn =>
      btn.addEventListener('click', resumeSpeech)
    );

    listEl.querySelectorAll('.stop-btn').forEach(btn =>
      btn.addEventListener('click', stopSpeech)
    );

    listEl.querySelectorAll('.start-btn').forEach(btn =>
      btn.addEventListener('click', e => {
        const topic = topics.find(x => x.id === e.currentTarget.dataset.id);
        if (speechBox) speechBox.textContent = `🚀 Starting ${topic.title}... (Coming soon)`;
      })
    );
  }

  function explainTopic(topic) {
    lastText = `${topic.title}. ${topic.text}`;
    prepareAndSpeak(lastText);
  }

  function prepareAndSpeak(text) {
    if (synth.speaking) synth.cancel();
    words = text.split(' ');
    currentWordIndex = 0;
    speechBox.innerHTML = words.map((w, i) => `<span id="w${i}">${w}</span>`).join(' ');

    utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;

    utter.onstart = () => avatar.classList.add('speaking');
    utter.onboundary = e => {
      if (e.name === 'word' || e.charIndex !== undefined)
        highlightWord(currentWordIndex++);
    };
    utter.onpause = () => avatar.classList.remove('speaking');
    utter.onresume = () => avatar.classList.add('speaking');
    utter.onend = () => {
      avatar.classList.remove('speaking');
      currentWordIndex = 0;
    };
    synth.speak(utter);
  }

  function highlightWord(i) {
    const spans = speechBox.querySelectorAll('span');
    spans.forEach((s, idx) => {
      s.style.background = idx === i ? '#ffff6b' : 'transparent';
    });
  }

  function pauseSpeech() {
    if (synth.speaking && !synth.paused) synth.pause();
    avatar.classList.remove('speaking');
  }
  function resumeSpeech() {
    if (synth.paused) synth.resume();
    avatar.classList.add('speaking');
  }
  function stopSpeech() {
    if (synth.speaking) synth.cancel();
    avatar.classList.remove('speaking');
    speechBox.querySelectorAll('span').forEach(s => s.style.background = 'transparent');
  }

  populateList(topicsData[cfg.data]);

  replayBtn?.addEventListener('click', () => {
    if (!lastText) { alert('No recent explanation to replay.'); return; }
    prepareAndSpeak(lastText);
  });
});
