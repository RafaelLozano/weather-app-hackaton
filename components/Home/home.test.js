import Home from './Home';
import { render, screen } from '@testing-library/react';
it('renders without crashing', () => {
  render(<Home />);
});
