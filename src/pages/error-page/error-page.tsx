import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';

export default function ErrorPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Проект 6 городов - 404</title>
      </Helmet>
      <Header />
      <main className="page__main">
        <div className="container">
          <div>404 Not Found</div>
          <Link to={AppRoute.Main}>На главную</Link>
        </div>
      </main>
    </>
  );
}
