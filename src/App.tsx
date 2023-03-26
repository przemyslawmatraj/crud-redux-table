import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Components/Layout/Layout";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Views from "./pages/Views";
import { ConfigProvider as AntdProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";
import enUS from "antd/es/locale/en_US";
import { useAppSelector } from "./app/hooks";
import { selectCurrentLanguage } from "./features/internationalization/internationalizationSlice";
import { IntlProvider } from "react-intl";

const antdLocales = {
  plPL,
  enUS,
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Navigate to="main" />} />
      <Route path="main" element={<Main />} />
      <Route path="views" element={<Views />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const language = useAppSelector(selectCurrentLanguage);

  return (
    <IntlProvider
      locale={language.locale.slice(0, 2)}
      messages={language.messages}
      defaultLocale="en"
    >
      <AntdProvider locale={antdLocales[language.locale]}>
        <RouterProvider router={router} />
      </AntdProvider>
    </IntlProvider>
  );
}

export default App;
