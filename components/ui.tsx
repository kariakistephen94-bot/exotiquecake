"use client";
import { useEffect, useRef, ReactNode } from "react";
import { X, ArrowUpRight, Heart, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product, money } from "@/data/products";
import { useStore } from "./store";
export function Sheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStart = useRef(0);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      el?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={
        "sheet" + (title === "Find your sweet spot" ? " search-sheet" : "")
      }
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-inner">
        <div
          className="sheet-handle"
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (e.changedTouches[0].clientY - touchStart.current > 45)
              onClose();
          }}
        />
        <div className="sheet-title">
          <h2>{title}</h2>
          <button aria-label="Close" className="icon-button" onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  const s = useStore();
  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={"/shop/" + p.id}>
          <Image
            src={"/images/" + p.image + ".jpg"}
            alt={p.name}
            fill
            sizes="(max-width: 600px) 48vw, 25vw"
          />
        </Link>
        {p.tag && <span className="product-tag">{p.tag}</span>}
        <button
          className={
            "save icon-button " + (s.saved.includes(p.id) ? "saved" : "")
          }
          aria-label={"Save " + p.name}
          onClick={() => s.toggleSave(p.id)}
        >
          <Heart
            size={18}
            fill={s.saved.includes(p.id) ? "currentColor" : "none"}
          />
        </button>
        <Link href={"/shop/" + p.id} className="product-explore">
          Make it yours <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="product-meta">
        <span>{p.category} collection</span>
        <span title="Exotique Cakes Google business rating">★ 4.9</span>
      </div>
      <Link href={"/shop/" + p.id}>
        <h3>{p.name}</h3>
      </Link>
      <div className="product-price">
        <span>
          <small>From </small>
          {money(p.price)}
        </span>
        <button aria-label={"Add " + p.name} onClick={() => s.add(p)}>
          <Plus size={17} />
          <span>Add</span>
        </button>
      </div>
    </article>
  );
}
export function Empty({
  title = "Your cake box is empty.",
  text = "Let’s find something worth celebrating.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="empty">
      <span className="eyebrow">A LITTLE SOMETHING SWEET</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <Link className="button" href="/shop">
        Explore Cakes <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
