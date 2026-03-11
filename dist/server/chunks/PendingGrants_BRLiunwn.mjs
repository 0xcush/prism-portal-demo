import { jsxs, jsx } from 'react/jsx-runtime';
import { f as formatDate, a as formatCurrency } from './format_Cc7EDVuw.mjs';

const statusConfig = {
  Requested: { color: "text-slate-600", bgColor: "bg-slate-100", step: 1 },
  "In Review": { color: "text-amber-600", bgColor: "bg-amber-100", step: 2 },
  Approved: { color: "text-blue-600", bgColor: "bg-blue-100", step: 3 }
};
function ProgressBar({ step }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mt-3", children: [1, 2, 3, 4].map((s) => /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `h-1.5 w-full rounded-full transition-all duration-300 ${s <= step ? "bg-navy-600" : "bg-slate-100"}`
    }
  ) }, s)) });
}
function PendingGrants({ grants }) {
  if (grants.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-4", children: "Pending Grants" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-slate-200 mx-auto mb-3", "aria-hidden": "true", role: "img", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No pending grants" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Pending Grants" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
        grants.length,
        " grant",
        grants.length !== 1 ? "s" : "",
        " in progress"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: grants.map((grant) => {
      const config = statusConfig[grant.status] || statusConfig["Requested"];
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-lg border border-slate-100 p-4 hover:border-slate-200 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-slate-800", children: grant.charity }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
                  "Requested ",
                  formatDate(grant.dateRequested)
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800", children: formatCurrency(grant.amount) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`,
                  children: grant.status
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 font-mono", children: grant.id })
            ] }),
            /* @__PURE__ */ jsx(ProgressBar, { step: config.step }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-300 uppercase tracking-wide", children: "Requested" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-300 uppercase tracking-wide", children: "Review" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-300 uppercase tracking-wide", children: "Approved" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-300 uppercase tracking-wide", children: "Paid" })
            ] }),
            grant.delayReason && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-100", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5",
                  "aria-hidden": "true",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-700", children: grant.delayReason })
            ] })
          ]
        },
        grant.id
      );
    }) })
  ] });
}

export { PendingGrants as P };
