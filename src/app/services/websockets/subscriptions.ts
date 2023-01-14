export const userSubscription = `
  subscription userSubscription($id: String!) {
    channel(id: $id) {
      uuid
      type
      payload
    }
  }
`;
