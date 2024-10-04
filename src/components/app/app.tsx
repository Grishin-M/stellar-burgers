import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import { useDispatch } from '../../services/store';
import { ProtectRouter } from '../../components/protect/ProtectRouter';
import { getUser } from '../../../src/services/slices/userSlice/async';
import { getIngredients } from '../../../src/services/slices/ingredientsSlice/async';

const App = () => {
  const location = useLocation();
  const bgLocation = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={bgLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectRouter onlyUnAuth>
              <Login />
            </ProtectRouter>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectRouter onlyUnAuth>
              <Register />
            </ProtectRouter>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectRouter onlyUnAuth>
              <ForgotPassword />
            </ProtectRouter>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectRouter onlyUnAuth>
              <ResetPassword />
            </ProtectRouter>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectRouter>
              <Profile />
            </ProtectRouter>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectRouter>
              <ProfileOrders />
            </ProtectRouter>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectRouter>
              <OrderInfo />
            </ProtectRouter>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {bgLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Индификатор заказа'
                onClose={() => navigate(bgLocation)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectRouter>
                <Modal
                  title='Детали заказа'
                  onClose={() => navigate(bgLocation)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectRouter>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
