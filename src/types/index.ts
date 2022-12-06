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

export type GoalActionForm =
  | ActionChecklistAttributes
  | ActionMilestoneAttributes;

export interface ActionFormAttributesCommon {
  title: string;
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
};

export type ActionTrackingMilestoneSettings = {
  item: string;
  dueDate: string;
};

export type ActionTrackingSettings =
  | ActionTrackingChecklistSettings
  | ActionTrackingMilestoneSettings;

export type SuccessCriteriaType = 'action' | 'measurement';

export type SuccessCriteria = {
  id: string;
  successCriteriaType: SuccessCriteriaType;
  name: string;
  description: string;
};

export interface GoalWithDetails extends Goal {
  successCriterias: SuccessCriteria[];
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}
