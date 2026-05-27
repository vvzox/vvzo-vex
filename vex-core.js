(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.VexCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const RARITY = {
    "404": {
      label: "404 Vex",
      chance: "0.01%",
      rank: 5,
      threshold: 0.0001,
      color: "#ff3d7f",
      shadow: "#3e003f",
    },
    Mythic: {
      label: "Mythic Vex",
      chance: "1%",
      rank: 4,
      threshold: 0.0101,
      color: "#8b5cf6",
      shadow: "#22124a",
    },
    Legendary: {
      label: "Legendary Vex",
      chance: "10%",
      rank: 3,
      threshold: 0.1101,
      color: "#ffb000",
      shadow: "#402100",
    },
    Epic: {
      label: "Epic Vex",
      chance: "14%",
      rank: 2,
      threshold: 0.2501,
      color: "#39d0ff",
      shadow: "#063449",
    },
    Rare: {
      label: "Rare Vex",
      chance: "25%",
      rank: 1,
      threshold: 0.5001,
      color: "#5ee6a8",
      shadow: "#063425",
    },
    Common: {
      label: "Common Vex",
      chance: "49.99%",
      rank: 0,
      threshold: 1,
      color: "#f6eadb",
      shadow: "#3f342b",
    },
  };

  const PALETTES = [
    { name: "Marshmallow Static", main: "#f6eadb", shade: "#cfb89a", accent: "#ff6b6b", bg: "#27222e" },
    { name: "Terminal Melon", main: "#5ee6a8", shade: "#1f8a5d", accent: "#f6d860", bg: "#10201a" },
    { name: "Expired Soda", main: "#9ad7ff", shade: "#4077aa", accent: "#ff8ac7", bg: "#16223a" },
    { name: "Traffic Cone Dream", main: "#ff9b45", shade: "#a94e1e", accent: "#45f0ff", bg: "#2a1710" },
    { name: "Laundry Portal", main: "#c9b6ff", shade: "#7057b5", accent: "#f7ff76", bg: "#1c1830" },
    { name: "Corporate Lime", main: "#d5ff60", shade: "#6f8c1f", accent: "#ff5d73", bg: "#1e2410" },
    { name: "Midnight Cereal", main: "#6a7cff", shade: "#25317d", accent: "#f8d66d", bg: "#111733" },
    { name: "Corrupted Candy", main: "#ff66cc", shade: "#7a285f", accent: "#52ffea", bg: "#250b22" },
  ];

  const PARTS = {
    body: [
      { name: "potato blob", tier: "common", shape: "blob" },
      { name: "tiny cube", tier: "common", shape: "cube" },
      { name: "sleepy ghost", tier: "common", shape: "ghost" },
      { name: "overthinking bean", tier: "rare", shape: "bean" },
      { name: "flame potato", tier: "rare", shape: "flame" },
      { name: "browser bug", tier: "epic", shape: "bug" },
      { name: "moon dumpling", tier: "epic", shape: "moon" },
      { name: "floating shrine", tier: "legendary", shape: "shrine" },
      { name: "void marshmallow", tier: "mythic", shape: "void" },
      { name: "missing body", tier: "404", shape: "missing" },
    ],
    eyes: [
      { name: "dot eyes", tier: "common", style: "dot" },
      { name: "sleepy eyes", tier: "common", style: "sleepy" },
      { name: "moon pupils", tier: "rare", style: "moon" },
      { name: "three tiny eyes", tier: "rare", style: "three" },
      { name: "deadline stare", tier: "epic", style: "stare" },
      { name: "void eyes", tier: "legendary", style: "void" },
      { name: "reality cracks", tier: "mythic", style: "crack" },
      { name: "missing pixel eye", tier: "404", style: "missing" },
    ],
    head: [
      { name: "no useful horns", tier: "common", style: "none" },
      { name: "tiny horns", tier: "common", style: "horns" },
      { name: "anxious antenna", tier: "rare", style: "antenna" },
      { name: "cat-ish ears", tier: "rare", style: "ears" },
      { name: "broken crown", tier: "epic", style: "crown" },
      { name: "floating horns", tier: "legendary", style: "float-horns" },
      { name: "impossible halo", tier: "mythic", style: "halo" },
      { name: "404 halo", tier: "404", style: "404-halo" },
    ],
    tail: [
      { name: "short tail", tier: "common", style: "short" },
      { name: "charging cable tail", tier: "rare", style: "cable" },
      { name: "cloud tail", tier: "rare", style: "cloud" },
      { name: "cursor tail", tier: "epic", style: "cursor" },
      { name: "low battery tail", tier: "legendary", style: "battery" },
      { name: "glitch tail", tier: "mythic", style: "glitch" },
      { name: "not found tail", tier: "404", style: "missing" },
    ],
    mark: [
      { name: "freckles", tier: "common", style: "freckles" },
      { name: "tiny stars", tier: "rare", style: "stars" },
      { name: "barcode tummy", tier: "epic", style: "barcode" },
      { name: "static scars", tier: "legendary", style: "static" },
      { name: "reality crack", tier: "mythic", style: "crack" },
      { name: "undefined pixels", tier: "404", style: "undefined" },
    ],
    aura: [
      { name: "no aura, just attitude", tier: "common", style: "none" },
      { name: "pixel dust", tier: "rare", style: "dust" },
      { name: "tiny glow", tier: "epic", style: "glow" },
      { name: "dream ring", tier: "legendary", style: "ring" },
      { name: "reality leak", tier: "mythic", style: "leak" },
      { name: "404 aura", tier: "404", style: "404" },
    ],
  };

  const TIER_RANK = {
    common: 0,
    rare: 1,
    epic: 2,
    legendary: 3,
    mythic: 4,
    "404": 5,
  };

  const RARITY_TIER = {
    Common: "common",
    Rare: "rare",
    Epic: "epic",
    Legendary: "legendary",
    Mythic: "mythic",
    "404": "404",
  };

  const ADJECTIVES = [
    "Useless",
    "Dramatic",
    "Buffered",
    "Suspicious",
    "Tiny",
    "Haunted",
    "Crunchy",
    "Illegal",
    "Offline",
    "Cosmic",
    "Mild",
    "Expired",
    "Unpaid",
    "Fermented",
    "Wobbly",
    "Caffeinated",
  ];

  const NOUNS = [
    "Potato",
    "Goblet",
    "Error",
    "Receipt",
    "Shrimp",
    "Lamp",
    "Folder",
    "Crumb",
    "Signal",
    "Bean",
    "Pixel",
    "Moth",
    "Noodle",
    "Button",
    "Echo",
    "Toast",
  ];

  const LINES = [
    "It is what it is, but it should not be what it is.",
    "My spirit animal is a potato with unread notifications.",
    "Today, Vex believes in you for legal reasons.",
    "Do less. But emotionally.",
    "If life gives you lemons, put them in a drawer and avoid the topic.",
    "Vex has no plan, only vibes and mild consequences.",
    "You are not behind. You are just buffering dramatically.",
    "The smartest person in the room has probably left the room.",
    "Vex touched grass once. It filed a complaint.",
    "Nothing matters, but your avatar looks rare.",
    "Your aura has been placed on a waiting list.",
    "Vex tried self-care and accidentally invented soup.",
    "The plot thickens, unlike your attention span.",
    "Some doors open. Others just need better Wi-Fi.",
    "You are the main character of a tab you forgot to close.",
    "Vex recommends confidence, or at least louder confusion.",
    "Your future is loading at an emotionally inconvenient speed.",
    "Be yourself, unless yourself has pending software updates.",
    "Vex is not lazy. Vex is in low-power prophecy mode.",
    "If nothing makes sense, congratulations, you are caught up.",
    "A small mistake today may become a collectible memory later.",
    "Vex found your motivation. It was under a weird chair.",
    "The universe says maybe. Very helpful.",
    "Your destiny is wearing socks on the wrong feet.",
    "Vex cannot fix your life, but it can blink supportively.",
    "You have main-character energy in a side-quest economy.",
    "Productivity is a rumor spread by calendars.",
    "Do not chase closure. It has poor cardio.",
    "Vex thinks the answer is yes, unless the question matters.",
    "Today is a great day to become slightly less mysterious.",
    "Your dreams are valid and poorly organized.",
    "The room is not spinning. It is networking.",
    "Vex has read the terms and conditions. It disagrees.",
    "You are not overthinking. You are premium thinking.",
    "Every problem is just a side quest with bad lighting.",
    "Vex is emotionally available after a short reboot.",
    "The signs are unclear, but the pixels are crunchy.",
    "You have unlocked a new fear: administrative confidence.",
    "Vex says hydrate, then return to your nonsense.",
    "If you are the smartest person in the room, change rooms or furniture.",
  ];

  function hashString(input) {
    const text = String(input);
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function rngFromSeed(seed) {
    let state = hashString(seed) || 1;
    return function next() {
      state += 0x6d2b79f5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(list, rng) {
    return list[Math.floor(rng() * list.length) % list.length];
  }

  function rarityFromRoll(roll) {
    const value = Math.max(0, Math.min(0.999999999, Number(roll)));
    if (value < RARITY["404"].threshold) return "404";
    if (value < RARITY.Mythic.threshold) return "Mythic";
    if (value < RARITY.Legendary.threshold) return "Legendary";
    if (value < RARITY.Epic.threshold) return "Epic";
    if (value < RARITY.Rare.threshold) return "Rare";
    return "Common";
  }

  function poolForRarity(items, rarity) {
    const maxRank = TIER_RANK[RARITY_TIER[rarity]];
    return items.filter((item) => TIER_RANK[item.tier] <= maxRank);
  }

  function forceRareTrait(category, rarity, rng, current) {
    const requiredTier = RARITY_TIER[rarity];
    if (requiredTier === "common") return current;
    const exact = PARTS[category].filter((item) => item.tier === requiredTier);
    if (!exact.length) return current;
    return pick(exact, rng);
  }

  function createVex(answers, options) {
    const list = Array.isArray(answers) ? answers : [];
    const answerSeed = list.join("|") || "empty-vex";
    const baseHash = hashString(answerSeed);
    const rng = rngFromSeed(answerSeed);
    const rarityRoll = options && typeof options.rarityRoll === "number"
      ? options.rarityRoll
      : rng();
    const rarity = rarityFromRoll(rarityRoll);
    const palette = pick(PALETTES, rng);
    const traits = [
      pick(poolForRarity(PARTS.body, rarity), rng),
      pick(poolForRarity(PARTS.eyes, rarity), rng),
      pick(poolForRarity(PARTS.head, rarity), rng),
      pick(poolForRarity(PARTS.tail, rarity), rng),
      pick(poolForRarity(PARTS.mark, rarity), rng),
      pick(poolForRarity(PARTS.aura, rarity), rng),
    ];

    if (rarity !== "Common") {
      const categoryByRarity = {
        Rare: "tail",
        Epic: "mark",
        Legendary: "head",
        Mythic: "aura",
        "404": "body",
      };
      const indexByCategory = { body: 0, eyes: 1, head: 2, tail: 3, mark: 4, aura: 5 };
      const category = categoryByRarity[rarity];
      traits[indexByCategory[category]] = forceRareTrait(category, rarity, rng, traits[indexByCategory[category]]);
    }

    if (rarity === "404") {
      traits[1] = forceRareTrait("eyes", rarity, rng, traits[1]);
      traits[5] = forceRareTrait("aura", rarity, rng, traits[5]);
    }

    const id = `VEX-${(baseHash & 0xffff).toString(16).toUpperCase().padStart(4, "0")}-${((baseHash >>> 16) & 0xffff).toString(16).toUpperCase().padStart(4, "0")}`;
    const name = `${pick(ADJECTIVES, rng)} ${pick(NOUNS, rng)} Vex`;
    const mood = pick(["buffering", "slightly haunted", "legally optimistic", "emotionally square", "quietly pixelated"], rng);

    return {
      id,
      name,
      rarity,
      rarityLabel: RARITY[rarity].label,
      rarityChance: RARITY[rarity].chance,
      rarityColor: RARITY[rarity].color,
      rarityShadow: RARITY[rarity].shadow,
      palette,
      traits,
      mood,
      seed: answerSeed,
    };
  }

  function localDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function dailyLine(vexId, dateText) {
    const date = dateText || localDateKey();
    const day = Number(date.replaceAll("-", ""));
    const index = (hashString(`${vexId}|${date}|daily-vex`) + day) % LINES.length;
    return LINES[index];
  }

  function pixel(ctx, x, y, w, h, color, scale) {
    ctx.fillStyle = color;
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
  }

  function drawEllipsePixels(ctx, cx, cy, rx, ry, color, scale) {
    for (let y = -ry; y <= ry; y += 1) {
      for (let x = -rx; x <= rx; x += 1) {
        if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) {
          pixel(ctx, cx + x, cy + y, 1, 1, color, scale);
        }
      }
    }
  }

  function drawBody(ctx, vex, scale, bob) {
    const main = vex.palette.main;
    const shade = vex.palette.shade;
    const shape = vex.traits[0].shape;
    const y = 38 + bob;

    if (shape === "cube") {
      pixel(ctx, 20, y, 24, 24, shade, scale);
      pixel(ctx, 18, y - 2, 24, 24, main, scale);
      pixel(ctx, 22, y + 3, 17, 4, "#ffffff44", scale);
    } else if (shape === "ghost") {
      drawEllipsePixels(ctx, 32, y + 9, 14, 17, main, scale);
      pixel(ctx, 19, y + 20, 5, 6, main, scale);
      pixel(ctx, 29, y + 20, 5, 6, main, scale);
      pixel(ctx, 40, y + 20, 5, 6, main, scale);
      pixel(ctx, 20, y + 25, 4, 4, shade, scale);
      pixel(ctx, 34, y + 25, 4, 4, shade, scale);
    } else if (shape === "flame") {
      drawEllipsePixels(ctx, 32, y + 13, 13, 15, main, scale);
      pixel(ctx, 29, y - 4, 6, 10, vex.palette.accent, scale);
      pixel(ctx, 24, y + 2, 6, 8, main, scale);
      pixel(ctx, 36, y + 3, 6, 8, shade, scale);
    } else if (shape === "bug") {
      drawEllipsePixels(ctx, 32, y + 11, 15, 13, main, scale);
      pixel(ctx, 16, y + 9, 5, 3, shade, scale);
      pixel(ctx, 43, y + 9, 5, 3, shade, scale);
      pixel(ctx, 16, y + 17, 5, 3, shade, scale);
      pixel(ctx, 43, y + 17, 5, 3, shade, scale);
      pixel(ctx, 31, y, 2, 24, shade, scale);
    } else if (shape === "moon") {
      drawEllipsePixels(ctx, 33, y + 12, 14, 16, main, scale);
      drawEllipsePixels(ctx, 40, y + 8, 9, 13, vex.palette.bg, scale);
      pixel(ctx, 23, y + 9, 7, 6, shade, scale);
    } else if (shape === "shrine") {
      pixel(ctx, 18, y + 7, 28, 22, main, scale);
      pixel(ctx, 15, y + 4, 34, 5, vex.palette.accent, scale);
      pixel(ctx, 22, y - 1, 20, 5, shade, scale);
      pixel(ctx, 27, y + 16, 10, 13, shade, scale);
    } else if (shape === "void") {
      drawEllipsePixels(ctx, 32, y + 11, 15, 15, "#17131f", scale);
      drawEllipsePixels(ctx, 32, y + 11, 11, 11, main, scale);
      pixel(ctx, 20, y + 3, 5, 5, vex.palette.accent, scale);
      pixel(ctx, 39, y + 20, 5, 5, vex.palette.accent, scale);
    } else if (shape === "missing") {
      pixel(ctx, 18, y + 2, 26, 25, main, scale);
      pixel(ctx, 24, y + 7, 9, 7, vex.palette.bg, scale);
      pixel(ctx, 37, y + 18, 8, 6, vex.palette.bg, scale);
      pixel(ctx, 17, y + 26, 5, 4, vex.palette.accent, scale);
    } else if (shape === "bean") {
      drawEllipsePixels(ctx, 31, y + 12, 13, 16, main, scale);
      drawEllipsePixels(ctx, 37, y + 17, 10, 10, main, scale);
      pixel(ctx, 22, y + 5, 8, 4, "#ffffff44", scale);
    } else {
      drawEllipsePixels(ctx, 32, y + 12, 15, 14, main, scale);
      pixel(ctx, 22, y + 5, 10, 4, "#ffffff44", scale);
      pixel(ctx, 20, y + 23, 24, 4, shade, scale);
    }
  }

  function drawHeadPart(ctx, vex, scale, bob) {
    const style = vex.traits[2].style;
    const y = 38 + bob;
    const accent = vex.palette.accent;
    const shade = vex.palette.shade;
    if (style === "horns") {
      pixel(ctx, 21, y - 4, 4, 8, accent, scale);
      pixel(ctx, 39, y - 4, 4, 8, accent, scale);
      pixel(ctx, 22, y - 7, 2, 3, accent, scale);
      pixel(ctx, 40, y - 7, 2, 3, accent, scale);
    } else if (style === "antenna") {
      pixel(ctx, 25, y - 7, 2, 8, shade, scale);
      pixel(ctx, 38, y - 7, 2, 8, shade, scale);
      pixel(ctx, 23, y - 9, 5, 3, accent, scale);
      pixel(ctx, 36, y - 9, 5, 3, accent, scale);
    } else if (style === "ears") {
      pixel(ctx, 19, y - 4, 7, 9, vex.palette.main, scale);
      pixel(ctx, 39, y - 4, 7, 9, vex.palette.main, scale);
      pixel(ctx, 21, y - 1, 3, 4, accent, scale);
      pixel(ctx, 41, y - 1, 3, 4, accent, scale);
    } else if (style === "crown") {
      pixel(ctx, 24, y - 6, 17, 4, accent, scale);
      pixel(ctx, 25, y - 10, 3, 5, accent, scale);
      pixel(ctx, 31, y - 12, 3, 7, accent, scale);
      pixel(ctx, 38, y - 9, 3, 4, accent, scale);
    } else if (style === "float-horns") {
      pixel(ctx, 18, y - 10, 5, 7, accent, scale);
      pixel(ctx, 42, y - 10, 5, 7, accent, scale);
      pixel(ctx, 19, y - 13, 3, 3, accent, scale);
      pixel(ctx, 43, y - 13, 3, 3, accent, scale);
    } else if (style === "halo") {
      pixel(ctx, 22, y - 12, 20, 3, accent, scale);
      pixel(ctx, 19, y - 9, 5, 3, accent, scale);
      pixel(ctx, 41, y - 9, 5, 3, accent, scale);
    } else if (style === "404-halo") {
      pixel(ctx, 18, y - 13, 10, 3, accent, scale);
      pixel(ctx, 34, y - 13, 12, 3, accent, scale);
      pixel(ctx, 26, y - 10, 4, 3, "#ffffff", scale);
      pixel(ctx, 45, y - 10, 3, 3, "#ffffff", scale);
    }
  }

  function drawTail(ctx, vex, scale, bob) {
    const style = vex.traits[3].style;
    const y = 50 + bob;
    const accent = vex.palette.accent;
    const shade = vex.palette.shade;
    if (style === "short") {
      pixel(ctx, 43, y, 7, 5, shade, scale);
    } else if (style === "cable") {
      pixel(ctx, 44, y + 1, 8, 3, shade, scale);
      pixel(ctx, 51, y - 2, 3, 8, shade, scale);
      pixel(ctx, 53, y - 2, 3, 2, accent, scale);
      pixel(ctx, 53, y + 4, 3, 2, accent, scale);
    } else if (style === "cloud") {
      pixel(ctx, 43, y, 5, 5, shade, scale);
      drawEllipsePixels(ctx, 51, y + 2, 5, 4, accent, scale);
      drawEllipsePixels(ctx, 57, y + 1, 4, 3, accent, scale);
    } else if (style === "cursor") {
      pixel(ctx, 43, y, 5, 4, shade, scale);
      pixel(ctx, 50, y - 5, 3, 12, accent, scale);
      pixel(ctx, 53, y - 2, 3, 9, accent, scale);
      pixel(ctx, 56, y + 1, 3, 6, accent, scale);
    } else if (style === "battery") {
      pixel(ctx, 43, y, 8, 4, shade, scale);
      pixel(ctx, 51, y - 2, 10, 8, accent, scale);
      pixel(ctx, 61, y, 2, 4, accent, scale);
      pixel(ctx, 53, y, 2, 4, "#111111", scale);
    } else if (style === "glitch") {
      pixel(ctx, 43, y, 9, 4, shade, scale);
      pixel(ctx, 51, y - 3, 8, 3, "#52ffea", scale);
      pixel(ctx, 55, y + 3, 7, 3, "#ff3d7f", scale);
    } else if (style === "missing") {
      pixel(ctx, 43, y, 7, 4, shade, scale);
      pixel(ctx, 54, y - 3, 4, 4, accent, scale);
      pixel(ctx, 60, y + 3, 3, 3, "#ffffff", scale);
    }
  }

  function drawEyes(ctx, vex, scale, bob) {
    const style = vex.traits[1].style;
    const y = 50 + bob;
    const ink = "#18151f";
    const shine = "#ffffff";
    if (style === "sleepy") {
      pixel(ctx, 25, y, 7, 2, ink, scale);
      pixel(ctx, 37, y, 7, 2, ink, scale);
    } else if (style === "moon") {
      pixel(ctx, 25, y - 2, 6, 8, ink, scale);
      pixel(ctx, 28, y - 2, 3, 8, vex.palette.main, scale);
      pixel(ctx, 38, y - 2, 6, 8, ink, scale);
      pixel(ctx, 41, y - 2, 3, 8, vex.palette.main, scale);
    } else if (style === "three") {
      pixel(ctx, 24, y, 4, 4, ink, scale);
      pixel(ctx, 32, y - 2, 4, 4, ink, scale);
      pixel(ctx, 40, y, 4, 4, ink, scale);
    } else if (style === "stare") {
      pixel(ctx, 24, y - 2, 8, 8, shine, scale);
      pixel(ctx, 37, y - 2, 8, 8, shine, scale);
      pixel(ctx, 27, y, 3, 5, ink, scale);
      pixel(ctx, 40, y, 3, 5, ink, scale);
    } else if (style === "void") {
      pixel(ctx, 23, y - 2, 9, 9, "#050507", scale);
      pixel(ctx, 37, y - 2, 9, 9, "#050507", scale);
      pixel(ctx, 26, y + 1, 3, 3, vex.palette.accent, scale);
      pixel(ctx, 40, y + 1, 3, 3, vex.palette.accent, scale);
    } else if (style === "crack") {
      pixel(ctx, 24, y - 2, 8, 8, ink, scale);
      pixel(ctx, 39, y - 2, 5, 8, ink, scale);
      pixel(ctx, 31, y + 3, 3, 2, vex.palette.accent, scale);
      pixel(ctx, 35, y + 1, 3, 2, vex.palette.accent, scale);
    } else if (style === "missing") {
      pixel(ctx, 25, y - 2, 7, 7, ink, scale);
      pixel(ctx, 39, y, 4, 2, "#ffffff", scale);
      pixel(ctx, 36, y + 4, 3, 3, vex.palette.accent, scale);
    } else {
      pixel(ctx, 26, y, 5, 5, ink, scale);
      pixel(ctx, 39, y, 5, 5, ink, scale);
      pixel(ctx, 27, y, 2, 2, shine, scale);
      pixel(ctx, 40, y, 2, 2, shine, scale);
    }
  }

  function drawMark(ctx, vex, scale, bob) {
    const style = vex.traits[4].style;
    const y = 61 + bob;
    const accent = vex.palette.accent;
    const ink = "#18151f";
    if (style === "freckles") {
      pixel(ctx, 27, y, 2, 2, accent, scale);
      pixel(ctx, 35, y + 3, 2, 2, accent, scale);
      pixel(ctx, 40, y, 2, 2, accent, scale);
    } else if (style === "stars") {
      pixel(ctx, 29, y, 2, 6, accent, scale);
      pixel(ctx, 27, y + 2, 6, 2, accent, scale);
      pixel(ctx, 39, y + 1, 2, 5, accent, scale);
      pixel(ctx, 37, y + 3, 6, 2, accent, scale);
    } else if (style === "barcode") {
      pixel(ctx, 25, y - 2, 2, 10, ink, scale);
      pixel(ctx, 29, y - 2, 1, 10, ink, scale);
      pixel(ctx, 33, y - 2, 3, 10, ink, scale);
      pixel(ctx, 39, y - 2, 1, 10, ink, scale);
    } else if (style === "static") {
      pixel(ctx, 24, y - 3, 6, 2, "#52ffea", scale);
      pixel(ctx, 35, y, 9, 2, "#ff3d7f", scale);
      pixel(ctx, 29, y + 5, 11, 2, "#ffffff", scale);
    } else if (style === "crack") {
      pixel(ctx, 32, y - 7, 2, 5, ink, scale);
      pixel(ctx, 34, y - 2, 2, 4, ink, scale);
      pixel(ctx, 29, y + 1, 5, 2, ink, scale);
      pixel(ctx, 27, y + 3, 2, 4, ink, scale);
    } else if (style === "undefined") {
      pixel(ctx, 24, y - 4, 6, 6, vex.palette.bg, scale);
      pixel(ctx, 36, y + 1, 8, 5, vex.palette.bg, scale);
      pixel(ctx, 31, y + 6, 3, 3, "#ffffff", scale);
    }
  }

  function drawAura(ctx, vex, scale, tick) {
    const style = vex.traits[5].style;
    const accent = vex.palette.accent;
    if (style === "dust") {
      pixel(ctx, 12, 34 + (tick % 2), 2, 2, accent, scale);
      pixel(ctx, 50, 31, 2, 2, accent, scale);
      pixel(ctx, 54, 70 - (tick % 2), 2, 2, accent, scale);
      pixel(ctx, 10, 65, 2, 2, accent, scale);
    } else if (style === "glow") {
      pixel(ctx, 16, 35, 4, 26, "#ffffff22", scale);
      pixel(ctx, 45, 35, 4, 26, "#ffffff22", scale);
      pixel(ctx, 24, 28, 17, 3, "#ffffff22", scale);
      pixel(ctx, 24, 72, 17, 3, "#ffffff22", scale);
    } else if (style === "ring") {
      pixel(ctx, 13, 50, 4, 4, accent, scale);
      pixel(ctx, 48, 50, 4, 4, accent, scale);
      pixel(ctx, 30, 29, 5, 3, accent, scale);
      pixel(ctx, 30, 76, 5, 3, accent, scale);
    } else if (style === "leak") {
      pixel(ctx, 11, 40, 9, 3, "#52ffea", scale);
      pixel(ctx, 50, 61, 8, 3, "#ff3d7f", scale);
      pixel(ctx, 16, 70, 5, 5, "#f7ff76", scale);
    } else if (style === "404") {
      pixel(ctx, 8, 35, 8, 4, "#ff3d7f", scale);
      pixel(ctx, 52, 36, 5, 5, "#52ffea", scale);
      pixel(ctx, 7, 70, 5, 5, "#ffffff", scale);
      pixel(ctx, 53, 72, 9, 4, "#ff3d7f", scale);
    }
  }

  function drawVex(ctx, vex, options) {
    const opts = options || {};
    const width = opts.width || ctx.canvas.width;
    const height = opts.height || ctx.canvas.height;
    const scale = Math.floor(Math.min(width, height) / 96);
    const offsetX = Math.floor((width - 64 * scale) / 2);
    const offsetY = Math.floor((height - 96 * scale) / 2);
    const tick = opts.tick || 0;
    const bob = tick % 2;

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = opts.transparent ? "rgba(0,0,0,0)" : vex.palette.bg;
    if (!opts.transparent) ctx.fillRect(0, 0, width, height);
    ctx.translate(offsetX, offsetY);
    drawAura(ctx, vex, scale, tick);
    drawTail(ctx, vex, scale, bob);
    drawBody(ctx, vex, scale, bob);
    drawHeadPart(ctx, vex, scale, bob);
    drawEyes(ctx, vex, scale, bob);
    drawMark(ctx, vex, scale, bob);
    pixel(ctx, 21, 79, 24, 3, "rgba(0,0,0,0.18)", scale);
    ctx.restore();
  }

  return {
    RARITY,
    LINES,
    createVex,
    dailyLine,
    drawVex,
    hashString,
    rarityFromRoll,
  };
});
