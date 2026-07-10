# Text Game - Painel de Mensagens

Uma PWA (Progressive Web App) para gerenciar, editar e copiar mensagens de abordagem com sincronização automática ao GitHub.

## Funcionalidades

✅ **Interface Intuitiva** - Menu lateral com navegação rápida  
✅ **Edição Visual** - Edite mensagens sem mexer em código  
✅ **Cópia Rápida** - Copie qualquer mensagem com um clique  
✅ **Sincronização Automática** - Alterações salvam automaticamente no GitHub  
✅ **Full Screen Mobile** - Funciona em modo PWA no celular  
✅ **Offline Ready** - Funciona mesmo sem internet (com dados em cache)  
✅ **Responsivo** - Perfeito em desktop, tablet e celular  

## Como Usar

### 1. Acessar a Aplicação

- **Online:** Acesse via GitHub Pages (link será fornecido)
- **Mobile:** Abra no navegador e clique em "Instalar" ou "Adicionar à Tela Inicial"

### 2. Copiar uma Mensagem

1. Encontre a mensagem que quer copiar
2. Clique no botão **"📋 Copiar"**
3. A mensagem será copiada para sua área de transferência
4. Cole em qualquer lugar (WhatsApp, Instagram, etc.)

### 3. Editar uma Mensagem

1. Clique no botão **"✏️ Editar"** na mensagem
2. Modifique o texto no modal que abrir
3. Clique em **"✓ Salvar"**
4. A mudança será sincronizada automaticamente ao GitHub

### 4. Deletar uma Mensagem

1. Clique no botão **"🗑️"** na mensagem
2. Confirme a exclusão
3. A mensagem será removida e sincronizada

## Estrutura de Arquivos

```
textgame-app/
├── index.html          # Aplicação PWA principal
├── dados.json          # Seus dados estruturados
├── manifest.json       # Configuração da PWA
├── README.md           # Este arquivo
└── .github/
    └── workflows/
        └── sync.yml    # Sincronização automática (opcional)
```

## Sincronização Automática

A aplicação sincroniza automaticamente com o GitHub quando você:

- Edita uma mensagem
- Deleta uma mensagem
- Abre a aplicação em outro dispositivo

### Como Funciona

1. Você edita no celular → Salva localmente
2. Quando conectado à internet → Sincroniza com GitHub
3. Você abre no PC → Carrega a versão mais recente

## Estrutura de Dados (dados.json)

```json
[
  {
    "sessao": "01 OPENER'S",
    "cenarios": [
      {
        "titulo": "OPENER (PÓS-ABORDAGEM)",
        "mensagens": [
          "Oi senhorita tímida do sorriso encantador rsrs...",
          "Ai ai caramba, não tinha me preparado pra essa parte..."
        ]
      }
    ]
  }
]
```

## Instalação como PWA (Mobile)

### iOS
1. Abra no Safari
2. Clique em "Compartilhar" (ícone de seta)
3. Selecione "Adicionar à Tela Inicial"

### Android
1. Abra no Chrome
2. Clique em "⋮" (menu)
3. Selecione "Instalar app"

## Troubleshooting

### "Erro ao sincronizar"
- Verifique sua conexão com a internet
- Confirme que o token do GitHub está válido

### "Dados não aparecem"
- Recarregue a página (Ctrl+F5 ou Cmd+Shift+R)
- Limpe o cache do navegador

### "Não consigo editar"
- Certifique-se de que tem permissão de escrita no repositório
- Verifique se o token do GitHub está ativo

## Desenvolvimento

### Adicionar Novas Seções

1. Edite `dados.json`
2. Adicione um novo objeto `sessao`:

```json
{
  "sessao": "10 NOVA SEÇÃO",
  "cenarios": [
    {
      "titulo": "Novo Cenário",
      "mensagens": ["Mensagem 1", "Mensagem 2"]
    }
  ]
}
```

3. Salve e sincronize

### Customizar Cores

Edite `index.html` e procure por `#667eea` (cor primária) e `#764ba2` (cor secundária).

## Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

---

**Versão:** 1.0.0  
**Última atualização:** 2024
