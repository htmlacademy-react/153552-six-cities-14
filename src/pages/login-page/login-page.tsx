import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { AppRoute, CityName } from '../../const';
import { getRandomCity } from '../../utils';
import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/autorization-status-data/selectors';
import { AuthStatus } from '../../const';
import { updateCity } from '../../store/city-data/city-data';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [activeCity, setActiveCity] = useState<CityName | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current && passwordRef.current.value.trim()) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const checkIsValid = () => {
    const login = loginRef.current?.value;
    const password = passwordRef.current?.value;

    if(!password || !login || /\s/g.test(password)) {
      setIsValid(false);
      return;
    }

    const re = /.*(\p{L}(?=.*\d)|\d(?=.*\p{L})).*/u;

    const isValidForm = re.test(password);
    setIsValid(isValidForm);
  };

  const handleCityClick = (evt: React.MouseEvent) => {
    evt.preventDefault();

    if (activeCity) {
      dispatch(updateCity(activeCity));
      navigate(AppRoute.Main);
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus]);

  useEffect(() => {
    if (loginRef.current?.value && passwordRef.current?.value) {
      checkIsValid();
    }
    setActiveCity(getRandomCity());
  }, []);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Проект 6 городов - логин</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onInput={checkIsValid}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onInput={checkIsValid}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValid}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                onClick={(evt) => {
                  handleCityClick(evt);
                }}
              >
                <span>{activeCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
