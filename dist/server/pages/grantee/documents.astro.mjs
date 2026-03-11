/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$GranteeLayout } from '../../chunks/GranteeLayout_D7N2yhW7.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { a as formatDate, g as getGrantees, b as getGranteeById, d as getDocumentsForCharity } from '../../chunks/grantees_BI5daSsQ.mjs';
import { useState, useRef, useCallback } from 'react';
export { renderers } from '../../renderers.mjs';

const columns = [
  {
    key: "documentName",
    header: "Document Name",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: row.documentName })
  },
  {
    key: "type",
    header: "Type",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.type })
  },
  {
    key: "status",
    header: "Status",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.status })
  },
  {
    key: "dateUploaded",
    header: "Date Uploaded",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: formatDate(row.dateUploaded) }),
    sortValue: (row) => row.dateUploaded || ""
  },
  {
    key: "expiryDate",
    header: "Expiry Date",
    render: (row) => {
      if (!row.expiryDate) return /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "—" });
      const isExpired = new Date(row.expiryDate) < /* @__PURE__ */ new Date();
      return /* @__PURE__ */ jsx("span", { className: isExpired ? "text-red-600 font-medium" : "text-slate-600", children: formatDate(row.expiryDate) });
    },
    sortValue: (row) => row.expiryDate || ""
  }
];
const filters = [
  {
    key: "type",
    label: "Type",
    options: [
      { value: "Governance", label: "Governance" },
      { value: "Financial", label: "Financial" },
      { value: "Safeguarding", label: "Safeguarding" },
      { value: "Identity", label: "Identity" },
      { value: "Regulatory", label: "Regulatory" }
    ]
  },
  {
    key: "status",
    label: "Status",
    options: [
      { value: "Received", label: "Received" },
      { value: "Pending", label: "Pending" },
      { value: "Expired", label: "Expired" },
      { value: "Not Required", label: "Not Required" }
    ]
  }
];
function DocumentsTable({ documents }) {
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data: documents,
      columns,
      searchKeys: ["documentName"],
      searchPlaceholder: "Search documents...",
      filters,
      emptyTitle: "No documents found",
      emptyDescription: "No due diligence documents match your search or filters.",
      exportFilename: "prism-documents"
    }
  );
}

function DocumentUploadZone({ onUpload }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const handleSuccess = useCallback(
    (fileName) => {
      setUploadedFile(fileName);
      onUpload?.(fileName);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setUploadedFile(null);
        timerRef.current = null;
      }, 3e3);
    },
    [onUpload]
  );
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleSuccess(file.name);
    },
    [handleSuccess]
  );
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) handleSuccess(file.name);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleSuccess]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => !uploadedFile && inputRef.current?.click(),
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      className: `relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${uploadedFile ? "border-emerald-300 bg-emerald-50" : isDragOver ? "border-navy-400 bg-navy-50/50" : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50"}`,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            className: "hidden",
            onChange: handleFileChange,
            accept: ".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center py-8 px-4", children: uploadedFile ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 animate-bounce-once", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-6 h-6 text-emerald-600",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              strokeWidth: 2,
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M4.5 12.75l6 6 9-13.5"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-emerald-700", children: "Document uploaded successfully" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-600 mt-1", children: uploadedFile })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${isDragOver ? "bg-navy-100" : "bg-slate-100"}`,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-6 h-6 transition-colors ${isDragOver ? "text-navy-600" : "text-slate-400"}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-700", children: isDragOver ? "Drop file here" : "Drag & drop a document here" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: "or click to browse · PDF, DOC, XLS, CSV, JPG, PNG" })
        ] }) })
      ]
    }
  );
}

const $$Astro = createAstro();
const $$Documents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Documents;
  const BASE = "/";
  const charityId = Astro2.url.searchParams.get("charity") || getGrantees()[0]?.id || "";
  const charity = getGranteeById(charityId);
  const documents = getDocumentsForCharity(charityId);
  const received = documents.filter((d) => d.status === "Received").length;
  const pending = documents.filter((d) => d.status === "Pending").length;
  const expired = documents.filter((d) => d.status === "Expired").length;
  const total = documents.length;
  const completionPct = total > 0 ? Math.round(received / total * 100) : 0;
  return renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": "Documents - Prism", "activePage": "documents", "charityName": charity?.charityName }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Grantee", href: `${BASE}grantee` }, { label: charity?.charityName || "Charity", href: `${BASE}grantee/dashboard?charity=${charityId}` }, { label: "Documents" }] })}  ${maybeRenderHead()}<div class="mb-8 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Documents</h2> <p class="text-sm text-slate-500 mt-1">Due diligence document checklist</p> </div>  <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-8 animate-fade-up-1"> <div class="flex items-center justify-between mb-3"> <span class="text-sm font-semibold text-slate-800">Document Completion: ${completionPct}%</span> </div> <div class="w-full bg-slate-200 rounded-full h-3 mb-3"> <div class="bg-emerald-500 h-3 rounded-full transition-all duration-500"${addAttribute(`width: ${completionPct}%`, "style")}></div> </div> <p class="text-xs text-slate-500"> ${received} of ${total} documents received
      &middot; ${pending} pending
      &middot; <span${addAttribute(expired > 0 ? "text-red-600 font-medium" : "", "class")}>${expired} expired</span> </p> </div>  <div class="mb-8 animate-fade-up-2"> ${renderComponent($$result2, "DocumentUploadZone", DocumentUploadZone, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/DocumentUploadZone", "client:component-export": "default" })} </div>  <div class="animate-fade-up-3"> ${renderComponent($$result2, "DocumentsTable", DocumentsTable, { "documents": documents, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/DocumentsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/documents.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/documents.astro";
const $$url = "/grantee/documents";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Documents,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
