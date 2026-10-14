# Atualização v1.2.1 — acessibilidade nas avaliações por nota

## Objetivo
Esta versão melhora a compreensão das perguntas para pacientes com menor familiaridade de leitura.

## O que mudou
- remoção da faixa superior com:
  - `Avaliação X de Y`
  - texto descritivo do bloco
  - legenda `0–2 / 3–4 / ...`
- remoção das mensagens:
  - `Faltam responder X itens`
  - `Todas as avaliações deste bloco foram respondidas`
- o botão continua desabilitado até o bloco ser totalmente respondido
- cada pergunta agora aparece escrita de forma completa e direta
- cada item recebeu um ícone simples, no mesmo padrão visual do sistema
- a opção inferior agora pode variar conforme o contexto:
  - `Não se aplica`
  - `Não tive contato`
  - `Não recebi orientação`
  - `Não precisei usar`
- a opção inferior recebeu um pequeno ícone `✕` para reforço visual

## Arquivos deste pacote
Substituir:
- `index.html`
- `css/style.css`
- `js/app.js`
- `js/avaliacoes.js`
- `sw.js`

Adicionar:
- `assets/icons/nota-limpeza.svg`
- `assets/icons/nota-sinalizacao.svg`
- `assets/icons/nota-silencio.svg`
- `assets/icons/nota-informacoes.svg`
- `assets/icons/nota-confianca.svg`
- `assets/icons/nota-medico.svg`
- `assets/icons/nota-enfermagem.svg`
- `assets/icons/nota-outros.svg`
- `assets/icons/nota-cuidados.svg`
- `assets/icons/nota-alta.svg`
- `assets/icons/nota-ouvidoria.svg`
- `assets/icons/nota-atendimento.svg`

## Importante
Não altere o `js/config.js`.

Depois de subir os arquivos no GitHub:
1. aguarde o Pages publicar
2. abra o site online
3. atualize a página uma vez
4. faça um teste completo
5. depois faça um teste offline
