import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { publicRoute, privateRoute } from './routes';
import { route } from './types/route';
import jwtDecoded from 'jwt-decode';
import React, { Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import { authActions } from './redux/slice/authSlice';
import { authApi } from './apis/authApi';
import { authState, authSelector } from './redux/slice/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);

  useEffect(() => {
    try {
      const getProfile = async () => {
        const data = await authApi.getProfile(user.accessToken, dispatch);
        dispatch(authActions.getProfile(data.data.data));
      };
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, user.accessToken]);

  const showPrivateRoter = () => {
    try {
      return (
        user.accessToken &&
        (jwtDecoded(user.accessToken) as any).roleId === 2 &&
        showRoutes(privateRoute)
      );
    } catch (error) {
      console.log(error);
      return <></>;
    }
  };

  function showRoutes(routes: route[]): React.ReactElement {
    return (
      <React.Fragment>
        {routes.map((route: route, index: number): React.ReactElement => {
          let Layout = route.layout || React.Fragment;
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
