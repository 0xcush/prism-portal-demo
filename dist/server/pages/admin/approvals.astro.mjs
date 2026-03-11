/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CsHHIwUj.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { g as getMockApprovals } from '../../chunks/approvals_ChLQUZnw.mjs';
export { renderers } from '../../renderers.mjs';

const priorityBadge$1 = {
  urgent: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-slate-100 text-slate-600 border-slate-200"
};
function confidenceColor(c) {
  if (c < 0.5) return "bg-red-500";
  if (c < 0.8) return "bg-amber-500";
  return "bg-emerald-500";
}
function formatDate$1(iso) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}
function ApprovalDetail({ approval, onClose, onAction }) {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleAction = (action) => {
    setSubmitting(true);
    onAction(approval.id, action, note);
  };
  const isPending = approval.status === "pending";
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-lg bg-white shadow-xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900", children: "Approval Detail" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
            "#",
            approval.id
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Agent Type" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: approval.agentType })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Priority" }),
            /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityBadge$1[approval.priority]}`, children: approval.priority })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800 capitalize", children: approval.status })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Created" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: formatDate$1(approval.createdAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-2", children: "Confidence Score" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-100 rounded-full h-3", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-3 rounded-full transition-all ${confidenceColor(approval.confidence)}`,
                style: { width: `${Math.round(approval.confidence * 100)}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-slate-700 w-12 text-right", children: [
              Math.round(approval.confidence * 100),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Summary" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: approval.summary })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Agent Reasoning" }),
          /* @__PURE__ */ jsx("div", { className: "bg-slate-50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap", children: approval.reasoning || "No reasoning provided." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Proposed Action" }),
          /* @__PURE__ */ jsx("pre", { className: "bg-slate-50 rounded-lg p-4 text-xs text-slate-600 overflow-x-auto", children: JSON.stringify(approval.proposedAction, null, 2) })
        ] }),
        approval.compensatingAction && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Compensating Action" }),
          /* @__PURE__ */ jsx("pre", { className: "bg-slate-50 rounded-lg p-4 text-xs text-slate-600 overflow-x-auto", children: JSON.stringify(approval.compensatingAction, null, 2) })
        ] }),
        isPending && /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-200 pt-5", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs text-slate-400 uppercase tracking-wider mb-2", children: "Review Note" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: note,
              onChange: (e) => setNote(e.target.value),
              placeholder: "Optional note for the audit trail...",
              className: "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent resize-none",
              rows: 3
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleAction("approve"),
                disabled: submitting,
                className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }) }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleAction("reject"),
                disabled: submitting,
                className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }),
                  "Reject"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}

const priorityBadge = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-slate-100 text-slate-600"
};
const priorityOrder = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3
};
function confidenceBar(c) {
  const pct = Math.round(c * 100);
  let color = "bg-red-500";
  if (c >= 0.8) color = "bg-emerald-500";
  else if (c >= 0.5) color = "bg-amber-500";
  return { color, width: `${pct}%`, label: `${pct}%` };
}
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}
const statusColors = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-slate-100 text-slate-500"
};
function ApprovalsTable({ approvals, apiUrl, token }) {
  const [selected, setSelected] = useState(null);
  const [filterAgent, setFilterAgent] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [items, setItems] = useState(approvals);
  const agentTypes = useMemo(
    () => [...new Set(approvals.map((a) => a.agentType))].sort(),
    [approvals]
  );
  const filtered = useMemo(() => {
    let result = [...items];
    if (filterAgent) result = result.filter((a) => a.agentType === filterAgent);
    if (filterPriority) result = result.filter((a) => a.priority === filterPriority);
    result.sort((a, b) => {
      const pd = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
      if (pd !== 0) return pd;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return result;
  }, [items, filterAgent, filterPriority]);
  const handleAction = async (id, action, note) => {
    if (apiUrl && token) {
      try {
        const res = await fetch(`${apiUrl}/api/v1/approvals/${id}/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ review_note: note })
        });
        if (res.ok) {
          setItems(
            (prev) => prev.map(
              (a) => a.id === id ? { ...a, status: action === "approve" ? "approved" : "rejected" } : a
            )
          );
          setSelected(null);
          return;
        }
      } catch (err) {
        console.error("[ApprovalsTable] Action failed:", err);
      }
    }
    setItems(
      (prev) => prev.map(
        (a) => a.id === id ? { ...a, status: action === "approve" ? "approved" : "rejected" } : a
      )
    );
    setSelected(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-slate-100 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filterAgent,
            onChange: (e) => setFilterAgent(e.target.value),
            className: "px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-navy-600",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Agents" }),
              agentTypes.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filterPriority,
            onChange: (e) => setFilterPriority(e.target.value),
            className: "px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-navy-600",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Priorities" }),
              /* @__PURE__ */ jsx("option", { value: "urgent", children: "Urgent" }),
              /* @__PURE__ */ jsx("option", { value: "high", children: "High" }),
              /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
              /* @__PURE__ */ jsx("option", { value: "low", children: "Low" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "ml-auto text-xs text-slate-400", children: [
          filtered.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Agent" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Priority" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Confidence" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Summary" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Created" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-100", children: [
          filtered.map((a) => {
            const cb = confidenceBar(a.confidence);
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "hover:bg-slate-50 cursor-pointer transition-colors",
                onClick: () => setSelected(a),
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono text-slate-500", children: a.id.slice(0, 8) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-slate-700", children: a.agentType }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge[a.priority]}`, children: a.priority }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-[100px]", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-100 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: `h-2 rounded-full ${cb.color}`, style: { width: cb.width } }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 w-8 text-right", children: cb.label })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-slate-600 max-w-[250px] truncate", children: a.summary }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[a.status]}`, children: a.status }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-slate-500 text-xs whitespace-nowrap", children: formatDate(a.createdAt) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: a.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex gap-1", onClick: (e) => e.stopPropagation(), children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleAction(a.id, "approve", ""),
                        className: "px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors",
                        title: "Approve",
                        children: "Approve"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleAction(a.id, "reject", ""),
                        className: "px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors",
                        title: "Reject",
                        children: "Reject"
                      }
                    )
                  ] }) })
                ]
              },
              a.id
            );
          }),
          filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 8, className: "px-4 py-12 text-center text-sm text-slate-400", children: "No approvals match the current filters." }) })
        ] })
      ] }) })
    ] }),
    selected && /* @__PURE__ */ jsx(
      ApprovalDetail,
      {
        approval: selected,
        onClose: () => setSelected(null),
        onAction: handleAction
      }
    )
  ] });
}

const $$Astro = createAstro();
const $$Approvals = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Approvals;
  const BASE = "/";
  const apiUrl = "";
  const token = Astro2.locals.token || "";
  let approvals = [];
  if (approvals.length === 0) {
    approvals = getMockApprovals();
  }
  const pending = approvals.filter((a) => a.status === "pending");
  const urgent = pending.filter((a) => a.priority === "urgent");
  const resolved = approvals.filter((a) => a.status !== "pending" && a.status !== "expired");
  let avgResolutionHours = 0;
  if (resolved.length > 0) {
    const totalMs = resolved.reduce((sum, a) => {
      return sum + (new Date(a.updatedAt).getTime() - new Date(a.createdAt).getTime());
    }, 0);
    avgResolutionHours = Math.round(totalMs / resolved.length / (1e3 * 60 * 60) * 10) / 10;
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Approval Queue - Prism Admin", "activePage": "approvals" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Approvals" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Approval Queue</h2> <p class="text-sm text-slate-500 mt-1">Review AI agent decisions requiring human oversight</p> </div>  <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Review</p> <p class="text-xl font-bold text-slate-900 mt-1">${pending.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Urgent</p> <p${addAttribute(["text-xl font-bold mt-1", urgent.length > 0 ? "text-red-600" : "text-slate-900"], "class:list")}>${urgent.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Resolved</p> <p class="text-xl font-bold text-emerald-600 mt-1">${resolved.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Resolution</p> <p class="text-xl font-bold text-slate-900 mt-1">${avgResolutionHours}h</p> </div> </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "ApprovalsTable", ApprovalsTable, { "client:load": true, "approvals": JSON.parse(JSON.stringify(approvals)), "apiUrl": apiUrl, "token": token, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ApprovalsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/approvals.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/approvals.astro";
const $$url = "/admin/approvals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Approvals,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
