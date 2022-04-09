import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

afterEach(cleanup);

test('Header shows as "Hello World!" when rendered', () => {
    const {getByText} = render(<App />);

    expect(getByText('Hello World!')).toBeInTheDocument()
});