import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';

function SlidePanel({ open, onClose, title, subtitle, children, width = "max-w-lg" }) {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative ${width} w-full h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in`,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title || "Detail panel",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 bg-white border-b border-slate-100 px-6 py-4 flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              title && /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 truncate", children: title }),
              subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mt-0.5 truncate", children: subtitle })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "ml-4 flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
                "aria-label": "Close panel",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-6 py-6", children })
        ]
      }
    )
  ] });
}

export { SlidePanel as S };
