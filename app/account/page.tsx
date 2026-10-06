"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Package,
  Heart,
  MapPin,
  UserRound,
  HelpCircle,
} from "lucide-react";
import { useStore } from "@/components/store";
import { ProductCard } from "@/components/ui";
import { products, support } from "@/data/products";
export default function Account() {
  const s = useStore();
  const [tab, setTab] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setName(localStorage.getItem("exotique-name") || "");
    setAddress(localStorage.getItem("exotique-address") || "");
  }, []);
  return (
    <div className="section account-page">
      <div className="page-heading">
        <span className="eyebrow">YOUR LITTLE CORNER OF EXOTIQUE</span>
        <h1>Hello, {name || "cake lover"}.</h1>
        <p>Good taste deserves a place of its own.</p>
      </div>
      <div className="notice">
        Guest profile · saved only on this device. Account sign-in is not
        connected yet.
      </div>
      <div className="account-menu">
        <Link href="/orders">
          <Package />
          Your orders
          <ArrowUpRight />
        </Link>
        <button onClick={() => setTab("saved")}>
          <Heart />
          Saved cakes
          <ArrowUpRight />
        </button>
        <button onClick={() => setTab("address")}>
          <MapPin />
          Delivery address
          <ArrowUpRight />
        </button>
        <button onClick={() => setTab("profile")}>
          <UserRound />
          Your profile
          <ArrowUpRight />
        </button>
        <a href={support}>
          <HelpCircle />
          Help & support
          <ArrowUpRight />
        </a>
      </div>
      {tab === "saved" && (
        <>
          <h2 className="spaced">Your favourites</h2>
          <div className="product-grid">
            {products
              .filter((p) => s.saved.includes(p.id))
              .map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
          </div>
          {!s.saved.length && <p>Tap the heart on a cake to save it here.</p>}
        </>
      )}
      {(tab === "address" || tab === "profile") && (
        <form
          className="flow-card"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("exotique-name", name);
            localStorage.setItem("exotique-address", address);
            setSaved(true);
          }}
        >
          {tab === "profile" ? (
            <label>
              Your first name
              <input
                value={name}
                onChange={(e) => {
                  setSaved(false);
                  setName(e.target.value);
                }}
                required
              />
            </label>
          ) : (
            <label>
              Your delivery address
              <textarea
                value={address}
                onChange={(e) => {
                  setSaved(false);
                  setAddress(e.target.value);
                }}
                required
              />
            </label>
          )}
          <button className="button">Save on this device</button>
          {saved && <p role="status">Saved.</p>}
        </form>
      )}
    </div>
  );
}
