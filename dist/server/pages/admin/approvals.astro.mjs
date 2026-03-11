/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_QPEmlEUL.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
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

function getMockApprovals() {
  return [
    {
      id: "appr-001-a7b3c9d2",
      agentType: "BankAllocation",
      priority: "urgent",
      confidence: 0.72,
      summary: "Allocate incoming £380,000 to Cavendish-Hale Foundation Fund cash account",
      status: "pending",
      reasoning: "Incoming transfer matched to client by BACS reference DAF-2025-0041. Amount exceeds daily auto-allocation threshold (£250K). Donor identity confirmed via sort code/account match. Recommending allocation to cash pending investment instruction.",
      proposedAction: { action: "allocate", accountId: "ca1", amount: 38e4, destination: "cash", reference: "BACS-2026-03-11-0041" },
      compensatingAction: { action: "hold_suspense", note: "Return to suspense account if allocation rejected" },
      createdAt: "2026-03-11T08:15:00Z",
      updatedAt: "2026-03-11T08:15:00Z",
      assignedTo: null
    },
    {
      id: "appr-002-e4f5g6h7",
      agentType: "FeeCalculation",
      priority: "high",
      confidence: 0.88,
      summary: "Quarterly management fee of £12,600 for Westminster Giving Fund (Q1 2026)",
      status: "pending",
      reasoning: "Calculated 0.60% annual rate on average Q1 AUM of £8.4M = £12,600. Matches fee schedule in client contract. Previous quarter fee was £11,900 (AUM was £7.9M). 5.9% increase attributable to AUM growth.",
      proposedAction: { action: "charge_fee", accountId: "ca8", amount: 12600, feeType: "management", period: "Q1-2026" },
      compensatingAction: null,
      createdAt: "2026-03-11T07:30:00Z",
      updatedAt: "2026-03-11T07:30:00Z",
      assignedTo: null
    },
    {
      id: "appr-003-i8j9k0l1",
      agentType: "ComplianceMonitor",
      priority: "high",
      confidence: 0.65,
      summary: "KYC refresh required for Ashford Legacy Fund — documentation expires in 14 days",
      status: "pending",
      reasoning: "Annual KYC review date approaching (25 Mar 2026). Source of wealth documentation (2024) and enhanced due diligence report require refresh. Risk rating: standard. No adverse media flagged in latest screening.",
      proposedAction: { action: "trigger_kyc_refresh", accountId: "ca11", documentTypes: ["source_of_wealth", "edd_report"], deadline: "2026-03-25" },
      compensatingAction: { action: "restrict_outbound", note: "Restrict grant disbursements if KYC not refreshed by deadline" },
      createdAt: "2026-03-11T07:00:00Z",
      updatedAt: "2026-03-11T07:00:00Z",
      assignedTo: null
    },
    {
      id: "appr-004-m2n3o4p5",
      agentType: "BDFollowup",
      priority: "medium",
      confidence: 0.91,
      summary: "Send follow-up email to Dr Alistair Waverly — 18 days since last contact",
      status: "pending",
      reasoning: 'Prospect in "Questions Sent" stage. Last contact 20 Feb 2026. Follow-up was due 10 Mar. Template: gentle_nudge_questions. Personalisation: education focus, academic background.',
      proposedAction: { action: "send_email", prospectId: "p3", template: "gentle_nudge_questions", channel: "email" },
      compensatingAction: null,
      createdAt: "2026-03-11T08:00:00Z",
      updatedAt: "2026-03-11T08:00:00Z",
      assignedTo: null
    },
    {
      id: "appr-005-q6r7s8t9",
      agentType: "InvestmentRecon",
      priority: "medium",
      confidence: 0.82,
      summary: "Reconcile £45,200 dividend income across 3 client portfolios",
      status: "pending",
      reasoning: "Custodian report shows dividend payments from Vanguard FTSE All-World (£18,400), iShares UK Equity (£15,800), and Rathbone Ethical Bond (£11,000). Matched to accounts ca1, ca5, ca8 by custody ID. All within expected ranges.",
      proposedAction: { action: "reconcile_dividends", entries: [{ accountId: "ca1", amount: 18400 }, { accountId: "ca5", amount: 15800 }, { accountId: "ca8", amount: 11e3 }] },
      compensatingAction: null,
      createdAt: "2026-03-11T06:30:00Z",
      updatedAt: "2026-03-11T06:30:00Z",
      assignedTo: null
    },
    {
      id: "appr-006-u0v1w2x3",
      agentType: "GiftAid",
      priority: "low",
      confidence: 0.97,
      summary: "Submit Gift Aid claim for 12 donations totalling £94,500 (Q4 2025)",
      status: "pending",
      reasoning: "All 12 donations have valid Gift Aid declarations on file. Total claim value: £23,625 (25% basic rate). HMRC IRmark generated and validated. Submission window closes 31 Mar 2026.",
      proposedAction: { action: "submit_gift_aid", claimPeriod: "Q4-2025", donationCount: 12, totalDonations: 94500, claimAmount: 23625 },
      compensatingAction: null,
      createdAt: "2026-03-10T14:00:00Z",
      updatedAt: "2026-03-10T14:00:00Z",
      assignedTo: null
    },
    {
      id: "appr-007-y4z5a6b7",
      agentType: "BankAllocation",
      priority: "medium",
      confidence: 0.55,
      summary: "Unmatched incoming transfer of £25,000 — possible new client deposit",
      status: "pending",
      reasoning: 'BACS transfer received with reference "WAVERLY-EDUC". Partial match to pending account ca6 (Waverly Education Fund, status: Pending). Account not yet fully onboarded. Confidence lower due to incomplete KYC.',
      proposedAction: { action: "allocate_pending", amount: 25e3, suspectedAccountId: "ca6", holdInSuspense: true },
      compensatingAction: { action: "return_funds", note: "Return to originator if not matched within 5 business days" },
      createdAt: "2026-03-11T09:00:00Z",
      updatedAt: "2026-03-11T09:00:00Z",
      assignedTo: null
    },
    {
      id: "appr-008-c8d9e0f1",
      agentType: "ComplianceMonitor",
      priority: "urgent",
      confidence: 0.48,
      summary: "Potential sanctions match flagged for grant recipient — The Felix Project",
      status: "pending",
      reasoning: 'Automated screening flagged partial name match against OFSI consolidated list. Match is likely false positive — "Felix" matches an individual on the list, not the charity. Charity Commission check confirms registration active (1168183). Recommend manual review.',
      proposedAction: { action: "flag_for_manual_review", grantId: "g8", entityName: "The Felix Project", charityNumber: "1168183", screeningResult: "partial_match" },
      compensatingAction: { action: "hold_grant_disbursement", grantId: "g8", note: "Freeze grant until sanctions check resolved" },
      createdAt: "2026-03-11T07:45:00Z",
      updatedAt: "2026-03-11T07:45:00Z",
      assignedTo: null
    },
    {
      id: "appr-009-g2h3i4j5",
      agentType: "FeeCalculation",
      priority: "low",
      confidence: 0.94,
      summary: "Apply setup fee waiver for Mercer Livery Fund per promotional agreement",
      status: "approved",
      reasoning: "Client onboarded under Q1 2026 Livery Company promotion. Setup fee of £1,500 waived per approved marketing campaign #MC-2026-Q1-03. Verified against campaign terms document.",
      proposedAction: { action: "waive_fee", accountId: "ca9", feeType: "setup", amount: 1500, reason: "promotional_campaign" },
      compensatingAction: null,
      createdAt: "2026-03-10T10:00:00Z",
      updatedAt: "2026-03-10T11:30:00Z",
      assignedTo: "Victoria Langley"
    },
    {
      id: "appr-010-k6l7m8n9",
      agentType: "ExchangeRate",
      priority: "low",
      confidence: 0.99,
      summary: "Lock GBP/USD rate at 1.2847 for Cavendish-Hale cross-border grant of $50,000",
      status: "approved",
      reasoning: "Client requested USD grant to US-based charity. Rate sourced from Bloomberg at 09:00 UTC. Within 0.1% of mid-market rate. Client notified of GBP equivalent: £38,920. No manual intervention required (confidence >= 0.95).",
      proposedAction: { action: "lock_fx_rate", accountId: "ca1", pair: "GBP/USD", rate: 1.2847, amount_usd: 5e4, amount_gbp: 38920 },
      compensatingAction: null,
      createdAt: "2026-03-10T09:00:00Z",
      updatedAt: "2026-03-10T09:00:00Z",
      assignedTo: null
    }
  ];
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
