const shipParts = {
  gun: [
    { name: "Twin Laser Cannons", image: "images/ships/gun/twin-laser-cannons.svg" },
    { name: "Ion Cannon", image: "images/ships/gun/ion-cannon.svg" },
    { name: "Turbolaser Battery", image: "images/ships/gun/turbolaser-battery.svg" },
    { name: "Concussion Missile Rack", image: "images/ships/gun/concussion-missile-rack.svg" },
    { name: "Tractor Beam", image: "images/ships/gun/tractor-beam.svg" },
    { name: "Heavy Blaster", image: "images/ships/gun/heavy-blaster.svg" },
    { name: "Quad Laser Turret", image: "images/ships/gun/quad-laser-turret.svg" },
    { name: "Disruptor Array", image: "images/ships/gun/disruptor-array.svg" },
    { name: "Proton Torpedo Launcher", image: "images/ships/gun/proton-torpedo-launcher.svg" },
    { name: "Plasma Cannon", image: "images/ships/gun/plasma-cannon.svg" },
    { name: "Particle Beam", image: "images/ships/gun/particle-beam.svg" },
    { name: "Pulse Laser", image: "images/ships/gun/pulse-laser.svg" },
    { name: "Auto-Blaster", image: "images/ships/gun/auto-blaster.svg" },
    { name: "Railgun", image: "images/ships/gun/railgun.svg" },
    { name: "Beam Laser", image: "images/ships/gun/beam-laser.svg" },
    { name: "Ion Missile Pod", image: "images/ships/gun/ion-missile-pod.svg" },
    { name: "Thermal Detonator Tube", image: "images/ships/gun/thermal-detonator-tube.svg" },
    { name: "Magnetic Harpoon", image: "images/ships/gun/magnetic-harpoon.svg" },
    { name: "Seeker Missile Array", image: "images/ships/gun/seeker-missile-array.svg" },
    { name: "Flak Cannon", image: "images/ships/gun/flak-cannon.svg" },
    { name: "Long-Range Laser", image: "images/ships/gun/long-range-laser.svg" },
    { name: "Burst Cannon", image: "images/ships/gun/burst-cannon.svg" },
    { name: "Micro-Rocket Pod", image: "images/ships/gun/micro-rocket-pod.svg" },
    { name: "Shock Cannon", image: "images/ships/gun/shock-cannon.svg" },
    { name: "EMP Launcher", image: "images/ships/gun/emp-launcher.svg" },
    { name: "Plasma Torpedo", image: "images/ships/gun/plasma-torpedo.svg" },
    { name: "Rapid-Fire Turret", image: "images/ships/gun/rapid-fire-turret.svg" },
    { name: "Heavy Ion Turret", image: "images/ships/gun/heavy-ion-turret.svg" },
    { name: "Cycling Laser", image: "images/ships/gun/cycling-laser.svg" },
    { name: "Mass Driver", image: "images/ships/gun/mass-driver.svg" }
  ],
  droid: [
    { name: "R2-D2", image: "images/ships/droid/r2-d2.svg" },
    { name: "R2-D5", image: "images/ships/droid/r2-d5.svg" },
    { name: "R2-Q5", image: "images/ships/droid/r2-q5.svg" },
    { name: "R2-KT", image: "images/ships/droid/r2-kt.svg" },
    { name: "R2-B1", image: "images/ships/droid/r2-b1.svg" },
    { name: "R2-A3", image: "images/ships/droid/r2-a3.svg" },
    { name: "R3-S6", image: "images/ships/droid/r3-s6.svg" },
    { name: "R3-A7", image: "images/ships/droid/r3-a7.svg" },
    { name: "R3-D3", image: "images/ships/droid/r3-d3.svg" },
    { name: "R3-A5", image: "images/ships/droid/r3-a5.svg" },
    { name: "R4-P17", image: "images/ships/droid/r4-p17.svg" },
    { name: "R4-G9", image: "images/ships/droid/r4-g9.svg" },
    { name: "R4-G0", image: "images/ships/droid/r4-g0.svg" },
    { name: "R4-E1", image: "images/ships/droid/r4-e1.svg" },
    { name: "R5-D4", image: "images/ships/droid/r5-d4.svg" },
    { name: "R5-J2", image: "images/ships/droid/r5-j2.svg" },
    { name: "R5-P8", image: "images/ships/droid/r5-p8.svg" },
    { name: "R5-X2", image: "images/ships/droid/r5-x2.svg" },
    { name: "R5-A2", image: "images/ships/droid/r5-a2.svg" },
    { name: "R5-K6", image: "images/ships/droid/r5-k6.svg" },
    { name: "R6-D5", image: "images/ships/droid/r6-d5.svg" },
    { name: "R6-H5", image: "images/ships/droid/r6-h5.svg" },
    { name: "R7-A7", image: "images/ships/droid/r7-a7.svg" },
    { name: "R7-D4", image: "images/ships/droid/r7-d4.svg" },
    { name: "R8-B7", image: "images/ships/droid/r8-b7.svg" },
    { name: "R8-A5", image: "images/ships/droid/r8-a5.svg" },
    { name: "R9-D9", image: "images/ships/droid/r9-d9.svg" },
    { name: "R9-K1", image: "images/ships/droid/r9-k1.svg" },
    { name: "BB-8", image: "images/ships/droid/bb-8.svg" },
    { name: "BB-9E", image: "images/ships/droid/bb-9e.svg" }
  ],
  pilot: [
    { name: "Han Solo", image: "images/ships/pilot/han-solo.jpg" },
    { name: "Chewbacca", image: "images/ships/pilot/chewbacca.jpg" },
    { name: "Leia Organa", image: "images/ships/pilot/leia-organa.jpg" },
    { name: "Luke Skywalker", image: "images/ships/pilot/luke-skywalker.svg" },
    { name: "Poe Dameron", image: "images/ships/pilot/poe-dameron.jpg" },
    { name: "Ahsoka Tano", image: "images/ships/pilot/ahsoka-tano.jpg" },
    { name: "Boba Fett", image: "images/ships/pilot/boba-fett.jpg" },
    { name: "Anakin Skywalker", image: "images/ships/pilot/anakin-skywalker.jpg" },
    { name: "Jyn Erso", image: "images/ships/pilot/jyn-erso.jpg" },
    { name: "Wedge Antilles", image: "images/ships/pilot/wedge-antilles.jpg" },
    { name: "Lando Calrissian", image: "images/ships/pilot/lando-calrissian.jpg" },
    { name: "Rey", image: "images/ships/pilot/rey.jpg" },
    { name: "Finn", image: "images/ships/pilot/finn.jpg" },
    { name: "Cassian Andor", image: "images/ships/pilot/cassian-andor.jpg" },
    { name: "Bo-Katan Kryze", image: "images/ships/pilot/bo-katan-kryze.jpg" },
    { name: "The Mandalorian", image: "images/ships/pilot/the-mandalorian.jpg" },
    { name: "Sabine Wren", image: "images/ships/pilot/sabine-wren.jpg" },
    { name: "Ezra Bridger", image: "images/ships/pilot/ezra-bridger.jpg" },
    { name: "Hera Syndulla", image: "images/ships/pilot/hera-syndulla.jpg" },
    { name: "Kanan Jarrus", image: "images/ships/pilot/kanan-jarrus.jpg" },
    { name: "Kylo Ren", image: "images/ships/pilot/kylo-ren.jpg" },
    { name: "Darth Vader", image: "images/ships/pilot/darth-vader.jpg" },
    { name: "Padme Amidala", image: "images/ships/pilot/padme-amidala.svg" },
    { name: "Obi-Wan Kenobi", image: "images/ships/pilot/obi-wan-kenobi.jpg" },
    { name: "Mace Windu", image: "images/ships/pilot/mace-windu.jpg" },
    { name: "Jango Fett", image: "images/ships/pilot/jango-fett.jpg" },
    { name: "Cad Bane", image: "images/ships/pilot/cad-bane.jpg" },
    { name: "Plo Koon", image: "images/ships/pilot/plo-koon.jpg" },
    { name: "Qui-Gon Jinn", image: "images/ships/pilot/qui-gon-jinn.jpg" },
    { name: "Rose Tico", image: "images/ships/pilot/rose-tico.svg" }
  ],
  engine: [
    { name: "Sublight Thrusters", image: "images/ships/engine/sublight-thrusters.svg" },
    { name: "Hyperdrive Class 1", image: "images/ships/engine/hyperdrive-class-1.svg" },
    { name: "Hyperdrive Class 2", image: "images/ships/engine/hyperdrive-class-2.svg" },
    { name: "Hyperdrive Class 3", image: "images/ships/engine/hyperdrive-class-3.svg" },
    { name: "Hyperdrive Class 4", image: "images/ships/engine/hyperdrive-class-4.svg" },
    { name: "Ion Engines", image: "images/ships/engine/ion-engines.svg" },
    { name: "Experimental Drive", image: "images/ships/engine/experimental-drive.svg" },
    { name: "Stealth Engine", image: "images/ships/engine/stealth-engine.svg" },
    { name: "S-Foil Boost", image: "images/ships/engine/s-foil-boost.svg" },
    { name: "Overcharged Reactor", image: "images/ships/engine/overcharged-reactor.svg" },
    { name: "Dual Ion Thrusters", image: "images/ships/engine/dual-ion-thrusters.svg" },
    { name: "Vector Thrusters", image: "images/ships/engine/vector-thrusters.svg" },
    { name: "Afterburner Array", image: "images/ships/engine/afterburner-array.svg" },
    { name: "Fusion Drive", image: "images/ships/engine/fusion-drive.svg" },
    { name: "Plasma Drive", image: "images/ships/engine/plasma-drive.svg" },
    { name: "Quantum Boost", image: "images/ships/engine/quantum-boost.svg" },
    { name: "Mag-Field Drive", image: "images/ships/engine/mag-field-drive.svg" },
    { name: "Tuned Hyperdrive", image: "images/ships/engine/tuned-hyperdrive.svg" },
    { name: "Twin-Vector Engines", image: "images/ships/engine/twin-vector-engines.svg" },
    { name: "Tri-Ion Engine", image: "images/ships/engine/tri-ion-engine.svg" },
    { name: "Fuel Saver Kit", image: "images/ships/engine/fuel-saver-kit.svg" },
    { name: "Boosted Stabilizers", image: "images/ships/engine/boosted-stabilizers.svg" },
    { name: "Rapid Jump Spool", image: "images/ships/engine/rapid-jump-spool.svg" },
    { name: "Radiant Core", image: "images/ships/engine/radiant-core.svg" },
    { name: "Power Coupler", image: "images/ships/engine/power-coupler.svg" },
    { name: "Hyperdrive Class 0.5", image: "images/ships/engine/hyperdrive-class-0-5.svg" },
    { name: "Atmospheric Jets", image: "images/ships/engine/atmospheric-jets.svg" },
    { name: "Subspace Injector", image: "images/ships/engine/subspace-injector.svg" },
    { name: "Silent Runner", image: "images/ships/engine/silent-runner.svg" },
    { name: "Stellar Overdrive", image: "images/ships/engine/stellar-overdrive.svg" }
  ],
  hull: [
    { name: "Millennium Falcon", image: "images/ships/hull/millennium-falcon.svg" },
    { name: "X-Wing", image: "images/ships/hull/x-wing.svg" },
    { name: "TIE Fighter", image: "images/ships/hull/tie-fighter.svg" },
    { name: "Star Destroyer", image: "images/ships/hull/star-destroyer.svg" },
    { name: "Slave I", image: "images/ships/hull/slave-i.svg" },
    { name: "Imperial Shuttle", image: "images/ships/hull/imperial-shuttle.svg" },
    { name: "Naboo Starfighter", image: "images/ships/hull/naboo-starfighter.svg" },
    { name: "Razor Crest", image: "images/ships/hull/razor-crest.svg" },
    { name: "A-Wing", image: "images/ships/hull/a-wing.svg" },
    { name: "B-Wing", image: "images/ships/hull/b-wing.svg" },
    { name: "Y-Wing", image: "images/ships/hull/y-wing.svg" },
    { name: "U-Wing", image: "images/ships/hull/u-wing.svg" },
    { name: "TIE Interceptor", image: "images/ships/hull/tie-interceptor.svg" },
    { name: "TIE Bomber", image: "images/ships/hull/tie-bomber.svg" },
    { name: "TIE Advanced", image: "images/ships/hull/tie-advanced.svg" },
    { name: "Lambda Shuttle", image: "images/ships/hull/lambda-shuttle.svg" },
    { name: "ARC-170", image: "images/ships/hull/arc-170.svg" },
    { name: "Z-95 Headhunter", image: "images/ships/hull/z-95-headhunter.svg" },
    { name: "Jedi Starfighter", image: "images/ships/hull/jedi-starfighter.svg" },
    { name: "V-Wing", image: "images/ships/hull/v-wing.svg" },
    { name: "TIE Defender", image: "images/ships/hull/tie-defender.svg" },
    { name: "Gauntlet Fighter", image: "images/ships/hull/gauntlet-fighter.svg" },
    { name: "Kom'rk-class", image: "images/ships/hull/kom-rk-class.svg" },
    { name: "Ghost", image: "images/ships/hull/ghost.svg" },
    { name: "Phantom", image: "images/ships/hull/phantom.svg" },
    { name: "Ebon Hawk", image: "images/ships/hull/ebon-hawk.svg" },
    { name: "Outrider", image: "images/ships/hull/outrider.svg" },
    { name: "YT-2400", image: "images/ships/hull/yt-2400.svg" },
    { name: "T-6 Shuttle", image: "images/ships/hull/t-6-shuttle.svg" },
    { name: "Corellian Corvette", image: "images/ships/hull/corellian-corvette.svg" }
  ],
  alignment: [
    { name: "Jedi", image: "images/ships/alignment/jedi.svg" },
    { name: "Sith", image: "images/ships/alignment/sith.svg" },
    { name: "Clone", image: "images/ships/alignment/clone.svg" },
    { name: "Rebel", image: "images/ships/alignment/rebel.svg" },
    { name: "Imperial", image: "images/ships/alignment/imperial.svg" },
    { name: "First Order", image: "images/ships/alignment/first-order.svg" },
    { name: "Resistance", image: "images/ships/alignment/resistance.svg" },
    { name: "Separatist", image: "images/ships/alignment/separatist.svg" },
    { name: "Republic", image: "images/ships/alignment/republic.svg" },
    { name: "Mandalorian", image: "images/ships/alignment/mandalorian.svg" },
    { name: "Neutral", image: "images/ships/alignment/neutral.svg" }
  ]
};

const shipImageCandidatesByCategory = {
  gun: ['images/ships/gun/{slug}.png', 'images/ships/gun/{slug}.jpg', 'images/ships/gun/{slug}.jpeg', 'images/ships/gun/{slug}.svg'],
  droid: ['images/ships/droid/{slug}.png', 'images/ships/droid/{slug}.jpg', 'images/ships/droid/{slug}.jpeg', 'images/ships/droid/{slug}.svg'],
  pilot: [
    'images/ships/pilot/{slug}.jpg',
    'images/ships/pilot/{slug}.jpeg',
    'images/ships/pilot/{slug}.png',
    'images/ships/pilot/{slug}.svg',
    'images/{fallback}.jpg'
  ],
  engine: ['images/ships/engine/{slug}.png', 'images/ships/engine/{slug}.jpg', 'images/ships/engine/{slug}.jpeg', 'images/ships/engine/{slug}.svg'],
  hull: ['images/ships/hull/{slug}.jpg', 'images/ships/hull/{slug}.jpeg', 'images/ships/hull/{slug}.png', 'images/ships/hull/{slug}.svg'],
  alignment: ['images/ships/alignment/{slug}.jpg', 'images/ships/alignment/{slug}.jpeg', 'images/ships/alignment/{slug}.png', 'images/ships/alignment/{slug}.svg']
};

const shipPilotFallbackNames = {
  "Ahsoka Tano": "ahsoka",
  "Anakin Skywalker": "anakin",
  "Bo-Katan Kryze": "bo",
  "Boba Fett": "boba",
  "Cad Bane": "cad",
  "Cassian Andor": "cassian",
  "Chewbacca": "placeholder",
  "Darth Vader": "vader",
  "Ezra Bridger": "ezra",
  "Finn": "finn",
  "Han Solo": "han",
  "Hera Syndulla": "placeholder",
  "Jango Fett": "jango",
  "Jyn Erso": "jyn",
  "Kanan Jarrus": "placeholder",
  "Kylo Ren": "kylo",
  "Lando Calrissian": "lando",
  "Leia Organa": "leia",
  "Luke Skywalker": "luke",
  "Mace Windu": "mace",
  "Obi-Wan Kenobi": "obiwan",
  "Padme Amidala": "placeholder",
  "Plo Koon": "plo",
  "Poe Dameron": "poe",
  "Qui-Gon Jinn": "qui-gon",
  "Rey": "rey",
  "Rose Tico": "rose",
  "Sabine Wren": "sabine",
  "The Mandalorian": "mandalorian",
  "Wedge Antilles": "wedge"
};

function slugifyShipPartName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/\s*&\s*/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getShipImageCandidates(category, name, image) {
  const slug = slugifyShipPartName(name);
  const fallback = shipPilotFallbackNames[name] || slug;
  const templates = shipImageCandidatesByCategory[category] || [];
  const candidates = [];

  // Prefer local raster assets so the ship builder shows photos before legacy icon art.
  templates.forEach((template) => {
    candidates.push(template.replace('{slug}', slug).replace('{fallback}', fallback));
  });

  if (image) {
    candidates.push(image);
  }

  candidates.push('images/placeholder.jpg');
  return [...new Set(candidates.filter(Boolean))];
}

function getShipPartImage(category, part) {
  if (!part) {
    return 'images/placeholder.jpg';
  }

  return getShipImageCandidates(category, part.name, part.image)[0];
}

function normalizeShipPart(category, part) {
  if (!part) {
    return part;
  }

  return {
    ...part,
    image: getShipPartImage(category, part),
    imageCandidates: getShipImageCandidates(category, part.name, part.image)
  };
}

Object.keys(shipParts).forEach((category) => {
  shipParts[category] = shipParts[category].map((part) => normalizeShipPart(category, part));
});








