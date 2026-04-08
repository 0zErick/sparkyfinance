# Sparky — Controle Financeiro Inteligente

O **Sparky** é um gerenciador financeiro gamificado que utiliza Inteligência Artificial para automatizar o controle de gastos e facilitar a gestão financeira pessoal e familiar.

### 💡 Principais Funcionalidades
* **Gestão de Gastos:** Dashboard intuitivo com saldo em tempo real, controle de cartões de crédito e fluxo de despesas.
* **Sparky IA:** Assistente financeiro baseado no **Google Gemini 2.5 Pro** que analisa extratos e oferece dicas personalizadas.
* **Gamificação:** Sistema de pontos e rankings para incentivar bons hábitos financeiros e economia mensal.
* **Multi-Perfil:** Suporte para grupos e membros, ideal para gestão de orçamentos familiares compartilhados.
* **PWA:** Aplicativo instalável no smartphone para acesso rápido e notificações.

### 🛠 Stack Tecnológica
* **Frontend:** React 18, TypeScript, Vite e Tailwind CSS.
* **UI/UX:** Componentes Shadcn/UI e ícones Lucide React.
* **Backend & Database:** Supabase (PostgreSQL, Edge Functions e RLS para segurança).
* **IA:** Google Gemini API (via AI Gateway).

---

### 🚀 Como Rodar Localmente

Siga os passos detalhados abaixo:

```bash
# 1. Clonar o Repositório
git clone [https://github.com/eriickmilhomens/sparkyfinance](https://github.com/eriickmilhomens/sparkyfinance)
cd sparkyfinance

# 2. Instalar Dependências (Necessário Node.js instalado)
npm install

# 3. Configurar Variáveis de Ambiente
# Crie um arquivo .env na raiz do projeto e preencha com suas chaves do Supabase:
# VITE_SUPABASE_URL=sua_url_do_supabase
# VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_anon_publica

# 4. Iniciar o Servidor de Desenvolvimento
npm run dev

# O projeto estará disponível em: http://localhost:8080

# 📄 Licença e Autoria
Este projeto é de uso privado. Todos os direitos reservados.
