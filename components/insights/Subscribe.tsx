"use client";

import { useState } from "react";

/** Front-end only in the prototype: validates and confirms, no data is sent. */
export function Subscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  if (state === "done") {
    return (
      <p role="status" className="rounded-[6px] border border-granite/15 bg-paper p-5 font-medium">
        Thanks. New articles will go to {email}.
      </p>
    );
  }
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="sub-email" className="sr-only">
          Work email
        </label>
        <input
          id="sub-email"
          type="email"
          autoComplete="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "sub-error" : undefined}
          className="min-h-12 flex-1 rounded-[5px] border border-granite/20 bg-white px-4 placeholder:text-muted focus:border-granite focus:outline-none"
        />
        <button type="submit" className="min-h-12 rounded-[5px] bg-granite px-5 font-semibold text-white hover:bg-black active:scale-[0.97]">
          Subscribe
        </button>
      </div>
      {state === "error" && (
        <p id="sub-error" role="alert" className="mt-2 text-sm font-medium text-trail">
          Enter a work email, for example name@company.com
        </p>
      )}
    </form>
  );
}
