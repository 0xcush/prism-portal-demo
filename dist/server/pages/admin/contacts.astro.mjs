/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_QPEmlEUL.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { d as daysBetween, c as computeReminderStatus, T as TAG_COLORS, f as formatDate, l as loadAdminData } from '../../chunks/data-loader_Bff0kFPl.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

const TAG_GROUPS = {
  Actions: ["Invite to Event", "Add to Mailing List"],
  Platforms: ["MailChimp", "Events Gaslight"],
  Status: ["Key Decision Maker", "VIP", "New Contact"]
};
function ContactDetail({ contact, open, onClose }) {
  if (!contact) return null;
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const daysAgo = daysBetween(contact.lastContactDate, today);
  const reminderStatus = contact.nextReminderDate ? computeReminderStatus(contact.nextReminderDate) : null;
  let daysUntilReminder = 0;
  if (contact.nextReminderDate) {
    const todayDate = /* @__PURE__ */ new Date();
    todayDate.setHours(0, 0, 0, 0);
    const reminderDate = new Date(contact.nextReminderDate);
    reminderDate.setHours(0, 0, 0, 0);
    daysUntilReminder = Math.floor((reminderDate.getTime() - todayDate.getTime()) / (1e3 * 60 * 60 * 24));
  }
  let progressPercent = 0;
  let progressColor = "bg-emerald-500";
  if (contact.contactFrequencyDays) {
    const daysSinceLast = daysBetween(contact.lastContactDate, today);
    progressPercent = Math.min(daysSinceLast / contact.contactFrequencyDays * 100, 120);
    if (progressPercent > 100) progressColor = "bg-red-500";
    else if (progressPercent > 70) progressColor = "bg-amber-500";
  }
  const reminderDateColor = reminderStatus === "Overdue" ? "text-red-600" : reminderStatus === "Due" ? "text-amber-600" : "text-slate-700";
  const reminderLabel = daysUntilReminder < 0 ? `${Math.abs(daysUntilReminder)} days overdue` : daysUntilReminder === 0 ? "today" : `in ${daysUntilReminder} days`;
  const groupedTags = {};
  if (contact.tags?.length) {
    for (const [group, members] of Object.entries(TAG_GROUPS)) {
      const matched = contact.tags.filter((t) => members.includes(t));
      if (matched.length) groupedTags[group] = matched;
    }
  }
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: contact.name, subtitle: contact.firmName || void 0, children: [
    contact.tags && contact.tags.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Tags" }),
      Object.entries(groupedTags).map(([group, tags]) => /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-slate-400 uppercase tracking-wider", children: group }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: tags.map((tag) => /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLORS[tag] || "bg-slate-100 text-slate-600"}`, children: tag }, tag)) })
      ] }, group))
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Category" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: contact.category })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Firm" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: contact.firmName || "-" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Source" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: contact.source })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Follow-up Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: contact.followUpStatus })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Contact Information" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Email" }),
          /* @__PURE__ */ jsx("a", { href: `mailto:${contact.email}`, className: "text-sm text-navy-600 hover:text-navy-700 hover:underline", children: contact.email })
        ] }),
        contact.phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Phone" }),
          /* @__PURE__ */ jsx("a", { href: `tel:${contact.phone}`, className: "text-sm text-navy-600 hover:text-navy-700 hover:underline", children: contact.phone })
        ] })
      ] })
    ] }),
    contact.contactFrequencyDays && contact.nextReminderDate && /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Contact Schedule" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Last contacted" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-700", children: [
            formatDate(contact.lastContactDate),
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
              "(",
              daysAgo,
              " days ago)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Contact frequency" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-700", children: [
            "Every ",
            contact.contactFrequencyDays,
            " days"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Next contact due" }),
          /* @__PURE__ */ jsxs("span", { className: `text-sm font-medium ${reminderDateColor}`, children: [
            formatDate(contact.nextReminderDate),
            " ",
            /* @__PURE__ */ jsxs("span", { className: "font-normal", children: [
              "(",
              reminderLabel,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-400 mb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Last contact" }),
            /* @__PURE__ */ jsx("span", { children: "Due" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-100 rounded-full h-2", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `h-2 rounded-full transition-all ${progressColor}`,
              style: { width: `${Math.min(progressPercent, 100)}%` }
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Timeline" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Last Contact" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(contact.lastContactDate) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Next Follow-up" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatDate(contact.nextFollowUp) })
        ] })
      ] })
    ] }),
    contact.notes && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Notes" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3", children: contact.notes })
    ] })
  ] });
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (row) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-900", children: row.name }),
      row.firmName && /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: row.firmName })
    ] })
  },
  {
    key: "category",
    header: "Category",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.category })
  },
  {
    key: "followUpStatus",
    header: "Follow-up",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.followUpStatus })
  },
  {
    key: "nextReminderDate",
    header: "Next Contact",
    render: (row) => {
      if (!row.nextReminderDate) return /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" });
      const status = row.reminderStatus;
      const colorClass = status === "Overdue" ? "text-red-600 font-medium" : status === "Due" ? "text-amber-600 font-medium" : "text-emerald-600";
      return /* @__PURE__ */ jsx("span", { className: `text-xs ${colorClass}`, children: formatDate(row.nextReminderDate) });
    },
    sortValue: (row) => row.nextReminderDate ? new Date(row.nextReminderDate).getTime() : Infinity
  },
  {
    key: "tags",
    header: "Tags",
    render: (row) => {
      if (!row.tags?.length) return /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" });
      return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: row.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLORS[tag] || "bg-slate-100 text-slate-600"}`, children: tag }, tag)) });
    }
  },
  {
    key: "lastContactDate",
    header: "Last Contact",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: formatDate(row.lastContactDate) }),
    sortValue: (row) => new Date(row.lastContactDate).getTime()
  },
  {
    key: "source",
    header: "Source",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.source })
  }
];
const filters = [
  {
    key: "category",
    label: "Category",
    options: [
      { value: "Intermediary", label: "Intermediary" },
      { value: "Potential Donor", label: "Potential Donor" },
      { value: "Donor", label: "Donor" },
      { value: "Lawyer", label: "Lawyer" },
      { value: "Investment Manager", label: "Investment Manager" },
      { value: "Accountant", label: "Accountant" }
    ]
  },
  {
    key: "followUpStatus",
    label: "Follow-up",
    options: [
      { value: "On Track", label: "On Track" },
      { value: "Due", label: "Due" },
      { value: "Overdue", label: "Overdue" }
    ]
  },
  {
    key: "reminderStatus",
    label: "Reminder",
    options: [
      { value: "Upcoming", label: "Upcoming" },
      { value: "Due", label: "Due" },
      { value: "Overdue", label: "Overdue" }
    ]
  }
];
const ALL_TAGS = ["Invite to Event", "Add to Mailing List", "Key Decision Maker", "VIP", "New Contact", "MailChimp", "Events Gaslight"];
function ContactsTable({ contacts }) {
  const [selected, setSelected] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const enriched = useMemo(() => {
    return contacts.map((c) => ({
      ...c,
      reminderStatus: c.nextReminderDate ? computeReminderStatus(c.nextReminderDate) : void 0
    }));
  }, [contacts]);
  const overdueCount = useMemo(() => enriched.filter((c) => c.reminderStatus === "Overdue").length, [enriched]);
  const filtered = useMemo(() => {
    if (selectedTag === "all") return enriched;
    return enriched.filter((c) => c.tags?.includes(selectedTag));
  }, [enriched, selectedTag]);
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setTagDropdownOpen(!tagDropdownOpen),
            className: `inline-flex items-center px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${selectedTag !== "all" ? "border-navy-200 bg-navy-50 text-navy-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`,
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 mr-1.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" }) }),
              selectedTag !== "all" ? selectedTag : "Tags",
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 ml-1 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
            ]
          }
        ),
        tagDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 mt-1 w-52 bg-white rounded-lg border border-slate-200 shadow-lg z-20 max-h-60 overflow-y-auto", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSelectedTag("all");
                setTagDropdownOpen(false);
              },
              className: `w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg ${selectedTag === "all" ? "text-navy-600 font-medium bg-slate-50" : "text-slate-600"}`,
              children: "All"
            }
          ),
          ALL_TAGS.map((tag) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSelectedTag(tag);
                setTagDropdownOpen(false);
              },
              className: `w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors last:rounded-b-lg ${selectedTag === tag ? "text-navy-600 font-medium bg-slate-50" : "text-slate-600"}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: `inline-block w-2 h-2 rounded-full mr-2 ${(TAG_COLORS[tag] || "bg-slate-100").split(" ")[0]}` }),
                tag
              ]
            },
            tag
          ))
        ] })
      ] }),
      overdueCount > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600", children: [
        overdueCount,
        " overdue"
      ] }),
      selectedTag !== "all" && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedTag("all"),
          className: "text-xs text-slate-400 hover:text-slate-600 transition-colors",
          children: "Clear tag"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: filtered,
        columns,
        searchKeys: ["name", "email", "firmName", "notes"],
        searchPlaceholder: "Search contacts...",
        filters,
        onRowClick: (row) => setSelected(row),
        emptyTitle: "No contacts found",
        emptyDescription: "Try adjusting your search or filter criteria.",
        exportFilename: "contacts-export"
      }
    ),
    /* @__PURE__ */ jsx(
      ContactDetail,
      {
        contact: selected,
        open: !!selected,
        onClose: () => setSelected(null)
      }
    )
  ] });
}

const $$Contacts = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { contacts } = await loadAdminData();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const overdueCount = contacts.filter((c) => c.nextReminderDate && computeReminderStatus(c.nextReminderDate) === "Overdue").length;
  const dueThisWeek = contacts.filter((c) => c.nextReminderDate && computeReminderStatus(c.nextReminderDate) === "Due").length;
  const contactedThisMonth = contacts.filter((c) => {
    const d = new Date(c.lastContactDate);
    return d >= monthStart && d <= today;
  }).length;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Contacts - Prism Admin", "activePage": "contacts" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Contacts" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Contacts</h2> <p class="text-sm text-slate-500 mt-1">Contact management and follow-up tracking</p> </div>  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Contacts</p> <p class="text-xl font-bold text-slate-900 mt-1">${contacts.length}</p> </div> <div${addAttribute(`rounded-xl border shadow-sm p-4 animate-fade-up-1 ${overdueCount > 0 ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`, "class")}> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Overdue</p> <p class="text-xl font-bold text-red-600 mt-1">${overdueCount}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Due This Week</p> <p class="text-xl font-bold text-amber-600 mt-1">${dueThisWeek}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Contacted This Month</p> <p class="text-xl font-bold text-emerald-600 mt-1">${contactedThisMonth}</p> </div> </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "ContactsTable", ContactsTable, { "client:load": true, "contacts": JSON.parse(JSON.stringify(contacts)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ContactsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/contacts.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/contacts.astro";
const $$url = "/admin/contacts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
