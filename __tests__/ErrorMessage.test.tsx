import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/error';

describe('ErrorMessage', () => {
  it('renderiza a mensagem padrão quando nenhuma é fornecida', () => {
    render(<ErrorMessage />);
    expect(screen.getByText('Erro ao carregar dados.')).toBeInTheDocument();
  });

  it('renderiza a mensagem customizada quando fornecida', () => {
    const customMessage = 'Algo deu errado!';
    render(<ErrorMessage message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
