import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import Index from "./pages/home";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Index />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
