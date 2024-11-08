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

// Render items no grid
function renderItems() {
    gridContainer.innerHTML = ''; // limpar os itens atuais
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

// mostrar formulario de novo item
criarButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
    titleInput.value = '';
    descriptionInput.value = '';
    isEditing = false;
});

// Salvar intem (salvar ou dar update)
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

// editar item
function startEditing(index) {
    formContainer.style.display = 'block';
    titleInput.value = items[index].title;
    descriptionInput.value = items[index].description;
    isEditing = true;
    editIndex = index;
}

// Deletar um item
function deleteItem(index) {
    if (confirm("Tem certeza que deseja excluir este item?")) {
        items.splice(index, 1);
        renderItems();
    }
}

// cancelar sem salvar
cancelButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
});

// Iniciar render
renderItems();
