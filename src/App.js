import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Profile, Login, Product, ProductTable } from "./pages";
import { DefaultLayout } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><Dashboard></Dashboard></DefaultLayout>}/>
        <Route path="/profile" element={<DefaultLayout><Profile></Profile></DefaultLayout>}/>
        <Route path="/product" element={<DefaultLayout><Product></Product></DefaultLayout>}/>
        <Route path="/product-table" element={<DefaultLayout><ProductTable></ProductTable></DefaultLayout>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
