const traits = [
  "Force",
  "Lightsaber Dueling",
  "Piloting",
  "Wisdom",
  "Combat Skills",
  "Leadership"
];

let selectedCharacters = Array(6).fill(null);
let locked = Array(6).fill(false);

const traitsGrid = document.querySelector('.traits-grid');
const rollButton = document.getElementById('rollButton');
const saveButton = document.getElementById('saveButton');
const savedList = document.getElementById('savedList');

// Setup initial trait UI
traits.forEach((trait, index) => {
  const slot = document.createElement('div');
  slot.className = 'trait';
  slot.innerHTML = `
    <h3>${trait}</h3>
    <img src="images/placeholder.jpg" alt="placeholder" />
    <p class="name">?</p>
    <button class="lock-button">Lock</button>
  `;
  traitsGrid.appendChild(slot);
});

function rollCharacters() {
  const traitDivs = document.querySelectorAll('.trait');

  traitDivs.forEach((div, index) => {
    if (locked[index]) return;

    let count = 0;
    const imgEl = div.querySelector('img');
    const nameEl = div.querySelector('.name');

    const interval = setInterval(() => {
      const rand = characters[Math.floor(Math.random() * characters.length)];
      imgEl.src = rand.image;
      nameEl.textContent = rand.name;
      count++;
      if (count >= 10) {
        clearInterval(interval);
        selectedCharacters[index] = rand;
      }
    }, 60);
  });
}

rollButton.addEventListener('click', rollCharacters);

// Lock buttons
document.querySelectorAll('.lock-button').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    locked[index] = !locked[index];
    btn.textContent = locked[index] ? "Unlock" : "Lock";
  });
});

// Save character
saveButton.addEventListener('click', () => {
  if (selectedCharacters.includes(null)) {
    alert("Fill all traits before saving!");
    return;
  }

  const name = prompt("Name your character:");
  if (!name) return;

  const characterData = {
    name,
    traits: traits.map((trait, i) => ({
      trait,
      character: selectedCharacters[i]
    }))
  };

  const saved = JSON.parse(localStorage.getItem('savedCharacters') || "[]");
  saved.push(characterData);
  localStorage.setItem('savedCharacters', JSON.stringify(saved));
  loadSavedCharacters();
});

// ...existing code...
function loadSavedCharacters() {
  savedList.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem('savedCharacters') || "[]");

  saved.forEach((entry, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'saved-character';

    const title = document.createElement('h3');
    title.textContent = entry.name;
    wrapper.appendChild(title);

    entry.traits.forEach(({ trait, character }) => {
      if (!character) return; // Skip if character is undefined
      const row = document.createElement('p');
      row.innerHTML = `<strong>${trait}:</strong> <img src="${character.image}" alt="" /> <span class="saved-name">${character.name}</span>`;
      wrapper.appendChild(row);
    });

    const renameBtn = document.createElement('button');
    renameBtn.textContent = "Rename";
    renameBtn.onclick = () => {
      const newName = prompt("New name:", entry.name);
      if (newName) {
        const savedArr = JSON.parse(localStorage.getItem('savedCharacters') || "[]");
        savedArr[i].name = newName;
        localStorage.setItem('savedCharacters', JSON.stringify(savedArr));
        loadSavedCharacters();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      if (confirm("Delete this character?")) {
        const savedArr = JSON.parse(localStorage.getItem('savedCharacters') || "[]");
        savedArr.splice(i, 1);
        localStorage.setItem('savedCharacters', JSON.stringify(savedArr));
        loadSavedCharacters();
      }
    };

    wrapper.appendChild(renameBtn);
    wrapper.appendChild(deleteBtn);
    savedList.appendChild(wrapper);
  });
}
// ...existing code...
loadSavedCharacters();



