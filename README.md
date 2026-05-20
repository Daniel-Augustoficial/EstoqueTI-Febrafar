# Controle de Estoque de TI (Febrafar)

Um sistema web React robusto e responsivo para gerenciamento do estoque de TI, construído com foco na experiência do usuário (UI/UX) e seguindo estritamente a identidade visual corporativa da Febrafar. O projeto utiliza `localStorage` para a persistência completa dos dados no navegador.

## 🚀 Tecnologias Utilizadas

- **React + Vite**: Setup rápido, componentização e performance.
- **JavaScript (ES6+)**: Lógica de negócio dinâmica e manipulação de estado.
- **Vanilla CSS**: Sistema de design criado do zero, com variáveis de CSS para garantir controle total, leveza e flexibilidade sem dependências extras como Tailwind.
- **Lucide React**: Biblioteca de ícones modernos para a interface.
- **SheetJS (XLSX)**: Para a exportação completa de dados tabulares (Equipamentos e Movimentações) para Excel.
- **PostgreSQL + Prisma ORM**: Banco de dados relacional (Backend).

## 🎨 Identidade Visual e Layout

O design foi estruturado em volta das seguintes diretrizes:

- **Cores Principais**: Azul Corporativo (`#002a5c`) e Amarelo (`#F8C300`).
- **Modo Dark / Light**: O sistema possui um alternador de tema na *Top Bar* que salva a preferência do usuário localmente (`ti_theme`). O design adapta o fundo da página, cartões, tabelas e contrastes de status automaticamente.
- **Badges e Status**: Cores pastel agradáveis (Verde, Laranja, Vermelho, Roxo) foram aplicadas em badges arrendondados nas tabelas para facilitar a leitura rápida de status críticos.
- **Interface Dividida**:
  - **Sidebar Expansível**: Menu de navegação lateral contendo filtros rápidos (em modelo *Accordion*) para Categorias de Equipamentos e Tipos de Movimentações, além de uma área dedicada para baixar planilhas em Excel.
  - **Top Bar**: Cabeçalho flutuante responsivo indicando a página atual.
  - **Dashboard**: Uma visão sumária da operação (Total Cadastrado, Equipamentos Disponíveis, Em Uso, Empréstimos e Manutenções).

## ⚙️ Regras de Negócio e Funcionalidades

### 1. Equipamentos
Os equipamentos são divididos em categorias fixas (*Headset, Notebook, Monitor, Mouse, Teclado, Kit Teclado e Mouse, Celular*) e possuem 5 status distintos (*Disponível, Em uso, Empréstimo, Manutenção, Descartado*).

- **Formulário Dinâmico**: Dependendo do status escolhido ao cadastrar ou editar um equipamento, o modal revela campos específicos (Ex: *Colaborador, Departamento e Data de Entrega* para equipamentos em uso; ou *Fornecedor, Data de Envio e Retorno* para equipamentos em manutenção).
- **Idade da Máquina**: É calculada dinamicamente com base na Data de Aquisição, entregando formatos como "Novo", "8m" ou "1a 2m".

### 2. Movimentações
Registro detalhado e cronológico das alocações e devoluções.

- **Filtro em Cascata no Cadastro**: No formulário, o usuário escolhe primeiro a Categoria, e o segundo seletor é dinamicamente filtrado apenas para equipamentos atrelados a ela, mostrando inclusive a TAG e o status atual.
- **Automação de Status**: Salvar uma "Saída" muda o status da máquina alvo para "Em Uso". Uma "Entrada" o torna "Disponível" e limpa o colaborador da máquina, e assim sucessivamente.

### 3. Lógica Avançada (Substituição Automática)
Foi construída uma automação em JavaScript que varre o inventário ao ser registrada uma "Saída" ou "Temporário" de equipamento:
- **Regra**: Se o Recebedor estiver recebendo, por exemplo, um *Headset* e já possuir outro *Headset* registrado em seu nome com status "Em uso" ou "Empréstimo", o sistema age.
- **Ação**: O equipamento antigo é enviado automaticamente para "Manutenção" (com fornecedor "Manutenção Automática"). O sistema também cria um segundo registro independente de movimentação documentando a substituição e alerta o operador na tela.

### 4. Exportação para Excel
No rodapé da Sidebar, é possível exportar o banco de dados.
- Gera um arquivo `.xlsx` contendo duas abas: **Estoque** e **Movimentações**.
- Colunas formatadas e legíveis (com datas padronizadas em DD/MM/YYYY).
- Filtro inteligente: É possível escolher baixar *Todas as Categorias* de uma vez ou filtrar ambas as abas de antemão por uma categoria específica (Ex: Baixar apenas dados de Notebooks).

## 🛠️ Como Executar o Projeto

1. Certifique-se de que o [Node.js](https://nodejs.org/) está instalado em sua máquina.
2. Abra o terminal na pasta raiz do projeto (`Estoque TI`).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:5173` no seu navegador. Os dados que você cadastrar não serão perdidos se a aba for fechada, graças ao uso de `localStorage`.
