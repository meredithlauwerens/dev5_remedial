import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/map"
                    element={<MapPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;