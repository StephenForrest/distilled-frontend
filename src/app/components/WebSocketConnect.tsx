import React, { useEffect } from 'react';
import { CurrentUser } from 'types';
import { observe, send } from '@absinthe/socket';
import cache from 'app/lib/cache';
import { getSocket, reconnectSocket } from '../services/websockets/socket';
import { ErrorMessages } from '../services/websockets/constants';
import { userSubscription } from '../services/websockets/subscriptions';
import { ResultResponse } from '../services/websockets/types';

const WebSocketConnect = (props: { user: CurrentUser }) => {
  useEffect(() => {
    const socket = getSocket();

    console.log('CONNECT ONCE');
    const notifier = send(socket, {
      operation: userSubscription,
      variables: { id: `private:workspace:${props.user.workspaces[0]?.id}` },
    });

    const onResult = ({ data: { channel } }: ResultResponse) => {
      switch (channel.type) {
        case 'success_criteria_updated': {
          // TODO (atanych): I hate this shit, better to revisit that
          cache.modify({
            id: cache.identify({
              __typename: 'SuccessCriteria',
              id: channel.payload.id,
            }),
            fields: {
              completion() {
                return channel.payload.completion;
              },
            },
          });
          break;
        }
        default:
          break;
      }
    };

    observe(socket, notifier, {
      onError: ({ message }: Error) => {
        if (
          message === ErrorMessages.CONNECTION_CLOSED ||
          message === ErrorMessages.REQUEST_TIMEOUT ||
          message === ErrorMessages.CHANNEL_JOIN_TIMEOUT
        ) {
          // In the case of chanel timeout subscriptions will be automatically reestablished
          return;
        }
        console.error('WS error', message);
      },
      onAbort: () => reconnectSocket(),
      onResult,
    });
  }, []);

  return null;
};

export default WebSocketConnect;
