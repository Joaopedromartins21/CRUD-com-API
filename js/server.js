const express = require('express');
const app = express();
const cors = require('cors');

// Habilitar o CORS
app.use(cors());

// Permitir que o Express trabalhe com o formato JSON
app.use(express.json());

// Simulação de um banco de dados
let users = [];

// Definir as rotas da API REST

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  // Verificar se todos os campos foram fornecidos
  if (!nome || !email || !senha || !cpf) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Criar um novo usuário
  const newUser = {
    id: Date.now().toString(),
    nome,
    email,
    senha,
    cpf
  };

  // Adicionar o novo usuário ao banco de dados
  users.push(newUser);

  res.status(201).json(newUser);
});

// Definir o cabeçalho 'Access-Control-Allow-Origin' manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Rota para editar um usuário existente
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, cpf } = req.body;

  // Verificar se o usuário existe
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Atualizar os dados do usuário
  user.nome = nome || user.nome;
  user.email = email || user.email;
  user.senha = senha || user.senha;
  user.cpf = cpf || user.cpf;

  res.json(user);
});

// Rota para excluir um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  // Verificar se o usuário existe
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Remover o usuário do array
  const deletedUser = users.splice(index, 1)[0];

  res.json(deletedUser);
});


// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor API REST em execução na porta 3000');
});
