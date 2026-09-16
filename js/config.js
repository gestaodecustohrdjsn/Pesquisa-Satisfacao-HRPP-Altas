const CONFIG = {
  APP_VERSION: "1.0.0",
  APP_NAME: "Pesquisa de Satisfação - HRPP - Altas",

  // Cole aqui a URL /exec do Web App do Google Apps Script depois da implantação.
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzMC5BLSlbiYbKRU1gQqEXLDG9muAhTSkF5KT6H_9BSUuwcLHXGAd3acB8WpBlFXdoqNw/exec",

  TEMPO_AGRADECIMENTO_MS: 5000,

  dadosPessoais: {
    ativo: false,
    obrigatorios: false,
    campos: {
      nome: true,
      telefone: true,
      endereco: true
    }
  },

  perfis: [
    { valor: "PACIENTE", rotulo: "Paciente", icone: "👤" },
    { valor: "VISITANTE", rotulo: "Visitante", icone: "🚶" },
    { valor: "ACOMPANHANTE", rotulo: "Acompanhante", icone: "👥" }
  ],

  setores: [
    { valor: "CLÍNICA MÉDICA", rotulo: "Clínica Médica", icone: "🛏️" },
    { valor: "CLÍNICA CIRÚRGICA I", rotulo: "Clínica Cirúrgica I", icone: "🏥" },
    { valor: "CLÍNICA CIRÚRGICA II", rotulo: "Clínica Cirúrgica II", icone: "🏥" },
    { valor: "MATERNIDADE", rotulo: "Maternidade", icone: "🤱" },
    { valor: "PEDIATRIA", rotulo: "Pediatria", icone: "🧸" },
    { valor: "UTI A", rotulo: "UTI A", icone: "🩺" },
    { valor: "UTI B", rotulo: "UTI B", icone: "🩺" }
  ],

  avaliacaoGeral: [
    { valor: "MUITO SATISFEITO", rotulo: "Muito satisfeito", rosto: "😄", classe: "green" },
    { valor: "SATISFEITO", rotulo: "Satisfeito", rosto: "🙂", classe: "yellow" },
    { valor: "POUCO SATISFEITO", rotulo: "Pouco satisfeito", rosto: "😕", classe: "orange" },
    { valor: "INSATISFEITO", rotulo: "Insatisfeito", rosto: "☹️", classe: "red" },
    { valor: "INDIFERENTE", rotulo: "Indiferente", rosto: "😐", classe: "gray" }
  ],

  servicos: [
    {
      id: "limpeza_conforto",
      campoPlanilha: "nota_limpeza_conforto",
      nome: "Limpeza e conforto do ambiente hospitalar",
      icone: "🧹",
      ativo: true
    }
  ]
};
