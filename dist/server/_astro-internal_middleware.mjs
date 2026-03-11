import { d as defineMiddleware, s as sequence } from './chunks/index_Cf5IZRdW.mjs';
import './chunks/request-context_DOPo75of.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_d3EFyVgA.mjs';
import 'piccolore';
import './chunks/astro/server_C-UfuYaI.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  {
    return next();
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
