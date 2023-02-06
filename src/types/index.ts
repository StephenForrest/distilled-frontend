export type {};

export interface Goal {
  id: number;
  title: string;
  expiresOn: string;
  createdAt: string;
  completion: number;
  owner: {
    name: string;
    profilePic: string;
  };
  actionsCount?: number;
  measurementsCount?: number;
}

export interface GoalActionFormErrors
  extends Partial<SuccessCriteriaCommonAttrs> {
  trackingSettings?: {
    [id: string]: {
      [key: string]: string;
    };
  };
}

export type GoalActionForm =
  | ActionChecklistAttributes
  | ActionMilestoneAttributes;

export interface SuccessCriteriaCommonAttrs {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ActionChecklistAttributes extends SuccessCriteriaCommonAttrs {
  trackingType: 'checklist';
  trackingSettings: ActionTrackingChecklistSettings[];
}

export interface ActionMilestoneAttributes extends SuccessCriteriaCommonAttrs {
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
    profilePic: string;
  };
  action?: {
    trackingType: string;
  };
  measurement?: {
    trackingType: string;
  };
  createdAt?: string;
}

export interface GoalWithDetails extends Goal {
  successCriterias: SuccessCriteria[];
}

export interface Plan {
  id: number;
  name: string;
  goals?: [Goal];
}

export type MeasurementTrackingType = 'github' | 'slack';
export type SlackMetricType =
  | 'new_users'
  | 'all_users'
  | 'user_churn'
  | 'new_messages'
  | 'all_messages'
  | 'new_invites'
  | 'all_invites';

export type SlackChannelFilterType = {
  name: String;
  slackChannelId: String;
};

export type MeasurementTrackingSlackSettings = {
  id?: string;
  integrationId: string | number;
  metric: SlackMetricType;
  channelFilters: SlackChannelFilterType[];
  value: number;
};
export type MeasurementTrackingGithubSettings = {};

export type GoalMeasurementForm = MeasurementSlackForm | MeasurementGithubForm;

export interface MeasurementGithubForm extends SuccessCriteriaCommonAttrs {
  trackingType: 'github';
  trackingSettings: MeasurementTrackingGithubSettings;
}

export interface MeasurementSlackForm extends SuccessCriteriaCommonAttrs {
  trackingType: 'slack';
  trackingSettings: MeasurementTrackingSlackSettings;
}

export interface GoalMeasurementFormErrors
  extends Partial<SuccessCriteriaCommonAttrs> {
  trackingSettings?: {
    [key: string]: string;
  };
}

export type WorkspaceMember = {
  id: string;
  role: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

export type OnboardingStep = 'survey' | 'subscription' | 'demo';

export type Workspace = {
  id: string;
  title: string;
  domain: string;
  personalDomain?: boolean;
  autoJoinFromDomain: boolean;
  apiKey: string;
  currentOnboardingStep: OnboardingStep | null;
  workspaceMembers: WorkspaceMember[];
};

export type CurrentUser = {
  name: string;
  email: string;
  emailVerified: boolean;
  workspaces: Workspace[];
};
