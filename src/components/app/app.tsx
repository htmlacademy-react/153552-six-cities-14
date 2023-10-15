import { Offer } from '../../utils';
import HomePage from '../../pages/home-page/home-page';

type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <HomePage offers={offers} />
  );
}

export default App;
