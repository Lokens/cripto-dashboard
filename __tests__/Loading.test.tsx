import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/loading';

describe('Loading component', () => {
  it('renders the loading text', () => {
    render(<Loading />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
});
