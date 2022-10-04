export namespace CreateID {
  export type Response = string;
}

export interface CreateIDAdapter {
  create(): CreateID.Response;
}
