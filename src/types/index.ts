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

export type ActionType = 'milestone' | 'checklist';

export type SuccessCriteriaType = 'action' | 'measurement';

export interface GoalWithDetails extends Goal {
  successCriterias: {
    successCriteriaType: SuccessCriteriaType;
  }[];
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}
