// Função para salvar sugestão
function saveSuggestion(suggestion) {
    const suggestions = JSON.parse(localStorage.getItem("clientSuggestions")) || [];
    suggestions.push(suggestion);
    localStorage.setItem("clientSuggestions", JSON.stringify(suggestions));
}

// Função para carregar sugestões da página de administração
function loadSuggestions() {
    const suggestions = JSON.parse(localStorage.getItem("clientSuggestions")) || [];
    const suggestionList = document.getElementById("suggestion-list");
    suggestionList.innerHTML = ""; // Limpar lista atual

    suggestions.forEach((suggestion, index) => {
        const box = document.createElement("div");
        box.classList.add("suggestion-box");

        const title = document.createElement("div");
        title.classList.add("suggestion-title");
        title.textContent = suggestion.subject;

        const text = document.createElement("div");
        text.textContent = suggestion.text;
        text.style.padding = "10px 0"; // Adiciona padding para espaçamento

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.addEventListener("click", function () {
            suggestions.splice(index, 1); // Remove sugestão do array
            localStorage.setItem("clientSuggestions", JSON.stringify(suggestions));
            loadSuggestions(); // Recarrega sugestões
        });

        box.appendChild(title);
        box.appendChild(text);
        box.appendChild(deleteButton);
        suggestionList.appendChild(box);
    });
}

// Código específico para a página de cliente
if (document.getElementById("submit")) {
    document.getElementById("submit").addEventListener("click", function () {
        const subjectText = document.getElementById("subject").value.trim();
        const suggestionText = document.getElementById("suggestion").value.trim();

        if (subjectText && suggestionText) {
            // Exibir mensagem de sucesso
            document.getElementById("message").textContent = "Sugestão enviada!";
            saveSuggestion({ subject: subjectText, text: suggestionText }); // Salvar sugestão
            document.getElementById("subject").value = ""; // Limpar campo
            document.getElementById("suggestion").value = ""; // Limpar campo

            setTimeout(() => {
                document.getElementById("message").textContent = ""; // Limpar mensagem após 7 segundos
            }, 7000);
        }
    });
}

// Código específico para a página de administração
if (document.getElementById("suggestion-list")) {
    loadSuggestions(); // Carregar sugestões ao abrir a página
}
