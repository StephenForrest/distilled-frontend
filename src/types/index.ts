export type {};

export interface Goal {
  id: number;
  title: string;
  expiresOn: string;
  createdAt: string;
  owner: {
    name: string;
  };
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}
