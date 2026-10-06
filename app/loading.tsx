export default function Loading() {
  return (
    <div className="section">
      <div className="skeleton skeleton-heading" />
      <div className="product-grid">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="skeleton" />
        ))}
      </div>
    </div>
  );
}
