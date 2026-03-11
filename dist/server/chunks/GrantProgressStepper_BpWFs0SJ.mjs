import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { f as formatCurrency, e as formatDate } from './grantees_Cj0JnEzQ.mjs';
import { S as SlidePanel } from './SlidePanel_C5CbSYg-.mjs';
import { S as StatusBadge } from './StatusBadge_D7ZsDAHk.mjs';

function GrantDetail({ grant, open, onClose }) {
  if (!grant) return null;
  return /* @__PURE__ */ jsx(
    SlidePanel,
    {
      open,
      onClose,
      title: grant.grantName,
      subtitle: grant.id,
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
          /* @__PURE__ */ jsxs("dl", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Grant Name" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.grantName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Amount" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: formatCurrency(grant.amount) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Stage" }),
              /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(StatusBadge, { status: grant.stage }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Issue Area" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.issueArea })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Donor" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.donorName })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Timeline" }),
          /* @__PURE__ */ jsxs("dl", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Requested" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: formatDate(grant.dateRequested) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Approved" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.dateApproved ? formatDate(grant.dateApproved) : "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Paid" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.datePaid ? formatDate(grant.datePaid) : "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Due Diligence" }),
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(StatusBadge, { status: grant.ddStatus }) }),
          grant.requiredDocuments.length > 0 && /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: grant.requiredDocuments.map((doc, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: doc.name }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${doc.status === "Verified" || doc.status === "Submitted" ? "text-emerald-600" : "text-amber-600"}`, children: doc.status })
          ] }, idx)) })
        ] }),
        grant.notes && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Notes" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: grant.notes })
          ] })
        ] }),
        grant.paymentRef && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Payment" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Reference" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono font-medium text-slate-800", children: grant.paymentRef })
            ] })
          ] })
        ] })
      ] })
    }
  );
}

const STAGES = ["Requested", "In Review", "Approved", "Paid"];
function stageIndex(stage) {
  if (stage === "Declined") return -1;
  return STAGES.indexOf(stage);
}
function dateForStage(grant, stage) {
  switch (stage) {
    case "Requested":
      return grant.dateRequested;
    case "Approved":
      return grant.dateApproved;
    case "Paid":
      return grant.datePaid;
    default:
      return null;
  }
}
function GrantProgressStepper({ grants }) {
  const [selectedGrant, setSelectedGrant] = useState(null);
  if (grants.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "No grants to display." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    grants.map((grant) => {
      const current = stageIndex(grant.stage);
      const isDeclined = grant.stage === "Declined";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-navy-300 hover:shadow-md transition-all",
          onClick: () => setSelectedGrant(grant),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-slate-900", children: grant.grantName }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-0.5", children: [
                  formatCurrency(grant.amount),
                  " · ",
                  grant.donorName
                ] })
              ] }),
              isDeclined && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-500/10", children: "Declined" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-start", children: STAGES.map((stage, idx) => {
              const isComplete = !isDeclined && idx < current;
              const isCurrent = !isDeclined && idx === current;
              const isDeclinedStep = isDeclined && idx === 0;
              const date = dateForStage(grant, stage);
              return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center relative", children: [
                idx > 0 && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute top-3.5 right-1/2 w-full h-0.5 -z-0 ${isComplete || isCurrent ? "bg-emerald-400" : "bg-slate-200"}`
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "relative z-10", children: isDeclined && isDeclinedStep ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-red-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 2.5,
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                ) }) : isComplete ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-white",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 2.5,
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12.75l6 6 9-13.5"
                      }
                    )
                  }
                ) }) : isCurrent ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center ring-4 ring-navy-100", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" }) }) : /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-slate-400" }) }) }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `text-xs mt-2 text-center leading-tight ${isCurrent ? "font-semibold text-navy-700" : isComplete ? "font-medium text-emerald-700" : isDeclined && !isDeclinedStep ? "text-slate-300" : "text-slate-400"}`,
                    children: stage
                  }
                ),
                (isComplete || isCurrent) && date && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 mt-0.5", children: formatDate(date) })
              ] }, stage);
            }) })
          ]
        },
        grant.id
      );
    }),
    /* @__PURE__ */ jsx(GrantDetail, { grant: selectedGrant, open: !!selectedGrant, onClose: () => setSelectedGrant(null) })
  ] });
}

export { GrantProgressStepper as G };
