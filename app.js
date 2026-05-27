(function () {
  const STORAGE_KEY = "vvzo.vex.pet.v1";
  const QUESTIONS = [
    {
      title: "What kind of night are you currently living in?",
      options: [
        ["midnight", "Midnight", "Quiet, suspicious, and full of tabs."],
        ["neon", "Neon", "Bright outside, weird inside."],
        ["laundry", "Laundry", "Warm, chaotic, probably forgotten."],
        ["404", "404", "The room exists, but the vibe is missing."],
      ],
    },
    {
      title: "Pick a deeply unnecessary life tool.",
      options: [
        ["potato", "Emotional potato", "It understands nothing and still helps."],
        ["receipt", "Ancient receipt", "Proof that something once happened."],
        ["cursor", "Lonely cursor", "Pointing at problems without solving them."],
        ["soup", "Suspicious soup", "Warm, legal, and not fully explained."],
      ],
    },
    {
      title: "Your current mental loading state is...",
      options: [
        ["buffering", "Buffering", "Still trying to become a person."],
        ["overclocked", "Overclocked", "Too many thoughts, not enough chair."],
        ["offline", "Offline", "Present in body, absent in firmware."],
        ["sidequest", "Side quest", "Avoiding the main plot professionally."],
      ],
    },
    {
      title: "Choose a flaw you can market as a feature.",
      options: [
        ["glitch", "Glitch", "Unstable, but visually interesting."],
        ["dramatic", "Dramatic", "Everything is a season finale."],
        ["snack", "Snack-based", "All strategy begins with crumbs."],
        ["plain", "Suspiciously normal", "That is how they get you."],
      ],
    },
    {
      title: "What should Vex help you do?",
      options: [
        ["soft-chaos", "Manage soft chaos", "Not fix it. Just label it."],
        ["look-rare", "Look rare", "Nothing matters, avatar matters."],
        ["avoid-email", "Avoid one email", "A noble and ancient tradition."],
        ["tiny-courage", "Have tiny courage", "Small bravery, travel size."],
      ],
    },
  ];

  const state = {
    answers: [],
    questionIndex: 0,
    vex: null,
    animationFrame: 0,
  };

  const els = {
    startButton: document.getElementById("startButton"),
    resetButton: document.getElementById("resetButton"),
    hatchFlow: document.getElementById("hatchFlow"),
    resultPanel: document.getElementById("resultPanel"),
    questionCount: document.getElementById("questionCount"),
    progressBar: document.getElementById("progressBar"),
    questionTitle: document.getElementById("questionTitle"),
    optionGrid: document.getElementById("optionGrid"),
    canvas: document.getElementById("vexCanvas"),
    petName: document.getElementById("petName"),
    petRarity: document.getElementById("petRarity"),
    dailyLine: document.getElementById("dailyLine"),
    resultName: document.getElementById("resultName"),
    rarityPill: document.getElementById("rarityPill"),
    vexId: document.getElementById("vexId"),
    dropRate: document.getElementById("dropRate"),
    vexMood: document.getElementById("vexMood"),
    traitList: document.getElementById("traitList"),
    saveAvatarButton: document.getElementById("saveAvatarButton"),
  };

  function today() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function savePet(vex) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: state.answers,
      vex,
      hatchDate: today(),
      savedAt: new Date().toISOString(),
    }));
  }

  function loadPet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function savedHatchDate(saved) {
    if (!saved) return "";
    if (saved.hatchDate) return saved.hatchDate;
    if (saved.savedAt) return String(saved.savedAt).slice(0, 10);
    return "";
  }

  function isLockedToday(saved) {
    return Boolean(saved && saved.vex && savedHatchDate(saved) === today());
  }

  function setHatchLock(locked) {
    els.startButton.disabled = locked;
    els.startButton.textContent = locked ? "Hatched today" : "Hatch Vex";
    els.resetButton.classList.toggle("hidden", !locked);
    els.resetButton.disabled = locked;
    els.resetButton.textContent = "Come back tomorrow";
  }

  function renderQuestion() {
    const question = QUESTIONS[state.questionIndex];
    els.questionCount.textContent = `Question ${state.questionIndex + 1} / ${QUESTIONS.length}`;
    els.progressBar.style.width = `${((state.questionIndex + 1) / QUESTIONS.length) * 100}%`;
    els.questionTitle.textContent = question.title;
    els.optionGrid.replaceChildren();

    question.options.forEach(([value, label, hint]) => {
      const button = document.createElement("button");
      button.className = "option-button";
      button.type = "button";
      button.innerHTML = `<strong>${label}</strong><span>${hint}</span>`;
      button.addEventListener("click", () => answerQuestion(value));
      els.optionGrid.appendChild(button);
    });
  }

  function answerQuestion(value) {
    state.answers.push(value);
    if (state.answers.length >= QUESTIONS.length) {
      hatchVex();
      return;
    }
    state.questionIndex += 1;
    renderQuestion();
  }

  function hatchVex() {
    state.vex = VexCore.createVex(state.answers);
    savePet(state.vex);
    els.hatchFlow.classList.add("hidden");
    setHatchLock(true);
    showResult(state.vex);
  }

  function showResult(vex) {
    const line = VexCore.dailyLine(vex.id, today());
    els.resultPanel.classList.remove("hidden");
    els.petName.textContent = vex.name;
    els.petRarity.textContent = vex.rarityLabel;
    els.dailyLine.textContent = line;
    els.resultName.textContent = vex.name;
    els.rarityPill.textContent = vex.rarityLabel;
    els.rarityPill.style.background = vex.rarityColor;
    els.rarityPill.style.color = vex.rarity === "Common" ? "#151217" : "#ffffff";
    els.vexId.textContent = vex.id;
    els.dropRate.textContent = vex.rarityChance;
    els.vexMood.textContent = vex.mood;
    els.traitList.replaceChildren();

    vex.traits.forEach((trait) => {
      const item = document.createElement("li");
      item.textContent = trait.name;
      els.traitList.appendChild(item);
    });
  }

  function drawLoop() {
    const ctx = els.canvas.getContext("2d");
    if (state.vex) {
      VexCore.drawVex(ctx, state.vex, {
        width: els.canvas.width,
        height: els.canvas.height,
        tick: Math.floor(state.animationFrame / 28),
      });
    } else {
      drawPlaceholder(ctx);
    }
    state.animationFrame += 1;
    requestAnimationFrame(drawLoop);
  }

  function drawPlaceholder(ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#17131f";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#5ee6a8";
    const s = 8;
    const x = 24;
    const y = 28;
    const cells = [
      [4, 0], [5, 0], [6, 0],
      [3, 1], [7, 1],
      [2, 2], [8, 2],
      [2, 3], [4, 3], [6, 3], [8, 3],
      [2, 4], [8, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      [5, 7],
      [4, 8], [5, 8], [6, 8],
    ];
    cells.forEach(([cx, cy]) => ctx.fillRect((x + cx * 4) * s, (y + cy * 4) * s, 3 * s, 3 * s));
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(198, 290, 116, 16);
  }

  function makeCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").imageSmoothingEnabled = false;
    return canvas;
  }

  function renderAvatar(vex) {
    const canvas = makeCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, vex.palette.bg);
    gradient.addColorStop(0.52, vex.rarityShadow);
    gradient.addColorStop(1, "#151217");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.fillStyle = vex.rarityColor;
    for (let i = 0; i < 44; i += 1) {
      const hash = VexCore.hashString(`${vex.id}|star|${i}`);
      const x = hash % 1024;
      const y = (hash >>> 10) % 1024;
      const size = 8 + (hash % 4) * 4;
      ctx.fillRect(x, y, size, size);
    }
    VexCore.drawVex(ctx, vex, { width: 1024, height: 1024, tick: 1, transparent: true });
    return canvas;
  }

  function downloadCanvas(canvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function beginHatch() {
    if (isLockedToday(loadPet())) {
      setHatchLock(true);
      return;
    }
    state.answers = [];
    state.questionIndex = 0;
    els.resultPanel.classList.add("hidden");
    els.hatchFlow.classList.remove("hidden");
    renderQuestion();
    els.hatchFlow.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  els.startButton.addEventListener("click", beginHatch);
  els.saveAvatarButton.addEventListener("click", () => {
    if (!state.vex) return;
    downloadCanvas(renderAvatar(state.vex), `${state.vex.id.toLowerCase()}-avatar.png`);
  });

  const saved = loadPet();
  if (saved && saved.vex) {
    state.answers = saved.answers || [];
    state.vex = saved.vex;
    showResult(state.vex);
    setHatchLock(isLockedToday(saved));
  } else {
    setHatchLock(false);
  }

  drawLoop();
})();
