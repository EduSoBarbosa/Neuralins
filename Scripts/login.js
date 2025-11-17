// ---- logar.js (cole esse arquivo em /Scripts/logar.js) ----
function cadastrar(tipo) {
    // define ids por tipo
    const idUser = tipo === 'professor' ? 'reg-user-prof' : 'reg-user-aluno';
    const idPass = tipo === 'professor' ? 'reg-pass-prof' : 'reg-pass-aluno';

    const userEl = document.getElementById(idUser);
    const passEl = document.getElementById(idPass);

    // se algum campo não existir, avisa no console e retorna
    if (!userEl || !passEl) {
        console.error('Campos de cadastro não encontrados:', idUser, idPass);
        alert('Erro interno: campos de cadastro não encontrados. Abra o console para mais detalhes.');
        return;
    }

    const user = userEl.value.trim();
    const pass = passEl.value.trim();

    if (!user || !pass) {
        alert('Preencha usuário e senha.');
        return;
    }

    if (localStorage.getItem(user)) {
        alert(`Usuário "${user}" já cadastrado.`);
        return;
    }

    localStorage.setItem(user, pass);
    sessionStorage.setItem('usuarioLogado', user);
    sessionStorage.setItem('justLoggedIn', 'true');

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
}

// função de login genérica (exemplo)
// espera campos com ids login-user e login-pass, ou você pode adaptar
function logarGenerico(idUser = 'login-user', idPass = 'login-pass') {
    const user = document.getElementById(idUser)?.value;
    const pass = document.getElementById(idPass)?.value;

    if (!user || !pass) { alert('Preencha usuário e senha.'); return; }
    const senhaSalva = localStorage.getItem(user);
    if (senhaSalva === null) { alert('Usuário não encontrado.'); return; }
    if (pass === senhaSalva) {
        sessionStorage.setItem('usuarioLogado', user);
        sessionStorage.setItem('justLoggedIn', 'true');
        alert(`Bem-vindo, ${user}!`);
        window.location.href = 'index.html';
    } else {
        alert('Senha incorreta.');
    }
}





