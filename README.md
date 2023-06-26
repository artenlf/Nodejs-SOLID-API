# Nodejs-SOLID-API

Gympass styled app.

# Requisitos Funcionais

- [x] Deve ser possível cadastrar o usuário;
- [x] Deve ser possível autenticar o usuário;
- [x] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível obter o histórico do usuário;
- [ ] Deve ser possível buscar academias próximas ao usuário;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in do usuário;
- [ ] Deve ser possível cadastrar uma academia;

# Regras de Negócio
- [x] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer mais de um check-in no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver dentro do raio de 100m distância de uma academia; 
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

# Requisitos Não Funcionais
- [x] A senha do usuário precisa ser criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);


# Tecnologias utilizadas
- Typescript
- Prisma ORM
- Fastify
- PostgreSQL
- Docker
- Vitest

# Sobre o Projeto
Este projeto faz parte do terceiro módulo da trilha Node.js do programa Ignite da Rocketseat. A ideia é desenvolver uma aplicação semelhante ao GymPass permitindo usuários a se cadastrarem, fazerem check-ins em academias, tal qual no GymPass.