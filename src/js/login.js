document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch('./src/db/users.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const users = lines.map(line => {
                const [user, pass] = line.trim().split(':');
                return { user, password: pass };
            });

            const validUser = users.find(user => user.user === username && user.password === password);

            if (validUser) {
                window.location.href = "./src/pages/inicio.html";
            } else {
                document.getElementById("errorMsg").innerText = "Usuário ou senha inválidos.";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o banco de dados:", error);
            document.getElementById("errorMsg").innerText = "Erro interno. Tente novamente.";
        });
});
