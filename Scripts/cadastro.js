/** FUNÇÕES DE UTILIDADE E INTERFACE (Comum a todas as páginas)

/**
 * Gera as iniciais de um nome (máximo de 2 letras).
 * @param {string} s O nome do usuário.
 * @returns {string} As iniciais em maiúsculas ou 'U' se vazio.
 */
function initialsFrom(s){ 
    s = (s || '').trim(); 
    // Se houver espaço, pega a primeira letra das duas primeiras palavras. Se não, pega a primeira letra.
    return s ? (s.includes(' ')? s.split(' ').slice(0,2).map(w=>w[0]).join(''): s[0]).toUpperCase() : 'U'; 
}

/**
 * Verifica o status de login (via localStorage) e atualiza a interface
 * (mostra link de login OU ícone do usuário).
 */
function verificarStatusLogin(){
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Checagem segura de elementos (Eles só existem na Index/Páginas internas)
    const linkLogin = document.getElementById('link-login');
    const userBox = document.getElementById('user-box');
    const userIcon = document.getElementById('user-icon');
    const dropdownUsername = document.getElementById('dropdown-username');

    if (usuarioLogado) {
        // Logado: Esconde o link de login e mostra o box do usuário
        if (linkLogin) linkLogin.style.display = 'none';
        // Usamos setProperty para garantir que o 'display: flex' seja prioritário
        if (userBox) userBox.style.setProperty('display', 'flex', 'important'); 
        if (userIcon) userIcon.textContent = initialsFrom(usuarioLogado);
        if (dropdownUsername) dropdownUsername.textContent = usuarioLogado;

    } else {
        // Deslogado: Mostra o link de login e esconde o box do usuário
        if (linkLogin) linkLogin.style.display = 'inline-block';
        if (userBox) userBox.style.setProperty('display', 'none', 'important');
    }
}

/**
 * Remove a sessão e redireciona para a página de login.
 * Exposta ao window para ser usada no HTML (onclick="logout()").
 */
window.logout = function() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('justLoggedIn');
    // Usa replace para impedir que o usuário volte para a página anterior com o botão Voltar
    window.location.replace("login.html"); 
}

/**
 * Exibe o pop-up de boas-vindas após o login/cadastro.
 * @param {string} username O nome do usuário para exibir na mensagem.
 */
function showWelcomePopup(username) {
    const popup = document.getElementById('welcome-popup');
    const overlay = document.getElementById('popup-overlay');
    const usernameElement = document.getElementById('welcome-username');

    // Checagem de segurança
    if (!popup || !overlay || !usernameElement) {
        return; 
    }

    usernameElement.textContent = username;
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Fecha automaticamente após 5 segundos
    setTimeout(closeWelcomePopup, 5000);
}

/**
 * Fecha o pop-up de boas-vindas.
 */
function closeWelcomePopup() {
    const popup = document.getElementById('welcome-popup');
    const overlay = document.getElementById('popup-overlay');

    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
}

/**
 * Alterna a visibilidade do dropdown do usuário.
 * Exposta ao window para ser usada no HTML (onclick="toggleUserDropdown(event)").
 * @param {Event} event O evento de clique.
 */
window.toggleUserDropdown = function(event) {
    if(event) event.stopPropagation();

    const dropdown = document.getElementById('user-dropdown');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Só abre se o dropdown existir E houver um usuário logado
    if (!dropdown || !usuarioLogado) {
        return;
    }

    const currentDisplay = window.getComputedStyle(dropdown).display;

    if (currentDisplay === 'block') {
        dropdown.style.setProperty('display', 'none', 'important');
    } else {
        dropdown.style.setProperty('display', 'block', 'important');
    }
}


// === INICIALIZAÇÃO E LISTENERS ===

// Executa a verificação de status em qualquer página
document.addEventListener('DOMContentLoaded', verificarStatusLogin);

// Listener para fechar o dropdown ao clicar fora
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('user-dropdown');
    const userBox = document.getElementById('user-box');

    // Checa se o dropdown existe, a caixa do usuário existe, e o clique foi fora da caixa.
    if (dropdown && userBox && !userBox.contains(event.target)) {
        const currentDisplay = window.getComputedStyle(dropdown).display;
        if (currentDisplay === 'block') {
            dropdown.style.setProperty('display', 'none', 'important');
        }
    }
});

// Listener para exibir o popup após o login e configurar o overlay
document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    const overlay = document.getElementById('popup-overlay');
    
    if (overlay) {
        // Permite fechar o popup clicando no overlay
        overlay.addEventListener('click', closeWelcomePopup); 
    }

    // Se acabou de logar e tem um usuário salvo, mostra o pop-up e limpa a flag
    if (justLoggedIn === 'true' && usuarioLogado) {
        showWelcomePopup(usuarioLogado);
        localStorage.removeItem('justLoggedIn');
    }
});