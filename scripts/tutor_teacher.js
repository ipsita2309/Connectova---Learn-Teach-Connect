document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname || window.location.href;
  const page = path.split('/').pop();

  const map = {
    'ai_teaching_tools_topics.html': { listId:'teacher-ai-topics', data:'ai' },
    'classroom_management.html': { listId:'teacher-class-topics', data:'class' }
  };

  const cfg = map[page];
  if (!cfg) return;

  const topicsData = {
    ai: [
      { id:'t1', title:'Gamified Learning', text:'Use game elements to engage students and enhance learning outcomes.' },
      { id:'t2', title:'Interactive Quizzes', text:'Tools for creating real-time interactive quizzes for students.' },
      { id:'t3', title:'Virtual Labs', text:'Provide a safe virtual environment for experiments and simulations.' },
      { id:'t4', title:'Adaptive Learning', text:'Customize lessons and resources based on student performance and needs.' },
      { id:'t5', title:'AI Feedback', text:'Automated feedback to students on assignments and participation.' }
    ],
    class: [
      { id:'c1', title:'Attendance Tracking', text:'Track student attendance efficiently and generate reports.' },
      { id:'c2', title:'Behavior Monitoring', text:'Monitor student behavior and provide corrective measures.' },
      { id:'c3', title:'Seating Plans', text:'Organize classroom seating for optimal learning and management.' },
      { id:'c4', title:'Parent Communication', text:'Tools to communicate effectively with parents regarding student progress.' },
      { id:'c5', title:'Resource Allocation', text:'Manage classroom resources such as books, projectors, and lab equipment.' }
    ]
  };

  const listEl = document.getElementById(cfg.listId);
  const speechBox = document.getElementById('teacher-speech');
  const avatar = document.getElementById('teacher-avatar');
  const replayBtn = document.getElementById('teacher-replay');

  let synth = window.speechSynthesis;
  let utter, lastText='', words=[], currentWordIndex=0;

  function populateList(topics) {
    listEl.innerHTML = topics.map(t=>`
      <li data-id="${t.id}">
        <span>${t.title}</span>
        <div class="btn-group">
          <button class="btn explain-btn" data-id="${t.id}">Explain</button>
          <button class="btn pause-btn">Pause</button>
          <button class="btn resume-btn">Resume</button>
          <button class="btn stop-btn">Stop</button>
        </div>
      </li>
    `).join('');

    listEl.querySelectorAll('.explain-btn').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const topic = topics.find(x=>x.id===e.currentTarget.dataset.id);
        if(topic) explainTopic(topic);
      });
    });

    listEl.querySelectorAll('.pause-btn').forEach(btn=>btn.addEventListener('click',pauseSpeech));
    listEl.querySelectorAll('.resume-btn').forEach(btn=>btn.addEventListener('click',resumeSpeech));
    listEl.querySelectorAll('.stop-btn').forEach(btn=>btn.addEventListener('click',stopSpeech));
  }

  function explainTopic(topic) {
    lastText = `${topic.title}. ${topic.text}`;
    prepareAndSpeak(lastText);
  }

  function prepareAndSpeak(text) {
    if(synth.speaking) synth.cancel();
    words = text.split(' ');
    currentWordIndex=0;
    speechBox.innerHTML = words.map((w,i)=>`<span id="w${i}">${w}</span>`).join(' ');

    utter = new SpeechSynthesisUtterance(text);
    utter.rate=0.95; utter.pitch=1;

    utter.onstart = ()=> avatar.classList.add('speaking');
    utter.onboundary = e=>{ if(e.name==='word'||e.charIndex!==undefined) highlightWord(currentWordIndex++); };
    utter.onpause = ()=> avatar.classList.remove('speaking');
    utter.onresume = ()=> avatar.classList.add('speaking');
    utter.onend = ()=>{ avatar.classList.remove('speaking'); currentWordIndex=0; };
    synth.speak(utter);
  }

  function highlightWord(i){
    const spans = speechBox.querySelectorAll('span');
    spans.forEach((s,idx)=>{ s.style.background= idx===i?'#ffff6b':'transparent'; });
  }

  function pauseSpeech(){ if(synth.speaking && !synth.paused) synth.pause(); avatar.classList.remove('speaking'); }
  function resumeSpeech(){ if(synth.paused) synth.resume(); avatar.classList.add('speaking'); }
  function stopSpeech(){ if(synth.speaking) synth.cancel(); avatar.classList.remove('speaking'); speechBox.querySelectorAll('span').forEach(s=>s.style.background='transparent'); }

  populateList(topicsData[cfg.data]);

  replayBtn?.addEventListener('click',()=>{
    if(!lastText) return;
    prepareAndSpeak(lastText);
  });
});
