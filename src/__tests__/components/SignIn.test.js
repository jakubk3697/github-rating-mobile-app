import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../views/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockFormik = {
        handleChange: jest.fn(),
        handleSubmit: jest.fn(),
        values: { username: '', password: '' },
        errors: {},
        touched: {},
      };

      const onSubmit = jest.fn();
      render(<SignInContainer formik={mockFormik} onSubmit={onSubmit} isBothFilled={false} />);

      fireEvent.changeText(screen.getByTestId('username'), 'testuser');
      fireEvent.changeText(screen.getByTestId('password'), 'password123');
      fireEvent.press(screen.getByTestId('signIn'));

      await waitFor(() => {
        expect(mockFormik.handleChange).toHaveBeenCalledWith('username');
        expect(mockFormik.handleChange).toHaveBeenCalledWith('password');
        expect(mockFormik.handleSubmit).toHaveBeenCalled();
      });
    });
  });
});