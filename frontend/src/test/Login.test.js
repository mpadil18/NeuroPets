import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App.js';


test('renders login page', async () => {
    render(<App/>);
    const loginButton = screen.getByText(/Log In/i);
    expect(loginButton).toBeInTheDocument();
});

test('enter a valid email but an incorrect password', async () => {
    render(<App/>)
    const usernameField = screen.getByPlaceholderText('Username');
    expect(usernameField).toBeDefined();
    userEvent.type(usernameField, "ritz@gmail.com");
    const passwordField = screen.getByPlaceholderText('Password');
    expect(passwordField).toBeDefined();
    userEvent.type(passwordField, "wrongpassword");
    const loginButton = screen.getByText(/Log In/i);
    act(() => {
        fireEvent.click(loginButton);
    });
    const errorMessage = screen.findByTestId('Error Message');
    expect(errorMessage).toBeDefined();
});

test('enter an invalid email', async () => {
    render(<App/>)
    const usernameField = screen.getByPlaceholderText('Username');
    expect(usernameField).toBeDefined();
    userEvent.type(usernameField, "fakeemail@gmail.com");
    const passwordField = screen.getByPlaceholderText('Password');
    expect(passwordField).toBeDefined();
    userEvent.type(passwordField, "password");
    const loginButton = screen.getByText(/Log In/i);
    act(() => {
        fireEvent.click(loginButton);
    });
    const errorMessage = screen.findByTestId('Error Message');
    expect(errorMessage).toBeDefined();
});

test('valid user', async () => {
    render(<App/>)
    const usernameField = screen.getByPlaceholderText('Username');
    expect(usernameField).toBeDefined();
    userEvent.type(usernameField, 'ritz@gmail.com');
    const passwordField = screen.getByPlaceholderText('Password');
    expect(passwordField).toBeDefined();
    userEvent.type(passwordField, '123456');
    const loginButton = screen.getByText(/Log In/i);
    act(() => {
        fireEvent.click(loginButton);
    });
    //const errorMessage = screen.findByTestId('Error Message');
    //expect(errorMessage).toBeDefined();
});
