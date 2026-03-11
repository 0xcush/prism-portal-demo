import { jsxs, jsx } from 'react/jsx-runtime';

function EmptyState({ icon, title, description, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "py-12 text-center", children: [
    icon || /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-slate-200 mx-auto mb-3", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-500", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: description }),
    action && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: action.onClick,
        className: "mt-3 text-sm text-navy-600 hover:text-navy-700 font-medium",
        children: action.label
      }
    )
  ] });
}

export { EmptyState as E };
