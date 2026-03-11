/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CsHHIwUj.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { f as formatDate, b as formatCurrency, l as loadAdminData } from '../../chunks/data-loader_CbTPm3y6.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useMemo, useEffect } from 'react';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { E as EmptyState } from '../../chunks/EmptyState_BgS3M8dy.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleCopy,
      className: "ml-1 text-slate-400 hover:text-slate-600 transition-colors",
      title: "Copy email",
      children: copied ? /* @__PURE__ */ jsx("span", { className: "text-emerald-500 text-[10px] font-medium", children: "Copied!" }) : /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" }) })
    }
  );
}
function FirmDetail({ firm, open, onClose }) {
  if (!firm) return null;
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: firm.name, subtitle: firm.type, children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Type" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: firm.type })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: firm.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Relationship" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: firm.relationshipStatus })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Relationship Start" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(firm.relationshipStart) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Key Contact" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-700", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: firm.keyContactName }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: " — " }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: firm.keyContactTitle })
          ] })
        ] }),
        firm.totalAUM > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Total AUM" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-navy-600", children: formatCurrency(firm.totalAUM) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Offices" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: firm.offices.map((office) => /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-xs text-slate-600 ring-1 ring-inset ring-slate-200", children: office }, office)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Metrics" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 rounded-lg p-3 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-slate-900", children: firm.contactCount }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase mt-0.5", children: "Contacts" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 rounded-lg p-3 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-slate-900", children: firm.referralCount }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase mt-0.5", children: "Referrals" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Last Interaction" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: formatDate(firm.lastInteraction) })
    ] }),
    firm.personalNotes && /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Personal Notes" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3", children: firm.personalNotes })
    ] }),
    firm.advisors && firm.advisors.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: [
        "Advisors (",
        firm.advisors.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg border border-slate-200", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50 border-b border-slate-200", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase", children: "Title" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase", children: "Phone" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase", children: "Last Contact" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: firm.advisors.map((advisor, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 1 ? "bg-slate-50" : "", children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 font-medium text-slate-700 whitespace-nowrap", children: advisor.name }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-slate-500 whitespace-nowrap", children: advisor.title }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
            /* @__PURE__ */ jsx("a", { href: `mailto:${advisor.email}`, className: "text-navy-600 hover:underline", children: advisor.email }),
            /* @__PURE__ */ jsx(CopyEmailButton, { email: advisor.email })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-slate-500 whitespace-nowrap", children: advisor.phone || "—" }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-slate-500 whitespace-nowrap", children: advisor.lastContact ? formatDate(advisor.lastContact) : "—" })
        ] }, advisor.email)) })
      ] }) })
    ] })
  ] });
}

function FirmsGrid({ firms }) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sortKey, setSortKey] = useState("default");
  const filterRef = useRef(null);
  const locationOptions = useMemo(() => {
    const allLocations = /* @__PURE__ */ new Set();
    firms.forEach((f) => f.offices.forEach((o) => allLocations.add(o)));
    return Array.from(allLocations).sort().map((loc) => ({ value: loc, label: loc }));
  }, [firms]);
  const filters = useMemo(() => [
    {
      key: "type",
      label: "Type",
      options: [
        { value: "Investment Manager", label: "Investment Manager" },
        { value: "Wealth Advisor", label: "Wealth Advisor" },
        { value: "Accountancy", label: "Accountancy" },
        { value: "Law Firm", label: "Law Firm" },
        { value: "Family Office", label: "Family Office" },
        { value: "Philanthropy Advisor", label: "Philanthropy Advisor" }
      ]
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "Active", label: "Active" },
        { value: "Nurturing", label: "Nurturing" },
        { value: "Inactive", label: "Inactive" }
      ]
    },
    {
      key: "relationshipStatus",
      label: "Relationship",
      options: [
        { value: "Active", label: "Active" },
        { value: "Nurturing", label: "Nurturing" },
        { value: "Secured", label: "Secured" },
        { value: "Cold", label: "Cold" }
      ]
    },
    {
      key: "location",
      label: "Location",
      options: locationOptions
    }
  ], [locationOptions]);
  useEffect(() => {
    if (!openFilter) return;
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);
  const filtered = useMemo(() => {
    let rows = [...firms];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (f) => f.name.toLowerCase().includes(q) || f.personalNotes.toLowerCase().includes(q)
      );
    }
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && value !== "all") {
        if (key === "location") {
          rows = rows.filter((f) => f.offices.includes(value));
        } else {
          rows = rows.filter((f) => f[key] === value);
        }
      }
    }
    switch (sortKey) {
      case "referrals":
        rows.sort((a, b) => b.referralCount - a.referralCount);
        break;
      case "name":
        rows.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
        rows.sort((a, b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime());
        break;
    }
    return rows;
  }, [firms, search, activeFilters, sortKey]);
  const activeFilterCount = Object.values(activeFilters).filter((v) => v && v !== "all").length;
  const clearAll = () => {
    setSearch("");
    setActiveFilters({});
    setSortKey("default");
  };
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search firms...",
                className: "w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent transition-shadow"
              }
            ),
            search && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSearch(""),
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", ref: filterRef, children: [
            filters.map((f) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setOpenFilter(openFilter === f.key ? null : f.key),
                  className: `inline-flex items-center px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${activeFilters[f.key] && activeFilters[f.key] !== "all" ? "border-navy-200 bg-navy-50 text-navy-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`,
                  children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 mr-1.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" }) }),
                    activeFilters[f.key] && activeFilters[f.key] !== "all" ? activeFilters[f.key] : f.label,
                    /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 ml-1 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
                  ]
                }
              ),
              openFilter === f.key && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-1 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-20 max-h-60 overflow-y-auto", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setActiveFilters((prev) => ({ ...prev, [f.key]: "all" }));
                      setOpenFilter(null);
                    },
                    className: `w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg ${!activeFilters[f.key] || activeFilters[f.key] === "all" ? "text-navy-600 font-medium bg-slate-50" : "text-slate-600"}`,
                    children: "All"
                  }
                ),
                f.options.map((opt) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setActiveFilters((prev) => ({ ...prev, [f.key]: opt.value }));
                      setOpenFilter(null);
                    },
                    className: `w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors last:rounded-b-lg ${activeFilters[f.key] === opt.value ? "text-navy-600 font-medium bg-slate-50" : "text-slate-600"}`,
                    children: opt.label
                  },
                  opt.value
                ))
              ] })
            ] }, f.key)),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sortKey,
                onChange: (e) => setSortKey(e.target.value),
                className: `px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${sortKey !== "default" ? "border-navy-200 bg-navy-50 text-navy-700" : "border-slate-200 text-slate-600"}`,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "default", children: "Sort: Default" }),
                  /* @__PURE__ */ jsx("option", { value: "referrals", children: "Most Referrals" }),
                  /* @__PURE__ */ jsx("option", { value: "name", children: "Name A-Z" }),
                  /* @__PURE__ */ jsx("option", { value: "recent", children: "Most Recent" })
                ]
              }
            ),
            (search || activeFilterCount > 0 || sortKey !== "default") && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: clearAll,
                className: "text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors",
                children: "Clear all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-slate-400", children: filtered.length === firms.length ? `${firms.length} firm${firms.length === 1 ? "" : "s"}` : `${filtered.length} of ${firms.length} firms` })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsx(
        EmptyState,
        {
          title: "No firms found",
          description: "Try adjusting your search or filter criteria.",
          action: search || activeFilterCount > 0 ? { label: "Clear filters", onClick: clearAll } : void 0
        }
      ) : /* @__PURE__ */ jsx("div", { className: "p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map((f) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer",
          onClick: () => setSelected(f),
          role: "button",
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelected(f);
            }
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-slate-900", children: f.name }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                  /* @__PURE__ */ jsx(StatusBadge, { status: f.type }),
                  /* @__PURE__ */ jsx(StatusBadge, { status: f.relationshipStatus })
                ] })
              ] }),
              /* @__PURE__ */ jsx(StatusBadge, { status: f.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "1.5", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
                ] }),
                f.offices.join(", ")
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "Last: ",
                formatDate(f.lastInteraction)
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" }) }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-700", children: f.keyContactName }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: f.keyContactTitle })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-slate-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: f.contactCount }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 uppercase", children: "Contacts" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: f.referralCount }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 uppercase", children: "Referrals" })
                ] })
              ] }),
              f.totalAUM > 0 && /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-navy-600", children: formatCurrency(f.totalAUM) }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 uppercase", children: "AUM" })
              ] })
            ] })
          ]
        },
        f.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      FirmDetail,
      {
        firm: selected,
        open: !!selected,
        onClose: () => setSelected(null)
      }
    )
  ] });
}

const $$Firms = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { firms } = await loadAdminData();
  const activeFirms = firms.filter((f) => f.relationshipStatus === "Active");
  const securedFirms = firms.filter((f) => f.relationshipStatus === "Secured");
  const nurturingFirms = firms.filter((f) => f.relationshipStatus === "Nurturing");
  const coldFirms = firms.filter((f) => f.relationshipStatus === "Cold");
  const totalReferrals = firms.reduce((s, f) => s + f.referralCount, 0);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Firms - Prism Admin", "activePage": "firms" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Firms" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Intermediary Firms</h2> <p class="text-sm text-slate-500 mt-1">Referral network and relationship management</p> </div>  <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Firms</p> <p class="text-xl font-bold text-slate-900 mt-1">${firms.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Active</p> <p class="text-xl font-bold text-emerald-600 mt-1">${activeFirms.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Secured</p> <p class="text-xl font-bold text-blue-600 mt-1">${securedFirms.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Nurturing</p> <p class="text-xl font-bold text-amber-600 mt-1">${nurturingFirms.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-4"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Cold</p> <p class="text-xl font-bold text-slate-500 mt-1">${coldFirms.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-4"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Referrals</p> <p class="text-xl font-bold text-slate-900 mt-1">${totalReferrals}</p> </div> </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "FirmsGrid", FirmsGrid, { "client:load": true, "firms": JSON.parse(JSON.stringify(firms)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/FirmsGrid", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/firms.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/firms.astro";
const $$url = "/admin/firms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Firms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
