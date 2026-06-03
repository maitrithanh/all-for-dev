import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import CategoryIndexPage from "@/pages/CategoryIndexPage";
import CategoryPage from "@/pages/CategoryPage";
import CommandDetailPage from "@/pages/CommandDetailPage";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryIndexPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/command/:id" element={<CommandDetailPage />} />
      </Routes>
      <Toaster richColors position="bottom-right" />
    </RootLayout>
  );
};

export default App;
