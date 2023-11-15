import { Host } from '../../types';

type HostProps = {
  host: Host;
}

export default function OfferHost({host}: HostProps): JSX.Element {
  return (
    <>
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {host.name}
        </span>
        {host.isPro &&
          <span className="offer__user-status">
            Pro
          </span>}
      </div>
    </>
  );
}