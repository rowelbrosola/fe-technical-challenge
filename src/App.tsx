import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GrandmasterList } from "./components/GrandmasterList";
import { PlayerProfilePage } from "./components/PlayerProfile";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<GrandmasterList />} />
            <Route path="/player/:username" element={<PlayerProfilePage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
