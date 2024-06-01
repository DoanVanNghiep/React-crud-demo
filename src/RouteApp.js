import { useRoutes } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";

const RouteApp = () => {
  let routes = useRoutes([
    { path: "/", element: <ListEmployeeComponent /> },
    { path: "/employee", element: <ListEmployeeComponent /> },
    { path: "/view-employee/:id", element: <ListEmployeeComponent /> },
  ]);
  return routes;
};

export default RouteApp;