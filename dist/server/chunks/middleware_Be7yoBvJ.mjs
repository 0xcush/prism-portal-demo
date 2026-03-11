import { d as defineMiddleware } from './index_D8d2wuX6.mjs';
import { createHmac } from 'node:crypto';
import { r as requestContext } from './request-context_NulmSr9Y.mjs';

const SESSION_MAX_AGE = 8 * 60 * 60;
function getSessionSecret() {
  return "dev-session-secret-not-for-production";
}
function signSession(payload) {
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}
function createSessionCookie(claims) {
  const payload = {
    ...claims,
    iat: Math.floor(Date.now() / 1e3),
    exp: Math.floor(Date.now() / 1e3) + SESSION_MAX_AGE
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return signSession(encoded);
}
const DEV_USER = {
  id: "dev-admin-001",
  email: "admin@prism.dev",
  name: "Dev Admin",
  role: "admin",
  portal: "admin",
  entities: []
};
const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  {
    context.locals.user = DEV_USER;
    context.locals.token = "";
    return requestContext.run({ token: "" }, () => next());
  }
});

export { createSessionCookie as c, onRequest as o };
