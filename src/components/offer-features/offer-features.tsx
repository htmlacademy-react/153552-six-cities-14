type OfferFeaturesProps = {
  features: string[];
}

export default function OfferFeatures({ features }: OfferFeaturesProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <div className="visually-hidden">Offer features</div>
      <ul className="offer__inside-list">
        {features.map((feature) => (
          <li key={feature} className="offer__inside-item">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
