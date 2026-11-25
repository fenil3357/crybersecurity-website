import { Button, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="survey-grid">
      <Container className="flex min-h-[70svh] flex-col items-start justify-center py-20">
        <p className="coord text-trail">404 · off the route</p>
        <h1 className="display mt-4 max-w-2xl text-[clamp(2.4rem,1.5rem+3vw,4rem)]">This page is not on the map</h1>
        <p className="lede mt-5 max-w-lg">The link may be old or mistyped. Head back to the start, or go straight to our services.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services/" variant="secondary" arrow={false}>View services</Button>
        </div>
      </Container>
    </section>
  );
}
