export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 max-w-5xl py-20">
      <h1 className="text-4xl font-semibold leading-[1.1] mb-8 text-foreground">
        Empowering local farmers, <br /> one healthy breed at a time.
      </h1>

      <div className="prose prose-lg text-muted-foreground space-y-6 leading-[1.6]">
        <p>
          Khamar Bazaar was born out of a simple necessity: bridging the gap
          between rural Bangladeshi farmers and buyers who care about the source
          and quality of their livestock and poultry.
        </p>
        <p>
          Traditionally, the supply chain for animals like Muscovy ducks, Sonali
          chickens, and Black Bengal goats has been clouded by middlemen. This
          not only drives up prices for the buyer but significantly cuts into
          the profit margins of the hardworking farmers raising these animals.
        </p>

        <h2 className="text-4xl font-semibold text-foreground mt-12 mb-4">
          Our Mission
        </h2>
        <p>
          We are creating a digital ledger—a clean, accessible, and honest
          marketplace. By giving farmers a platform to list their livestock
          directly, we aim to ensure that they are compensated fairly while
          giving buyers peace of mind regarding the health, breed, and origin of
          their purchases.
        </p>

        <h2 className="text-4xl font-semibold text-foreground mt-12 mb-4">
          Why Minimal?
        </h2>
        <p>
          You might notice that our platform looks different from typical
          e-commerce sites. We removed the clutter, the heavy banners, and the
          aggressive marketing pop-ups. We believe the focus should be purely on
          the animals, the farmers, and the transaction. An honest, well-kept
          ledger for the modern farmer.
        </p>
      </div>
    </div>
  );
}
