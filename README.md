# Pesquisa de Satisfação - HRPP - Altas

URL prevista:
https://gestaodecustohrdjsn.github.io/Pesquisa-Satisfacao-HRPP-Altas/

## 1. Google Sheets
Planilha: Pesquisa de Satisfação - HRPP - Altas

Crie ou mantenha uma aba chamada `Respostas`.

## 2. Apps Script
Cole o conteúdo de `AppsScript.gs` no projeto Apps Script ligado à planilha.

No Apps Script:
1. Configurações do projeto > Fuso horário: America/Campo_Grande
2. Implantar > Nova implantação
3. Tipo: Aplicativo da Web
4. Executar como: Você
5. Quem tem acesso: Qualquer pessoa
6. Implantar
7. Copiar a URL terminada em `/exec`

## 3. Configurar o front-end
Abra `js/config.js` e cole a URL do Apps Script em:

SCRIPT_URL: "COLE_AQUI_A_URL_EXEC"

## 4. GitHub Pages
Envie todos os arquivos e pastas para a branch `main`.

Estrutura:
- index.html
- manifest.json
- sw.js
- css/style.css
- js/config.js
- js/storage.js
- js/sync.js
- js/app.js
- assets/images/logo_hospital.png (opcional)

## 5. Logo
Se quiser usar a logo do hospital, coloque o arquivo:
`assets/images/logo_hospital.png`

Se não colocar, o cabeçalho continua funcionando sem a imagem.

## 6. Teste offline
1. Abra o site com internet pelo menos uma vez.
2. Responda uma pesquisa.
3. Desative Wi-Fi/dados.
4. Recarregue a página: ela deve continuar abrindo.
5. Responda outra pesquisa offline.
6. O topo deve mostrar "1 pendente(s)".
7. Reative a internet.
8. O sistema tentará sincronizar automaticamente.
9. Confira a planilha.

## 7. Adicionar dados pessoais
Em `js/config.js`:

dadosPessoais: {
  ativo: true,
  obrigatorios: false,
  campos: {
    nome: true,
    telefone: true,
    endereco: false
  }
}

Para remover a tela inteira:
`ativo: false`

## 8. Adicionar outro serviço de nota
Em `CONFIG.servicos`, adicione:

{
  id: "alimentacao",
  campoPlanilha: "nota_alimentacao",
  nome: "Alimentação",
  icone: "🍽️",
  ativo: true
}

O Apps Script adicionará automaticamente a nova coluna `nota_alimentacao` caso ela ainda não exista.
