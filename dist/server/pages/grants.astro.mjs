/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { l as loadDonorClient, $ as $$DashboardLayout } from '../chunks/donor-data-loader_IbvCAMWK.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { a as formatCurrency, f as formatDate } from '../chunks/format_Cc7EDVuw.mjs';
import { E as ErrorBoundary } from '../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { P as PendingGrants } from '../chunks/PendingGrants_BRLiunwn.mjs';
export { renderers } from '../renderers.mjs';

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Approved: "bg-blue-50 text-blue-700 ring-blue-600/10",
  "In Review": "bg-amber-50 text-amber-700 ring-amber-600/10",
  Requested: "bg-slate-50 text-slate-600 ring-slate-500/10"
};
const statusOptions = ["all", "Paid", "Approved", "In Review", "Requested"];
function GrantHistory({ grants, baseUrl }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (!showFilterDropdown) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterDropdown]);
  const filteredGrants = statusFilter === "all" ? grants : grants.filter((g) => g.status === statusFilter);
  const totalGranted = grants.filter((g) => g.status === "Paid").reduce((sum, g) => sum + g.amount, 0);
  const grantCount = grants.filter((g) => g.status === "Paid").length;
  const handleExport = () => {
    const headers = ["Date", "Reference", "Charity", "Charity Number", "Issue Area", "Contact", "Amount", "Status"];
    const rows = filteredGrants.map((g) => [
      g.dateRequested,
      g.id,
      g.charity,
      g.charityNumber,
      g.issueArea,
      g.charityContact || "",
      g.amount.toString(),
      g.status
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grant-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Grant History" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
          grantCount,
          " grants paid totalling ",
          formatCurrency(totalGranted)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowFilterDropdown(!showFilterDropdown),
              "aria-label": "Filter grants by status",
              className: "inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1.5 text-slate-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" }) }),
                statusFilter === "all" ? "Filter" : statusFilter
              ]
            }
          ),
          showFilterDropdown && /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg z-10", children: statusOptions.map((option) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setStatusFilter(option);
                setShowFilterDropdown(false);
              },
              className: `w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${statusFilter === option ? "text-navy-600 font-medium bg-slate-50" : "text-slate-600"}`,
              children: option === "all" ? "All" : option
            },
            option
          )) })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleExport,
            "aria-label": "Export grants as CSV",
            className: "inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1.5 text-slate-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
              "Export"
            ]
          }
        )
      ] })
    ] }) }),
    filteredGrants.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-slate-200 mx-auto mb-3", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No grants match this filter" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setStatusFilter("all"),
          className: "mt-2 text-sm text-navy-600 hover:text-navy-700 font-medium",
          children: "Clear filter"
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Ref" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Charity" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Issue Area" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Contact" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Amount" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: filteredGrants.map((grant) => {
        return /* @__PURE__ */ jsxs(
          "tr",
          {
            className: `hover:bg-slate-50/50 transition-colors ${baseUrl ? "cursor-pointer" : ""}`,
            onClick: baseUrl ? () => {
              window.location.href = `${baseUrl}grants/${grant.id}`;
            } : void 0,
            onKeyDown: baseUrl ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.location.href = `${baseUrl}grants/${grant.id}`;
              }
            } : void 0,
            tabIndex: baseUrl ? 0 : void 0,
            role: baseUrl ? "link" : void 0,
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-slate-500 whitespace-nowrap sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100", children: formatDate(grant.dateRequested) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs text-slate-400 font-mono whitespace-nowrap", children: grant.id }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-700", children: grant.charity }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
                  "No. ",
                  grant.charityNumber,
                  grant.verifiedViaCC && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
                    "CC Verified"
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-slate-500 whitespace-nowrap", children: grant.issueArea }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs text-slate-500 whitespace-nowrap", children: grant.charityContact || "—" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-medium text-slate-800 text-right whitespace-nowrap", children: formatCurrency(grant.amount) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center whitespace-nowrap", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[grant.status]} ${grant.status === "In Review" ? "animate-pulse" : ""}`,
                  children: grant.status
                }
              ) })
            ]
          },
          grant.id
        );
      }) })
    ] }) })
  ] }) });
}

const issueAreas = [
  "Healthcare",
  "Education",
  "Arts & Culture",
  "Environment",
  "Social Welfare",
  "International Development",
  "Animal Welfare",
  "Religious Activities",
  "Other"
];
function RequestGrant({ clientName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [charityLookup, setCharityLookup] = useState("idle");
  const [form, setForm] = useState({
    charityName: "",
    charityNumber: "",
    amount: "",
    purpose: "",
    issueArea: ""
  });
  useEffect(() => {
    if (form.charityNumber.length >= 5) {
      setCharityLookup("loading");
      const timer = setTimeout(() => setCharityLookup("found"), 800);
      return () => clearTimeout(timer);
    } else {
      setCharityLookup("idle");
    }
  }, [form.charityNumber]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.charityName.trim()) newErrors.charityName = "Charity name is required";
    if (!form.charityNumber.trim()) newErrors.charityNumber = "Registration number is required";
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = "Enter a valid amount";
    if (!form.issueArea) newErrors.issueArea = "Select an issue area";
    if (!form.purpose.trim()) newErrors.purpose = "Purpose is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setForm({ charityName: "", charityNumber: "", amount: "", purpose: "", issueArea: "" });
    }, 2500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Request a Grant" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mt-0.5", children: "Submit a new grant recommendation" })
    ] }) }),
    !isOpen ? /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors shadow-sm",
        children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
          "New Grant Request"
        ]
      }
    ) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/30 backdrop-blur-sm z-40",
          onClick: () => {
            if (!submitted) {
              setIsOpen(false);
            }
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto", children: submitted ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-emerald-500", "aria-hidden": "true", role: "img", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800 mb-2", children: "Grant Request Submitted" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Your relationship manager will review this request and follow up within 2 business days." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "New Grant Request" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mt-0.5", children: clientName })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsOpen(false),
              "aria-label": "Close",
              className: "text-slate-400 hover:text-slate-600 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 rounded",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Charity Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.charityName,
                onChange: (e) => setForm({ ...form, charityName: e.target.value }),
                className: `w-full rounded-lg border ${errors.charityName ? "border-red-300 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-navy-600/20 focus:border-navy-600"} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`,
                placeholder: "e.g. Save the Children UK"
              }
            ),
            errors.charityName && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.charityName })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Charity Registration Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.charityNumber,
                onChange: (e) => setForm({ ...form, charityNumber: e.target.value }),
                className: `w-full rounded-lg border ${errors.charityNumber ? "border-red-300 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-navy-600/20 focus:border-navy-600"} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`,
                placeholder: "e.g. 213890"
              }
            ),
            errors.charityNumber && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.charityNumber }),
            charityLookup === "loading" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-navy-600 animate-spin", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Checking Charity Commission..." })
            ] }),
            charityLookup === "found" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-emerald-500 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-emerald-700", children: "Charity Commission - Active" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-600", children: "Registered since 2001 · Last filing: March 2026" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Amount" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium", children: "£" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  value: form.amount,
                  onChange: (e) => setForm({ ...form, amount: e.target.value }),
                  className: `w-full rounded-lg border ${errors.amount ? "border-red-300 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-navy-600/20 focus:border-navy-600"} pl-8 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`,
                  placeholder: "25,000"
                }
              )
            ] }),
            errors.amount && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.amount })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Issue Area" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: form.issueArea,
                onChange: (e) => setForm({ ...form, issueArea: e.target.value }),
                className: `w-full rounded-lg border ${errors.issueArea ? "border-red-300 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-navy-600/20 focus:border-navy-600"} px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors appearance-none bg-white`,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select an issue area" }),
                  issueAreas.map((area) => /* @__PURE__ */ jsx("option", { value: area, children: area }, area))
                ]
              }
            ),
            errors.issueArea && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.issueArea })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Purpose of Grant" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: form.purpose,
                onChange: (e) => setForm({ ...form, purpose: e.target.value }),
                className: `w-full rounded-lg border ${errors.purpose ? "border-red-300 focus:ring-red-600/20 focus:border-red-600" : "border-slate-200 focus:ring-navy-600/20 focus:border-navy-600"} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors resize-none`,
                placeholder: "Describe the intended use of funds..."
              }
            ),
            errors.purpose && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.purpose })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsOpen(false),
                className: "flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "flex-1 px-4 py-2.5 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors shadow-sm",
                children: "Submit Request"
              }
            )
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Grants = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Grants;
  const clientId = Astro2.url.searchParams.get("client") || "ashford";
  const client = await loadDonorClient(clientId);
  if (!client) {
    return Astro2.redirect("/");
  }
  const pendingGrants = client.grants.filter(
    (g) => g.status === "In Review" || g.status === "Requested" || g.status === "Approved"
  );
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${client.name} - Grants`, "clientId": client.id, "clientName": client.name, "activePage": "grants", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="animate-fade-up"> <h2 class="text-2xl font-semibold text-slate-800">Grants</h2> <p class="text-sm text-slate-400 mt-1">Manage grant recommendations and track disbursements</p> </div> <!-- Top row: Pending + Request --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up-1"> <div class="lg:col-span-2"> ${renderComponent($$result2, "PendingGrants", PendingGrants, { "client:load": true, "grants": pendingGrants, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/PendingGrants", "client:component-export": "default" })} </div> ${renderComponent($$result2, "RequestGrant", RequestGrant, { "client:load": true, "clientName": client.name, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/RequestGrant", "client:component-export": "default" })} </div> <!-- Full grant history --> <div class="animate-fade-up-2"> ${renderComponent($$result2, "GrantHistory", GrantHistory, { "client:load": true, "grants": client.grants, "baseUrl": "/", "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/GrantHistory", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grants.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grants.astro";
const $$url = "/grants";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Grants,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
