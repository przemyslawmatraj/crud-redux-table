import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import UserTable from "./features/userTable/UserTable";
import MainLayout from "./Components/Layout/Layout";
import NotFound from "./pages/NotFound";

import { ConfigProvider as AntdProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";
import enUS from "antd/es/locale/en_US";
import { useAppSelector } from "./app/hooks";
import { selectCurrentLanguage } from "./features/internationalization/internationalizationSlice";

const locales = {
  plPL,
  enUS,
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Navigate to="main" />} />
      <Route path="main" element={<UserTable />} />
      <Route path="views" element={<UserTable />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const language = useAppSelector(selectCurrentLanguage);

  return (
    <AntdProvider locale={locales[language.locale]}>
      <RouterProvider router={router} />
    </AntdProvider>
  );
}

export default App;
