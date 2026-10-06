"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  Home,
  CakeSlice,
  Sparkles,
  Package,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { useStore, CartItem } from "./store";
import { Sheet, Empty } from "./ui";
import {
  products,
  money,
  support,
  directions,
  Configuration,
} from "@/data/products";
export function Logo() {
  return (
    <Link href="/" aria-label="Exotique Cakes home" className="logo">
      <Image
        src="/logo.png"
        alt="Exotique Cakes"
        width={105}
        height={74}
        priority
      />
    </Link>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const s = useStore();
  const [search, setSearch] = useState(false);
  useEffect(() => {
    const open = () => setSearch(true);
    window.addEventListener("exotique-search", open);
    return () => window.removeEventListener("exotique-search", open);
  }, []);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [joined, setJoined] = useState(false);
  const checkout = path === "/checkout";
  return (
    <>
      <div className="announcement">
        Handcrafted in Ilupeju <span>✦</span> Lagos delivery available{" "}
        <span>✦</span> A little joy, beautifully made
      </div>
      <header className="header">
        <div className="header-inner">
          {!checkout && (
            <button
              className="mobile-only icon-button"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={21} />
            </button>
          )}
          <Logo />
          {checkout ? (
            <span className="secure">
              <ShieldCheck size={16} /> Secure checkout
            </span>
          ) : (
            <>
              <nav className="desktop-nav">
                <Link href="/shop">
                  Shop <span>⌄</span>
                </Link>
                <Link href="/#occasions">Occasions</Link>
                <Link href="/custom-cakes">Custom Cakes</Link>
                <Link href="/#story">Our Story</Link>
                <Link href="/#reviews">Reviews</Link>
                <Link href="/#contact">Visit Us</Link>
              </nav>
              <div className="header-actions">
                <button
                  className="icon-button"
                  aria-label="Search cakes"
                  onClick={() => setSearch(true)}
                >
                  <Search size={21} />
                </button>
                <Link
                  className="icon-button desktop-only"
                  href="/account"
                  aria-label="Account"
                >
                  <UserRound size={21} />
                </Link>
                <button
                  className="icon-button cart-button"
                  aria-label={`Open cart, ${s.count} items`}
                  onClick={() => s.setOpen(true)}
                >
                  <ShoppingBag size={21} />
                  <span>{s.count}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      <main>{children}</main>
      {!checkout && (
        <>
          <footer id="contact">
            <div className="footer-top">
              <div>
                <span className="eyebrow">A LITTLE MORE EXOTIQUE</span>
                <h2>Sweet things, in your inbox.</h2>
                <p>
                  New creations, lovely surprises, and reasons to celebrate.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setJoined(true);
                }}
              >
                <label className="sr-only" htmlFor="newsletter">
                  Your email
                </label>
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Your email address"
                />
                <button aria-label="Join newsletter">
                  <ArrowRight />
                </button>
                {joined && (
                  <p role="status">
                    Preview only — newsletter signup is not connected yet.
                  </p>
                )}
              </form>
            </div>
            <div className="footer-grid">
              <div>
                <Logo />
                <p>
                  Beautiful cakes. Exceptional taste.
                  <br />
                  Memories in every slice.
                </p>
                <a href={support}>WhatsApp Support ↗</a>
              </div>
              <div>
                <h4>Explore</h4>
                <Link href="/shop">Our Cakes</Link>
                <Link href="/shop?category=Desserts">Desserts & Treats</Link>
                <Link href="/custom-cakes">Custom Cakes</Link>
                <Link href="/#story">Our Story</Link>
              </div>
              <div>
                <h4>Here to Help</h4>
                <Link href="/#delivery">Delivery & Pickup</Link>
                <Link href="/orders">Track Your Order</Link>
                <Link href="/account">Your Account</Link>
                <a href={support}>Contact Support</a>
              </div>
              <div>
                <h4>Come Say Hello</h4>
                <p>
                  By UBA Bank, 17 Esther Osiyemi Street,
                  <br />
                  Ilupeju, CAPPA Bus Stop,
                  <br />
                  Odi Olowo, Lagos.
                </p>
                <a href="tel:+2348029993595">0802 999 3595</a>
                <a href={directions} target="_blank" rel="noreferrer">
                  Get directions ↗
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} Exotique Cakes. Made for your
                moments.
              </span>
              <span>Handcrafted with love in Lagos ♡</span>
            </div>
          </footer>
          <nav className="bottom-nav">
            {[
              [Home, "Home", "/"],
              [CakeSlice, "Shop", "/shop"],
              [Sparkles, "Custom", "/custom-cakes"],
              [Package, "Orders", "/orders"],
              [UserRound, "Account", "/account"],
            ].map(([Icon, label, href]) => {
              const I = Icon as typeof Home;
              return (
                <Link
                  key={String(href)}
                  href={String(href)}
                  className={
                    (
                      href === "/"
                        ? path === "/"
                        : path.startsWith(String(href))
                    )
                      ? "active"
                      : ""
                  }
                >
                  <I size={21} />
                  <span>{String(label)}</span>
                </Link>
              );
            })}
          </nav>
        </>
      )}
      {menu && (
        <Sheet
          title="Make room for a little joy"
          onClose={() => setMenu(false)}
        >
          <div className="menu-links">
            {[
              ["Shop cakes", "/shop"],
              ["Custom cakes", "/custom-cakes"],
              ["Our story", "/#story"],
              ["Your orders", "/orders"],
              ["Your account", "/account"],
              ["Visit us", "/#contact"],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </Sheet>
      )}
      {search && (
        <Sheet title="Find your sweet spot" onClose={() => setSearch(false)}>
          <div className="search-input">
            <Search size={20} />
            <input
              autoFocus
              placeholder="Search cakes, flavours, occasions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {!query && (
            <>
              <p className="eyebrow">POPULAR SEARCHES</p>
              <div className="chips">
                {[
                  "Birthday",
                  "Red Velvet",
                  "Chocolate",
                  "Wedding",
                  "Banana",
                ].map((t) => (
                  <button key={t} onClick={() => setQuery(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="search-results">
            {products
              .filter((p) =>
                (p.name + p.category + p.flavour)
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((p) => (
                <Link
                  href={"/shop/" + p.id}
                  key={p.id}
                  onClick={() => setSearch(false)}
                >
                  <Image
                    src={"/images/" + p.image + ".jpg"}
                    width={64}
                    height={72}
                    alt={p.name}
                  />
                  <span>
                    {p.name}
                    <small>{money(p.price)}</small>
                  </span>
                  <ArrowRight size={18} />
                </Link>
              ))}
            {!products.some((p) =>
              (p.name + p.category + p.flavour)
                .toLowerCase()
                .includes(query.toLowerCase()),
            ) && <p>No cakes found. Try a flavour or occasion.</p>}
          </div>
        </Sheet>
      )}
      {s.open && (
        <Sheet title="Your cake box" onClose={() => s.setOpen(false)}>
          {s.count === 0 ? (
            <div onClick={() => s.setOpen(false)}>
              <Empty />
            </div>
          ) : (
            <>
              <p className="muted">A little happiness, ready to make yours.</p>
              <CartItems />
              <div className="total-row">
                <span>Subtotal</span>
                <strong>{money(s.subtotal)}</strong>
              </div>
              <p className="small muted">
                Delivery calculated at checkout. Free Ilupeju pickup.
              </p>
              <Link
                href="/checkout"
                className="button full"
                onClick={() => s.setOpen(false)}
              >
                Checkout <ArrowRight size={18} />
              </Link>
              <Link
                href="/cart"
                className="text-button full"
                onClick={() => s.setOpen(false)}
              >
                View your cake box
              </Link>
            </>
          )}
        </Sheet>
      )}
    </>
  );
}
export function CartItems() {
  const s = useStore();
  const [editing, setEditing] = useState<CartItem | null>(null);
  return (
    <>
      <div className="cart-items">
        {s.items.map((i) => (
          <article className="cart-item" key={i.key}>
            <Image
              src={"/images/" + i.product.image + ".jpg"}
              alt={i.product.name}
              width={90}
              height={108}
            />
            <div>
              <Link href={"/shop/" + i.product.id}>
                <strong>{i.product.name}</strong>
              </Link>
              <p>
                {i.config.size} · {i.config.flavour} · {i.config.layers} layers
              </p>
              {i.config.message && <p>“{i.config.message}”</p>}
              <strong>{money(i.price * i.quantity)}</strong>
              <button className="edit-item" onClick={() => setEditing(i)}>
                Edit options
              </button>
              <div className="quantity">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => s.quantity(i.key, i.quantity - 1)}
                >
                  <Minus size={14} />
                </button>
                <span>{i.quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => s.quantity(i.key, i.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
                <button
                  className="remove"
                  aria-label={"Remove " + i.product.name}
                  onClick={() => s.remove(i.key)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {editing && <CartEdit item={editing} onClose={() => setEditing(null)} />}
    </>
  );
}
export function CartEdit({
  item,
  onClose,
}: {
  item: CartItem;
  onClose: () => void;
}) {
  const s = useStore();
  const [config, setConfig] = useState<Configuration>(item.config);
  return (
    <Sheet title="Make it yours" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          s.edit(item.key, config);
          onClose();
        }}
      >
        {(
          [
            ["size", "Size", ['6"', '8"', '10"', '12"']],
            ["layers", "Layers", ["2", "3", "4", "5"]],
            [
              "flavour",
              "Flavour",
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
              "Filling",
              [
                "Vanilla Cream",
                "Chocolate Ganache",
                "Strawberry",
                "Caramel",
                "Swiss Meringue Buttercream",
              ],
            ],
          ] as [keyof Configuration, string, string[]][]
        ).map(([key, label, options]) => (
          <label key={key}>
            {label}
            <select
              value={config[key]}
              onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
            >
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
        <label>
          Cake message
          <input
            value={config.message}
            onChange={(e) => setConfig({ ...config, message: e.target.value })}
          />
        </label>
        <label>
          Preferred date
          <input
            type="date"
            value={config.date}
            onChange={(e) => setConfig({ ...config, date: e.target.value })}
          />
        </label>
        <button className="button full">Save changes</button>
      </form>
    </Sheet>
  );
}
export function MobileSearch() {
  return (
    <button
      className="mobile-search"
      onClick={() => window.dispatchEvent(new Event("exotique-search"))}
    >
      <Search size={19} />
      <span>Search cakes, flavours, occasions…</span>
    </button>
  );
}
