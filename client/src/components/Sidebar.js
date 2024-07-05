import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Socios from './Socios';
import SociosAgregar from './SociosAgregar';
import SocioOnly from './SocioOnly';
import PersonaOnly from './PersonaOnly';
import Login from './Login';
import './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>SitrashAngular</title>
          <base href="/" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />E
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link rel="stylesheet" href="css/style.css" />
        </head>
        <body>
          <nav className="main-menu">
            <ul>
              <li>
                <Link to="/">
                  <i className="fa fa-home fa-2x"></i>
                  <span className="nav-text">Menu</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/socios">
                  <i className="fa fa-users fa-2x"></i>
                  <span className="nav-text">Socios</span>
                </Link>
              </li>
              <li className="has-subnav">
              <Link to="/socioOnly">
                  <i className="fa fa-truck fa-2x"></i>
                  <span className="nav-text">Socios Datos</span>
              </Link>
              </li>
              <li className="has-subnav">
                <Link to="/personaOnly">
                  <i className="fa fa-user fa-2x"></i>
                  <span className="nav-text">Persona Datos</span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/empresa">
                  <i className="fa fa-building fa-2x"></i>
                  <span className="nav-text">Empresas</span>
                </Link>
              </li>
                <ul className="logout">
                  <li>
                    <a href="#">
                      <i className="fa fa-power-off fa-2x"></i>
                      <span className="nav-text">Logout</span>
                    </a>
                  </li>
                </ul>
            </ul>
          </nav>
          <div id="app-root"></div>
        </body>
      </html>
    )
  }
}
