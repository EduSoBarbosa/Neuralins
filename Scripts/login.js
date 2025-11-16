// SIMULAÇÃO DE BANCO DE DADOS/USUÁRIOS
const USERS = {
    // Aluno (email: aluno@teste.com, senha: 123)
    'aluno@teste.com': { password: '123', role: 'aluno', redirect: 'aluno.html' },
    // Professor (email: professor@teste.com, senha: abc)
    'professor@teste.com': { password: 'abc', role: 'professor', redirect: 'professor.html' }
};

/**
 * Função genérica para processar o login
 * @param {string} emailId - ID do campo de email.
 * @param {string} passwordId - ID do campo de senha.
 */
function handleLogin(event, emailId, passwordId) {
    event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

    const email = document.getElementById(emailId).value;
    const password = document.getElementById(passwordId).value;

    const user = USERS[email];

    if (user && user.password === password) {
        // --- 1. Armazenar o estado no localStorage ---
        
        // Define que o usuário está logado
        localStorage.setItem('isLoggedIn', 'true');
        // Armazena a função (role) do usuário (aluno ou professor)
        localStorage.setItem('userRole', user.role);
        // Armazena o email para, talvez, exibir no painel (opcional)
        localStorage.setItem('userEmail', email);

        // --- 2. Redirecionar ---
        window.location.href = user.redirect;
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
}

// --- 3. Event Listeners ---

// Adiciona listener para o formulário de login do Aluno
const alunoForm = document.getElementById('alunoLoginForm');
if (alunoForm) {
    alunoForm.addEventListener('submit', (e) => handleLogin(e, 'aluno_email', 'aluno_pass'));
}

// Adiciona listener para o formulário de login do Professor
const professorForm = document.getElementById('professorLoginForm');
if (professorForm) {
    professorForm.addEventListener('submit', (e) => handleLogin(e, 'prof_email', 'prof_pass'));
}

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    // Se não estiver logado OU não for a função correta
    if (!isLoggedIn || userRole !== 'aluno') {
        alert('Acesso restrito. Por favor, faça login como Aluno.');
        // Redireciona para a página de login (index.html se for a principal)
        window.location.href = 'login.html'; 
    }
    
    // Opcional: Exibir o email do usuário na página
    // const userEmail = localStorage.getItem('userEmail');
    // console.log("Bem-vindo(a), " + userEmail);
});

// --- Função de Logout (Adicione isso a um botão de Logout no HTML) ---
function logout() {
    localStorage.clear(); // Limpa todos os dados de login
    window.location.href = 'index.html'; // Redireciona para a página inicial
}
