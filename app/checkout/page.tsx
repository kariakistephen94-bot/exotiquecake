"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Package,
} from "lucide-react";
import { useStore } from "@/components/store";
import { Empty } from "@/components/ui";
import { money, support } from "@/data/products";
const stages = ["Contact", "Delivery", "Date", "Payment", "Review"];
export default function Checkout() {
  const s = useStore();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({
    method: "pickup",
    area: "Ilupeju",
  });
  const [order, setOrder] = useState<Record<string, any> | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const method = new URLSearchParams(window.location.search).get("method");
    setData((d) => ({
      ...d,
      method: method === "delivery" ? "delivery" : "pickup",
      name: localStorage.getItem("exotique-name") || "",
      address: localStorage.getItem("exotique-address") || "",
    }));
  }, []);
  const fee =
    data.method === "pickup"
      ? 0
      : { Ilupeju: 2500, Ikeja: 4000, Surulere: 4000, Yaba: 4000, Lekki: 6500 }[
          data.area
        ] || 5000;
  const field = (
    name: string,
    label: string,
    type = "text",
    required = true,
  ) => (
    <label key={name}>
      {label}
      <input
        required={required}
        type={type}
        name={name}
        autoComplete={
          (
            {
              email: "email",
              phone: "tel",
              name: "name",
              address: "street-address",
            } as Record<string, string>
          )[name]
        }
        value={data[name] || ""}
        min={
          type === "date"
            ? new Date(Date.now() + 86400000).toISOString().slice(0, 10)
            : undefined
        }
        onInput={(e) =>
          setData((v) => ({
            ...v,
            [name]: (e.target as HTMLInputElement).value,
          }))
        }
        onChange={(e) => setData((v) => ({ ...v, [name]: e.target.value }))}
      />
    </label>
  );
  async function submit() {
    if (!data.email || !data.phone || !data.name || !data.date) {
      setError("Please complete your contact details and preferred date.");
      setStep(!data.email || !data.phone ? 0 : !data.name ? 1 : 2);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/payments", { method: "POST" });
      if (!res.ok) throw Error();
      const payment = await res.json();
      const o = {
        id: "EXTQ-" + Date.now().toString().slice(-7),
        ...data,
        items: s.items,
        total: s.subtotal + fee,
        payment: payment.status,
        created: new Date().toISOString(),
      };
      const orders = JSON.parse(
        localStorage.getItem("exotique-orders") || "[]",
      );
      localStorage.setItem("exotique-orders", JSON.stringify([o, ...orders]));
      setOrder(o);
      s.clear();
    } catch {
      setError(
        "We couldn’t prepare your preview order. Your cake box is safe. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (order)
    return (
      <div className="success-page">
        <div className="success-icon">
          <Check size={35} />
        </div>
        <span className="eyebrow">YOUR CHECKOUT PREVIEW IS COMPLETE</span>
        <h1>
          Your celebration
          <br />
          starts here.
        </h1>
        <p>
          Thank you, {order.name || "cake lover"}. Your demo order is saved on
          this device.
        </p>
        <div className="notice">
          No payment was taken and no order was sent to the bakery.
        </div>
        <div className="summary-card">
          <h3>Order #{order.id}</h3>
          <p>
            {order.method === "pickup" ? "Pickup from Ilupeju" : order.address}
          </p>
          <p>Requested date: {order.date}</p>
          <div className="total-row">
            <span>Total</span>
            <strong>{money(order.total)}</strong>
          </div>
          <p>Payment: unpaid · demonstration only</p>
        </div>
        <Link className="button full" href="/orders">
          View My Preview Order <Package size={18} />
        </Link>
        <Link className="text-button full" href="/shop">
          Continue Shopping
        </Link>
        <a className="small" href={support}>
          WhatsApp Support
        </a>
      </div>
    );
  if (!s.count) return <Empty />;
  return (
    <div className="section checkout">
      <div className="page-heading">
        <span className="eyebrow">ALMOST TIME TO CELEBRATE</span>
        <h1>The finishing touches.</h1>
      </div>
      <div className="checkout-grid">
        <div>
          <div className="step-progress">
            {stages.map((t, i) => (
              <span className={i <= step ? "active" : ""} key={t}>
                {i + 1}
                <small>{t}</small>
              </span>
            ))}
          </div>
          <form
            className="flow-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 4) {
                const values = Object.fromEntries(
                  new FormData(e.currentTarget).entries(),
                ) as Record<string, string>;
                setData((v) => ({ ...v, ...values }));
                setStep(step + 1);
              } else submit();
            }}
          >
            <span className="eyebrow">STEP {step + 1} OF 5</span>
            <h2>
              {
                [
                  "Let’s stay in touch.",
                  "Where’s the celebration?",
                  "Save the date.",
                  "A secure way to pay.",
                  "One last look.",
                ][step]
              }
            </h2>
            {step === 0 && (
              <>
                {field("email", "Email address", "email")}
                {field("phone", "Phone number", "tel")}
                <p className="small muted">
                  We’ll use these details for updates about your order.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <div className="choice-stack">
                  {["pickup", "delivery"].map((m) => (
                    <button
                      type="button"
                      key={m}
                      className={data.method === m ? "selected" : ""}
                      onClick={() => setData({ ...data, method: m })}
                    >
                      {m === "pickup"
                        ? "Pickup from Ilupeju · Free"
                        : "Deliver to my door"}
                    </button>
                  ))}
                </div>
                {field("name", "Full name")}
                {data.method === "delivery" ? (
                  <>
                    {field("address", "Street address")}
                    <label>
                      Lagos delivery area
                      <select
                        value={data.area}
                        onChange={(e) =>
                          setData({ ...data, area: e.target.value })
                        }
                      >
                        {["Ilupeju", "Ikeja", "Surulere", "Yaba", "Lekki"].map(
                          (a) => (
                            <option key={a}>{a}</option>
                          ),
                        )}
                      </select>
                    </label>
                    {field(
                      "instructions",
                      "Delivery instructions",
                      "text",
                      false,
                    )}
                    <p className="small">
                      Lagos, Nigeria. Delivery rates are illustrative.
                    </p>
                  </>
                ) : (
                  <p>By UBA Bank, 17 Esther Osiyemi Street, Ilupeju, Lagos.</p>
                )}
              </>
            )}
            {step === 2 && (
              <>
                {field("date", "Preferred delivery / pickup date", "date")}
                <div className="notice">
                  Please allow 48 hours for celebration cakes. Dates are subject
                  to bakery confirmation.
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="payment-option">
                  <ShieldCheck />
                  <strong>Paystack</strong>
                  <p>Card · Bank transfer · USSD</p>
                </div>
                <div className="notice">
                  Demo mode. Live payments are not connected. You can preview
                  checkout without being charged.
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <p>
                  {data.name} · {data.email}
                  <br />
                  {data.phone}
                </p>
                <p>
                  {data.method === "pickup"
                    ? "Free pickup at Ilupeju"
                    : data.address + " · " + data.area}
                  <br />
                  Requested date: {data.date}
                </p>
                <div className="notice">
                  This creates an unpaid preview on this device only. It does
                  not send an order to the bakery.
                </div>
              </>
            )}
            {error && <p role="alert">{error}</p>}
            <div className="flow-actions">
              {step > 0 && (
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Previous step"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft />
                </button>
              )}
              <button disabled={busy} className="button">
                {busy
                  ? "Saving your preview…"
                  : step === 4
                    ? "Create Demo Order"
                    : "Continue"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
        <aside className="summary-card">
          <h2>Your cake box</h2>
          {s.items.map((i) => (
            <div className="summary-item" key={i.key}>
              <span>
                {i.product.name} × {i.quantity}
                <small>
                  {i.config.size} · {i.config.flavour}
                </small>
              </span>
              <strong>{money(i.price * i.quantity)}</strong>
            </div>
          ))}
          <div className="total-row">
            <span>Subtotal</span>
            <span>{money(s.subtotal)}</span>
          </div>
          <div className="total-row">
            <span>Delivery</span>
            <span>{fee ? money(fee) : "Free"}</span>
          </div>
          <div className="total-row grand">
            <span>Total</span>
            <strong>{money(s.subtotal + fee)}</strong>
          </div>
          <p className="small muted">All prices in Nigerian Naira.</p>
        </aside>
      </div>
    </div>
  );
}
