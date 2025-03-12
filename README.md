# Wallet

Aplicativo de carteira digital desenvolvido com React Native e Expo.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- [Git](https://git-scm.com/)

Para desenvolvimento e testes em dispositivos móveis:
- [Expo Go](https://expo.dev/client) instalado no seu smartphone, ou
- Emuladores para Android/iOS configurados no seu computador

## Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/wallet.git

# Entre na pasta do projeto
cd wallet
```

## Instalação

Instale todas as dependências do projeto:

```bash
# Usando npm
npm install

# OU usando Yarn (recomendado, já que o projeto usa yarn.lock)
yarn install
```

## Executando o Projeto

Após a instalação das dependências, você pode iniciar o projeto:

```bash
# Inicia o servidor de desenvolvimento Expo
npm start
# OU
yarn start
```

Isso abrirá a interface do Expo Developer Tools no seu navegador. A partir daí, você pode:

- Escanear o QR code com o aplicativo Expo Go no seu dispositivo Android
- Pressionar 'i' no terminal para abrir no emulador iOS
- Pressionar 'a' no terminal para abrir no emulador Android
- Pressionar 'w' no terminal para abrir na versão web

Você também pode iniciar o projeto diretamente para uma plataforma específica:

```bash
# Para Android
npm run android
# OU
yarn android

# Para iOS
npm run ios
# OU
yarn ios

# Para Web
npm run web
# OU
yarn web
```

## Executando Testes

Para executar os testes do projeto:

```bash
npm test
# OU
yarn test
```

## Linting

O projeto utiliza ESLint para garantir a qualidade do código:

```bash
# Verificar problemas de linting
npm run lint
# OU
yarn lint

# Corrigir automaticamente problemas de linting
npm run lint:fix
# OU
yarn lint:fix
```

## Tecnologias Principais

Este projeto foi desenvolvido utilizando as seguintes tecnologias e abordagens:

- **TypeScript**: Para tipagem estática e maior segurança no desenvolvimento
- **Redux Toolkit**: Para gerenciamento de estado global da aplicação
- **React Hook Form com Zod**: Para validação de formulários de forma eficiente
- **Expo**: Para agilizar o desenvolvimento e facilitar o teste em dispositivos reais
- **Testes com Jest**: Para garantir a qualidade e robustez do código
- **ESLint**: Para manter padrões de código consistentes
