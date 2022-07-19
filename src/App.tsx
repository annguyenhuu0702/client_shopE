import { Routes, Route } from 'react-router-dom';
import { publicRoute } from './routes';
import { typeRoute } from './types/route';

const App = () => {
  function showRoutes(routes: typeRoute[]): React.ReactElement {
    return (
      <Routes>
        {routes.map((route: typeRoute, index: number): React.ReactElement => {
          let Layout = route.layout;
          const Page = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    );
  }
  return <div className="App">{showRoutes(publicRoute)}</div>;
};

export default App;
