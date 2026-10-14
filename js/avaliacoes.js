const AVALIACOES_NOTA = [
  {
    id: "ambiente",
    titulo: "Ambiente do hospital",
    ativo: true,
    itens: [
      {
        id: "limpeza_conforto",
        campoPlanilha: "nota_limpeza_conforto",
        nome: "Como você avalia a limpeza e o conforto do hospital?",
        icone: "./assets/icons/nota-limpeza.svg",
        naLabel: "Não se aplica",
        ativo: true
      },
      {
        id: "sinalizacao",
        campoPlanilha: "nota_sinalizacao",
        nome: "Foi fácil encontrar os locais dentro do hospital?",
        icone: "./assets/icons/nota-sinalizacao.svg",
        naLabel: "Não se aplica",
        ativo: true
      },
      {
        id: "silencio",
        campoPlanilha: "nota_silencio",
        nome: "Como você avalia o silêncio no hospital para descansar?",
        icone: "./assets/icons/nota-silencio.svg",
        naLabel: "Não se aplica",
        ativo: true
      }
    ]
  },

  {
    id: "informacoes_confianca",
    titulo: "Informações e confiança",
    ativo: true,
    itens: [
      {
        id: "informacoes_estado_saude",
        campoPlanilha: "nota_informacoes_estado_saude",
        nome: "Você recebeu informações claras sobre seu estado de saúde?",
        icone: "./assets/icons/nota-informacoes.svg",
        naLabel: "Não se aplica",
        ativo: true
      },
      {
        id: "confianca_atendimento",
        campoPlanilha: "nota_confianca_atendimento",
        nome: "Você se sentiu seguro e confiante com o atendimento do hospital?",
        icone: "./assets/icons/nota-confianca.svg",
        naLabel: "Não se aplica",
        ativo: true
      },
      {
        id: "explicacoes_medico",
        campoPlanilha: "nota_explicacoes_medico",
        nome: "O médico explicou seu diagnóstico e tratamento de forma clara?",
        icone: "./assets/icons/nota-medico.svg",
        naLabel: "Não tive contato",
        ativo: true
      }
    ]
  },

  {
    id: "disponibilidade",
    titulo: "Ajuda com suas dúvidas",
    ativo: true,
    itens: [
      {
        id: "disponibilidade_medico",
        campoPlanilha: "nota_disponibilidade_medico",
        nome: "Quando você teve dúvidas, o médico ajudou?",
        icone: "./assets/icons/nota-medico.svg",
        naLabel: "Não tive contato",
        ativo: true
      },
      {
        id: "disponibilidade_enfermagem",
        campoPlanilha: "nota_disponibilidade_enfermagem",
        nome: "Quando você teve dúvidas, a equipe de enfermagem ajudou?",
        icone: "./assets/icons/nota-enfermagem.svg",
        naLabel: "Não tive contato",
        ativo: true
      },
      {
        id: "disponibilidade_outros",
        campoPlanilha: "nota_disponibilidade_outros",
        nome: "Quando você teve dúvidas, os outros profissionais ajudaram?",
        icone: "./assets/icons/nota-outros.svg",
        naLabel: "Não tive contato",
        ativo: true
      }
    ]
  },

  {
    id: "educacao_respeito",
    titulo: "Educação e respeito",
    ativo: true,
    itens: [
      {
        id: "educacao_respeito_medico",
        campoPlanilha: "nota_educacao_respeito_medico",
        nome: "O médico tratou você com educação e respeito?",
        icone: "./assets/icons/nota-medico.svg",
        naLabel: "Não tive contato",
        ativo: true
      },
      {
        id: "educacao_respeito_enfermagem",
        campoPlanilha: "nota_educacao_respeito_enfermagem",
        nome: "A equipe de enfermagem tratou você com educação e respeito?",
        icone: "./assets/icons/nota-enfermagem.svg",
        naLabel: "Não tive contato",
        ativo: true
      },
      {
        id: "educacao_respeito_outros",
        campoPlanilha: "nota_educacao_respeito_outros",
        nome: "Os outros profissionais trataram você com educação e respeito?",
        icone: "./assets/icons/nota-outros.svg",
        naLabel: "Não tive contato",
        ativo: true
      }
    ]
  },

  {
    id: "cuidados_alta_apoio",
    titulo: "Cuidados e apoio na alta",
    ativo: true,
    itens: [
      {
        id: "cuidados_medicos",
        campoPlanilha: "nota_cuidados_medicos",
        nome: "Como você avalia os cuidados médicos que recebeu?",
        icone: "./assets/icons/nota-cuidados.svg",
        naLabel: "Não se aplica",
        ativo: true
      },
      {
        id: "orientacoes_alta_enfermagem",
        campoPlanilha: "nota_orientacoes_alta_enfermagem",
        nome: "A enfermagem explicou os cuidados que você deve ter depois da alta?",
        icone: "./assets/icons/nota-alta.svg",
        naLabel: "Não recebi orientação",
        ativo: true
      },
      {
        id: "acesso_sau_ouvidoria",
        campoPlanilha: "nota_acesso_sau_ouvidoria",
        nome: "Foi fácil conseguir acesso ao SAU/Ouvidoria?",
        icone: "./assets/icons/nota-ouvidoria.svg",
        naLabel: "Não precisei usar",
        ativo: true
      },
      {
        id: "satisfacao_geral_atendimento",
        campoPlanilha: "nota_satisfacao_geral_atendimento",
        nome: "Que nota você dá para o atendimento do hospital?",
        icone: "./assets/icons/nota-atendimento.svg",
        naLabel: "Não se aplica",
        ativo: true
      }
    ]
  }
];

const VALOR_NAO_SE_APLICA = "NÃO SE APLICA";
