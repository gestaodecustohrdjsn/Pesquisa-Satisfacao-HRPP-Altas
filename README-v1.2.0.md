# Atualização v1.2.0 — Avaliações por nota

Esta atualização altera somente o front-end da pesquisa.

## Arquivos a substituir/adicionar

Substituir:
- `index.html`
- `css/style.css`
- `js/app.js`
- `sw.js`

Adicionar:
- `js/avaliacoes.js`

NÃO substitua o seu `js/config.js`. Assim você preserva:
- a URL atual do Apps Script;
- os ícones personalizados dos setores;
- qualquer configuração que já tenha ajustado.

## Nova etapa de notas

A etapa foi dividida em 5 blocos:

1. Ambiente hospitalar
2. Informações e confiança
3. Disponibilidade para ajudar e esclarecer dúvidas
4. Educação e respeito no atendimento
5. Cuidados, alta e apoio

Cada item aceita:
- nota de 0 a 10;
- `NÃO SE APLICA`.

O botão `Continuar` só é liberado quando todos os itens do bloco forem respondidos.
No último bloco, o botão vira `Finalizar`.

## Novas colunas enviadas à planilha

O Apps Script dinâmico já existente deve criar automaticamente estas colunas quando receber a primeira resposta:

- `nota_limpeza_conforto`
- `nota_sinalizacao`
- `nota_silencio`
- `nota_informacoes_estado_saude`
- `nota_confianca_atendimento`
- `nota_explicacoes_medico`
- `nota_disponibilidade_medico`
- `nota_disponibilidade_enfermagem`
- `nota_disponibilidade_outros`
- `nota_educacao_respeito_medico`
- `nota_educacao_respeito_enfermagem`
- `nota_educacao_respeito_outros`
- `nota_cuidados_medicos`
- `nota_orientacoes_alta_enfermagem`
- `nota_acesso_sau_ouvidoria`
- `nota_satisfacao_geral_atendimento`

## Importante

Como o Service Worker mudou para `hrpp-altas-v1.2.0`, o cache antigo será descartado na ativação da nova versão.

Após subir os arquivos no GitHub:
1. aguarde o GitHub Pages publicar;
2. abra o site online;
3. atualize a página uma vez;
4. faça uma resposta completa;
5. confira se as novas colunas surgiram na aba `Respostas`;
6. depois faça um teste offline.
