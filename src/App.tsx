import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { publicRoute, privateRoute } from './routes';
import { typeRoute } from './types/route';
import jwtDecoded from 'jwt-decode';
import React, { Suspense } from 'react';
import { Spin } from 'antd';

const App = () => {
  const token: string = useSelector(
    (state: any) => state.auth.currentUser?.data.access_token
  );

  const showPrivateRoter = () => {
    try {
      return (
        token &&
        (jwtDecoded(token) as any).role === 'admin' &&
        showRoutes(privateRoute)
      );
    } catch (error) {
      console.log(error);
      return <></>;
    }
  };

  function showRoutes(routes: typeRoute[]): React.ReactElement {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        >
          <Spin />
        </div>
      }
    >
      <div className="App">
        <Routes>
          {showPrivateRoter()}
          {showRoutes(publicRoute)}
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
