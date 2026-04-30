const battleModeButtons = Array.from(document.querySelectorAll('.mode-button'));
const fighterOneSelect = document.getElementById('fighterOneSelect');
const fighterTwoSelect = document.getElementById('fighterTwoSelect');
const fighterOnePreview = document.getElementById('fighterOnePreview');
const fighterTwoPreview = document.getElementById('fighterTwoPreview');
const battlePreviewGrid = document.getElementById('battlePreviewGrid');
const battleStatus = document.getElementById('battleStatus');
const startBattleButton = document.getElementById('startBattleButton');
const battleResultsPanel = document.getElementById('battleResultsPanel');
const battleResultsGrid = document.getElementById('battleResultsGrid');
const battleWinnerText = document.getElementById('battleWinnerText');

let currentBattleMode = 'character';

const battleModeConfig = {
  character: {
    storageKey: 'savedCharacters',
    emptyMessage: 'Save at least two characters in the character builder to simulate a battle.',
    entityKey: 'character',
    title: 'Character'
  },
  ship: {
    storageKey: 'savedShips',
    emptyMessage: 'Save at least two ships in the ship builder to simulate a battle.',
    entityKey: 'part',
    title: 'Ship'
  }
};

function applyImageFallback(imgEl, candidates, altText) {
  const queue = [...new Set((candidates || []).filter(Boolean))];
  let index = 0;

  imgEl.alt = altText || 'Battle asset';

  function loadNext() {
    imgEl.src = queue[index] || 'images/placeholder.jpg';
    index += 1;
  }

  imgEl.onerror = () => {
    if (index < queue.length) {
      loadNext();
      return;
    }

    imgEl.onerror = null;
    imgEl.src = 'images/placeholder.jpg';
  };

  loadNext();
}

function getSavedBattleEntries(mode) {
  return JSON.parse(localStorage.getItem(battleModeConfig[mode].storageKey) || '[]');
}

function getBattleSelection(mode, index) {
  const savedEntries = getSavedBattleEntries(mode);
  return savedEntries[Number(index)] || null;
}

function renderSelectOptions() {
  const savedEntries = getSavedBattleEntries(currentBattleMode);

  [fighterOneSelect, fighterTwoSelect].forEach((select) => {
    select.innerHTML = '';

    if (!savedEntries.length) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = `No saved ${battleModeConfig[currentBattleMode].title.toLowerCase()}s available`;
      select.appendChild(option);
      select.disabled = true;
      return;
    }

    savedEntries.forEach((entry, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = entry.name;
      select.appendChild(option);
    });

    select.disabled = false;
  });

  if (savedEntries.length > 1) {
    fighterOneSelect.value = '0';
    fighterTwoSelect.value = '1';
  } else if (savedEntries.length === 1) {
    fighterOneSelect.value = '0';
    fighterTwoSelect.value = '0';
  }

  renderSelectionPreviews();
}

function getEntryItems(entry) {
  return (entry?.traits || []).map((item) => {
    if (item.character) {
      return {
        label: item.trait,
        name: item.character.name,
        image: item.character.image,
        imageCandidates: [item.character.image, 'images/placeholder.jpg']
      };
    }

    if (item.part) {
      const category = battleTraitLabels.ship[item.trait];
      const normalizedPart = normalizeShipPart(category, item.part);
      return {
        label: item.trait,
        name: normalizedPart.name,
        image: normalizedPart.image,
        imageCandidates: normalizedPart.imageCandidates
      };
    }

    return null;
  }).filter(Boolean);
}

function buildPreviewCard(entry, isWinner = false) {
  if (!entry) {
    return `
      <div class="battle-preview-card">
        <h3>No Selection</h3>
        <p class="battle-preview-empty">Choose a saved build to preview it here.</p>
      </div>
    `;
  }

  const items = getEntryItems(entry);
  const detailRows = items.map((item, index) => `
    <li class="battle-preview-row">
      <img
        data-battle-image
        data-candidates="${encodeURIComponent(JSON.stringify(item.imageCandidates || [item.image]))}"
        src="${item.image}"
        alt="${item.name}"
      />
      <span><strong>${item.label}:</strong> ${item.name}</span>
    </li>
  `).join('');

  return `
    <div class="battle-preview-card ${isWinner ? 'battle-preview-card-winner' : ''}">
      <h3>${entry.name}</h3>
      <ul class="battle-preview-list">${detailRows}</ul>
    </div>
  `;
}

function hydratePreviewImages(scope) {
  scope.querySelectorAll('[data-battle-image]').forEach((imgEl) => {
    const candidates = JSON.parse(decodeURIComponent(imgEl.dataset.candidates || '%5B%5D'));
    applyImageFallback(imgEl, candidates, imgEl.alt);
  });
}

function renderSelectionPreviews(winnerName = '') {
  const fighterOne = getBattleSelection(currentBattleMode, fighterOneSelect.value);
  const fighterTwo = getBattleSelection(currentBattleMode, fighterTwoSelect.value);

  fighterOnePreview.innerHTML = buildPreviewCard(fighterOne, fighterOne?.name === winnerName);
  fighterTwoPreview.innerHTML = buildPreviewCard(fighterTwo, fighterTwo?.name === winnerName);
  hydratePreviewImages(battlePreviewGrid);
}

function getCategoryWinner(leftScore, rightScore) {
  if (leftScore === rightScore) {
    return 'tie';
  }

  return leftScore > rightScore ? 'left' : 'right';
}

function simulateCharacterBattle(fighterOne, fighterTwo) {
  const results = fighterOne.traits.map((leftTrait, index) => {
    const rightTrait = fighterTwo.traits[index];
    const leftScore = getCharacterBattleScore(leftTrait.trait, leftTrait.character?.name);
    const rightScore = getCharacterBattleScore(rightTrait.trait, rightTrait.character?.name);

    return {
      category: leftTrait.trait,
      leftName: leftTrait.character?.name || 'Unknown',
      rightName: rightTrait.character?.name || 'Unknown',
      leftScore,
      rightScore,
      winner: getCategoryWinner(leftScore, rightScore)
    };
  });

  return finalizeBattleResults(fighterOne.name, fighterTwo.name, results);
}

function simulateShipBattle(fighterOne, fighterTwo) {
  const results = fighterOne.traits.map((leftTrait, index) => {
    const rightTrait = fighterTwo.traits[index];
    const category = battleTraitLabels.ship[leftTrait.trait];
    const leftScore = getShipBattleScore(category, leftTrait.part?.name);
    const rightScore = getShipBattleScore(category, rightTrait.part?.name);

    return {
      category: leftTrait.trait,
      leftName: leftTrait.part?.name || 'Unknown',
      rightName: rightTrait.part?.name || 'Unknown',
      leftScore,
      rightScore,
      winner: getCategoryWinner(leftScore, rightScore)
    };
  });

  return finalizeBattleResults(fighterOne.name, fighterTwo.name, results);
}

function finalizeBattleResults(leftName, rightName, categoryResults) {
  const summary = categoryResults.reduce((accumulator, result) => {
    if (result.winner === 'left') {
      accumulator.leftWins += 1;
    } else if (result.winner === 'right') {
      accumulator.rightWins += 1;
    } else {
      accumulator.ties += 1;
    }
    return accumulator;
  }, { leftWins: 0, rightWins: 0, ties: 0 });

  let winner = 'Tie';
  if (summary.leftWins > summary.rightWins) {
    winner = leftName;
  } else if (summary.rightWins > summary.leftWins) {
    winner = rightName;
  }

  return {
    winner,
    leftWins: summary.leftWins,
    rightWins: summary.rightWins,
    ties: summary.ties,
    categoryResults
  };
}

function renderBattleResults(result) {
  battleResultsGrid.innerHTML = result.categoryResults.map((categoryResult) => `
    <article class="battle-result-row">
      <h3>${categoryResult.category}</h3>
      <div class="battle-score-grid">
        <div class="battle-score-cell ${categoryResult.winner === 'left' ? 'winner' : ''}">
          <span class="battle-score-name">${categoryResult.leftName}</span>
          <strong>${categoryResult.leftScore}</strong>
        </div>
        <div class="battle-score-cell battle-score-divider ${categoryResult.winner === 'tie' ? 'winner' : ''}">
          <span>VS</span>
        </div>
        <div class="battle-score-cell ${categoryResult.winner === 'right' ? 'winner' : ''}">
          <span class="battle-score-name">${categoryResult.rightName}</span>
          <strong>${categoryResult.rightScore}</strong>
        </div>
      </div>
    </article>
  `).join('');

  const scoreline = `${result.leftWins}-${result.rightWins}`;
  battleWinnerText.textContent = result.winner === 'Tie'
    ? `Overall result: draw after ${result.categoryResults.length} categories (${scoreline}, ${result.ties} tie categories).`
    : `Overall winner: ${result.winner} (${scoreline}, ${result.ties} tied categories).`;

  battleResultsPanel.hidden = false;
  renderSelectionPreviews(result.winner === 'Tie' ? '' : result.winner);
}

function updateBattleStatus(message, isError = false) {
  battleStatus.textContent = message;
  battleStatus.classList.toggle('error', isError);
}

function runBattle() {
  const savedEntries = getSavedBattleEntries(currentBattleMode);
  if (savedEntries.length < 2) {
    updateBattleStatus(battleModeConfig[currentBattleMode].emptyMessage, true);
    battleResultsPanel.hidden = true;
    return;
  }

  const fighterOne = getBattleSelection(currentBattleMode, fighterOneSelect.value);
  const fighterTwo = getBattleSelection(currentBattleMode, fighterTwoSelect.value);

  if (!fighterOne || !fighterTwo) {
    updateBattleStatus('Choose two saved builds before starting the battle.', true);
    battleResultsPanel.hidden = true;
    return;
  }

  const result = currentBattleMode === 'character'
    ? simulateCharacterBattle(fighterOne, fighterTwo)
    : simulateShipBattle(fighterOne, fighterTwo);

  updateBattleStatus(`Compared ${fighterOne.name} and ${fighterTwo.name} using deterministic category rankings.`);
  renderBattleResults(result);
}

battleModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentBattleMode = button.dataset.mode;
    battleModeButtons.forEach((modeButton) => {
      const isActive = modeButton === button;
      modeButton.classList.toggle('active', isActive);
      modeButton.setAttribute('aria-pressed', String(isActive));
    });
    battleResultsPanel.hidden = true;
    updateBattleStatus('');
    renderSelectOptions();
  });
});

[fighterOneSelect, fighterTwoSelect].forEach((select) => {
  select.addEventListener('change', () => renderSelectionPreviews());
});

startBattleButton.addEventListener('click', runBattle);

renderSelectOptions();
updateBattleStatus('Select a battle mode and two saved builds to begin.');
