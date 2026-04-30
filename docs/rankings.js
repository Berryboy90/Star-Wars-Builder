const battleTraitLabels = {
  character: [
    "Force",
    "Lightsaber Dueling",
    "Piloting",
    "Wisdom",
    "Combat Skills",
    "Leadership"
  ],
  ship: {
    Gun: "gun",
    "Droid Attached": "droid",
    Pilot: "pilot",
    Engine: "engine",
    "Base Look": "hull",
    Alignment: "alignment"
  }
};

function normalizeBattleKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ÃŽ/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function buildTierScores(groups, start = 98, step = 4, floor = 24) {
  const scores = {};

  groups.forEach((group, index) => {
    const score = Math.max(floor, start - index * step);
    group.forEach((name) => {
      scores[name] = score;
    });
  });

  return scores;
}

function clampBattleScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

const forceUsers = new Set([
  "Luke Skywalker", "Darth Vader", "Leia Organa", "Obi-Wan Kenobi", "Anakin Skywalker",
  "Yoda", "Emperor Palpatine", "Shaak Ti", "Rey", "Kylo Ren", "Ahsoka Tano",
  "Ezra Bridger", "Qui-Gon Jinn", "Mace Windu", "Kit Fisto", "Plo Koon",
  "Ki-Adi-Mundi", "Sabine Wren", "Kanan Jarrus", "Jacen Solo", "Jaina Solo"
]);

const acePilots = new Set([
  "Luke Skywalker", "Anakin Skywalker", "Poe Dameron", "Han Solo", "Wedge Antilles",
  "Hera Syndulla", "Plo Koon", "Boba Fett", "Jango Fett", "Lando Calrissian",
  "Leia Organa", "Rey", "Finn", "Bo-Katan Kryze", "The Mandalorian", "Sabine Wren",
  "Ezra Bridger", "Kylo Ren", "Darth Vader", "Obi-Wan Kenobi", "Mace Windu",
  "Cassian Andor", "Jyn Erso", "Cad Bane", "Qui-Gon Jinn", "Ahsoka Tano", "Arvel Crynyd",
  "Nien Nunb", "Carson Teva"
]);

const battlefieldLeaders = new Set([
  "Leia Organa", "Luke Skywalker", "Darth Vader", "Anakin Skywalker", "Yoda",
  "Obi-Wan Kenobi", "Emperor Palpatine", "Mon Mothma", "Admiral Ackbar",
  "Grand Moff Tarkin", "Grand Admiral Thrawn", "Ahsoka Tano", "Bo-Katan Kryze",
  "The Mandalorian", "Saw Gerrera", "Poe Dameron", "General Hux", "Mace Windu",
  "Cassian Andor", "Jyn Erso", "Shaak Ti", "Ki-Adi-Mundi", "Plo Koon"
]);

const skilledCombatants = new Set([
  "Luke Skywalker", "Darth Vader", "Leia Organa", "Obi-Wan Kenobi", "Anakin Skywalker",
  "Yoda", "Han Solo", "Shaak Ti", "General Grievous", "Poe Dameron", "Finn", "Rey",
  "Kylo Ren", "Sabine Wren", "Ezra Bridger", "Ahsoka Tano", "Bo-Katan Kryze",
  "The Mandalorian", "Fennec Shand", "Cara Dune", "Boba Fett", "Jango Fett",
  "Cad Bane", "Qui-Gon Jinn", "Mace Windu", "Kit Fisto", "Plo Koon",
  "Ki-Adi-Mundi", "Jyn Erso", "Cassian Andor", "Chirrut ÃŽmwe", "Baze Malbus",
  "Bossk", "IG-88", "Dengar", "Zam Wesell", "Wedge Antilles", "Chewbacca"
]);

const droidCharacters = new Set(["C-3PO", "R2-D2", "R5-D4", "BB-8", "C1-10P \"Chopper\"", "K-2SO"]);
const underworldOperators = new Set([
  "Han Solo", "Lando Calrissian", "Greedo", "Jabba Desilijic Tiure", "Watto",
  "Dexter Jettster", "Mama the Hutt", "Bib Fortuna", "Boba Fett", "Jango Fett",
  "Cad Bane", "Bossk", "IG-88", "Dengar", "Zam Wesell"
]);
const senatorsAndOfficials = new Set([
  "Leia Organa", "Mon Mothma", "Grand Moff Tarkin", "General Hux", "Rose Tico",
  "Maz Kanata", "Lott Dod", "Padme Amidala", "Orson Krennic", "Owen Lars",
  "Beru Whitesun Lars", "Greef Karga"
]);

const characterOverrides = {
  "Emperor Palpatine": { Force: 99, "Lightsaber Dueling": 95, Piloting: 30, Wisdom: 94, "Combat Skills": 90, Leadership: 98 },
  "Yoda": { Force: 98, "Lightsaber Dueling": 96, Piloting: 28, Wisdom: 99, "Combat Skills": 92, Leadership: 92 },
  "Anakin Skywalker": { Force: 96, "Lightsaber Dueling": 94, Piloting: 99, Wisdom: 74, "Combat Skills": 95, Leadership: 83 },
  "Darth Vader": { Force: 95, "Lightsaber Dueling": 97, Piloting: 92, Wisdom: 84, "Combat Skills": 96, Leadership: 94 },
  "Luke Skywalker": { Force: 94, "Lightsaber Dueling": 90, Piloting: 95, Wisdom: 86, "Combat Skills": 90, Leadership: 88 },
  "Obi-Wan Kenobi": { Force: 90, "Lightsaber Dueling": 95, Piloting: 80, Wisdom: 93, "Combat Skills": 92, Leadership: 85 },
  "Mace Windu": { Force: 91, "Lightsaber Dueling": 94, Piloting: 76, Wisdom: 88, "Combat Skills": 93, Leadership: 87 },
  "Qui-Gon Jinn": { Force: 88, "Lightsaber Dueling": 87, Piloting: 74, Wisdom: 91, "Combat Skills": 85, Leadership: 80 },
  "Ahsoka Tano": { Force: 86, "Lightsaber Dueling": 92, Piloting: 84, Wisdom: 84, "Combat Skills": 91, Leadership: 82 },
  "Rey": { Force: 89, "Lightsaber Dueling": 84, Piloting: 83, Wisdom: 73, "Combat Skills": 86, Leadership: 74 },
  "Kylo Ren": { Force: 88, "Lightsaber Dueling": 85, Piloting: 72, Wisdom: 62, "Combat Skills": 87, Leadership: 78 },
  "Leia Organa": { Force: 55, "Lightsaber Dueling": 36, Piloting: 80, Wisdom: 89, "Combat Skills": 72, Leadership: 96 },
  "Han Solo": { Force: 2, "Lightsaber Dueling": 15, Piloting: 95, Wisdom: 74, "Combat Skills": 82, Leadership: 76 },
  "Poe Dameron": { Force: 0, "Lightsaber Dueling": 8, Piloting: 97, Wisdom: 74, "Combat Skills": 84, Leadership: 82 },
  "Wedge Antilles": { Force: 0, "Lightsaber Dueling": 6, Piloting: 94, Wisdom: 76, "Combat Skills": 79, Leadership: 74 },
  "Hera Syndulla": { Force: 0, "Lightsaber Dueling": 5, Piloting: 96, Wisdom: 83, "Combat Skills": 75, Leadership: 86 },
  "Sabine Wren": { Force: 30, "Lightsaber Dueling": 62, Piloting: 85, Wisdom: 69, "Combat Skills": 88, Leadership: 72 },
  "Boba Fett": { Force: 0, "Lightsaber Dueling": 12, Piloting: 89, Wisdom: 80, "Combat Skills": 90, Leadership: 74 },
  "Jango Fett": { Force: 0, "Lightsaber Dueling": 10, Piloting: 88, Wisdom: 74, "Combat Skills": 88, Leadership: 68 },
  "Cad Bane": { Force: 0, "Lightsaber Dueling": 9, Piloting: 84, Wisdom: 76, "Combat Skills": 86, Leadership: 66 },
  "The Mandalorian": { Force: 0, "Lightsaber Dueling": 20, Piloting: 86, Wisdom: 75, "Combat Skills": 85, Leadership: 73 },
  "Bo-Katan Kryze": { Force: 0, "Lightsaber Dueling": 22, Piloting: 87, Wisdom: 78, "Combat Skills": 85, Leadership: 84 },
  "Cassian Andor": { Force: 0, "Lightsaber Dueling": 8, Piloting: 82, Wisdom: 78, "Combat Skills": 81, Leadership: 73 },
  "Jyn Erso": { Force: 0, "Lightsaber Dueling": 8, Piloting: 77, Wisdom: 71, "Combat Skills": 80, Leadership: 67 },
  "Chirrut ÃŽmwe": { Force: 15, "Lightsaber Dueling": 22, Piloting: 18, Wisdom: 82, "Combat Skills": 86, Leadership: 58 },
  "Baze Malbus": { Force: 0, "Lightsaber Dueling": 4, Piloting: 20, Wisdom: 68, "Combat Skills": 84, Leadership: 60 },
  "Grand Admiral Thrawn": { Force: 0, "Lightsaber Dueling": 2, Piloting: 42, Wisdom: 97, "Combat Skills": 52, Leadership: 95 },
  "Mon Mothma": { Force: 0, "Lightsaber Dueling": 0, Piloting: 12, Wisdom: 88, "Combat Skills": 22, Leadership: 94 },
  "Admiral Ackbar": { Force: 0, "Lightsaber Dueling": 0, Piloting: 44, Wisdom: 86, "Combat Skills": 38, Leadership: 90 },
  "Grand Moff Tarkin": { Force: 0, "Lightsaber Dueling": 0, Piloting: 30, Wisdom: 84, "Combat Skills": 34, Leadership: 91 },
  "General Grievous": { Force: 0, "Lightsaber Dueling": 91, Piloting: 61, Wisdom: 58, "Combat Skills": 92, Leadership: 72 },
  "BB-8": { Force: 0, "Lightsaber Dueling": 0, Piloting: 68, Wisdom: 64, "Combat Skills": 24, Leadership: 18 },
  "R2-D2": { Force: 0, "Lightsaber Dueling": 0, Piloting: 72, Wisdom: 75, "Combat Skills": 42, Leadership: 22 },
  "C-3PO": { Force: 0, "Lightsaber Dueling": 0, Piloting: 8, Wisdom: 63, "Combat Skills": 4, Leadership: 18 },
  "K-2SO": { Force: 0, "Lightsaber Dueling": 0, Piloting: 26, Wisdom: 66, "Combat Skills": 72, Leadership: 38 },
  "C1-10P \"Chopper\"": { Force: 0, "Lightsaber Dueling": 0, Piloting: 56, Wisdom: 59, "Combat Skills": 46, Leadership: 18 },
  "Jacen Solo": { Force: 72, "Lightsaber Dueling": 70, Piloting: 76, Wisdom: 68, "Combat Skills": 74, Leadership: 60 },
  "Jaina Solo": { Force: 52, "Lightsaber Dueling": 49, Piloting: 82, Wisdom: 63, "Combat Skills": 71, Leadership: 58 },
  "Ania Solo": { Force: 8, "Lightsaber Dueling": 6, Piloting: 80, Wisdom: 56, "Combat Skills": 63, Leadership: 45 }
};

function deriveCharacterProfile(name) {
  const profile = {
    Force: 4,
    "Lightsaber Dueling": 8,
    Piloting: 28,
    Wisdom: 42,
    "Combat Skills": 34,
    Leadership: 32
  };

  if (forceUsers.has(name)) {
    profile.Force += 68;
    profile["Lightsaber Dueling"] += 54;
    profile.Wisdom += 22;
    profile["Combat Skills"] += 24;
    profile.Leadership += 14;
  }

  if (acePilots.has(name)) {
    profile.Piloting += 48;
    profile["Combat Skills"] += 8;
  }

  if (battlefieldLeaders.has(name)) {
    profile.Leadership += 36;
    profile.Wisdom += 18;
  }

  if (skilledCombatants.has(name)) {
    profile["Combat Skills"] += 34;
  }

  if (droidCharacters.has(name)) {
    profile.Force = 0;
    profile["Lightsaber Dueling"] = 0;
    profile.Piloting += 16;
    profile.Wisdom += 10;
    profile.Leadership = Math.max(profile.Leadership - 12, 8);
  }

  if (underworldOperators.has(name)) {
    profile.Piloting += 10;
    profile.Wisdom += 6;
  }

  if (senatorsAndOfficials.has(name)) {
    profile.Wisdom += 18;
    profile.Leadership += 22;
    profile["Combat Skills"] = Math.max(profile["Combat Skills"] - 6, 8);
  }

  return Object.fromEntries(
    Object.entries({ ...profile, ...(characterOverrides[name] || {}) }).map(([trait, score]) => [
      trait,
      clampBattleScore(score)
    ])
  );
}

const characterRankings = {};
battleTraitLabels.character.forEach((trait) => {
  characterRankings[trait] = {};
});

const rankingCharacters = typeof characters !== 'undefined' ? characters : [];
const rankingShipParts = typeof shipParts !== 'undefined' ? shipParts : {};

rankingCharacters.forEach((character) => {
  const profile = deriveCharacterProfile(character.name);
  battleTraitLabels.character.forEach((trait) => {
    characterRankings[trait][character.name] = profile[trait];
  });
});

const shipRankingTiers = {
  gun: buildTierScores([
    ["Turbolaser Battery"],
    ["Plasma Torpedo", "Proton Torpedo Launcher", "Seeker Missile Array"],
    ["Ion Cannon", "Heavy Ion Turret", "Disruptor Array", "Railgun"],
    ["Quad Laser Turret", "Twin Laser Cannons", "Rapid-Fire Turret", "Plasma Cannon"],
    ["Concussion Missile Rack", "Mass Driver", "Particle Beam", "Shock Cannon"],
    ["Heavy Blaster", "Beam Laser", "Pulse Laser", "Flak Cannon", "Burst Cannon"],
    ["Cycling Laser", "Long-Range Laser", "Micro-Rocket Pod", "Ion Missile Pod", "EMP Launcher"],
    ["Auto-Blaster", "Thermal Detonator Tube", "Magnetic Harpoon", "Tractor Beam"]
  ], 98, 4, 50),
  droid: buildTierScores([
    ["R2-D2", "R4-P17", "BB-8"],
    ["R2-KT", "R2-Q5", "R3-S6", "R5-D4"],
    ["R4-G9", "R4-G0", "R5-X2", "R6-D5", "BB-9E"],
    ["R2-D5", "R2-A3", "R3-D3", "R3-A7", "R5-K6", "R7-A7"],
    ["R2-B1", "R3-A5", "R4-E1", "R5-J2", "R5-P8", "R6-H5", "R7-D4", "R8-B7", "R8-A5", "R9-K1", "R9-D9", "R5-A2"]
  ], 96, 5, 58),
  engine: buildTierScores([
    ["Hyperdrive Class 0.5", "Stellar Overdrive"],
    ["Hyperdrive Class 1", "Rapid Jump Spool", "Experimental Drive", "Subspace Injector"],
    ["Tuned Hyperdrive", "Twin-Vector Engines", "Afterburner Array", "Quantum Boost"],
    ["Dual Ion Thrusters", "Tri-Ion Engine", "Vector Thrusters", "Overcharged Reactor", "Silent Runner"],
    ["Hyperdrive Class 2", "Plasma Drive", "Fusion Drive", "S-Foil Boost", "Atmospheric Jets"],
    ["Ion Engines", "Sublight Thrusters", "Mag-Field Drive", "Boosted Stabilizers", "Radiant Core"],
    ["Hyperdrive Class 3", "Power Coupler", "Fuel Saver Kit", "Stealth Engine"],
    ["Hyperdrive Class 4"]
  ], 98, 4, 48),
  hull: buildTierScores([
    ["Star Destroyer"],
    ["Millennium Falcon", "TIE Defender", "Ghost"],
    ["Slave I", "Razor Crest", "Corellian Corvette", "T-6 Shuttle"],
    ["X-Wing", "B-Wing", "ARC-170", "Jedi Starfighter", "Gauntlet Fighter"],
    ["Y-Wing", "A-Wing", "TIE Advanced", "TIE Interceptor", "Naboo Starfighter", "U-Wing"],
    ["Imperial Shuttle", "Lambda Shuttle", "V-Wing", "Phantom", "Kom'rk-class"],
    ["TIE Fighter", "TIE Bomber", "Z-95 Headhunter", "YT-2400"],
    ["Outrider", "Ebon Hawk"]
  ], 99, 4, 46),
  alignment: buildTierScores([
    ["Jedi", "Sith"],
    ["Imperial", "Republic", "Rebel", "Resistance"],
    ["Clone", "Separatist", "First Order"],
    ["Mandalorian"],
    ["Neutral"]
  ], 94, 6, 50)
};

function getCharacterBattleScore(trait, name) {
  const traitRankings = characterRankings[trait] || {};
  const directMatch = traitRankings[name];

  if (typeof directMatch === 'number') {
    return directMatch;
  }

  const normalizedName = normalizeBattleKey(name);
  const foundEntry = Object.entries(traitRankings).find(([entryName]) => normalizeBattleKey(entryName) === normalizedName);
  if (foundEntry) {
    return foundEntry[1];
  }

  return clampBattleScore(deriveCharacterProfile(name)[trait] || 40);
}

function deriveShipFallbackScore(category, name) {
  const normalizedName = normalizeBattleKey(name);

  if (category === 'pilot') {
    return getCharacterBattleScore('Piloting', name);
  }

  if (category === 'gun') {
    if (normalizedName.includes('turbolaser')) return 98;
    if (normalizedName.includes('torpedo') || normalizedName.includes('missile')) return 92;
    if (normalizedName.includes('ion')) return 87;
    if (normalizedName.includes('laser')) return 80;
    if (normalizedName.includes('tractor') || normalizedName.includes('harpoon')) return 68;
    return 74;
  }

  if (category === 'engine') {
    if (normalizedName.includes('0 5')) return 99;
    if (normalizedName.includes('class 1')) return 95;
    if (normalizedName.includes('class 2')) return 88;
    if (normalizedName.includes('class 3')) return 80;
    if (normalizedName.includes('class 4')) return 72;
    if (normalizedName.includes('experimental') || normalizedName.includes('overdrive')) return 94;
    return 82;
  }

  if (category === 'hull') {
    if (normalizedName.includes('star destroyer')) return 99;
    if (normalizedName.includes('falcon') || normalizedName.includes('ghost')) return 93;
    if (normalizedName.includes('tie defender')) return 92;
    if (normalizedName.includes('x wing') || normalizedName.includes('wing')) return 84;
    if (normalizedName.includes('shuttle')) return 76;
    return 72;
  }

  if (category === 'droid') {
    if (normalizedName.includes('r2') || normalizedName.includes('bb 8')) return 90;
    if (normalizedName.includes('r4') || normalizedName.includes('r5')) return 78;
    return 70;
  }

  if (category === 'alignment') {
    if (normalizedName.includes('jedi') || normalizedName.includes('sith')) return 94;
    if (normalizedName.includes('imperial') || normalizedName.includes('republic') || normalizedName.includes('rebel')) return 86;
    return 72;
  }

  return 70;
}

const shipRankings = {
  gun: { ...shipRankingTiers.gun },
  droid: { ...shipRankingTiers.droid },
  pilot: {},
  engine: { ...shipRankingTiers.engine },
  hull: { ...shipRankingTiers.hull },
  alignment: { ...shipRankingTiers.alignment }
};

Object.keys(rankingShipParts).forEach((category) => {
  rankingShipParts[category].forEach((part) => {
    if (category === 'pilot') {
      shipRankings.pilot[part.name] = getCharacterBattleScore('Piloting', part.name);
      return;
    }

    if (typeof shipRankings[category][part.name] !== 'number') {
      shipRankings[category][part.name] = deriveShipFallbackScore(category, part.name);
    }
  });
});

function getShipBattleScore(category, name) {
  const categoryRankings = shipRankings[category] || {};
  const directMatch = categoryRankings[name];

  if (typeof directMatch === 'number') {
    return directMatch;
  }

  const normalizedName = normalizeBattleKey(name);
  const foundEntry = Object.entries(categoryRankings).find(([entryName]) => normalizeBattleKey(entryName) === normalizedName);
  if (foundEntry) {
    return foundEntry[1];
  }

  return clampBattleScore(deriveShipFallbackScore(category, name));
}

const battleRankings = {
  character: characterRankings,
  ship: shipRankings
};
