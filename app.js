(function () {
  const DEFAULT_PROFILE = {
    guitar: 'Benji Madden Signature',
    pickupType: 'P90',
    amp: 'Fender Mustang LT25',
    speaker: '1x8 combo speaker',
    pedalsOwned: 'Joyo Dark Flame, Danelectro FAB Distortion, Danelectro FAB Flanger, Behringer Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, Kmise mini drive',
    pedalsOwned: 'SAPHUE Classic Chorus, Rowin Spring Reverb, KMISE Analog Delay, Behringer Vintage Delay VD400, Danelectro FAB Flange, Danelectro FAB Distortion, JOYO Dark Flame',
    pedalsOwned: '',
    skillLevel: 'Beginner',
    notes: 'beginner/home practice setup',
  };

  const gearLibrary = {
    guitars: [
      { name: 'Benji Madden Signature', details: 'P90 default, medium/high output, mid-forward, raw, punchy; good for punk, pop punk, classic rock, grunge, crunch, and driven tones.' },
      { name: 'Fender Stratocaster', details: 'Single-coil clarity for clean, blues, funk, ambient, and classic rock.' },
      { name: 'Fender Telecaster', details: 'Bright bridge attack for country, indie, punk, and rock crunch.' },
      { name: 'Gibson Les Paul', details: 'Humbucker sustain and thick rock/lead tones.' },
      { name: 'Gibson SG', details: 'Raw humbucker attack for classic rock, doom, and punk.' },
      { name: 'PRS Custom 24', details: 'Modern humbucker versatility for rock, lead, and fusion.' },
      { name: 'Ibanez RG', details: 'Fast high-output platform for metal and lead.' },
      { name: 'Jackson Soloist', details: 'High-gain focused guitar for modern rock and metal.' },
      { name: 'ESP LTD EC-1000', details: 'Medium/high-output single-cut for hard rock and metal.' },
    ],
    amps: [
      'Fender Twin Reverb', 'Fender Deluxe Reverb', 'Vox AC30', 'Marshall Plexi', 'Marshall JCM800',
      'Mesa Boogie Dual Rectifier', 'Peavey 5150', 'EVH 5150III', 'Orange Rockerverb', 'Boss Katana',
      'Line 6 Helix', 'Fender Mustang LT25', 'Fender Squier Champ 15',
    ],
    featuredPedals: [
      { name: 'Joyo Dark Flame', role: 'High-gain modern distortion for metal, hard rock, and tight rhythm tones.' },
      { name: 'Danelectro FAB Distortion', role: 'Budget distortion for punk, grunge, classic rock crunch, and dirty leads.' },
      { name: 'Danelectro FAB Flanger', role: 'Flanger/modulation for 80s lead movement, grunge texture, and dramatic clean effects.' },
      { name: 'Behringer Vintage Delay VD400', role: 'Analog-style delay for slapback, lead thickening, ambient repeats, and classic delay sounds.' },
      { name: 'Saphue Classic Chorus', role: 'Chorus for clean shimmer, pop-punk cleans, 80s color, and wide rhythm parts.' },
      { name: 'Kmise Spring Reverb', role: 'Spring-style reverb for surfy cleans, room depth, worship ambience, and vintage feel.' },
      { name: 'Kmise mini drive', role: 'Mini overdrive/boost option for pushing a small amp or tightening punk/crunch tones.' },
    ],
    pedals: [
      'Joyo Dark Flame', 'Danelectro FAB Distortion', 'Danelectro FAB Flanger', 'Behringer Vintage Delay VD400',
      'Saphue Classic Chorus', 'Kmise Spring Reverb', 'Kmise mini drive',
      'Boss DS-1', 'Boss SD-1', 'Ibanez Tube Screamer', 'Pro Co RAT', 'Electro-Harmonix Big Muff',
      'Boss Metal Zone', 'MXR Phase 90', 'Boss CE-2 Chorus', 'Boss DD-7 Delay', 'Strymon BigSky',
      'Boss NS-2 Noise Suppressor', 'MXR 10-Band EQ', 'Dunlop Cry Baby Wah',
      'Line 6 Helix', 'Fender Mustang LT25',
    ],
    pedals: [
      'Boss DS-1', 'Boss SD-1', 'Ibanez Tube Screamer', 'Pro Co RAT', 'Electro-Harmonix Big Muff',
      'Boss Metal Zone', 'MXR Phase 90', 'Boss CE-2 Chorus', 'Boss DD-7 Delay', 'Strymon BigSky',
      'Boss NS-2 Noise Suppressor', 'MXR 10-Band EQ', 'Dunlop Cry Baby Wah',
      'SAPHUE Classic Chorus', 'Rowin Spring Reverb', 'KMISE Analog Delay', 'Behringer Vintage Delay VD400',
      'Danelectro FAB Flange', 'Danelectro FAB Distortion', 'JOYO Dark Flame',
    ],
    featuredPedals: [
      { name: 'SAPHUE Classic Chorus', role: 'Featured modulation pedal for clean, punk-clean, worship, and wide chorus tones.' },
      { name: 'Rowin Spring Reverb', role: 'Featured reverb pedal for surfy spring ambience, cleans, leads, and room feel.' },
      { name: 'KMISE Analog Delay', role: 'Featured delay pedal for slapback, short lead delay, and ambient repeats.' },
      { name: 'Behringer Vintage Delay VD400', role: 'Featured analog-style delay for slapback, classic lead repeats, and darker echoes.' },
      { name: 'Danelectro FAB Flange', role: 'Featured flanger for 80s leads, grunge textures, and movement.' },
      { name: 'Danelectro FAB Distortion', role: 'Featured distortion pedal for punk, grunge, and practice-amp drive.' },
      { name: 'JOYO Dark Flame', role: 'Featured high-gain distortion for metal, modern rhythm, and heavier punk tones.' },
    ],
    mustangLt25: {
      type: 'modeling practice combo amp',
      power: '25 watts',
      speaker: '1x8',
      notes: 'Has built-in amp models/effects, best for home practice, and should avoid too much bass because of the small speaker.',
    },
    squierChamp15: {
      type: 'small solid-state practice combo amp',
      power: '15 watts',
      speaker: 'small combo speaker',
      notes: 'Simple home-practice amp support: keep bass controlled, use moderate gain, and rely on pedals for heavier song tones when available.',
    },
  };

  const songToneDatabase = [
    tone('Metallica-style rhythm tone', 'Metallica', 'Metal', 'High-gain humbucker', 'Mesa/5150 high gain', 'Tube Screamer, noise gate', 'Tight palm-muted rhythm with fast attack.', 8, 5, 6, 4),
    tone('Metallica-style clean tone', 'Metallica', 'Clean', 'Single-coil-ish clean guitar', 'JC-120/Fender clean', 'Chorus, reverb', 'Scooped clean shimmer with chorus.', 3, 5, 6, 5),
    tone('Green Day-style punk tone', 'Green Day', 'Punk', 'P90 or humbucker bridge', 'Marshall JCM800', 'Overdrive', 'Mid-forward punk crunch.', 7, 6, 6, 4),
    tone('Good Charlotte-style pop punk tone', 'Good Charlotte', 'Punk', 'P90 or humbucker bridge', 'Modern Marshall crunch', 'Overdrive, light gate', 'Punchy pop-punk rhythm.', 7, 6, 6, 4),
    tone('Nirvana-style grunge tone', 'Nirvana', 'Grunge', 'Offset or humbucker guitar', 'Fender/Marshall mix', 'Distortion or fuzz', 'Raw, less-polished distorted grunge.', 7, 6, 5, 5),
    tone('AC/DC-style classic rock tone', 'AC/DC', 'Crunch', 'SG-style bridge humbucker', 'Marshall Plexi', 'Minimal boost', 'Open classic-rock crunch.', 6, 7, 6, 5),
    tone('Guns N’ Roses-style lead tone', 'Guns N’ Roses', 'Lead', 'Les Paul bridge humbucker', 'Hot Marshall', 'Delay, EQ', 'Singing mid-heavy lead.', 7, 6, 6, 5),
    tone('Van Halen-style brown sound', 'Van Halen', 'Lead', 'Superstrat humbucker', 'Hot Plexi', 'Phase, short delay', 'Chewy brown-sound lead.', 7, 6, 6, 5),
    tone('Blink-182-style punk tone', 'Blink-182', 'Punk', 'Bridge humbucker', 'Mesa/Marshall', 'OD, gate', 'Tight bright punk rhythm.', 7, 6, 6, 4),
    tone('Black Sabbath-style doom tone', 'Black Sabbath', 'Metal', 'SG bridge pickup', 'Laney-style amp', 'Treble boost', 'Dark heavy doom riff tone.', 7, 6, 5, 6),
    tone('Pink Floyd-style ambient lead', 'Pink Floyd', 'Ambient', 'Strat neck pickup', 'Hiwatt/Fender clean', 'Delay, reverb, modulation', 'Wide ambient lead sustain.', 4, 6, 6, 5),
    tone('John Mayer-style clean blues', 'John Mayer', 'Blues', 'Strat neck pickup', 'Fender clean', 'Compressor, light reverb', 'Touch-sensitive clean blues.', 3, 6, 6, 5),
    tone('Foo Fighters-style rock tone', 'Foo Fighters', 'Crunch', 'Bridge humbucker', 'Marshall/Vox crunch', 'Overdrive', 'Dense rock crunch.', 6, 6, 6, 5),
    tone('Deftones-style heavy clean/metal tone', 'Deftones', 'Metal', 'Bridge humbucker', '5150/Rectifier', 'Delay, chorus', 'Atmospheric heavy clean-to-metal texture.', 7, 5, 6, 5),
    tone('Slipknot-style modern metal tone', 'Slipknot', 'Metal', 'Active bridge pickup', '5150-style high gain', 'Gate, OD', 'Aggressive tight modern metal.', 9, 5, 6, 4),
    tone('Pantera-style metal tone', 'Pantera', 'Metal', 'Bridge humbucker', 'Solid-state/5150-style', 'Gate, EQ', 'Scooped razor rhythm.', 9, 5, 7, 3),
    tone('Queen-style lead tone', 'Queen', 'Lead', 'Treble-heavy bridge pickup', 'Vox AC30', 'Delay, treble boost', 'Vocal classic lead.', 6, 7, 7, 4),
    tone('Weezer-style alt rock tone', 'Weezer', 'Crunch', 'Bridge humbucker', 'Marshall/Fender crunch', 'Distortion', 'Thick alt-rock crunch.', 7, 6, 6, 5),
    tone('My Chemical Romance-style emo rock tone', 'My Chemical Romance', 'Lead', 'Bridge humbucker', 'Marshall high gain', 'Delay, OD', 'Cutting emo-rock lead.', 7, 6, 6, 5),
    tone('Paramore-style pop rock tone', 'Paramore', 'Crunch', 'Bridge single coil or humbucker', 'Vox/Marshall crunch', 'OD, delay', 'Bright punchy pop-rock.', 6, 6, 7, 4),
    tone('Arctic Monkeys-style indie rock tone', 'Arctic Monkeys', 'Crunch', 'Single-coil bridge', 'Vox-style crunch', 'Overdrive', 'Snappy indie crunch.', 5, 6, 7, 4),
    tone('RHCP-style funk clean tone', 'RHCP', 'Funk', 'Strat middle/neck pickup', 'Fender clean', 'Compressor, chorus', 'Percussive funk clean.', 3, 7, 6, 4),
    tone('Worship clean tone', 'Worship', 'Worship', 'Single-coil neck pickup', 'Fender/modeling clean', 'Delay, reverb, chorus', 'Sparkly spacious clean.', 3, 6, 6, 5),
    tone('80s metal lead tone', 'Generic 80s', 'Lead', 'Bridge humbucker', 'Hot JCM800', 'Delay, chorus, gate', 'Sustained 80s lead.', 8, 6, 6, 4),
    tone('Modern metal rhythm tone', 'Modern Metal', 'Metal', 'Active bridge humbucker', '5150/Rectifier', 'Gate, OD', 'Tight modern rhythm tone.', 8, 5, 6, 3),
  ];

  const state = {
    tab: 'Gear Profile',
    status: '',
    error: '',
    profile: safeLoad('songToneProfile', DEFAULT_PROFILE),
    savedTones: safeLoad('songToneSavedTones', []),
    currentMatch: null,
  };

  function tone(song, artist, style, guitarType, ampType, pedals, description, gain, volume, treble, bass) {
    return {
      song,
      artist,
      style,
      original: { guitarType, ampType, pedals, description },
      base: { gain, volume, treble, bass, mids: 6 },
      slots: { stomp: 'Overdrive', modulation: 'None', delay: 'Short delay', reverb: 'Room' },
    };
  }

  function start() {
    renderShell();
  }

  function renderShell() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
      <h1>Song Tone Match MVP</h1>
      <p class="small">No subscription • No paywall • No login • No backend • Opens directly from index.html</p>
      <div class="tabs">${['Gear Profile', 'Song Tone Match', 'Saved Tones', 'Gear Library', 'About'].map((tab) => `<button class="${state.tab === tab ? 'active' : ''}" data-tab="${tab}">${tab}</button>`).join('')}</div>
      <div id="status" class="status">${escapeHtml(state.status)}</div>
      ${state.error ? `<div class="error">${escapeHtml(state.error)}</div>` : ''}
      <main id="view"></main>
      <footer>Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.</footer>
    `;
    app.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        state.tab = button.dataset.tab;
        state.status = '';
        state.error = '';
        renderShell();
      });
    });
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const view = document.getElementById('view');
    if (!view) return;
    if (state.tab === 'Gear Profile') renderGearProfile(view);
    if (state.tab === 'Song Tone Match') renderSongToneMatch(view);
    if (state.tab === 'Saved Tones') renderSavedTones(view);
    if (state.tab === 'Gear Library') renderGearLibrary(view);
    if (state.tab === 'About') renderAbout(view);
  }

  function renderGearProfile(view) {
    view.innerHTML = `
      <section class="card">
        <h2>Gear Profile</h2>
        <p class="small">Save your actual gear once, then every song tone match adapts to it.</p>
        <div class="grid">
          ${field('guitar', 'Guitar', state.profile.guitar)}
          <label>Pickup type<select id="pickupType">${['Single coil', 'Humbucker', 'P90', 'Active pickups', 'Acoustic pickup'].map((pickup) => `<option ${state.profile.pickupType === pickup ? 'selected' : ''}>${pickup}</option>`).join('')}</select></label>
          ${field('amp', 'Amp', state.profile.amp)}
          ${field('speaker', 'Speaker/cab', state.profile.speaker)}
          ${field('pedalsOwned', 'Pedals owned', state.profile.pedalsOwned)}
          ${field('skillLevel', 'Skill level', state.profile.skillLevel)}
        </div>
        <label>Notes<textarea id="notes">${escapeHtml(state.profile.notes)}</textarea></label>
        <div class="row">
          <button class="primary big" id="saveProfile">Save Profile</button>
          <button id="loadProfile">Load Profile</button>
          <button id="resetProfile">Reset to My Default Gear</button>
        </div>
      </section>
    `;
    byId('saveProfile').addEventListener('click', saveProfile);
    byId('loadProfile').addEventListener('click', loadProfile);
    byId('resetProfile').addEventListener('click', resetProfile);
  }

  function renderSongToneMatch(view) {
    view.innerHTML = `
      <section class="card">
        <h2>Song Tone Match</h2>
        <p class="small">Search the local MVP database, or type anything and the app will estimate from artist/title/style.</p>
        <div class="grid">
          ${field('songTitle', 'Song title', '')}
          ${field('artist', 'Artist', '')}
          <label>Tone style<select id="toneStyle">${['Clean', 'Crunch', 'Punk', 'Metal', 'Lead', 'Ambient', 'Grunge', 'Blues', 'Funk', 'Worship'].map((style) => `<option>${style}</option>`).join('')}</select></label>
        </div>
        <button class="primary big" id="matchTone">Match Tone To My Gear</button>
      </section>
      ${state.currentMatch ? renderMatchResult(state.currentMatch) : ''}
    `;
    byId('matchTone').addEventListener('click', matchTone);
    const saveButton = byId('saveTone');
    if (saveButton) saveButton.addEventListener('click', saveCurrentTone);
  }

  function renderMatchResult(match) {
    const adapted = match.adapted;
    return `
      <section class="card">
        <h2 class="result-title">Matched Tone Card</h2>
        <div class="grid">
          <div class="card">
            <h3>A. Original Tone Estimate</h3>
            <p><b>Artist/song:</b> ${escapeHtml(match.original.artist)} — ${escapeHtml(match.original.song)}</p>
            <p><b>Original likely guitar:</b> ${escapeHtml(match.original.original.guitarType)}</p>
            <p><b>Original likely amp:</b> ${escapeHtml(match.original.original.ampType)}</p>
            <p><b>Original likely effects:</b> ${escapeHtml(match.original.original.pedals)}</p>
            <p>${escapeHtml(match.original.original.description)}</p>
          </div>
          <div class="card">
            <h3>B. Adapted To My Gear</h3>
            <p><b>Recommended amp/model setup:</b> ${escapeHtml(adapted.ampModel)}</p>
            <p><b>Recommended LT25 amp model style:</b> ${escapeHtml(adapted.ampModel)}</p>
            ${slider('Gain', adapted.gain)}
            ${slider('Volume', adapted.volume)}
            ${slider('Treble', adapted.treble)}
            ${slider('Bass', adapted.bass)}
            <p><b>Stomp:</b> ${escapeHtml(adapted.slots.stomp)}</p>
            <p><b>Modulation:</b> ${escapeHtml(adapted.slots.modulation)}</p>
            <p><b>Delay:</b> ${escapeHtml(adapted.slots.delay)}</p>
            <p><b>Reverb:</b> ${escapeHtml(adapted.slots.reverb)}</p>
            <p><b>Using your pedals:</b> ${adapted.ownedPedalsUsed.length ? adapted.ownedPedalsUsed.map(escapeHtml).join(', ') : 'No matching owned pedals listed; using amp/built-in effect suggestions.'}</p>
            <p><b>Pickup suggestion:</b> ${escapeHtml(adapted.pickup)}</p>
            <p><b>Guitar volume/tone knobs:</b> ${escapeHtml(adapted.knobs)}</p>
            <p><b>Playing tips:</b> ${escapeHtml(adapted.playingTips)}</p>
          </div>
        </div>
        <div class="card">
          <h3>C. Explanation</h3>
          <ul>${adapted.explanation.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
        </div>
        <div class="row">
          <input id="toneName" placeholder="Name this matched tone" />
          <button class="primary big" id="saveTone">Save Matched Tone</button>
        </div>
      </section>
    `;
  }

  function renderSavedTones(view) {
    view.innerHTML = `
      <section class="card">
        <h2>Saved Tones</h2>
        <p class="small">Matched tones are stored in localStorage and survive refreshes on this browser.</p>
        ${state.savedTones.length ? state.savedTones.map((saved, index) => `
          <div class="card">
            <h3>${escapeHtml(saved.name)}</h3>
            <p>${escapeHtml(saved.match.original.artist)} — ${escapeHtml(saved.match.original.song)}</p>
            <div class="row">
              <button data-load-tone="${index}">Load saved tone</button>
              <button data-delete-tone="${index}">Delete</button>
            </div>
          </div>
        `).join('') : '<p>No saved tones yet. Match a tone, then click Save Matched Tone.</p>'}
      </section>
    `;
    view.querySelectorAll('[data-load-tone]').forEach((button) => button.addEventListener('click', () => loadSavedTone(Number(button.dataset.loadTone))));
    view.querySelectorAll('[data-delete-tone]').forEach((button) => button.addEventListener('click', () => deleteSavedTone(Number(button.dataset.deleteTone))));
  }

  function renderGearLibrary(view) {
    view.innerHTML = `
      <section class="card">
        <h2>Gear Library</h2>
        <h3>Guitars</h3>
        ${gearLibrary.guitars.map((guitar) => `<p><span class="pill">${escapeHtml(guitar.name)}</span> ${escapeHtml(guitar.details)}</p>`).join('')}
        <h3>Common amps</h3>
        <p>${gearLibrary.amps.map((amp) => `<span class="pill">${escapeHtml(amp)}</span>`).join('')}</p>
        <h3>Featured pedals from your board</h3>
        ${gearLibrary.featuredPedals.map((pedal) => `<p><span class="pill">${escapeHtml(pedal.name)}</span> ${escapeHtml(pedal.role)}</p>`).join('')}
        <h3>Common pedals</h3>
        <p>${gearLibrary.pedals.map((pedal) => `<span class="pill">${escapeHtml(pedal)}</span>`).join('')}</p>
        <h3>Special supported amp: Fender Mustang LT25</h3>
        <p><b>Type:</b> ${gearLibrary.mustangLt25.type}</p>
        <p><b>Power:</b> ${gearLibrary.mustangLt25.power}</p>
        <p><b>Speaker:</b> ${gearLibrary.mustangLt25.speaker}</p>
        <p>${gearLibrary.mustangLt25.notes}</p>
        <h3>Special supported amp: Fender Squier Champ 15</h3>
        <p><b>Type:</b> ${gearLibrary.squierChamp15.type}</p>
        <p><b>Power:</b> ${gearLibrary.squierChamp15.power}</p>
        <p><b>Speaker:</b> ${gearLibrary.squierChamp15.speaker}</p>
        <p>${gearLibrary.squierChamp15.notes}</p>
      </section>
    `;
  }

  function renderAbout(view) {
    view.innerHTML = `
      <section class="card">
        <h2>About</h2>
        <p><b>Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.</b></p>
        <p>This MVP uses a local tone database and rule-based adaptation.</p>
        <p>It does not pull real-time internet data yet.</p>
        <p>It gives estimated settings to help users get close to a tone.</p>
        <p>Future versions could add online lookup or AI tone research.</p>
        <p class="small">Live input may require localhost or HTTPS.</p>
      </section>
    `;
  }

  function saveProfile() {
    try {
      state.profile = readProfileFromForm();
      safeSave('songToneProfile', state.profile);
      state.status = 'Profile saved.';
      state.error = '';
      renderShell();
    } catch (error) {
      showError(error);
    }
  }

  function loadProfile() {
    try {
      state.profile = safeLoad('songToneProfile', DEFAULT_PROFILE);
      state.status = 'Profile loaded.';
      state.error = '';
      renderShell();
    } catch (error) {
      showError(error);
    }
  }

  function resetProfile() {
    state.profile = { ...DEFAULT_PROFILE };
    state.status = 'Reset to My Default Gear.';
    state.error = '';
    renderShell();
  }

  function matchTone() {
    try {
      const query = {
        song: byId('songTitle').value.trim(),
        artist: byId('artist').value.trim(),
        style: byId('toneStyle').value,
      };
      const original = findOriginalTone(query);
      state.currentMatch = { query, original, adapted: adaptToProfile(original, state.profile, query.style) };
      state.status = 'Tone matched.';
      state.error = '';
      renderShell();
    } catch (error) {
      showError(error);
    }
  }

  function saveCurrentTone() {
    try {
      if (!state.currentMatch) throw new Error('Match a tone before saving.');
      const nameInput = byId('toneName');
      const fallbackName = `${state.currentMatch.original.artist} - ${state.currentMatch.original.song}`;
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : fallbackName;
      state.savedTones.push({ name, match: clone(state.currentMatch) });
      safeSave('songToneSavedTones', state.savedTones);
      state.status = 'Matched tone saved.';
      state.error = '';
      renderShell();
    } catch (error) {
      showError(error);
    }
  }

  function loadSavedTone(index) {
    const saved = state.savedTones[index];
    if (!saved) return;
    state.currentMatch = clone(saved.match);
    state.tab = 'Song Tone Match';
    state.status = 'Saved tone loaded.';
    state.error = '';
    renderShell();
  }

  function deleteSavedTone(index) {
    try {
      state.savedTones.splice(index, 1);
      safeSave('songToneSavedTones', state.savedTones);
      state.status = 'Saved tone deleted.';
      state.error = '';
      renderShell();
    } catch (error) {
      showError(error);
    }
  }

  function findOriginalTone(query) {
    const song = query.song.toLowerCase();
    const artist = query.artist.toLowerCase();
    const exact = songToneDatabase.find((entry) => entry.song.toLowerCase() === song && entry.artist.toLowerCase() === artist);
    if (exact) return exact;
    const artistMatch = artist ? songToneDatabase.find((entry) => entry.artist.toLowerCase().includes(artist) || artist.includes(entry.artist.toLowerCase())) : null;
    if (artistMatch) return { ...artistMatch, song: query.song || artistMatch.song };
    const styleMatch = songToneDatabase.find((entry) => entry.style.toLowerCase() === query.style.toLowerCase());
    if (styleMatch) return { ...styleMatch, song: query.song || `${query.style} style tone`, artist: query.artist || 'Estimated' };
    return songToneDatabase[0];
  }

  function adaptToProfile(entry, profile, selectedStyle) {
    const settings = clone(entry.base);
    const slots = { ...entry.slots };
    const style = (entry.style || selectedStyle || '').toLowerCase();
    const pickupType = (profile.pickupType || '').toLowerCase();
    const amp = (profile.amp || '').toLowerCase();
    const pedalsText = (profile.pedalsOwned || '').toLowerCase();
    const ownsPedals = Boolean(pedalsText.trim());
    const ownedPedalsUsed = [];
    const explanation = [];

    const hasPedal = (...terms) => terms.some((term) => pedalsText.includes(term));
    const useOwnedPedal = (slot, label, terms) => {
      if (!hasPedal(...terms)) return false;
      slots[slot] = label;
      ownedPedalsUsed.push(label);
      return true;
    };
    const addOwnedPedal = (label, terms) => {
      if (!hasPedal(...terms)) return false;
      ownedPedalsUsed.push(label);
      return true;
    };
    const ownsPedals = Boolean((profile.pedalsOwned || '').trim());
    const explanation = [];
    let pickup = 'bridge';
    let ampModel = style.includes('clean') || style.includes('ambient') || style.includes('worship') ? 'Clean Deluxe' : 'British Crunch';

    if (style.includes('punk')) {
      settings.gain = Math.max(6, settings.gain);
      settings.bass = Math.min(5, settings.bass);
      settings.mids = 7;
      slots.reverb = 'Low room';
      pickup = 'bridge';
      explanation.push('Punk/pop-punk tones need bridge pickup, medium/high gain, tight bass, strong mids, and low/moderate reverb.');
    }
    if (style.includes('metal')) {
      settings.gain = Math.max(8, settings.gain);
      settings.bass = Math.min(5, settings.bass);
      slots.stomp = 'Overdrive + Noise Gate';
      pickup = 'bridge';
      ampModel = 'Modern Metal';
      explanation.push('Metal tones need higher gain, a noise gate, tight bass, and a focused bridge-pickup attack.');
    }
    if (style.includes('clean') || style.includes('blues') || style.includes('funk') || style.includes('worship')) {
      settings.gain = Math.min(4, settings.gain);
      slots.stomp = style.includes('funk') ? 'Compressor' : 'Light compressor';
      slots.reverb = style.includes('worship') ? 'Large hall' : 'Plate/room';
      if (slots.modulation === 'None') slots.modulation = style.includes('funk') ? 'Optional auto-wah/chorus' : 'Light chorus';
      pickup = style.includes('funk') ? 'middle' : 'neck';
      explanation.push('Clean-style tones reduce gain and use compression/reverb, with chorus or modulation when useful.');
    }
    if (style.includes('grunge')) {
      slots.stomp = 'Distortion/Fuzz';
      settings.mids = 7;
      pickup = 'bridge';
      explanation.push('Grunge tones use distortion/fuzz, more mids, and a less polished response.');
    }
    if (style.includes('ambient')) {
      settings.gain = Math.min(4, settings.gain);
      slots.delay = 'Long delay';
      slots.reverb = 'Large hall';
      slots.modulation = 'Chorus';
      pickup = 'neck';
      explanation.push('Ambient tones use a clean amp with delay, reverb, and modulation.');
    }

    if (ownsPedals) {
      if (style.includes('metal')) {
        useOwnedPedal('stomp', 'Joyo Dark Flame for main high gain', ['joyo dark flame', 'dark flame'])
        useOwnedPedal('stomp', 'JOYO Dark Flame for high-gain distortion', ['dark flame', 'joyo'])
          || useOwnedPedal('stomp', 'Danelectro FAB Distortion for main distortion', ['fab distortion', 'danelectro distortion'])
          || useOwnedPedal('stomp', 'Ibanez Tube Screamer as a tight boost', ['tube screamer', 'ts9', 'ibanez'])
          || useOwnedPedal('stomp', 'Boss SD-1 as a tight boost', ['sd-1', 'super overdrive'])
          || useOwnedPedal('stomp', 'Boss Metal Zone for main high gain', ['metal zone', 'mt-2'])
          || useOwnedPedal('stomp', 'Boss DS-1 for distortion', ['ds-1', 'boss ds']);
        if (hasPedal('ns-2', 'noise suppressor', 'noise gate')) {
          slots.stomp = `${slots.stomp} + Boss NS-2 Noise Suppressor`;
          ownedPedalsUsed.push('Boss NS-2 Noise Suppressor');
        }
      }
      if (style.includes('punk') || style.includes('crunch') || style.includes('lead')) {
        useOwnedPedal('stomp', 'Danelectro FAB Distortion for crunchy drive', ['fab distortion', 'danelectro fab distortion'])
          || useOwnedPedal('stomp', 'Kmise mini drive as a boost/overdrive', ['kmise mini drive', 'kmise drive', 'mini drive'])
        useOwnedPedal('stomp', 'Danelectro FAB Distortion for crunchy punk drive', ['fab distortion', 'danelectro distortion'])
          || useOwnedPedal('stomp', 'JOYO Dark Flame with gain backed down for tight crunch', ['dark flame', 'joyo'])
          || useOwnedPedal('stomp', 'Boss DS-1 for crunchy drive', ['ds-1', 'boss ds'])
          || useOwnedPedal('stomp', 'Boss SD-1 for pushed mids', ['sd-1', 'super overdrive'])
          || useOwnedPedal('stomp', 'Pro Co RAT for raw drive', ['rat', 'pro co'])
          || useOwnedPedal('stomp', 'Ibanez Tube Screamer for mid push', ['tube screamer', 'ts9', 'ibanez']);
      }
      if (style.includes('grunge')) {
        useOwnedPedal('stomp', 'Danelectro FAB Distortion for grunge distortion', ['fab distortion', 'danelectro fab distortion'])
        useOwnedPedal('stomp', 'Danelectro FAB Distortion for raw grunge drive', ['fab distortion', 'danelectro distortion'])
          || useOwnedPedal('stomp', 'JOYO Dark Flame with lower gain for heavy grunge', ['dark flame', 'joyo'])
          || useOwnedPedal('stomp', 'Pro Co RAT for grunge distortion', ['rat', 'pro co'])
          || useOwnedPedal('stomp', 'Boss DS-1 for grunge distortion', ['ds-1', 'boss ds'])
          || useOwnedPedal('stomp', 'Electro-Harmonix Big Muff for fuzz', ['big muff', 'muff']);
      }
      if (style.includes('clean') || style.includes('funk') || style.includes('blues')) {
        useOwnedPedal('modulation', 'Saphue Classic Chorus lightly mixed', ['saphue', 'classic chorus'])
          || useOwnedPedal('modulation', 'Danelectro FAB Flanger very subtle', ['fab flanger', 'danelectro fab flanger', 'flanger'])
        useOwnedPedal('modulation', 'SAPHUE Classic Chorus lightly mixed', ['saphue', 'classic chorus'])
          || useOwnedPedal('modulation', 'Danelectro FAB Flange for movement', ['fab flange', 'flange', 'flanger'])
          || useOwnedPedal('modulation', 'Boss CE-2 Chorus lightly mixed', ['ce-2', 'chorus'])
          || useOwnedPedal('modulation', 'MXR Phase 90 subtle movement', ['phase 90', 'phaser']);
        if (hasPedal('cry baby', 'wah')) {
          ownedPedalsUsed.push('Dunlop Cry Baby Wah');
          explanation.push('Your wah pedal can help funk/blues tones when used subtly before drive.');
        }
      }
      if (style.includes('ambient') || style.includes('worship') || style.includes('lead')) {
        useOwnedPedal('delay', 'Behringer Vintage Delay VD400', ['vd400', 'vintage delay', 'behringer vintage delay'])
          || useOwnedPedal('delay', 'Boss DD-7 Delay', ['dd-7', 'delay'])
          || useOwnedPedal('delay', 'Use your delay pedal for repeats', ['timeline', 'echo']);
        useOwnedPedal('reverb', 'Kmise Spring Reverb', ['kmise spring reverb', 'spring reverb'])
        useOwnedPedal('delay', 'KMISE Analog Delay for repeats', ['kmise', 'analog delay'])
          || useOwnedPedal('delay', 'Behringer Vintage Delay VD400 for darker repeats', ['vd400', 'vintage delay', 'behringer delay'])
          || useOwnedPedal('delay', 'Boss DD-7 Delay', ['dd-7', 'delay'])
          || useOwnedPedal('delay', 'Use your delay pedal for repeats', ['timeline', 'echo']);
        useOwnedPedal('reverb', 'Rowin Spring Reverb for amp-like space', ['rowin', 'spring reverb'])
          || useOwnedPedal('reverb', 'Strymon BigSky / owned reverb', ['bigsky', 'big sky', 'reverb']);
      }
      if (hasPedal('10-band', '10 band', 'mxr eq', 'eq')) {
        ownedPedalsUsed.push('MXR 10-Band EQ');
        explanation.push('Your EQ pedal can fine-tune the final tone: lower boomy lows and add presence/mids as needed.');
      }
      if (ownedPedalsUsed.length) {
        explanation.push(`The pedal plan was adapted from your owned pedals field: ${[...new Set(ownedPedalsUsed)].join(', ')}.`);
      } else {
        explanation.push('You listed pedals, but the app did not recognize exact supported names yet, so it kept amp/built-in effect suggestions. Try names like Joyo Dark Flame, FAB Distortion, FAB Flanger, Vintage Delay VD400, Saphue Classic Chorus, Kmise Spring Reverb, Boss DS-1, Tube Screamer, RAT, Big Muff, DD-7, BigSky, NS-2, CE-2, Phase 90, or MXR 10-Band EQ.');
        explanation.push('You listed pedals, but the app did not recognize exact supported names yet, so it kept amp/built-in effect suggestions. Try names like JOYO Dark Flame, FAB Distortion, SAPHUE Classic Chorus, Rowin Spring Reverb, KMISE Analog Delay, Behringer VD400, Boss DS-1, Tube Screamer, RAT, Big Muff, DD-7, BigSky, NS-2, CE-2, Phase 90, or MXR 10-Band EQ.');
      }
    }

    if (pickupType === 'p90') {
      settings.mids = Math.min(8, (settings.mids || 6) + 1);
      settings.treble = Math.max(4, settings.treble - 1);
      if (settings.gain >= 8 && !slots.stomp.toLowerCase().includes('gate')) slots.stomp += ' + Noise Gate';
      explanation.push('Your P90 pickup gets extra mids, slightly smoother treble, and a punchy attack; high-gain sounds add gate help.');
    }
    if (amp.includes('fender mustang lt25')) {
      settings.bass = Math.max(3, settings.bass - 1);
      settings.treble = Math.min(8, settings.treble + 1);
      settings.gain = Math.min(8, settings.gain);
      explanation.push('Your Fender Mustang LT25 has a 1x8 speaker, so bass is reduced, treble/clarity is raised, and extreme gain is avoided to reduce fizz.');
      if (!ownsPedals) explanation.push('Because no external pedals are listed, the recommendation uses LT25 built-in effect slots.');
    }
    if (amp.includes('squier champ 15') || amp.includes('champ 15')) {
      ampModel = settings.gain >= 6 ? 'Drive channel / overdrive pedal into clean channel' : 'Clean channel with pedals as needed';
      settings.bass = Math.max(2, settings.bass - 2);
      settings.treble = Math.min(8, settings.treble + 1);
      settings.gain = Math.min(7, settings.gain);
      if (!ownsPedals && settings.gain >= 6) slots.stomp = 'Use amp drive; add distortion/OD pedal later if needed';
      explanation.push('Your Fender Squier Champ 15 is treated as a small practice combo, so bass is reduced more aggressively, gain is capped to avoid fizz, and pedals are recommended for heavier song tones.');
    }

    return {
      ampModel,
      gain: clamp10(settings.gain),
      volume: clamp10(settings.volume),
      treble: clamp10(settings.treble),
      bass: clamp10(settings.bass),
      slots,
      ownedPedalsUsed: [...new Set(ownedPedalsUsed)],
      pickup,
      knobs: style.includes('clean') ? 'Volume 8-10, tone 7-10 for clarity.' : 'Volume 8-10, tone 6-8; roll tone down if the small speaker sounds sharp.',
      playingTips: style.includes('punk') || style.includes('metal') ? 'Use firm downstrokes, tight palm muting, and bridge pickup attack.' : 'Match the dynamics: lighter picking for cleans, stronger pick attack for leads and crunch.',
      explanation,
    };
  }

  function field(id, label, value) {
    return `<label>${label}<input id="${id}" value="${escapeHtml(value)}" placeholder="${label}" /></label>`;
  }

  function slider(label, value) {
    return `<div class="slider"><span>${label}</span><input type="range" min="0" max="10" value="${value}" disabled /><b>${value}</b></div>`;
  }

  function readProfileFromForm() {
    return {
      guitar: byId('guitar').value,
      pickupType: byId('pickupType').value,
      amp: byId('amp').value,
      speaker: byId('speaker').value,
      pedalsOwned: byId('pedalsOwned').value,
      skillLevel: byId('skillLevel').value,
      notes: byId('notes').value,
    };
  }

  function safeLoad(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : clone(fallback);
    } catch (error) {
      return clone(fallback);
    }
  }

  function safeSave(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error('localStorage save failed. Your browser may be blocking local file storage.');
    }
  }

  function showError(error) {
    state.error = error && error.message ? error.message : 'Something went wrong.';
    state.status = '';
    renderShell();
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp10(value) {
    return Math.max(0, Math.min(10, Math.round(Number(value) || 0)));
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}());
document.addEventListener('DOMContentLoaded',()=>{try{boot()}catch(e){document.getElementById('app').innerHTML=`<h1>Song Tone Match MVP</h1><div class='error'>Startup error: ${e.message}</div>`}})
function boot(){
const defaultProfile={guitar:'Benji Madden Signature',pickupType:'P90',amp:'Fender Mustang LT25',speaker:'1x8 combo speaker',pedalsOwned:'',skillLevel:'Beginner',notes:'beginner/home practice setup'}
const gearLibrary={guitars:['Benji Madden Signature','Fender Stratocaster','Fender Telecaster','Gibson Les Paul','Gibson SG','PRS Custom 24','Ibanez RG','Jackson Soloist','ESP LTD EC-1000'],amps:['Fender Twin Reverb','Fender Deluxe Reverb','Vox AC30','Marshall Plexi','Marshall JCM800','Mesa Boogie Dual Rectifier','Peavey 5150','EVH 5150III','Orange Rockerverb','Boss Katana','Line 6 Helix','Fender Mustang LT25'],pedals:['Boss DS-1','Boss SD-1','Ibanez Tube Screamer','Pro Co RAT','Electro-Harmonix Big Muff','Boss Metal Zone','MXR Phase 90','Boss CE-2 Chorus','Boss DD-7 Delay','Strymon BigSky','Boss NS-2 Noise Suppressor','MXR 10-Band EQ','Dunlop Cry Baby Wah']}
const songToneDatabase=[
mk('Metallica-style rhythm tone','Metallica','Metal','Mesa/5150','High-gain humbucker','Tube Screamer, Noise Gate','Tight palm-muted metal rhythm',8,4,6,4),mk('Metallica-style clean tone','Metallica','Clean','JC-120/Fender clean','Single coil-ish clean','Chorus, Reverb','Scooped clean with shimmer',3,5,6,5),mk('Green Day-style punk tone','Green Day','Punk','Marshall JCM800','P90/HB bridge','Overdrive','Mid-forward punk crunch',7,6,6,4),mk('Good Charlotte-style pop punk tone','Good Charlotte','Punk','Modern Marshall','P90/HB bridge','Overdrive, Gate','Punchy pop-punk grind',7,6,6,4),mk('Nirvana-style grunge tone','Nirvana','Grunge','Fender/Marshall mix','Offset/humbucker','Distortion/Fuzz','Raw fuzzy grunge',7,6,5,5),mk('AC/DC-style classic rock tone','AC/DC','Crunch','Marshall Plexi','SG bridge','None/boost','Open classic crunch',6,7,6,5),mk('Guns N’ Roses-style lead tone','Guns N’ Roses','Lead','Marshall modded','Les Paul bridge','Delay, EQ','Singing mid-heavy lead',7,6,6,5),mk('Van Halen-style brown sound','Van Halen','Lead','Hot Plexi','Superstrat HB','Phase, Delay','Brown chewy lead',7,6,6,5),mk('Blink-182-style punk tone','Blink-182','Punk','Mesa/Marshall','HB bridge','OD, Gate','Tight bright punk',7,6,6,4),mk('Black Sabbath-style doom tone','Black Sabbath','Metal','Laney-style','SG bridge','Treble boost','Dark heavy doom',7,6,5,6),mk('Pink Floyd-style ambient lead','Pink Floyd','Ambient','Hiwatt/Fender','Strat neck','Delay, Reverb, Mod','Wide ambient lead',4,6,6,5),mk('John Mayer-style clean blues','John Mayer','Blues','Fender clean','Strat neck','Compressor, Reverb','Touch-sensitive clean blues',3,6,6,5),mk('Foo Fighters-style rock tone','Foo Fighters','Crunch','Marshall/Vox','HB bridge','OD','Dense rock crunch',6,6,6,5),mk('Deftones-style heavy clean/metal tone','Deftones','Metal','5150/Recto','HB bridge','Delay, Chorus','Atmospheric heavy',7,5,6,5),mk('Slipknot-style modern metal tone','Slipknot','Metal','5150','Active bridge','Gate, OD','Aggressive tight metal',9,5,6,4),mk('Pantera-style metal tone','Pantera','Metal','Solid-state/5150','HB bridge','Gate, EQ','Scooped razor rhythm',9,5,7,3),mk('Queen-style lead tone','Queen','Lead','Vox AC30','Treble-heavy bridge','Delay, Treble boost','Vocal classic lead',6,7,7,4),mk('Weezer-style alt rock tone','Weezer','Crunch','Marshall/Fender','HB bridge','Distortion','Thick alt crunch',7,6,6,5),mk('My Chemical Romance-style emo rock tone','My Chemical Romance','Lead','Marshall high gain','HB bridge','Delay, OD','Cutting emo lead',7,6,6,5),mk('Paramore-style pop rock tone','Paramore','Crunch','Vox/Marshall','Bridge single/HB','OD, Delay','Bright punchy pop-rock',6,6,7,4),mk('Arctic Monkeys-style indie rock tone','Arctic Monkeys','Crunch','Vox','Single bridge','OD','Snappy indie crunch',5,6,7,4),mk('RHCP-style funk clean tone','RHCP','Funk','Fender clean','Strat middle','Compressor, Chorus','Percussive funk clean',3,7,6,4),mk('Worship clean tone','Worship','Worship','Fender/Modeling clean','Single neck','Delay, Reverb, Chorus','Sparkly spacious clean',3,6,6,5),mk('80s metal lead tone','Generic 80s','Lead','JCM800 hot','HB bridge','Delay, Chorus, Gate','Sustained 80s lead',8,6,6,4),mk('Modern metal rhythm tone','Modern Metal','Metal','5150/Recto','Active HB bridge','Gate, OD','Tight djent-adjacent rhythm',8,5,6,3)
]
function mk(song,artist,style,amp,guitar,effects,desc,gain,vol,tre,bass){return{song,artist,style,original:{guitarType:guitar,ampType:amp,pedals:effects,description:desc},base:{gain,volume:vol,treble:tre,bass,mid:6,presence:6},slots:{stomp:'Overdrive',modulation:'None',delay:'Short delay',reverb:'Room'}}}
const st={tab:'Gear Profile',status:'',error:'',profile:load('profile',defaultProfile),saved:load('savedTones',[]),currentMatch:null}
render();
function render(){const app=document.getElementById('app');app.innerHTML=`<h1>Song Tone Match MVP</h1><div class='small'>No subscription • No paywall • No login • No backend</div><div class='tabs'>${['Gear Profile','Song Tone Match','Saved Tones','Gear Library','About'].map(t=>`<button class='${st.tab===t?'active':''}' data-tab='${t}'>${t}</button>`).join('')}</div><div id='status' class='status'>${st.status}</div>${st.error?`<div class='error'>${st.error}</div>`:''}<div id='view'></div>`;app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{st.tab=b.dataset.tab;st.status='';st.error='';renderView()});renderView()}
function renderView(){const v=document.getElementById('view');if(st.tab==='Gear Profile')return gearProfile(v);if(st.tab==='Song Tone Match')return toneMatch(v);if(st.tab==='Saved Tones')return savedTones(v);if(st.tab==='Gear Library')return library(v);about(v)}
function gearProfile(v){v.innerHTML=`<div class='card grid'><input id='guitar' value='${esc(st.profile.guitar)}' placeholder='Guitar'><select id='pickup'>${['Single coil','Humbucker','P90','Active pickups','Acoustic pickup'].map(p=>`<option ${st.profile.pickupType===p?'selected':''}>${p}</option>`).join('')}</select><input id='amp' value='${esc(st.profile.amp)}' placeholder='Amp'><input id='speaker' value='${esc(st.profile.speaker)}' placeholder='Speaker/cab'><input id='pedals' value='${esc(st.profile.pedalsOwned)}' placeholder='Pedals owned'><input id='skill' value='${esc(st.profile.skillLevel)}' placeholder='Skill level'><textarea id='notes' placeholder='Notes'>${esc(st.profile.notes)}</textarea></div><div class='row'><button class='primary' id='saveProfile'>Save Profile</button><button id='loadProfile'>Load Profile</button><button id='resetProfile'>Reset to My Default Gear</button></div>`
qs('#saveProfile').onclick=()=>{try{st.profile=readProfile();save('profile',st.profile);st.status='Profile saved.';st.error='';render()}catch(e){fail(e)}};qs('#loadProfile').onclick=()=>{try{st.profile=load('profile',defaultProfile);st.status='Profile loaded.';st.error='';render()}catch(e){fail(e)}};qs('#resetProfile').onclick=()=>{st.profile={...defaultProfile};st.status='Reset to My Default Gear.';render()}}
function toneMatch(v){const styles=['Clean','Crunch','Punk','Metal','Lead','Ambient','Grunge','Blues','Funk','Worship'];v.innerHTML=`<div class='card grid'><input id='song' placeholder='Song title'><input id='artist' placeholder='Artist'><select id='style'>${styles.map(s=>`<option>${s}</option>`).join('')}</select></div><button class='primary' id='match'>Match Tone To My Gear</button>${st.currentMatch?renderMatchCard(st.currentMatch):''}`;qs('#match').onclick=()=>{try{const q={song:qs('#song').value.trim(),artist:qs('#artist').value.trim(),style:qs('#style').value};const orig=findOrEstimate(q);const adapted=adaptToProfile(orig,st.profile,q.style);st.currentMatch={query:q,original:orig,adapted};st.error='';st.status='Tone matched.';render()}catch(e){fail(e)}}
if(st.currentMatch){const b=document.getElementById('saveTone');if(b)b.onclick=saveMatchTone}}
function renderMatchCard(m){const a=m.adapted;return `<div class='card'><h3>Original Tone Estimate</h3><p><b>${esc(m.original.song)}</b> — ${esc(m.original.artist)}</p><p>Likely guitar: ${esc(m.original.original.guitarType)}</p><p>Likely amp: ${esc(m.original.original.ampType)}</p><p>Likely pedals/effects: ${esc(m.original.original.pedals)}</p><p>${esc(m.original.original.description)}</p><h3>Adapted To My Gear</h3><p><b>Amp model:</b> ${esc(a.ampModel)}</p>${sliderView('Gain',a.gain)}${sliderView('Volume',a.volume)}${sliderView('Treble',a.treble)}${sliderView('Bass',a.bass)}<p><b>Effects slots:</b> Stomp=${esc(a.slots.stomp)}, Modulation=${esc(a.slots.modulation)}, Delay=${esc(a.slots.delay)}, Reverb=${esc(a.slots.reverb)}</p><p><b>Pickup suggestion:</b> ${esc(a.pickup)}</p><p><b>Guitar knob tips:</b> ${esc(a.knobs)}</p><p><b>Playing tips:</b> ${esc(a.playingTips)}</p><h3>Explanation</h3><ul>${a.explain.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class='row'><input id='toneName' placeholder='Tone name'><button class='primary' id='saveTone'>Save Matched Tone</button></div></div>`}
function sliderView(label,val){return `<div class='slider'><span>${label}</span><input type='range' min='0' max='10' value='${val}' disabled><b>${val}</b></div>`}
function savedTones(v){v.innerHTML=`<div>${st.saved.length?st.saved.map((t,i)=>`<div class='card'><b>${esc(t.name)}</b><div class='row'><button data-load='${i}'>Load</button><button data-del='${i}'>Delete</button></div></div>`).join(''):'<div class="card">No saved tones yet.</div>'}</div>`;v.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{st.currentMatch=st.saved[+b.dataset.load].match;st.tab='Song Tone Match';st.status='Saved tone loaded.';render()});v.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{try{st.saved.splice(+b.dataset.del,1);save('savedTones',st.saved);st.status='Saved tone deleted.';render()}catch(e){fail(e)}})
const btn=document.getElementById('saveTone');if(btn)btn.onclick=saveMatchTone}
function library(v){v.innerHTML=`<div class='card'><h3>Guitars</h3><p>${gearLibrary.guitars.join(', ')}</p><h3>Amps</h3><p>${gearLibrary.amps.join(', ')}</p><h3>Pedals</h3><p>${gearLibrary.pedals.join(', ')}</p><h3>Special Supported Amp: Fender Mustang LT25</h3><p>Type: modeling practice combo • Power: 25W • Speaker: 1x8 • Built-in amp models/effects • Best for home practice.</p></div>`}
function about(v){v.innerHTML=`<div class='card'><p><b>Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.</b></p><p>This MVP uses a local tone database and rule-based adaptation.</p><p>It does not pull real-time internet data yet.</p><p>It gives estimated settings to help users get close to a tone.</p><p>Future versions could add online lookup or AI tone research.</p><p class='small'>Live input may require localhost or HTTPS.</p></div>`}
function saveMatchTone(){try{if(!st.currentMatch)return;const name=(document.getElementById('toneName')||{}).value||`${st.currentMatch.query.artist||'Artist'} ${st.currentMatch.query.song||st.currentMatch.query.style}`;st.saved.push({name,match:st.currentMatch});save('savedTones',st.saved);st.status='Matched tone saved.';render()}catch(e){fail(e)}}
function findOrEstimate(q){const exact=songToneDatabase.find(s=>s.song.toLowerCase()===q.song.toLowerCase()&&s.artist.toLowerCase()===q.artist.toLowerCase());if(exact)return exact;const byArtist=songToneDatabase.find(s=>q.artist&&s.artist.toLowerCase().includes(q.artist.toLowerCase()));if(byArtist)return {...byArtist,song:q.song||byArtist.song};const byStyle=songToneDatabase.find(s=>s.style.toLowerCase()===q.style.toLowerCase());return byStyle?{...byStyle,song:q.song||`${q.style} style tone`,artist:q.artist||'Estimated'}:songToneDatabase[0]}
function adaptToProfile(entry,profile,style){const a=JSON.parse(JSON.stringify(entry.base));const explain=[];let pickup='bridge';let ampModel='Brit 80s';const slots={...entry.slots};
if(style.toLowerCase()==='punk'){a.gain=Math.max(6,a.gain);a.bass=Math.min(5,a.bass);a.mid=7;pickup='bridge';slots.reverb='Low room';explain.push('Punk style uses bridge pickup, tight bass, strong mids, and controlled reverb.')}
if(style.toLowerCase()==='metal'){a.gain=Math.max(8,a.gain);pickup='bridge';slots.stomp='Overdrive';explain.push('Metal style raises gain, keeps bass tight, and benefits from noise gate.')}
if(style.toLowerCase()==='clean'){a.gain=Math.min(4,a.gain);slots.stomp='Compressor';slots.reverb='Plate';if(slots.modulation==='None')slots.modulation='Chorus';explain.push('Clean style lowers gain and adds compression/reverb.')}
if(style.toLowerCase()==='grunge'){slots.stomp='Distortion/Fuzz';a.mid=7;explain.push('Grunge style adds fuzz/distortion and extra mids.')}
if(style.toLowerCase()==='ambient'){a.gain=Math.min(4,a.gain);slots.delay='Long delay';slots.reverb='Large hall';slots.modulation='Chorus';explain.push('Ambient style uses clean base plus delay, reverb, and modulation.')}
if((profile.pickupType||'').toLowerCase()==='p90'){a.mid=Math.min(8,(a.mid||6)+1);a.treble=Math.max(4,a.treble-1);explain.push('P90 profile: boosted mids, smoothed treble, kept attack punchy.');if(a.gain>=8)slots.stomp='Overdrive + Noise Gate'}
if((profile.amp||'').toLowerCase().includes('mustang lt25')){ampModel=style.toLowerCase().includes('metal')?'Modern Metal':'British Crunch';a.bass=Math.max(3,a.bass-1);a.treble=Math.min(8,a.treble+1);a.gain=Math.min(8,a.gain);explain.push('LT25 adaptation: reduced bass for 1x8 speaker, increased clarity, avoided fizzy extreme gain.');if(!(profile.pedalsOwned||'').trim())explain.push('No pedals listed: prioritizing LT25 built-in effects slots.')}
return {ampModel,gain:cl(a.gain),volume:cl(a.volume),treble:cl(a.treble),bass:cl(a.bass),slots,pickup,knobs:'Volume 8-10, Tone 6-8 (roll back to 5 for harsh highs).',playingTips:'Palm mute tightly for punk/metal; pick harder for punch; lighten attack for cleans.',explain}}
function cl(v){return Math.max(0,Math.min(10,Math.round(v)))}
function readProfile(){return{guitar:qs('#guitar').value,pickupType:qs('#pickup').value,amp:qs('#amp').value,speaker:qs('#speaker').value,pedalsOwned:qs('#pedals').value,skillLevel:qs('#skill').value,notes:qs('#notes').value}}
function qs(s){return document.querySelector(s)}
function load(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){throw new Error('localStorage load failed')}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){throw new Error('localStorage save failed')}}
function fail(e){st.error=e.message||'Unknown error';st.status='';render()}
function esc(s){return String(s||'').replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;'}[m]))}
}
(function(){
const $=(s)=>document.querySelector(s); const app=$('#app');
const gear={
 pickups:['Single coil','Humbucker','P90','Active pickups','Acoustic pickup'],
 guitars:['Fender Stratocaster','Fender Telecaster','Gibson Les Paul','Gibson SG','Gibson ES-335','PRS Custom 24','Ibanez RG','Ibanez JEM','Jackson Soloist','ESP LTD EC-1000','Schecter Hellraiser','Gretsch White Falcon','Martin D-28','Taylor 814ce'],
 amps:['Fender Twin Reverb','Fender Deluxe Reverb','Vox AC30','Marshall Plexi','Marshall JCM800','Marshall DSL','Mesa Boogie Dual Rectifier','Peavey 5150','EVH 5150III','Orange Rockerverb','Soldano SLO-100','Roland JC-120','Boss Katana','Line 6 Helix Amp Model'],
 cabs:['Fender 1x12 Open Back','Fender 2x12 Open Back','Vox 2x12','Marshall 4x12 Greenback','Marshall 4x12 V30','Mesa 4x12 Rectifier','Orange PPC412','1x12 Practice Cab','2x12 Modern Cab','4x12 Metal Cab'],
 pedals:['Boss TU-3 Tuner','Boss SD-1 Super OverDrive','Ibanez Tube Screamer','Klon Centaur','Fulltone OCD','Pro Co RAT','Boss DS-1 Distortion','Boss Metal Zone','Electro-Harmonix Big Muff','Dunlop Cry Baby Wah','MXR Dyna Comp','Boss NS-2 Noise Suppressor','MXR Phase 90','Electro-Harmonix Small Clone','Boss CE-2 Chorus','Boss BF-2 Flanger','Boss DD-7 Delay','Strymon Timeline','Strymon BigSky','Electro-Harmonix Holy Grail Reverb','MXR 10-Band EQ','Digitech Whammy']
};
const presets=['Metallica Rhythm','Metallica Clean','Van Halen Brown Sound','Nirvana Grunge','Green Day Punk','AC/DC Classic Rock','Guns N’ Roses Lead','John Mayer Clean Blues','Pink Floyd Ambient Lead','Worship Clean','Modern Metal','80s Metal','Doom Fuzz','Funk Clean'];
const load=(k,f)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}}; const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
let state={tab:'Gear Profile',error:'',adapt:'',mode:'riff',profile:load('gearProfile',{pickupType:gear.pickups[0]}),tone:load('tone',{name:'My Tone',guitar:gear.guitars[0],amp:gear.amps[0],cab:gear.cabs[0],ampSettings:{gain:.5,volume:.7,bass:.5,mid:.5,treble:.5,presence:.5},pedals:[],inputGain:.5}),saved:load('savedTones',[])};
let ctx=null,nodes=[],stream=null;
function render(){app.innerHTML=`<h1>Tone Forge (No-Build)</h1><p class='small'>Works from file://. No React, Vite, imports, or npm required.</p><div class='tabs'>${['Gear Profile','Tone Builder','Presets','Test Audio'].map(t=>`<button class='${state.tab===t?'active':''}' data-tab='${t}'>${t}</button>`).join('')}</div><div id='view'></div><h3>Saved Tones</h3><div>${state.saved.map((s,i)=>`<div class='row'><button data-load='${i}'>${s.name}</button><button data-del='${i}'>Delete</button></div>`).join('')}</div><footer>Gear names are used for reference only. This app is not affiliated with or endorsed by any gear manufacturer.</footer>`; bind(); view();}
function bind(){app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render()});app.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{state.tone=state.saved[+b.dataset.load].tone;save('tone',state.tone);render()});app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{state.saved.splice(+b.dataset.del,1);save('savedTones',state.saved);render()})}
function view(){const v=$('#view'); if(state.tab==='Gear Profile'){v.innerHTML=`<div class='grid'><input id='gtr' placeholder='Guitar they own' value='${state.profile.ownedGuitar||''}'/><select id='pick'>${gear.pickups.map(p=>`<option ${state.profile.pickupType===p?'selected':''}>${p}</option>`).join('')}</select><input id='amp' placeholder='Amp they own' value='${state.profile.ownedAmp||''}'/><input id='ped' placeholder='Pedals they own' value='${state.profile.ownedPedals||''}'/><input id='cab' placeholder='Speaker/cab size' value='${state.profile.cabSize||''}'/><textarea id='notes' placeholder='Notes'>${state.profile.notes||''}</textarea></div><button id='savep'>Save Profile</button>`; $('#savep').onclick=()=>{state.profile={ownedGuitar:$('#gtr').value,pickupType:$('#pick').value,ownedAmp:$('#amp').value,ownedPedals:$('#ped').value,cabSize:$('#cab').value,notes:$('#notes').value};save('gearProfile',state.profile)}}
if(state.tab==='Tone Builder'){v.innerHTML=`<div class='grid'><select id='tg'>${gear.guitars.map(g=>`<option ${state.tone.guitar===g?'selected':''}>${g}</option>`).join('')}</select><select id='ta'>${gear.amps.map(a=>`<option ${state.tone.amp===a?'selected':''}>${a}</option>`).join('')}</select><select id='tc'>${gear.cabs.map(c=>`<option ${state.tone.cab===c?'selected':''}>${c}</option>`).join('')}</select></div><div class='chain'>Input → ${state.tone.pedals.map(p=>p.name).join(' → ')||'No pedals'} → Amp → Cab → Output</div><div class='card'>${['gain','volume','bass','mid','treble','presence'].map(k=>`${k}<input type='range' min='0' max='1' step='0.01' id='${k}' value='${state.tone.ampSettings[k]}'/>`).join('')}</div><div class='row'><select id='addp'><option>Add pedal</option>${gear.pedals.map(p=>`<option>${p}</option>`).join('')}</select><button id='adapt'>Adapt Tone To My Gear</button><button id='savet'>Save Tone</button></div><div>${state.tone.pedals.map((p,i)=>`<div class='card'>${p.name} <button data-up='${i}'>↑</button><button data-down='${i}'>↓</button><button data-rm='${i}'>Remove</button></div>`).join('')}</div>${state.adapt?`<div class='notice'>${state.adapt}</div>`:''}`;
$('#tg').onchange=e=>{state.tone.guitar=e.target.value;save('tone',state.tone)};$('#ta').onchange=e=>{state.tone.amp=e.target.value;save('tone',state.tone)};$('#tc').onchange=e=>{state.tone.cab=e.target.value;save('tone',state.tone)};
['gain','volume','bass','mid','treble','presence'].forEach(k=>$('#'+k).oninput=e=>{state.tone.ampSettings[k]=+e.target.value;save('tone',state.tone)});
$('#addp').onchange=e=>{if(e.target.selectedIndex>0){state.tone.pedals.push({name:e.target.value});save('tone',state.tone);render()}};
$('#adapt').onclick=adapt;$('#savet').onclick=()=>{const n=prompt('Tone name','My Tone');if(!n)return;state.saved.push({name:n,tone:JSON.parse(JSON.stringify(state.tone))});save('savedTones',state.saved);render()};
v.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{state.tone.pedals.splice(+b.dataset.rm,1);save('tone',state.tone);render()});
v.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{const i=+b.dataset.up;if(i>0){const p=state.tone.pedals;[p[i-1],p[i]]=[p[i],p[i-1]];save('tone',state.tone);render()}});
v.querySelectorAll('[data-down]').forEach(b=>b.onclick=()=>{const i=+b.dataset.down;const p=state.tone.pedals;if(i<p.length-1){[p[i+1],p[i]]=[p[i],p[i+1]];save('tone',state.tone);render()}})}
if(state.tab==='Presets'){v.innerHTML=`<div class='grid'>${presets.map(n=>`<button data-pre='${n}'>${n}</button>`).join('')}</div>`;v.querySelectorAll('[data-pre]').forEach(b=>b.onclick=()=>{state.tone.name=b.dataset.pre;state.tab='Tone Builder';save('tone',state.tone);render()})}
if(state.tab==='Test Audio'){v.innerHTML=`<div class='row'><label><input type='radio' name='m' ${state.mode==='riff'?'checked':''} value='riff'/>Test Riff</label><label><input type='radio' name='m' ${state.mode==='live'?'checked':''} value='live'/>Live Input</label></div><div class='row'><button id='play'>Play Test Riff</button><button id='stop'>Stop</button></div>${state.error?`<div class='error'>${state.error}</div>`:''}<p class='small'>Live input may require localhost/HTTPS in some browsers.</p>`;
v.querySelectorAll('input[name=m]').forEach(r=>r.onchange=e=>state.mode=e.target.value);$('#play').onclick=()=>state.mode==='riff'?playRiff():startLive();$('#stop').onclick=stopAudio}
}
function adapt(){const p=(state.profile.pickupType||'').toLowerCase();const own=(state.profile.ownedPedals||'').toLowerCase();const c=[];if(p.includes('humbucker')){state.tone.ampSettings.gain-=.08;state.tone.ampSettings.treble+=.06;state.tone.ampSettings.presence+=.05;state.tone.ampSettings.bass-=.05;c.push('Humbuckers: lowered gain, added treble/presence, reduced bass.')}if(p.includes('single')){state.tone.ampSettings.gain+=.06;state.tone.ampSettings.treble-=.05;state.tone.ampSettings.mid+=.08;c.push('Single coils: added gain/mids and softened treble.')}if(p.includes('p90')){state.tone.ampSettings.mid+=.08;state.tone.ampSettings.treble-=.04;c.push('P90: boosted mids and smoothed highs; use a light noise gate.')}if(p.includes('active')){state.tone.inputGain=Math.max(.2,state.tone.inputGain-.1);state.tone.ampSettings.gain-=.07;state.tone.ampSettings.bass-=.06;c.push('Active pickups: lowered input and tightened bass.')}if(p.includes('acoustic')){state.tone.ampSettings.gain=.2;c.push('Acoustic pickup: clean amp preference, lower distortion, add compression/reverb.')}if((state.profile.cabSize||'').toLowerCase().includes('practice')){state.tone.ampSettings.bass-=.08;state.tone.ampSettings.mid+=.1;c.push('Practice amp/cab: reduce bass, add mids, lower gain.')}if(!own.includes('delay'))c.push('No delay pedal listed: use app delay.');if(!own.includes('reverb'))c.push('No reverb pedal listed: use app reverb.');Object.keys(state.tone.ampSettings).forEach(k=>state.tone.ampSettings[k]=Math.max(0,Math.min(1,state.tone.ampSettings[k])));state.adapt=c.join(' ');save('tone',state.tone);render()}
async function ensure(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')await ctx.resume();return ctx}
function stopAudio(){nodes.forEach(n=>{try{n.disconnect()}catch(e){}});nodes=[];if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}
async function playRiff(){try{state.error='';stopAudio();const c=await ensure();const out=c.createGain();out.gain.value=.35;out.connect(c.destination);nodes.push(out);[110,147,165,196,220,196].forEach((f,i)=>{const t=c.currentTime+i*.25,o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.28,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(g);g.connect(out);o.start(t);o.stop(t+.21);nodes.push(o,g)})}catch(e){state.error='Audio error: '+e.message;render()}}
async function startLive(){try{state.error='';if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('getUserMedia not available in this context/browser.');stopAudio();const c=await ensure();stream=await navigator.mediaDevices.getUserMedia({audio:true});const src=c.createMediaStreamSource(stream);const gain=c.createGain();gain.gain.value=.8;src.connect(gain);gain.connect(c.destination);nodes.push(src,gain)}catch(e){state.error='Live input failed: '+e.message;render()}}
render();
})();
