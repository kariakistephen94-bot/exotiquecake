"use client";
import { useEffect, useState } from "react";
import { Package, Check } from "lucide-react";
import { money, support } from "@/data/products";
export default function Orders() {
  const [orders, setOrders] = useState<Record<string, any>[]>([]);
  const [id, setId] = useState("");
  const [contact, setContact] = useState("");
  const [selected, setSelected] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("exotique-orders") || "[]"));
    } catch {}
  }, []);
  return (
    <div className="section orders-page">
      <div className="page-heading">
        <span className="eyebrow">FOLLOW THE HAPPINESS</span>
        <h1>Your orders.</h1>
        <p>From the first layer to the last little detail.</p>
      </div>
      <div className="notice">
        Preview orders are stored on this device. Live order tracking is not
        connected.
      </div>
      <form
        className="flow-card"
        onSubmit={(e) => {
          e.preventDefault();
          const o = orders.find(
            (o) =>
              o.id.toLowerCase() === id.trim().toLowerCase() &&
              (o.email?.toLowerCase() === contact.trim().toLowerCase() ||
                o.phone === contact.trim()),
          );
          setSelected(o || null);
          setError(
            o
              ? ""
              : "We couldn’t find a matching order on this device. Check your order number and contact details.",
          );
        }}
      >
        <h2>Track your cake</h2>
        <label>
          Order number
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="EXTQ-…"
            required
          />
        </label>
        <label>
          Email or phone number
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <button className="button">
          Find My Order <Package size={18} />
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
      {selected && (
        <div className="summary-card">
          <h2>#{selected.id}</h2>
          <p>
            {selected.date} · {money(selected.total)}
          </p>
          <div className="notice">Unpaid demo — not in preparation.</div>
          <ol className="timeline">
            {[
              "Preview saved on this device",
              "Payment confirmed",
              "In preparation",
              "Decorating",
              selected.method === "pickup"
                ? "Ready for pickup"
                : "Out for delivery",
              "Completed",
            ].map((t, i) => (
              <li key={t} className={i === 0 ? "active" : ""}>
                <span>{i === 0 ? <Check size={14} /> : i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      )}
      <h2 className="spaced">On this device</h2>
      {orders.length ? (
        orders.map((o) => (
          <button
            key={o.id}
            className="order-card"
            onClick={() => setSelected(o)}
          >
            <Package />
            <span>
              <strong>#{o.id}</strong>
              <small>{o.date} · Unpaid demo</small>
            </span>
            <strong>{money(o.total)}</strong>
          </button>
        ))
      ) : (
        <p className="muted">
          No orders yet. Your next celebration is waiting.
        </p>
      )}
      <a href={support} className="under-link">
        Need a hand? Contact support ↗
      </a>
    </div>
  );
}
