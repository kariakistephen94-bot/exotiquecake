"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, X, Check } from "lucide-react";
import Link from "next/link";
import { support } from "@/data/products";
const titles = [
  "What are we celebrating?",
  "Let’s build something lovely.",
  "Show us your inspiration.",
  "Make it unmistakably yours.",
  "When’s the big moment?",
  "A budget that feels right.",
  "How can we reach you?",
];
export default function Custom() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({
    occasion: "Birthday",
    method: "Pickup",
    budget: "₦35,000 – ₦50,000",
  });
  const [photos, setPhotos] = useState<
    { name: string; url: string; file: File }[]
  >([]);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [local, setLocal] = useState(true);
  const [error, setError] = useState("");
  const field = (
    name: string,
    label: string,
    type = "text",
    required = false,
  ) => (
    <label key={name}>
      {label}
      <input
        name={name}
        value={data[name] || ""}
        type={type}
        required={required}
        min={
          type === "date"
            ? new Date().toISOString().slice(0, 10)
            : type === "number"
              ? 1
              : undefined
        }
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      />
    </label>
  );
  const select = (name: string, label: string, opts: string[]) => (
    <label key={name}>
      {label}
      <select
        name={name}
        value={data[name] || ""}
        required
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      >
        <option value="">Choose an option</option>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  function addFiles(files: FileList | null) {
    if (!files) return;
    setError("");
    const valid = Array.from(files).filter(
      (f) =>
        ["image/jpeg", "image/png", "image/webp"].includes(f.type) &&
        f.size < 8 * 1024 * 1024,
    );
    if (valid.length !== files.length)
      setError("Please use JPG, PNG or WebP images under 8 MB.");
    setPhotos((v) =>
      [
        ...v,
        ...valid.map((f) => ({
          name: f.name,
          url: URL.createObjectURL(f),
          file: f,
        })),
      ].slice(0, 6),
    );
  }
  if (done)
    return (
      <div className="success-page">
        <div className="success-icon">
          <Check />
        </div>
        <h1>
          Your cake request
          <br />
          is in.
        </h1>
        <p>
          Request {requestId.slice(0, 16)} · Your design details and inspiration
          photos have been saved.
        </p>
        <div className="notice">
          {local
            ? "Local preview: saved on this development server. The bakery has not been notified. No price or date is confirmed."
            : "We’ll review your design before confirming the final price and availability."}
        </div>
        <Link href="/shop" className="button full">
          Explore our cakes
        </Link>
        <a href={support} className="text-button full">
          Contact support on WhatsApp
        </a>
      </div>
    );
  return (
    <div className="custom-builder section">
      <div className="page-heading">
        <span className="eyebrow">
          LET’S CREATE SOMETHING ONLY YOU COULD IMAGINE
        </span>
        <h1>Your cake. Your moment.</h1>
        <p>A few lovely details. A completely personal creation.</p>
      </div>
      <div className="wizard">
        <div className="wizard-top">
          <span>YOUR CUSTOM CREATION</span>
          <span>{step + 1} of 7</span>
        </div>
        <div className="progress-track">
          <motion.div animate={{ width: ((step + 1) / 7) * 100 + "%" }} />
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const values = Object.fromEntries(
              new FormData(e.currentTarget).entries(),
            ) as Record<string, string>;
            const current = { ...data, ...values };
            setData(current);
            if (step < 6) {
              setStep(step + 1);
              return;
            }
            setBusy(true);
            setError("");
            try {
              const body = new FormData();
              body.append("details", JSON.stringify(current));
              photos.forEach((p) => body.append("photos", p.file));
              const response = await fetch("/api/custom-requests", {
                method: "POST",
                body,
              });
              const result = await response.json();
              if (!response.ok) throw Error(result.error);
              setRequestId(result.id);
              setLocal(result.mode === "local");
              setDone(true);
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : "Please try submitting your request again.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.18 }}
            >
              <h2>{titles[step]}</h2>
              {step === 0 && (
                <div className="occasion-options">
                  {[
                    "Birthday",
                    "Wedding",
                    "Anniversary",
                    "Baby Shower",
                    "Bridal Shower",
                    "Graduation",
                    "Corporate Event",
                    "Children’s Party",
                    "Something Else",
                  ].map((o) => (
                    <button
                      type="button"
                      key={o}
                      className={data.occasion === o ? "selected" : ""}
                      onClick={() => setData({ ...data, occasion: o })}
                    >
                      {o}
                      <ArrowRight size={17} />
                    </button>
                  ))}
                </div>
              )}
              {step === 1 && (
                <div className="form-columns">
                  {field("servings", "Number of guests", "number", true)}
                  {select("size", "Preferred size", [
                    "6 inch",
                    "8 inch",
                    "10 inch",
                    "12 inch",
                    "Help me choose",
                  ])}
                  {select("tiers", "Number of tiers", ["1", "2", "3", "4"])}
                  {select("flavour", "Flavour", [
                    "Vanilla",
                    "Chocolate",
                    "Red Velvet",
                    "Banana",
                    "Carrot",
                    "Lemon",
                    "Marble",
                  ])}
                  {select("filling", "Filling", [
                    "Vanilla Cream",
                    "Chocolate Ganache",
                    "Strawberry",
                    "Caramel",
                  ])}
                  {select("frosting", "Frosting", [
                    "Buttercream",
                    "Swiss Meringue",
                    "Fondant",
                    "Help me choose",
                  ])}
                  {field("colours", "Preferred colours")}
                  {field("theme", "Theme")}
                </div>
              )}
              {step === 2 && (
                <>
                  <label
                    className="upload"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      addFiles(e.dataTransfer.files);
                    }}
                  >
                    <Upload size={28} />
                    <strong>Add inspiration photos</strong>
                    <span>Drop here or tap to browse · up to 6 images</span>
                    <span>JPG, PNG, WebP · 8 MB each</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={(e) => addFiles(e.target.files)}
                    />
                  </label>
                  <div className="upload-previews">
                    {photos.map((p, i) => (
                      <div key={p.url}>
                        <img src={p.url} alt={p.name} />
                        <button
                          type="button"
                          aria-label={"Remove " + p.name}
                          onClick={() => {
                            URL.revokeObjectURL(p.url);
                            setPhotos((v) => v.filter((_, j) => j !== i));
                          }}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {error && <p role="alert">{error}</p>}
                  <label>
                    Tell us about the cake you have in mind
                    <textarea
                      value={data.design || ""}
                      onChange={(e) =>
                        setData({ ...data, design: e.target.value })
                      }
                      placeholder="The details, the mood, the little things that matter…"
                    />
                  </label>
                </>
              )}
              {step === 3 && (
                <>
                  {field("cakeName", "Name to appear on cake")}
                  {field("age", "Age")}
                  {field("message", "Cake message")}
                  {field("characters", "Theme / characters")}
                  {field("instructions", "Additional instructions")}
                </>
              )}
              {step === 4 && (
                <>
                  {field("eventDate", "Event date", "date", true)}
                  {field(
                    "deliveryDate",
                    "Preferred delivery date",
                    "date",
                    true,
                  )}
                  <div className="chips">
                    {["Pickup", "Delivery"].map((m) => (
                      <button
                        type="button"
                        key={m}
                        className={data.method === m ? "selected" : ""}
                        onClick={() => setData({ ...data, method: m })}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  {data.method === "Delivery" && (
                    <>
                      {field("address", "Delivery address", "text", true)}
                      {field("area", "Delivery area", "text", true)}
                    </>
                  )}
                  {field("time", "Preferred time", "time")}
                  <div className="notice">
                    Short-notice orders need availability confirmation. We’ll
                    review your date before confirming a custom order.
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <p>
                    Beautiful ideas come in every size. Choose what works for
                    you.
                  </p>
                  <div className="choice-stack">
                    {[
                      "₦20,000 – ₦35,000",
                      "₦35,000 – ₦50,000",
                      "₦50,000 – ₦80,000",
                      "₦80,000 – ₦150,000",
                      "₦150,000+",
                    ].map((b) => (
                      <button
                        key={b}
                        type="button"
                        className={data.budget === b ? "selected" : ""}
                        onClick={() => setData({ ...data, budget: b })}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 6 && (
                <>
                  {field("fullName", "Full name", "text", true)}
                  {field("email", "Email address", "email", true)}
                  {field("phone", "Phone number", "tel", true)}
                  <div className="notice">
                    In this local preview, your request and photos are stored on
                    the development server. The bakery is not notified.
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {error && step !== 2 && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          <div className="flow-actions">
            {step > 0 && (
              <button
                className="outline-button"
                type="button"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={17} /> Back
              </button>
            )}
            <button className="button" disabled={busy}>
              {busy
                ? "Sending your cake request…"
                : step === 6
                  ? "Send My Cake Request"
                  : "Continue"}
              <ArrowRight size={17} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
