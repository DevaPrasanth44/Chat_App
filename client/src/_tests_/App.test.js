import { render } from '@testing-library/react';
import App from './App';

// Mock Chat component
jest.mock('./Chat', () => () => <div>Chat Component</div>);

test('App renders Chat component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Chat Component')).toBeInTheDocument();  // ✅ now works
});
