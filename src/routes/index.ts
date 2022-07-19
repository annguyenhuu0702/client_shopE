import { DefaultLayout } from "../layouts";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import { typeRoute } from "../types/route";


export const publicRoute : typeRoute[] = [
  {
    path: "/",
    element: HomePage,
    layout: DefaultLayout
  },
  {
    path: "/register",
    element: Register,
    layout: DefaultLayout
  },
]



