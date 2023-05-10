import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateGoal from '../CreateGoal/CreateGoal.js';

describe('Create Goal tests', () => {
    it('Visible Create Goal Heading', () => {
    render(<CreateGoal />);
        const heading = screen.getByText(/Create Goal/i);
        expect(heading).toBeInTheDocument()
    });
    it('Clickable Create Goal Button', () => {
    render(<CreateGoal />);
        const button = screen.getByRole('button', {name: 'Save Goal'});
        expect(button).toBeInTheDocument();

        fireEvent.click(button)
        expect(button).toBeTruthy();
    });
    it('Visible Text Area', () => {
        render(<CreateGoal />);
        const boxes = screen.getByRole('textbox', {name:""})
        expect(boxes).toBeInTheDocument();
    });
});