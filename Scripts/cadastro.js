function handleRegistration(event, role) {
    event.preventDefault(); // Impede o envio padrão do formulário e o recarregamento

    // 1. Coleta dos dados baseados na função (role)
    let nome, email, senha, campoExtra, campoExtraValue, redirectPage;

    if (role === 'aluno') {
        nome = document.getElementById('aluno_nome').value.trim();
        email = document.getElementById('aluno_email').value.trim();
        senha = document.getElementById('aluno_senha').value;
        campoExtra = 'curso';
        campoExtraValue = document.getElementById('aluno_curso').value.trim();
        redirectPage = 'aluno.html';
    } else if (role === 'professor') {
        nome = document.getElementById('prof_nome').value.trim();
        email = document.getElementById('prof_email').value.trim();
        senha = document.getElementById('prof_senha').value;
        campoExtra = 'areaAtuacao';
        campoExtraValue = document.getElementById('prof_area').value.trim();
        redirectPage = 'professor.html';
    }

    // 2. Validação Básica
    if (!nome || !email || !senha || !campoExtraValue) {
        // Usamos um modal ou mensagem de erro customizada em vez de alert()
        console.error('Por favor, preencha todos os campos do formulário.');
        alert('Erro no cadastro: Por favor, preencha todos os campos.');
        return;
    }

    // 3. Simulação de Banco de Dados (allUsers no localStorage)
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || {};

    // Verifica se o e-mail já existe
    if (allUsers[email]) {
        alert('Este e-mail já está cadastrado. Por favor, faça login.');
        window.location.href = 'login.html';
        return;
    }

    // 4. Criação do Objeto Usuário
    const newUser = {
        nome: nome,
        email: email,
        senha: senha, // Lembre-se, em produção, NUNCA armazene senhas sem hash!
        role: role,
    };
    newUser[campoExtra] = campoExtraValue; // Adiciona o campo extra (curso ou areaAtuacao)

    // Adiciona o novo usuário ao "banco de dados"
    allUsers[email] = newUser;
    localStorage.setItem('allUsers', JSON.stringify(allUsers));

    // 5. Autenticação Imediata (Sessão)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', nome);

    // 6. Redirecionamento
    console.log(`Usuário ${nome} (${email}) cadastrado com sucesso como ${role}. Redirecionando...`);
    alert(`Bem-vindo(a) ao NEURALINS, ${nome}! Seu cadastro foi finalizado com sucesso. Você será redirecionado para o seu painel.`);
    window.location.href = redirectPage;
}

// --- Event Listeners para os Formulários ---

// Aluno
const alunoForm = document.getElementById('alunoRegistrationForm');
if (alunoForm) {
    alunoForm.addEventListener('submit', (e) => handleRegistration(e, 'aluno'));
}

// Professor
const professorForm = document.getElementById('professorRegistrationForm');
if (professorForm) {
    professorForm.addEventListener('submit', (e) => handleRegistration(e, 'professor'));
}