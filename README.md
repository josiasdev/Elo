# ELO 🔗

**Um elo entre jovens, ONGs e o futuro da participação juvenil.**
*Projeto desenvolvido para o UNICEF Youth Challenge Blockchain 2026.*

---

## 🌍 Sobre o Projeto

O **ELO** é uma plataforma digital projetada para criar um "currículo cívico" contínuo para jovens, conectando-os às oportunidades de seus territórios. 

Através da tecnologia blockchain, resolvemos o problema da fragmentação de históricos: a plataforma garante a portabilidade e a integridade da participação juvenil (cursos, ativismo, oficinas) sem depender da sobrevivência institucional de uma ONG específica. Como efeito colateral positivo, o ELO gera um mapa de dados públicos que evidencia os **"desertos de oportunidade"**, auxiliando o direcionamento assertivo de políticas públicas e financiamentos sociais.

---

## 💻 Stack Tecnológico

A escolha das tecnologias foca em agilidade para prototipagem rápida e base sólida para escalabilidade futura:

*   **Front-end:** React.js + Vite, TypeScript, Tailwind CSS (Design) e `ethers.js` (Integração Web3).
*   **Back-end:** Node.js (Express / Fastify).
*   **Blockchain:** Solidity (Deploy na rede Ethereum Sepolia Testnet).
*   **Segurança:** Biblioteca `crypto` (Node.js) para geração de hashes únicos off-chain.

---

## 🚀 Funcionalidades (Escopo do MVP)

O protótipo foi construído focado na demonstração de viabilidade técnica das seguintes frentes:

### 📍 Módulo 1: Mapa e Densidade de Oportunidades
*   **Visualização do Mapa (RF01):** Interface interativa exibindo pinos geolocalizados das ONGs e grupos parceiros.
*   **Indicador de Densidade (RF02):** Visualização comparativa de oportunidades entre bairros/cidades para identificar áreas negligenciadas.

### 👤 Módulo 2: Perfil e Currículo Cívico
*   **Linha do Tempo do Jovem (RF03):** Interface cronológica que lista todas as atividades e cursos certificados do usuário.
*   **Detalhes da Credencial (RF04):** Exibição dos metadados da participação com leitura de status de verificação on-chain e portabilidade garantida.

### 🔐 Módulo 3: Emissão e Registro em Blockchain
*   **Cadastro de Atividade (RF05):** Rota de back-end para as ONGs parceiras cadastrarem a participação real dos jovens.
*   **Privacidade e Ancoragem (RF06):** Para garantir a privacidade do menor, **nenhum dado pessoal vai para a rede pública**. O sistema gera um hash criptográfico dos dados da credencial e envia apenas este resumo para ancoragem e carimbo de tempo (timestamp) via Smart Contract.

---

## 🛠️ Como Executar o Protótipo Localmente

Siga os passos abaixo para testar a aplicação em ambiente de desenvolvimento.

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (v18 ou superior)
*   Extensão da carteira [MetaMask](https://metamask.io/) configurada para a rede **Sepolia Testnet**.

### Instalação

1. Clone este repositório:
   ```bash
   git clone [https://github.com/seu-usuario/elo-unicef-2026.git](https://github.com/seu-usuario/elo-unicef-2026.git)
