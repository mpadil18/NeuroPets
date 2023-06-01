import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateGoal from '../Registration/RegPage.js';
import RegPage from '../Registration/RegPage.js';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

describe('Registration tests', () => {
    it('Visible Create Account Heading', () => {
    render(
    <BrowserRouter>
        <Routes>
            <Route path = "*" element = {<RegPage/>} />
        </Routes>
    </BrowserRouter>);
        const heading = screen.getByText(/Create Account/i);
        expect(heading).toBeInTheDocument()
    });
    it('Clickable Create Account Button', () => {
        render(
        <BrowserRouter>
            <Routes>
                <Route path = "*" element = {<RegPage/>} />
            </Routes>
        </BrowserRouter>);
        const button = screen.getByRole('button', {name: 'Register'});
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(button).toBeTruthy();
    });
    it('Visible Username Area', () => {
        render(
        <BrowserRouter>
            <Routes>
                <Route path = "*" element = {<RegPage/>} />
            </Routes>
        </BrowserRouter>);
        const boxes = screen.getByPlaceholderText('Email')
        expect(boxes).toBeInTheDocument();
    });
    it('Visible Password Area', () => {
        render(
        <BrowserRouter>
            <Routes>
                <Route path = "*" element = {<RegPage/>} />
            </Routes>
        </BrowserRouter>);
        const boxes = screen.getByPlaceholderText('Password')
        expect(boxes).toBeInTheDocument();
    });
    it('Visible Confirm Area', () => {
        render(
        <BrowserRouter>
            <Routes>
                <Route path = "*" element = {<RegPage/>} />
            </Routes>
        </BrowserRouter>);
        const boxes = screen.getByPlaceholderText('Confirm Password')
        expect(boxes).toBeInTheDocument();
    });
});