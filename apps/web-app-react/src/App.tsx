import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsPage from "./pages/jobs/jobs-page.tsx";
import AddJobPage from "./pages/add-job/AddJobPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<JobsPage />} path="/" />
                <Route element={<AddJobPage />} path="/add" />
                {/*
<Route element={<Track />} path="/track/:trackId" />
                    */}
            </Routes>
        </BrowserRouter>
    );
}
