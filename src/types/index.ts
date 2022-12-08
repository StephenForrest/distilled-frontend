export type {};

export interface Goal {
  id: number;
  title: string;
  expiresOn: string;
  createdAt: string;
  completion: number;
  owner: {
    name: string;
  };
}

export interface GoalActionFormErrors
  extends Partial<ActionFormAttributesCommon> {
  trackingSettings?: {
    [id: string]: {
      [key: string]: string;
    };
  };
}

export type GoalActionForm =
  | ActionChecklistAttributes
  | ActionMilestoneAttributes;

export interface ActionFormAttributesCommon {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ActionChecklistAttributes extends ActionFormAttributesCommon {
  trackingType: 'checklist';
  trackingSettings: ActionTrackingChecklistSettings[];
}

export interface ActionMilestoneAttributes extends ActionFormAttributesCommon {
  trackingType: 'milestone';
  trackingSettings: ActionTrackingMilestoneSettings[];
}

export type ActionTrackingType = 'milestone' | 'checklist';

export type ActionTrackingChecklistSettings = {
  id: string;
  item: string;
  dueDate: string;
  checked: boolean;
};

export type ActionTrackingMilestoneSettings = {
  id: string;
  percent: number;
  item: string;
  dueDate: string;
  checked: boolean;
};

export type ActionTrackingSettings =
  | ActionTrackingChecklistSettings
  | ActionTrackingMilestoneSettings;

export type SuccessCriteriaType = 'action' | 'measurement';

export interface SuccessCriteria {
  id: string;
  successCriteriaType: SuccessCriteriaType;
  name: string;
  description: string;
  completion?: number;
  endDate?: string;
  owner?: {
    name: string;
  };
}

export interface GoalWithDetails extends Goal {
  successCriterias: SuccessCriteria[];
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}
