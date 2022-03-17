declare namespace Express {
  export interface Response {
    body?: {
      [key: string]: any;
    };
  }
}
