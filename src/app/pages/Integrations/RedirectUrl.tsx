import React, { useEffect } from 'react';

const parseQuery = (search: string) => {
  let args = search.substring(1).split('&');

  const argsParsed = {};

  let i, arg, kvp, key, value;

  for (i = 0; i < args.length; i++) {
    arg = args[i];

    if (-1 === arg.indexOf('=')) {
      argsParsed[decodeURIComponent(arg).trim()] = true;
    } else {
      kvp = arg.split('=');

      key = decodeURIComponent(kvp[0]).trim();

      value = decodeURIComponent(kvp[1]).trim();

      argsParsed[key] = value;
    }
  }

  return argsParsed;
};

export const RedirectUrl = () => {
  useEffect(() => {
    const searchParams = parseQuery(document.location.search);
    window.opener.postMessage(
      {
        searchParams,
        type: 'oauth-callback',
      },
      '*',
    );
  }, []);

  return <div>slack</div>;
};
