export interface IAluno {
  id: number;
  matricula: string;
  nomeAluno: string;
  serie: string;
  nivel: string;
  turno: string;
  alunoImg: string;
}

export interface IBond {
  id: number;
  alunoId: number;
  respId: number;
  nomeresp: string;
  rg: string;
  respImg: string;
  nomeAluno: string;
  nomeserie: string;
  nivelnome: string;
  turno: string;
  alunoImg: string;
  principal: number;
}

export interface IResponsavel {
  id: number;
  nomeresp: string;
  rg: string;
  email: string;
  telefone: string;
  endereco: string;
  respImg: string;
}
