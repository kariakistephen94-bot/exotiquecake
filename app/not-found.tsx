import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty">
      <span className="eyebrow">A LITTLE CRUMB TRAIL</span>
      <h1>This slice is missing.</h1>
      <p>Let’s get you back to something sweet.</p>
      <Link href="/shop" className="button">
        Explore cakes
      </Link>
    </div>
  );
}
