import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo } from 'react';
import { E as ErrorBoundary } from './ErrorBoundary_D9-bXlGr.mjs';
import { E as EmptyState } from './EmptyState_BgS3M8dy.mjs';

function getNestedValue(obj, path) {
  const val = path.split(".").reduce((acc, key) => acc?.[key], obj);
  return val != null ? String(val) : "";
}
function DataTable({
  data,
  columns,
  searchKeys,
  searchPlaceholder = "Search...",
  filters = [],
  onRowClick,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  exportFilename
}) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const filterRef = useRef(null);
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
  useEffect(() => {
    function handleTopbarSearch(e) {
      const detail = e.detail;
      if (typeof detail === "string") setSearch(detail);
    }
    window.addEventListener("topbar-search", handleTopbarSearch);
    return () => window.removeEventListener("topbar-search", handleTopbarSearch);
  }, []);
  const processed = useMemo(() => {
    let rows = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (row) => searchKeys.some((key) => getNestedValue(row, key).toLowerCase().includes(q))
      );
    }
    for (const [filterKey, filterValue] of Object.entries(activeFilters)) {
      if (filterValue && filterValue !== "all") {
        rows = rows.filter((row) => getNestedValue(row, filterKey) === filterValue);
      }
    }
    if (sortKey && sortDir) {
      const col = columns.find((c) => c.key === sortKey);
      if (col?.sortValue) {
        const sv = col.sortValue;
        rows.sort((a, b) => {
          const va = sv(a);
          const vb = sv(b);
          if (typeof va === "number" && typeof vb === "number") {
            return sortDir === "asc" ? va - vb : vb - va;
          }
          return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        });
      }
    }
    return rows;
  }, [data, search, activeFilters, sortKey, sortDir, searchKeys, columns]);
  const handleSort = (key) => {
    const col = columns.find((c) => c.key === key);
    if (!col?.sortValue) return;
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      } else setSortDir("asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const handleExport = () => {
    if (!exportFilename) return;
    const headers = columns.map((c) => c.header);
    const rows = processed.map(
      (row) => columns.map((c) => {
        const val = c.sortValue ? c.sortValue(row) : getNestedValue(row, c.key);
        return `"${String(val).replace(/"/g, '""')}"`;
      })
    );
    const csv = [headers.map((h) => `"${h}"`).join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFilename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const activeFilterCount = Object.values(activeFilters).filter((v) => v && v !== "all").length;
  const clearAll = () => {
    setSearch("");
    setActiveFilters({});
    setSortKey(null);
    setSortDir(null);
  };
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
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
              placeholder: searchPlaceholder,
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
          exportFilename && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleExport,
              className: "inline-flex items-center px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
              "aria-label": "Export as CSV",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                "Export"
              ]
            }
          ),
          (search || activeFilterCount > 0) && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: clearAll,
              className: "text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors",
              children: "Clear all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-slate-400", children: processed.length === data.length ? `${data.length} record${data.length === 1 ? "" : "s"}` : `${processed.length} of ${data.length} records` })
    ] }),
    processed.length === 0 ? /* @__PURE__ */ jsx(
      EmptyState,
      {
        title: emptyTitle,
        description: emptyDescription,
        action: search || activeFilterCount > 0 ? { label: "Clear filters", onClick: clearAll } : void 0
      }
    ) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto hidden md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "bg-slate-50/50", children: columns.map((col, i) => {
          const sortable = !!col.sortValue;
          const isSorted = sortKey === col.key;
          return /* @__PURE__ */ jsx(
            "th",
            {
              onClick: sortable ? () => handleSort(col.key) : void 0,
              className: `px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${sortable ? "cursor-pointer select-none hover:text-slate-600 transition-colors" : ""} ${i === 0 ? "sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100" : ""} ${col.className || ""}`,
              children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                col.header,
                sortable && /* @__PURE__ */ jsxs("span", { className: "inline-flex flex-col text-[8px] leading-none", children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: `w-3 h-3 ${isSorted && sortDir === "asc" ? "text-navy-600" : "text-slate-300"}`,
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: /* @__PURE__ */ jsx("path", { d: "M5.293 9.707l4-4a1 1 0 011.414 0l4 4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: `w-3 h-3 -mt-1 ${isSorted && sortDir === "desc" ? "text-navy-600" : "text-slate-300"}`,
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: /* @__PURE__ */ jsx("path", { d: "M14.707 10.293l-4 4a1 1 0 01-1.414 0l-4-4" })
                    }
                  )
                ] })
              ] })
            },
            col.key
          );
        }) }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: processed.map((row, rowIdx) => /* @__PURE__ */ jsx(
          "tr",
          {
            className: `hover:bg-slate-50/50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`,
            onClick: onRowClick ? () => onRowClick(row) : void 0,
            onKeyDown: onRowClick ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onRowClick(row);
              }
            } : void 0,
            tabIndex: onRowClick ? 0 : void 0,
            role: onRowClick ? "button" : void 0,
            children: columns.map((col, colIdx) => /* @__PURE__ */ jsx(
              "td",
              {
                className: `px-5 py-3.5 text-sm ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${colIdx === 0 ? "sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100" : ""} ${col.className || ""}`,
                children: col.render(row)
              },
              col.key
            ))
          },
          row.id || rowIdx
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-slate-100", children: processed.map((row, rowIdx) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `p-4 ${onRowClick ? "cursor-pointer hover:bg-slate-50/50 active:bg-slate-100/50" : ""}`,
          onClick: onRowClick ? () => onRowClick(row) : void 0,
          role: onRowClick ? "button" : void 0,
          tabIndex: onRowClick ? 0 : void 0,
          children: columns.map((col, colIdx) => /* @__PURE__ */ jsx("div", { className: colIdx === 0 ? "mb-2" : "flex items-center justify-between py-1", children: colIdx === 0 ? /* @__PURE__ */ jsx("div", { className: "font-medium text-slate-800", children: col.render(row) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 uppercase tracking-wider", children: col.header }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-600", children: col.render(row) })
          ] }) }, col.key))
        },
        row.id || rowIdx
      )) })
    ] })
  ] }) });
}

export { DataTable as D };
