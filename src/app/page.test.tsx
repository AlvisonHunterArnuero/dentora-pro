import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    const imageSrc = typeof src === 'string' ? src : src?.src || '';

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageSrc} alt={alt} {...rest} />;
  }
}));

vi.mock('../app/components/Forms/FormsWrapper', () => ({
  default: () => (
    <div data-testid="forms-wrapper-mock">Mocked Forms Wrapper</div>
  )
}));

describe('Feature Tour: Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the main login screen image', () => {
    const loginImage = screen.getByAltText('Dentora Pro Logon Screen');
    expect(loginImage).toBeInTheDocument();
    expect(loginImage).toHaveAttribute('src', '/dentora-pro-login-screen.png');
  });

  it('renders the FormsWrapper component', () => {
    const formsWrapper = screen.getByTestId('forms-wrapper-mock');
    expect(formsWrapper).toBeInTheDocument();
    expect(formsWrapper).toHaveTextContent('Mocked Forms Wrapper');
  });

  it('displays the current year in the copyright notice', () => {
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(
      new RegExp(`Copyright © ${currentYear} Dentora Pro.`, 'i')
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
