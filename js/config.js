const CONFIG = {
  APP_VERSION: "1.1.0",
  APP_NAME: "Pesquisa de Satisfação - HRPP - Altas",

  // Cole aqui a URL /exec do Web App do Google Apps Script.
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzMC5BLSlbiYbKRU1gQqEXLDG9muAhTSkF5KT6H_9BSUuwcLHXGAd3acB8WpBlFXdoqNw/exec",

  TEMPO_AGRADECIMENTO_MS: 3500,

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
    { valor: "PACIENTE", rotulo: "Paciente", icone: "./assets/icons/paciente.svg" },
    { valor: "VISITANTE", rotulo: "Visitante", icone: "./assets/icons/visitante.svg" },
    { valor: "ACOMPANHANTE", rotulo: "Acompanhante", icone: "./assets/icons/acompanhante.svg" }
  ],

  setores: [
    { valor: "CLÍNICA MÉDICA", rotulo: "Clínica Médica", icone: "./assets/icons/leito.svg" },
    { valor: "CLÍNICA CIRÚRGICA I", rotulo: "Clínica Cirúrgica I", icone: "./assets/icons/leito.svg" },
    { valor: "CLÍNICA CIRÚRGICA II", rotulo: "Clínica Cirúrgica II", icone: "./assets/icons/leito.svg" },
    { valor: "MATERNIDADE", rotulo: "Maternidade", icone: "./assets/icons/maternidade.svg" },
    { valor: "PEDIATRIA", rotulo: "Pediatria", icone: "./assets/icons/pediatria.svg" },
    { valor: "UTI A", rotulo: "UTI A", icone: "./assets/icons/uti.svg" },
    { valor: "UTI B", rotulo: "UTI B", icone: "./assets/icons/uti.svg" }
  ],

  avaliacaoGeral: [
    { valor: "MUITO SATISFEITO", rotulo: "Muito satisfeito", icone: "./assets/icons/muito-satisfeito.svg", classe: "green" },
    { valor: "SATISFEITO", rotulo: "Satisfeito", icone: "./assets/icons/satisfeito.svg", classe: "yellow" },
    { valor: "POUCO SATISFEITO", rotulo: "Pouco satisfeito", icone: "./assets/icons/pouco-satisfeito.svg", classe: "orange" },
    { valor: "INSATISFEITO", rotulo: "Insatisfeito", icone: "./assets/icons/insatisfeito.svg", classe: "red" },
    { valor: "INDIFERENTE", rotulo: "Indiferente", icone: "./assets/icons/indiferente.svg", classe: "gray" }
  ],

  servicos: [
    {
      id: "limpeza_conforto",
      campoPlanilha: "nota_limpeza_conforto",
      nome: "Limpeza e conforto do ambiente hospitalar",
      icone: "./assets/icons/limpeza.svg",
      ativo: true
    }
  ]
};
