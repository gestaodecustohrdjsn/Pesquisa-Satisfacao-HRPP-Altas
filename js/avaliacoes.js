const AVALIACOES_NOTA = [
  {
    id: "ambiente",
    titulo: "Ambiente hospitalar",
    descricao: "Avalie as condições do ambiente durante sua permanência.",
    ativo: true,
    itens: [
      {
        id: "limpeza_conforto",
        campoPlanilha: "nota_limpeza_conforto",
        nome: "Limpeza e conforto",
        ativo: true
      },
      {
        id: "sinalizacao",
        campoPlanilha: "nota_sinalizacao",
        nome: "Sinalização para encontrar os locais",
        ativo: true
      },
      {
        id: "silencio",
        campoPlanilha: "nota_silencio",
        nome: "Silêncio no ambiente hospitalar",
        ativo: true
      }
    ]
  },

  {
    id: "informacoes_confianca",
    titulo: "Informações e confiança",
    descricao: "Avalie as informações recebidas e sua confiança no atendimento.",
    ativo: true,
    itens: [
      {
        id: "informacoes_estado_saude",
        campoPlanilha: "nota_informacoes_estado_saude",
        nome: "Informações sobre seu estado de saúde",
        ativo: true
      },
      {
        id: "confianca_atendimento",
        campoPlanilha: "nota_confianca_atendimento",
        nome: "Confiança no atendimento prestado pelo hospital",
        ativo: true
      },
      {
        id: "explicacoes_medico",
        campoPlanilha: "nota_explicacoes_medico",
        nome: "Explicações médicas sobre diagnóstico e tratamento",
        ativo: true
      }
    ]
  },

  {
    id: "disponibilidade",
    titulo: "Disponibilidade para ajudar e esclarecer dúvidas",
    descricao: "Avalie a disponibilidade de cada equipe.",
    ativo: true,
    itens: [
      {
        id: "disponibilidade_medico",
        campoPlanilha: "nota_disponibilidade_medico",
        nome: "Médico",
        ativo: true
      },
      {
        id: "disponibilidade_enfermagem",
        campoPlanilha: "nota_disponibilidade_enfermagem",
        nome: "Equipe de enfermagem",
        ativo: true
      },
      {
        id: "disponibilidade_outros",
        campoPlanilha: "nota_disponibilidade_outros",
        nome: "Outros profissionais",
        ativo: true
      }
    ]
  },

  {
    id: "educacao_respeito",
    titulo: "Educação e respeito no atendimento",
    descricao: "Avalie como você foi tratado por cada equipe.",
    ativo: true,
    itens: [
      {
        id: "educacao_respeito_medico",
        campoPlanilha: "nota_educacao_respeito_medico",
        nome: "Médico",
        ativo: true
      },
      {
        id: "educacao_respeito_enfermagem",
        campoPlanilha: "nota_educacao_respeito_enfermagem",
        nome: "Equipe de enfermagem",
        ativo: true
      },
      {
        id: "educacao_respeito_outros",
        campoPlanilha: "nota_educacao_respeito_outros",
        nome: "Outros profissionais",
        ativo: true
      }
    ]
  },

  {
    id: "cuidados_alta_apoio",
    titulo: "Cuidados, alta e apoio",
    descricao: "Avalie os cuidados recebidos e as orientações para a alta.",
    ativo: true,
    itens: [
      {
        id: "cuidados_medicos",
        campoPlanilha: "nota_cuidados_medicos",
        nome: "Cuidados médicos recebidos no hospital",
        ativo: true
      },
      {
        id: "orientacoes_alta_enfermagem",
        campoPlanilha: "nota_orientacoes_alta_enfermagem",
        nome: "Orientações da enfermagem para os cuidados na alta",
        ativo: true
      },
      {
        id: "acesso_sau_ouvidoria",
        campoPlanilha: "nota_acesso_sau_ouvidoria",
        nome: "Acesso ao SAU/Ouvidoria",
        ativo: true
      },
      {
        id: "satisfacao_geral_atendimento",
        campoPlanilha: "nota_satisfacao_geral_atendimento",
        nome: "Satisfação geral com o atendimento",
        ativo: true
      }
    ]
  }
];

const VALOR_NAO_SE_APLICA = "NÃO SE APLICA";
