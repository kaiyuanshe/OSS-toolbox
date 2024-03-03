import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { API_Host } from '../models/Base';
import { i18n } from '../models/Translation';
import { MainRoutes } from './data';

const { t } = i18n,
  LanguageMenu = dynamic(import('./LanguageMenu'), { ssr: false });

export const MainNavigator: FC = observer(() => (
  <Navbar bg="primary" variant="dark" fixed="top" expand="lg" collapseOnSelect>
    <Container>
      <Navbar.Brand href="/">{t('open_source_treasure_box')}</Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-inner" />

      <Navbar.Collapse id="navbar-inner">
        <Nav className="me-auto">
          {MainRoutes().map(({ title, path, subs }) =>
            path ? (
              <Nav.Link
                key={title}
                className="text-nowrap text-center"
                href={path}
                target={
                  new URL(path, API_Host).origin !== API_Host ? '_blank' : ''
                }
              >
                {title}
              </Nav.Link>
            ) : (
              <NavDropdown key={title} title={title} className="text-center">
                {subs?.map(({ title, path }) => (
                  <NavDropdown.Item
                    key={title}
                    href={path}
                    className="text-center text-xxl-start"
                  >
                    {title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ),
          )}
        </Nav>

        <LanguageMenu />
      </Navbar.Collapse>
    </Container>
  </Navbar>
));
