import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/encode-sans-expanded';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Supports weights 200-900
import '@fontsource-variable/cairo';

import { register } from 'swiper/element/bundle';
register();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
