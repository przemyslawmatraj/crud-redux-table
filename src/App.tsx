import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import UserTable from "./features/userTable/UserTable";
import MainLayout from "./Components/Layout/Layout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<h1>Start</h1>} />
      <Route path="main" element={<UserTable />} />
      <Route path="views" element={<UserTable />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
