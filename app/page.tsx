import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Truck,
  Gift,
  Heart,
  Sparkles,
  MapPin,
  Check,
} from "lucide-react";
import { products, occasions, directions } from "@/data/products";
import { ProductCard } from "@/components/ui";
import { MobileSearch } from "@/components/shell";
export default function Home() {
  return (
    <>
      <div className="mobile-welcome">
        <span>
          Ilupeju, Lagos <MapPin size={12} />
        </span>
        <h2>What are we celebrating?</h2>
        <MobileSearch />
      </div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-line" /> HANDCRAFTED HAPPINESS, SINCE EVERY
            DAY
          </div>
          <h1>
            Some moments
            <br />
            deserve an
            <br />
            <em>Exotique cake.</em>
          </h1>
          <p>
            Beautifully crafted. Unforgettably delicious.
            <br />
            Cakes for the big days, the little wins,
            <br className="desktop-only" /> and everything worth celebrating.
          </p>
          <div className="hero-buttons">
            <Link href="/shop" className="button">
              Find Your Cake <ArrowUpRight size={18} />
            </Link>
            <Link href="/custom-cakes" className="hero-secondary">
              Dream It. We’ll Make It. <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-rating">
            <span className="rating-stars">★★★★★</span>
            <strong>4.9</strong>
            <span className="divider" />
            <span>Loved by 169+ happy customers</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/1.jpg"
            alt="Exotique floral celebration cake with lavender buttercream and gold details"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 52vw"
          />
          <div className="hero-image-shade" />
          <div className="image-note">
            <span>THE ART OF CELEBRATING</span>
            <p>
              A little magic.
              <br />
              In every layer.
            </p>
          </div>
          <div className="hero-stamp">
            <Sparkles size={23} />
            <span>
              MADE WITH LOVE
              <br />
              IN LAGOS
            </span>
          </div>
          <div className="image-counter">
            01 <span>/</span> 17 <span className="counter-line" />
          </div>
        </div>
      </section>
      <div className="benefit-strip">
        <span>
          <Truck size={19} /> Delivered across Lagos
        </span>
        <span>
          <Gift size={19} /> Made for your moment
        </span>
        <span>
          <Heart size={19} /> Beautiful inside & out
        </span>
        <span>
          <Check size={19} /> Easy, secure checkout
        </span>
      </div>
      <section className="section" id="occasions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EVERY OCCASION, A LITTLE SWEETER</span>
            <h2>There’s a cake for that.</h2>
          </div>
          <Link className="under-link" href="/shop">
            Explore all cakes <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="occasion-grid">
          {occasions.slice(0, 4).map((o, i) => (
            <Link
              href={"/shop?category=" + o}
              key={o}
              className="occasion-card"
            >
              <Image
                src={"/images/" + [2, 4, 6, 5][i] + ".jpg"}
                alt={o + " cake"}
                fill
                sizes="(max-width: 700px) 42vw, 25vw"
              />
              <div />
              <span>
                {o} Cakes <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
        <div className="chips mobile-only">
          {occasions.slice(4).map((o) => (
            <Link href={"/shop?category=" + o} key={o}>
              {o}
            </Link>
          ))}
        </div>
      </section>
      <section className="section bestsellers">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A FEW WELL-LOVED FAVOURITES</span>
            <h2>Made to be remembered.</h2>
          </div>
          <Link className="under-link" href="/shop">
            Shop the collection <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="catalogue-note">
          A taste of what we create. Collection names and prices are
          illustrative until confirmed by our bakery.
        </p>
      </section>
      <section className="custom-feature">
        <div className="custom-photo">
          <Image
            src="/images/10.jpg"
            alt="Bespoke Exotique celebration cake"
            fill
            sizes="50vw"
          />
        </div>
        <div className="custom-copy">
          <span className="eyebrow">AS ONE OF A KIND AS YOU ARE</span>
          <h2>
            Your cake.
            <br />
            Your moment.
            <br />
            <em>Your imagination.</em>
          </h2>
          <p>
            A favourite colour. An inside joke. A dream design.
            <br />
            Tell us what you have in mind, and let’s create
            <br />
            something beautifully, unmistakably you.
          </p>
          <Link className="button" href="/custom-cakes">
            Create My Custom Cake <Sparkles size={17} />
          </Link>
          <span className="small">
            A few simple steps. Endless possibilities.
          </span>
        </div>
      </section>
      <section className="section story-section" id="story">
        <div className="story-copy">
          <span className="eyebrow">FROM OUR HEART, TO YOUR TABLE</span>
          <h2>
            Sugar art meets
            <br />
            <em>celebration.</em>
          </h2>
          <p>
            Some things are too special to be ordinary. At Exotique Cakes, we
            believe the cake should be one of them.
          </p>
          <p>
            From intimate birthdays to life’s biggest milestones, we bring
            thoughtful design, beautifully crafted flavours, and a whole lot of
            heart to every creation.
          </p>
          <a className="under-link" href="#contact">
            Meet your neighbourhood cake boutique <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="story-images">
          <Image
            src="/images/11.jpg"
            alt="A thoughtfully decorated Exotique cake"
            width={344}
            height={448}
          />
          <Image
            src="/images/7.jpg"
            alt="Handcrafted cake details"
            width={344}
            height={448}
          />
          <span>
            Crafted with care.
            <br />
            Shared with love.
          </span>
        </div>
      </section>
      <section className="section dessert-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NO OCCASION NECESSARY</span>
            <h2>A little everyday indulgence.</h2>
          </div>
          <Link className="under-link" href="/shop?category=Desserts">
            Discover our treats <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="dessert-grid">
          {products.slice(6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          <div className="dessert-note">
            <span>Life is sweet.</span>
            <h3>
              Have another
              <br />
              <em>little bite.</em>
            </h3>
            <p>
              For sharing, for gifting,
              <br />
              or just because.
            </p>
            <Link href="/shop?category=Desserts">
              Find your favourite <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="why-grid section">
        {[
          [
            Heart,
            "Crafted with Care",
            "Thoughtfully prepared. Beautifully finished.",
          ],
          [
            Sparkles,
            "Beautiful Inside & Out",
            "Because the flavour should be as lovely as the design.",
          ],
          [
            Gift,
            "Made for Your Moment",
            "Personal touches for your kind of celebration.",
          ],
          [
            Truck,
            "A Little Peace of Mind",
            "Dependable service, from our kitchen to your door.",
          ],
        ].map(([Icon, t, d]) => {
          const I = Icon as typeof Heart;
          return (
            <div key={String(t)}>
              <I size={25} />
              <h3>{String(t)}</h3>
              <p>{String(d)}</p>
            </div>
          );
        })}
      </section>
      <section className="reviews-section" id="reviews">
        <span className="eyebrow">THE SWEETEST WORDS ARE YOURS</span>
        <h2>Loved across Lagos.</h2>
        <div className="review-score">
          <strong>4.9</strong>
          <div>
            <span className="rating-stars">★★★★★</span>
            <p>169+ Google reviews</p>
          </div>
        </div>
        <div className="reviews-grid">
          {[
            "Beautiful cakes, fresh flavours, and a delicious finish.",
            "Thoughtful service and impressively quick turnaround.",
            "Consistent quality. Cakes that taste as good as they look.",
          ].map((r, i) => (
            <article key={r}>
              <span className="rating-stars">★★★★★</span>
              <p>{r}</p>
              <span>Customer feedback highlights · 0{i + 1}</span>
            </article>
          ))}
        </div>
        <p className="small muted">
          Summarised from the business’s supplied review themes.
        </p>
        <a
          className="under-link"
          href={directions}
          target="_blank"
          rel="noreferrer"
        >
          Find us on Google <ArrowUpRight size={16} />
        </a>
      </section>
      <section className="section gallery">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A PEEK INSIDE OUR CAKE BOX</span>
            <h2>Made at Exotique.</h2>
          </div>
          <span className="muted">Real cakes. Really lovely moments.</span>
        </div>
        <div className="gallery-grid">
          {[12, 13, 14, 15, 16].map((n, i) => (
            <Link
              href="/custom-cakes"
              key={n}
              className={"gallery-item gallery-" + i}
            >
              <Image
                src={"/images/" + n + ".jpg"}
                alt={"Exotique bespoke creation " + (i + 1)}
                fill
                sizes="(max-width:700px) 45vw, 25vw"
              />
              <span>Make it your inspiration ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="delivery-section" id="delivery">
        <div>
          <span className="eyebrow">THE LAST MILE, WITH LOVE</span>
          <h2>
            From our kitchen
            <br />
            to your celebration.
          </h2>
        </div>
        <div>
          <Truck size={27} />
          <h3>A little joy, delivered.</h3>
          <p>
            Lagos delivery, with area-based pricing at checkout. Select your
            date so we can plan your perfect moment.
          </p>
        </div>
        <div>
          <MapPin size={27} />
          <h3>Or pop in and pick up.</h3>
          <p>
            Free pickup at our Ilupeju boutique. Custom creations need a little
            extra time — we’ll confirm availability with you.
          </p>
          <a href={directions}>Find our boutique ↗</a>
        </div>
      </section>
    </>
  );
}
