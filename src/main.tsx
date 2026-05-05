import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router, Route, Switch } from 'wouter';
import { App } from './App';
import { NotFound } from './NotFound';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </StrictMode>
);
