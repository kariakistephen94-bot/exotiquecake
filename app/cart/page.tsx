"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/components/store";
import { CartItems } from "@/components/shell";
import { Empty, ProductCard } from "@/components/ui";
import { products, money } from "@/data/products";
export default function Cart() {
  const s = useStore();
  const [method, setMethod] = useState("pickup");
  const [promo, setPromo] = useState("");
  const [message, setMessage] = useState("");
  if (!s.count) return <Empty />;
  return (
    <div className="section">
      <div className="page-heading">
        <span className="eyebrow">GOOD THINGS INSIDE</span>
        <h1>Your cake box.</h1>
        <p>{s.count} little reasons to celebrate.</p>
      </div>
      <div className="checkout-grid">
        <div>
          <CartItems />
          <label>
            Order notes
            <textarea
              placeholder="Anything we should know?"
              onChange={(e) =>
                localStorage.setItem("exotique-notes", e.target.value)
              }
            />
          </label>
        </div>
        <aside className="summary-card">
          <h2>The sweet details</h2>
          <div className="chips">
            <button
              className={method === "pickup" ? "selected" : ""}
              onClick={() => setMethod("pickup")}
            >
              Free pickup
            </button>
            <button
              className={method === "delivery" ? "selected" : ""}
              onClick={() => setMethod("delivery")}
            >
              Delivery
            </button>
          </div>
          <div className="total-row">
            <span>Subtotal</span>
            <strong>{money(s.subtotal)}</strong>
          </div>
          <div className="total-row">
            <span>Delivery</span>
            <span>
              {method === "pickup" ? "Free" : "Calculated at checkout"}
            </span>
          </div>
          <form
            className="promo"
            onSubmit={(e) => {
              e.preventDefault();
              setMessage(
                "This code is not available. Please check your code and try again.",
              );
            }}
          >
            <input
              aria-label="Promo code"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              required
            />
            <button>Apply</button>
          </form>
          {message && (
            <p role="status" className="small">
              {message}
            </p>
          )}
          <div className="total-row grand">
            <span>Subtotal</span>
            <strong>{money(s.subtotal)}</strong>
          </div>
          <Link href={"/checkout?method=" + method} className="button full">
            Checkout <ArrowRight size={18} />
          </Link>
          <p className="small muted">Free pickup from our Ilupeju boutique.</p>
        </aside>
      </div>
      <div className="section-heading spaced">
        <h2>Something sweet to add?</h2>
      </div>
      <div className="product-grid">
        {products.slice(6).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
