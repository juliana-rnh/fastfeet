import React, { useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Account } from './styles';

import logo from '~/assets/fastfeet-logo.png';

function Header() {
  const userRef = useRef();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin.profile.name);

  function out() {
    userRef.current.innerText = 'logout';
  }

  function stay() {
    userRef.current.innerText = admin;
  }

  function logout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />

        <nav>
          <NavLink
            strict
            to="/dashboard/packages"
            activeStyle={{
              color: 'black',
            }}
          >
            ENCOMENDAS
          </NavLink>
          <NavLink
            strict
            to="/dashboard/deliveries"
            activeStyle={{
              color: 'black',
            }}
          >
            ENTREGADORES
          </NavLink>
          <NavLink
            strict
            to="/dashboard/recipients"
            activeStyle={{
              color: 'black',
            }}
          >
            DESTINATÁRIOS
          </NavLink>
          <NavLink
            strict
            to="/dashboard/problems"
            activeStyle={{
              color: 'black',
            }}
          >
            PROBLEMAS
          </NavLink>
        </nav>

        <Account>
          <strong ref={userRef}>{admin}</strong>
          <button
            type="button"
            onClick={logout}
            onMouseEnter={out}
            onMouseLeave={stay}
          >
            Sair do sistema
          </button>
        </Account>
      </Content>
    </Container>
  );
}

export default memo(Header);
