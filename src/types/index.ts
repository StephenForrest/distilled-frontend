export type {};

export interface Goal {
  id: number;
  title: string;
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}
