import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateGoal from '../CreateGoal/CreateGoal.js';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

describe('Create Goal tests', () => {
    it('Visible Create Goal Heading', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<CreateGoal/>} />
                </Routes>
            </BrowserRouter>);
        const heading = screen.getByText(/Create Goal/i);
        expect(heading).toBeInTheDocument()
    });
    it('Visible Preset Goal Heading', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<CreateGoal/>} />
                </Routes>
            </BrowserRouter>);
        const heading = screen.getByText(/Preset Goal/i);
        expect(heading).toBeInTheDocument()
    });
    it('Clickable Create Goal Button', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<CreateGoal/>} />
                </Routes>
            </BrowserRouter>);
        const button = screen.getByRole('button', {name: 'Continue'});
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(button).toBeTruthy();
    });
    it('Visible Text Area', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<CreateGoal/>} />
                </Routes>
            </BrowserRouter>);
        const boxes = screen.getByRole('textbox', {name:""})
        expect(boxes).toBeInTheDocument();
    });
    it('Clickable Preset Goal Buttons', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<CreateGoal/>} />
                </Routes>
            </BrowserRouter>);
        const button1 = screen.getByRole('button', {name: 'Eat Healthier'});
        expect(button1).toBeInTheDocument();
        fireEvent.click(button1)
        expect(button1).toBeTruthy();

        const button2 = screen.getByRole('button', {name: 'Be More Active'});
        expect(button2).toBeInTheDocument();
        fireEvent.click(button2)
        expect(button2).toBeTruthy();

        const button3 = screen.getByRole('button', {name: 'Improve Mental Health'});
        expect(button3).toBeInTheDocument();
        fireEvent.click(button3)
        expect(button3).toBeTruthy();

        const button4 = screen.getByRole('button', {name: 'Focus on Relationships'});
        expect(button4).toBeInTheDocument();
        fireEvent.click(button4)
        expect(button4).toBeTruthy();

        const button5 = screen.getByRole('button', {name: 'Dedicate Time to a Hobby'});
        expect(button5).toBeInTheDocument();
        fireEvent.click(button5)
        expect(button5).toBeTruthy();

        const button6 = screen.getByRole('button', {name: 'Learn an Instrument'});
        expect(button6).toBeInTheDocument();
        fireEvent.click(button6)
        expect(button6).toBeTruthy();

        const button7 = screen.getByRole('button', {name: 'Be More Tidy'});
        expect(button7).toBeInTheDocument();
        fireEvent.click(button7)
        expect(button7).toBeTruthy();
    });
});