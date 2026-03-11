import { AsyncLocalStorage } from 'node:async_hooks';

const requestContext = new AsyncLocalStorage();
function getRequestToken() {
  return requestContext.getStore()?.token;
}

export { getRequestToken as g, requestContext as r };
