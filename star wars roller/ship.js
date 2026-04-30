const shipTraits = [
  { label: "Gun", key: "gun" },
  { label: "Droid Attached", key: "droid" },
  { label: "Pilot", key: "pilot" },
  { label: "Engine", key: "engine" },
  { label: "Base Look", key: "hull" },
  { label: "Alignment", key: "alignment" }
];

let selectedParts = Array(shipTraits.length).fill(null);
let lockedParts = Array(shipTraits.length).fill(false);

const shipTraitsGrid = document.getElementById('shipTraitsGrid');
const rollShipButton = document.getElementById('rollShipButton');
const saveShipButton = document.getElementById('saveShipButton');
const savedShipList = document.getElementById('savedShipList');

function applyImageWithFallback(imgEl, candidates, altText) {
  const uniqueCandidates = [...new Set((candidates || []).filter(Boolean))];
  let currentIndex = 0;

  imgEl.alt = altText || 'Star Wars ship part';

  function setNextImage() {
    const nextSource = uniqueCandidates[currentIndex] || 'images/placeholder.jpg';
    imgEl.src = nextSource;
    currentIndex += 1;
  }

  imgEl.onerror = () => {
    if (currentIndex < uniqueCandidates.length) {
      setNextImage();
      return;
    }

    imgEl.onerror = null;
    imgEl.src = 'images/placeholder.jpg';
  };

  setNextImage();
}

shipTraits.forEach((trait, index) => {
  const slot = document.createElement('div');
  slot.className = 'trait';
  slot.innerHTML = `
    <h3>${trait.label}</h3>
    <img src="images/placeholder.jpg" alt="placeholder" />
    <p class="name">?</p>
    <button class="lock-button">Lock</button>
  `;
  shipTraitsGrid.appendChild(slot);
});

function rollShipParts() {
  const traitDivs = shipTraitsGrid.querySelectorAll('.trait');

  traitDivs.forEach((div, index) => {
    if (lockedParts[index]) return;

    let count = 0;
    const imgEl = div.querySelector('img');
    const nameEl = div.querySelector('.name');
    const traitKey = shipTraits[index].key;
    const options = shipParts[traitKey] || [];

    const interval = setInterval(() => {
      const rand = options[Math.floor(Math.random() * options.length)];
      if (!rand) return;
      applyImageWithFallback(
        imgEl,
        rand.imageCandidates || [rand.image],
        `${rand.name} ${shipTraits[index].label}`
      );
      nameEl.textContent = rand.name;
      count++;
      if (count >= 10) {
        clearInterval(interval);
        selectedParts[index] = rand;
      }
    }, 60);
  });
}

rollShipButton.addEventListener('click', rollShipParts);

shipTraitsGrid.querySelectorAll('.lock-button').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    lockedParts[index] = !lockedParts[index];
    btn.textContent = lockedParts[index] ? "Unlock" : "Lock";
  });
});

saveShipButton.addEventListener('click', () => {
  if (selectedParts.includes(null)) {
    alert("Fill all ship parts before saving!");
    return;
  }

  const name = prompt("Name your ship:");
  if (!name) return;

  const shipData = {
    name,
    traits: shipTraits.map((trait, i) => ({
      trait: trait.label,
      part: selectedParts[i]
    }))
  };

  const saved = JSON.parse(localStorage.getItem('savedShips') || "[]");
  saved.push(shipData);
  localStorage.setItem('savedShips', JSON.stringify(saved));
  loadSavedShips();
});

function loadSavedShips() {
  savedShipList.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem('savedShips') || "[]");

  saved.forEach((entry, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'saved-character';

    const title = document.createElement('h3');
    title.textContent = entry.name;
    wrapper.appendChild(title);

    entry.traits.forEach(({ trait, part }) => {
      if (!part) return;
      const row = document.createElement('p');
      const savedPart = normalizeShipPart(
        shipTraits.find((shipTrait) => shipTrait.label === trait)?.key,
        part
      );
      row.innerHTML = `<strong>${trait}:</strong> <img src="${savedPart.image}" alt="${savedPart.name}" /> <span class="saved-name">${savedPart.name}</span>`;
      const rowImage = row.querySelector('img');
      applyImageWithFallback(rowImage, savedPart.imageCandidates, savedPart.name);
      wrapper.appendChild(row);
    });

    const renameBtn = document.createElement('button');
    renameBtn.textContent = "Rename";
    renameBtn.onclick = () => {
      const newName = prompt("New name:", entry.name);
      if (newName) {
        const savedArr = JSON.parse(localStorage.getItem('savedShips') || "[]");
        savedArr[i].name = newName;
        localStorage.setItem('savedShips', JSON.stringify(savedArr));
        loadSavedShips();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      if (confirm("Delete this ship?")) {
        const savedArr = JSON.parse(localStorage.getItem('savedShips') || "[]");
        savedArr.splice(i, 1);
        localStorage.setItem('savedShips', JSON.stringify(savedArr));
        loadSavedShips();
      }
    };

    wrapper.appendChild(renameBtn);
    wrapper.appendChild(deleteBtn);
    savedShipList.appendChild(wrapper);
  });
}

loadSavedShips();
