"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { products, occasions } from "@/data/products";
import { ProductCard, Sheet } from "./ui";
export function Catalogue() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "All");
  const [q, setQ] = useState(params.get("q") || "");
  const [sort, setSort] = useState("Featured");
  const [flavour, setFlavour] = useState("All");
  const [price, setPrice] = useState(100000);
  const [sheet, setSheet] = useState("");
  const filtered = products
    .filter(
      (p) =>
        (category === "All" ||
          p.category === category ||
          (category === "Same Day" && p.ready)) &&
        (flavour === "All" || p.flavour === flavour) &&
        p.price <= price &&
        (p.name + p.description + p.flavour + p.category)
          .toLowerCase()
          .includes(q.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : sort === "Newest"
            ? products.indexOf(b) - products.indexOf(a)
            : sort === "Most Popular"
              ? Number(!!b.tag) - Number(!!a.tag)
              : 0,
    );
  const filters = (
    <div className="filter-fields">
      <label>
        Occasion
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["All", ...occasions].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label>
        Flavour
        <select value={flavour} onChange={(e) => setFlavour(e.target.value)}>
          {["All", "Vanilla", "Chocolate", "Red Velvet", "Banana"].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </label>
      <label>
        Maximum price · ₦{price.toLocaleString()}
        <input
          type="range"
          min="12000"
          max="100000"
          step="1000"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
      </label>
      <button
        className="text-button"
        onClick={() => {
          setCategory("All");
          setFlavour("All");
          setPrice(100000);
          setQ("");
        }}
      >
        Reset filters
      </button>
    </div>
  );
  return (
    <div className="section catalogue">
      <div className="page-heading">
        <span className="eyebrow">FIND YOUR NEXT HAPPY MOMENT</span>
        <h1>Shop Exotique.</h1>
        <p>Thoughtfully made. Beautifully finished. Yours to celebrate.</p>
      </div>
      <div className="chips">
        {["All", ...occasions].map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            onClick={() => setCategory(c)}
          >
            {c === "All" ? "All creations" : c}
          </button>
        ))}
      </div>
      <div className="catalogue-toolbar">
        <div className="search-input">
          <Search size={18} />
          <input
            aria-label="Search catalogue"
            placeholder="Find your favourite…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button className="outline-button" onClick={() => setSheet("Filters")}>
          <SlidersHorizontal size={17} />
          Filters
        </button>
        <button className="outline-button" onClick={() => setSheet("Sort by")}>
          <ArrowDownUp size={17} />
          <span>{sort}</span>
        </button>
      </div>
      <div className="catalogue-body">
        <aside>
          {filters}
          <p className="small muted">
            All cakes are made to order unless marked ready. Sizes and layers
            are selected on the cake page.
          </p>
        </aside>
        <div>
          <div className="results-count">
            {filtered.length} lovely creations
          </div>
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty">
              <h2>No cakes just yet.</h2>
              <p>Try another flavour or reset your filters.</p>
              <button
                className="button"
                onClick={() => {
                  setQ("");
                  setCategory("All");
                  setFlavour("All");
                  setPrice(100000);
                }}
              >
                Show all cakes
              </button>
            </div>
          )}
        </div>
      </div>
      {sheet && (
        <Sheet title={sheet} onClose={() => setSheet("")}>
          {sheet === "Filters" ? (
            filters
          ) : (
            <div className="choice-stack">
              {[
                "Featured",
                "Most Popular",
                "Newest",
                "Price: Low to High",
                "Price: High to Low",
              ].map((v) => (
                <button
                  className={sort === v ? "selected" : ""}
                  key={v}
                  onClick={() => {
                    setSort(v);
                    setSheet("");
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          <button className="button full" onClick={() => setSheet("")}>
            Show {filtered.length} cakes
          </button>
        </Sheet>
      )}
    </div>
  );
}
