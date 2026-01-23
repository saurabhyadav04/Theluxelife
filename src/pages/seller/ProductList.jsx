import React, { useMemo, useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const cn = (...c) => c.filter(Boolean).join(" ");

const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 21l-3.9-3.9M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconRefresh = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M21 5v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPackage = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 16V8a2 2 0 0 0-1.06-1.76l-7-4a2 2 0 0 0-1.88 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1.06 1.76l7 4a2 2 0 0 0 1.88 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3.29 7.5L12 12l8.71-4.5M12 22V12" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const formatPrice = (value) => {
  if (value === undefined || value === null || isNaN(value)) return "—";
  try { return Number(value).toLocaleString(); } catch { return value; }
};

export default function ProductList() {
  const { products = [], currency = "₹", axios, fetchProducts } = useAppContext();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [busy, setBusy] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  // Build category list (handles single + multiple)
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (Array.isArray(p?.categories) && p.categories.length) p.categories.forEach((c) => c && set.add(c));
      else if (p?.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const name = (p?.name || "").toLowerCase();
      const catsArr = Array.isArray(p?.categories) && p.categories.length ? p.categories : p?.category ? [p.category] : [];
      const catsStr = catsArr.join(", ").toLowerCase();
      const matchesQuery = !q || name.includes(q) || catsStr.includes(q);
      const inCat = category === "all" || catsArr.includes(category);
      return matchesQuery && inCat;
    });
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "price") return (a?.offerPrice ?? 0) - (b?.offerPrice ?? 0);
      if (sortBy === "stock") return (a?.inStock === b?.inStock) ? 0 : a?.inStock ? -1 : 1;
      return String(a?.name || "").localeCompare(String(b?.name || ""));
    });
    return sorted;
  }, [products, query, category, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);
  const view = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const onRefresh = async () => {
    try { setBusy(true); await fetchProducts(); toast.success("Products refreshed"); }
    catch (e) { toast.error(e?.message || "Failed to refresh"); }
    finally { setBusy(false); }
  };

  const toggleStock = async (id, inStock) => {
    try {
      setTogglingId(id);
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data?.success) { await fetchProducts(); toast.success(data?.message || "Stock updated"); }
      else { toast.error(data?.message || "Update failed"); }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    } finally { setTogglingId(null); }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
      <IconPackage className="mb-3 h-10 w-10 opacity-70" />
      <p className="text-lg font-medium text-gray-700">No products match your filters</p>
      <p className="text-base">Try adjusting search or category, or refresh the list.</p>
      <button onClick={onRefresh} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 active:scale-[.99]">
        <IconRefresh className={cn("h-5 w-5", busy && "animate-spin")} />
        Refresh
      </button>
    </div>
  );

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto">
      {/* Controls */}
      <div className="sticky top-0 z-10 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">All Products</h2>
              <p className="text-sm text-gray-500">{products.length} total • {filtered.length} shown</p>
            </div>
            <div className="flex w-full md:w-auto flex-wrap items-center gap-2">
              <div className="relative grow md:grow-0 md:w-80">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search name or category…"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-9 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:ring-2 focus:ring-blue-600/20"
                />
                <IconSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-base text-gray-700 focus:border-gray-300 focus:ring-2 focus:ring-blue-600/20"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-base text-gray-700 focus:border-gray-300 focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="name">Sort: Name</option>
                <option value="price">Sort: Price</option>
                <option value="stock">Sort: Stock</option>
              </select>

              <button
                onClick={onRefresh}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl bg-[#3f1f0a] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#3f1f0a]/90 active:scale-[.99]"
              >
                <IconRefresh className={cn("h-5 w-5", busy && "animate-spin")} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="mx-auto hidden max-w-7xl md:block md:p-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full table-fixed text-base">
            <colgroup>
              <col style={{ width: '30%' }} /> {/* Product */}
              <col style={{ width: '40%' }} /> {/* Categories */}
              <col style={{ width: '15%' }} /> {/* Price */}
              <col style={{ width: '15%' }} /> {/* Stock */}
            </colgroup>
            <thead>
              <tr className="bg-gray-50 text-left text-gray-700">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold text-center">Categories</th>
                <th className="px-6 py-4 font-semibold text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-center">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {view.length === 0 && (
                <tr><td colSpan={4}><EmptyState /></td></tr>
              )}
              {view.map((p) => {
                const img = Array.isArray(p?.image) ? p.image[0] : p?.image;
                const cats = Array.isArray(p?.categories) && p.categories.length ? p.categories : p?.category ? [p.category] : [];
                return (
                  <tr key={p._id} className="border-t border-gray-100 even:bg-gray-50/40 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                          <img src={img || "/placeholder.svg"} alt={p?.name || "Product"} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-gray-900 text-lg">{p?.name || "Untitled"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-center">
                      <div className="mt-1 flex flex-wrap justify-center gap-1.5">
                        {cats.map((c, i) => (
                          <span key={i} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right font-semibold text-gray-900">{currency}{formatPrice(p?.offerPrice)}</td>
                    <td className="px-6 py-4 align-top text-center">
                      <button type="button" aria-label={p?.inStock ? "In stock" : "Out of stock"} onClick={() => toggleStock(p._id, !p.inStock)} disabled={togglingId === p._id} className={cn("relative inline-flex h-8 w-14 items-center rounded-full transition-colors", p?.inStock ? "bg-[#3f1f0a]" : "bg-slate-300", togglingId === p._id && "opacity-80")}>
                        <span className={cn("absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform", p?.inStock ? "translate-x-6" : "translate-x-0")}/>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination (desktop) */}
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-white px-4 py-3 text-base text-gray-600 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span>Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="rounded-xl border border-gray-200 bg-white px-2 py-1 text-base focus:border-gray-300 focus:ring-2 focus:ring-blue-600/20"
              >
                {[5, 10, 20, 50].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
              <span className="ml-2">Page {page} / {totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="mx-auto grid max-w-7xl gap-3 p-3 md:hidden">
        {view.length === 0 && <EmptyState />}
        {view.map((p) => {
          const img = Array.isArray(p?.image) ? p.image[0] : p?.image;
          const cats = Array.isArray(p?.categories) && p.categories.length ? p.categories : p?.category ? [p.category] : [];
          return (
            <div key={p._id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-start gap-3 p-3">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                  <img src={img || "/placeholder.svg"} alt={p?.name || "Product"} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-semibold text-gray-900 text-center sm:text-left">{p?.name || "Untitled"}</div>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {cats.map((c, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">{c}</span>
                    ))}
                  </div>
                  <div className="mt-2 text-center sm:text-left text-base font-semibold text-gray-900">{currency}{formatPrice(p?.offerPrice)}</div>
                </div>
                <button type="button" aria-label={p?.inStock ? "In stock" : "Out of stock"} onClick={() => toggleStock(p._id, !p.inStock)} disabled={togglingId === p._id} className={cn("relative inline-flex h-8 w-14 items-center rounded-full transition-colors", p?.inStock ? "bg-emerald-500" : "bg-slate-300", togglingId === p._id && "opacity-80")}>
                  <span className={cn("absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform", p?.inStock ? "translate-x-6" : "translate-x-0")}/>
                </button>
              </div>
            </div>
          );
        })}

        {/* Pagination (mobile) */}
        <div className="mt-1 grid grid-cols-3 items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Prev</button>
          <div className="text-center text-sm text-gray-600">Page {page} / {totalPages}</div>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-600">
          <span>Rows:</span>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded-xl border border-gray-200 bg-white px-2 py-1 focus:border-gray-300 focus:ring-2 focus:ring-blue-600/20">
            {[6, 12, 24].map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
        </div>
      </div>
    </div>
  );
}