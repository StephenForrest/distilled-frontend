interface SuccessCriteriaUpdated {
  type: 'success_criteria_updated';
  payload: { id: string; completion: string };
}

type WebSocketEvent = SuccessCriteriaUpdated;

export type ResultResponse = {
  data: {
    channel: WebSocketEvent;
  };
};
