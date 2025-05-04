// App.test.js
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Hacer mock de la API de Google Login de '@react-oauth/google'
jest.mock('@react-oauth/google', () => {
    return {
        GoogleLogin: ({ onSuccess, onError }) => {
            // Simulamos el comportamiento del botón de Google Login
            const simulateLogin = () => {
                const mockResponse = { profileObj: { name: 'Valeria', password: 'luke' } };
                onSuccess(mockResponse); // Llamamos a onSuccess con una respuesta simulada
            };

            return (
                <button onClick={simulateLogin}>
                    Login with Google
                </button>
            );
        }
    };
});

test('debe renderizar correctamente el botón de Google Login y simular el login a través del pop-up', async () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    // Verificar que el botón de Google Login está presente en el documento
    const loginButton = screen.getByText(/Login with Google/i);
    expect(loginButton).toBeInTheDocument();

    // Simulamos el clic en el botón de login, lo que abriría el pop-up
    fireEvent.click(loginButton);

    // Verificamos que la respuesta de éxito del pop-up haya sido manejada correctamente
    await waitFor(() => {
        const userName = screen.getByText(/Valeria/i); // Verificar que el nombre del usuario se muestra
        expect(userName).toBeInTheDocument();
    });
});

test('debe mostrar el enlace "¿Cómo Jugar?" en la página principal', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    const comoJugarLink = screen.getByText(/¿Cómo Jugar\?/i);
    expect(comoJugarLink).toBeInTheDocument();
    expect(comoJugarLink.closest('a')).toHaveAttribute('href', '/comojugar');
});

test('debe renderizar correctamente la tabla de ranking', async () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    const rankingHeader = screen.getByText(/Ranking/i);
    const usuarioHeader = screen.getByText(/Usuario/i);
    const ticketsHeader = screen.getByText(/Tickets/i);

    expect(rankingHeader).toBeInTheDocument();
    expect(usuarioHeader).toBeInTheDocument();
    expect(ticketsHeader).toBeInTheDocument();
});

test('debe abrir el pop-up al hacer clic en una casilla libre', async () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    // Depurar el DOM renderizado
    screen.debug();

    // Ajustar el selector según el contenido renderizado
    const casilla = screen.getByRole('button', { name: /casilla/i }); // Ajustar si es necesario
    fireEvent.click(casilla);

    // Verificar que el pop-up se abre
    await waitFor(() => {
        const popup = screen.getByText(/Responder Pregunta/i); // Ajustar según el contenido del pop-up
        expect(popup).toBeInTheDocument();
    });
});