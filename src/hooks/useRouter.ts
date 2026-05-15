import { useState, useEffect, useCallback } from 'react';

export interface Route {
  page: string;
  params: Record<string, string>;
}

function parseHash(): Route {
  const hash = window.location.hash.slice(1) || '/';
  const [path, queryString] = hash.split('?');
  const params: Record<string, string> = {};

  if (queryString) {
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      if (key) params[key] = decodeURIComponent(value || '');
    });
  }

  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { page: 'home', params };
  if (segments[0] === 'products' && segments[1]) {
    params.id = segments[1];
    return { page: 'product-detail', params };
  }
  return { page: segments[0], params };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}
