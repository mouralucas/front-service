import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';

describe('Card Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <Card>
                <Card.Header>Header Content</Card.Header>
                <Card.Body>Body Content</Card.Body>
                <Card.Footer>Footer Content</Card.Footer>
            </Card>
        );
        expect(getByText('Header Content')).toBeInTheDocument();
        expect(getByText('Body Content')).toBeInTheDocument();
        expect(getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies default marginTop class', () => {
        const { container } = render(
            <Card>
                <Card.Body>Body Content</Card.Body>
            </Card>
        );
        expect(container.firstChild).toHaveClass('mt-4');
    });

    it('applies custom marginTop class', () => {
        const { container } = render(
            <Card marginTop="mt-8">
                <Card.Body>Body Content</Card.Body>
            </Card>
        );
        expect(container.firstChild).toHaveClass('mt-8');
    });

    it('renders only subcomponents with matching displayName', () => {
        const { queryByText } = render(
            <Card>
                <Card.Header>Header Content</Card.Header>
                <div>Non-Card Content</div>
                <Card.Body>Body Content</Card.Body>
            </Card>
        );
        expect(queryByText('Header Content')).toBeInTheDocument();
        expect(queryByText('Body Content')).toBeInTheDocument();
        expect(queryByText('Non-Card Content')).not.toBeInTheDocument();
    });

    // it('handles no children gracefully', () => {
    //     const { container } = render(<Card />);
    //     expect(container.firstChild).toBeInTheDocument();
    // });
});