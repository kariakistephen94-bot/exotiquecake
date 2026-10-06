"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";
import {
  Product,
  defaultConfig,
  Configuration,
  money,
  priceFor,
} from "@/data/products";
import { useStore } from "./store";
export function ProductDetail({ product: p }: { product: Product }) {
  const [c, setC] = useState<Configuration>({
    ...defaultConfig,
    flavour: p.flavour,
  });
  const [q, setQ] = useState(1);
  const s = useStore();
  const router = useRouter();
  const change = (key: keyof Configuration, value: string) =>
    setC((v) => ({ ...v, [key]: value }));
  const price = priceFor(p, c);
  return (
    <div className="section product-detail">
      <div className="breadcrumb">
        <Link href="/shop">Our cakes</Link> / {p.name}
      </div>
      <div className="detail-grid">
        <div className="detail-photo">
          <Image
            src={"/images/" + p.image + ".jpg"}
            alt={p.name}
            fill
            priority
            sizes="(max-width:700px) 100vw, 50vw"
          />
          <Link
            href="/shop"
            className="photo-back icon-button"
            aria-label="Back to shop"
          >
            <ArrowLeft />
          </Link>
          <button
            aria-label="Save cake"
            className="save icon-button"
            onClick={() => s.toggleSave(p.id)}
          >
            <Heart fill={s.saved.includes(p.id) ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="detail-info">
          <span className="eyebrow">A MOMENT, BEAUTIFULLY MADE</span>
          <h1>{p.name}</h1>
          <p className="rating-stars">
            ★★★★★ <span>4.9 · Exotique’s Google rating</span>
          </p>
          <h2 className="detail-price">{money(price)}</h2>
          <p>
            {p.description} Handcrafted in Ilupeju with a finish to make your
            day feel special.
          </p>
          <div className="notice">
            Demo collection and pricing. Final offerings require bakery
            approval.
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              s.add(p, c, q);
            }}
          >
            {[
              ["size", "Choose your size", ['6"', '8"', '10"', '12"']],
              ["layers", "Layers", ["2", "3", "4", "5"]],
              [
                "flavour",
                "Your favourite flavour",
                [
                  "Vanilla",
                  "Chocolate",
                  "Red Velvet",
                  "Banana",
                  "Carrot",
                  "Lemon",
                  "Marble",
                ],
              ],
              [
                "filling",
                "A little something inside",
                [
                  "Vanilla Cream",
                  "Chocolate Ganache",
                  "Strawberry",
                  "Caramel",
                  "Swiss Meringue Buttercream",
                ],
              ],
            ].map(([key, title, values]) => (
              <fieldset key={String(key)}>
                <legend>{String(title)}</legend>
                <div className="chips">
                  {(values as string[]).map((v) => (
                    <button
                      type="button"
                      className={
                        c[key as keyof Configuration] === v ? "selected" : ""
                      }
                      key={v}
                      onClick={() => change(key as keyof Configuration, v)}
                    >
                      {v}
                      {key === "layers" ? " layers" : ""}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <label>
              Make it personal <span className="muted">(optional)</span>
              <input
                maxLength={80}
                placeholder="What should we write on the cake?"
                value={c.message}
                onChange={(e) => change("message", e.target.value)}
              />
            </label>
            <div className="form-columns">
              <label>
                Preferred date
                <input
                  type="date"
                  required
                  min={new Date(Date.now() + 86400000)
                    .toISOString()
                    .slice(0, 10)}
                  value={c.date}
                  onChange={(e) => change("date", e.target.value)}
                />
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={q}
                  onChange={(e) =>
                    setQ(Math.max(1, Math.min(30, +e.target.value)))
                  }
                />
              </label>
            </div>
            <label>
              Special instructions
              <textarea
                value={c.notes}
                placeholder="Anything else we should know?"
                onChange={(e) => change("notes", e.target.value)}
              />
            </label>
            <div className="purchase-bar">
              <strong>{money(price * q)}</strong>
              <button className="button" type="submit">
                <ShoppingBag size={18} /> Add to Cake Box
              </button>
            </div>
            <button
              className="outline-button full"
              type="button"
              onClick={(e) => {
                if (e.currentTarget.form?.reportValidity()) {
                  s.add(p, c, q);
                  s.setOpen(false);
                  router.push("/checkout");
                }
              }}
            >
              Buy Now
            </button>
          </form>
          <div className="detail-promises">
            <span>
              <Truck size={17} /> Lagos delivery & free pickup
            </span>
            <span>
              <ShieldCheck size={17} /> Secure checkout
            </span>
          </div>
          {[
            [
              "The delicious details",
              "Made to order. A 6-inch, 2-layer cake serves approximately 8–12 people; larger sizes and layers serve more. Please confirm exact portions for your event.",
            ],
            [
              "Ingredients & allergens",
              "May contain wheat, eggs, milk, soy, and nuts. Our kitchen handles allergens. Contact us before ordering if you have an allergy.",
            ],
            [
              "Care & storage",
              "Keep refrigerated in its box. Bring to room temperature briefly before serving. Enjoy within 3 days.",
            ],
            [
              "Delivery & lead time",
              "Allow at least 48 hours for celebration cakes. Custom designs need more time. Your requested date is subject to bakery confirmation.",
            ],
          ].map(([t, b]) => (
            <details key={t}>
              <summary>{t}</summary>
              <p>{b}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
