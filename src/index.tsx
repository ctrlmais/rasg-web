import { createRoot } from 'react-dom/client';

import { App } from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'styles/global.scss';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(<App />);

serviceWorkerRegistration.register();

reportWebVitals();
