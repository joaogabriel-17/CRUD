const criarButton = document.querySelector('.criar');
const gridContainer = document.querySelector('.grid-container');
const formContainer = document.getElementById('form-container');
const titleInput = document.getElementById('item-title');
const descriptionInput = document.getElementById('item-description');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

let items = [];
let isEditing = false;
let editIndex = null;

// Render items in the grid
function renderItems() {
    gridContainer.innerHTML = ''; // Clear current items
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('grid-item');
        
        itemDiv.innerHTML = `
            <h3 class="titulo">${item.title}</h3>
            <p class="descricao">${item.description}</p>
            <button class="botao" onclick="startEditing(${index})">Atualizar</button>
            <button class="botao" onclick="deleteItem(${index})">Excluir</button>
        `;
        
        gridContainer.appendChild(itemDiv);
    });
}

// Show form to create a new item
criarButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
    titleInput.value = '';
    descriptionInput.value = '';
    isEditing = false;
});

// Save item (either new or updated)
saveButton.addEventListener('click', () => {
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (title && description) {
        if (isEditing) {
            items[editIndex] = { title, description };
        } else {
            items.push({ title, description });
        }
        formContainer.style.display = 'none';
        renderItems();
    }
});

// Start editing an existing item
function startEditing(index) {
    formContainer.style.display = 'block';
    titleInput.value = items[index].title;
    descriptionInput.value = items[index].description;
    isEditing = true;
    editIndex = index;
}

// Delete an item
function deleteItem(index) {
    if (confirm("Tem certeza que deseja excluir este item?")) {
        items.splice(index, 1);
        renderItems();
    }
}

// Cancel button hides the form without saving
cancelButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
});

// Initial render
renderItems();
