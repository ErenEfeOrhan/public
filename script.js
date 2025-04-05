const board = document.getElementById('puzzle-board');
const container = document.getElementById('pieces-container');

// Puzzle tahtasını oluştur
for (let i = 0; i < 30; i++) {
  const slot = document.createElement('div');
  slot.dataset.slotIndex = i;
  slot.addEventListener('dragover', (e) => e.preventDefault());
  slot.addEventListener('drop', handleDrop);
  board.appendChild(slot);
}

// Parçaları karışık şekilde yerleştir
const indices = Array.from({ length: 30 }, (_, i) => i).sort(() => Math.random() - 0.5);
indices.forEach(i => {
  const img = document.createElement('img');
  img.src = `/puzzle_pieces/piece_${i}.png`;
  img.classList.add('piece');
  img.draggable = true;
  img.dataset.pieceIndex = i;
  img.addEventListener('dragstart', handleDragStart);
  container.appendChild(img);
});

let draggedPiece = null;

function handleDragStart(e) {
  draggedPiece = e.target;
}

function handleDrop(e) {
  if (!draggedPiece) return;

  const slotIndex = e.currentTarget.dataset.slotIndex;
  const pieceIndex = draggedPiece.dataset.pieceIndex;

  if (slotIndex === pieceIndex) {
    e.currentTarget.appendChild(draggedPiece);
    draggedPiece.draggable = false;
    draggedPiece.style.cursor = "default";
    checkWin();
  } else {
    alert("Yanlış yer! Tekrar dene.");
  }
}

function checkWin() {
  const allSlots = document.querySelectorAll('#puzzle-board div');
  const allCorrect = [...allSlots].every(slot => {
    const img = slot.querySelector('img');
    return img && slot.dataset.slotIndex === img.dataset.pieceIndex;
  });

  if (allCorrect) {
    setTimeout(() => {
      alert("Tebrikler! Puzzle tamamlandı 🎉");
    }, 100);
  }
}
