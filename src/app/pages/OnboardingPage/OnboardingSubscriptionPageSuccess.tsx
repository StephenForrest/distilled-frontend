import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from 'app/lib/queries/User';
import { useQuery, useMutation } from '@apollo/client';

import { PASS_ONBOARDING_STEP } from 'app/lib/mutations/Workspace';
declare const window: any;

export function OnboardingSubscriptionPageSuccess() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(CURRENT_USER);
  const [passOnboardingStep] = useMutation(PASS_ONBOARDING_STEP);

  if (loading) return null;
  if (!loading) {
    passOnboardingStep({
      variables: { name: 'SUBSCRIPTION' },
      refetchQueries: [{ query: CURRENT_USER }],
    });
    navigate('/onboarding-demo');
    window.analytics.track('Onboarding Subscription Success', {
      userId: data.currentUser.id,
      name: data.currentUser.name,
      email: data.currentUser.email,
    });
  }

  return null;
}
