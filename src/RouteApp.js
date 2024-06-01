import { useRoutes } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

const RouteApp = () => {
  let routes = useRoutes([
    { path: "/", element: <ListEmployeeComponent /> },
    { path: "/employee", element: <ListEmployeeComponent /> },
    { path: "/add-employee/_add", element: < CreateEmployeeComponent/>},
    { path: "/view-employee/:id", element: <ViewEmployeeComponent /> },
  ]);
  return routes;
};

export default RouteApp;