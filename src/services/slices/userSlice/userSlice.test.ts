import { expect, test, describe } from '@jest/globals';
import { getUser, loginUser, logoutUser, registerUser, updateUser } from './async';
import {
  initialState,
  userReducer,
} from './userSlice';

describe('Тесты userSlice', () => {
  const fulfilledState = {
    ...initialState,
    isAuth: true,
    error: null,
    user: {
      email: 'YaPracticum@test.com',
      name: 'Ya Practicum'
    }
  };
  const updateData = {
    success: true,
    user: {
      email: 'test@test.com',
      name: 'Ya Practicum'
    }
  };
  const errorMessage = {
    message: 'Something went wrong'
  };
  const responseData = {
    success: true,
    user: {
      email: 'YaPracticum@test.com',
      name: 'Ya Practicum'
    }
  };

  const getNewState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Register User', () => {
    test('registerUser.pending', () => {
      const pendingState = {
        ...initialState,
        error: null,
        isAuth: true
      };

      const action = {
        type: registerUser.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });
    test('registerUser.fulfilled', () => {
      const fulfilledState = {
        ...initialState,
        isAuth: true,
        error: null,
        user: {
          email: 'YaPracticum@test.com',
          name: 'Ya Practicum'
        }
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
    test('registerUser.rejected', () => {
      const rejectedState = {
        ...initialState,
        error: 'Something went wrong'
      };
      const action = {
        type: registerUser.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });
  });
  describe('Sign in', () => {
    test('loginUser.pending', () => {
      const pendingState = {
        ...initialState,
        isAuth: true,
        error: null
      };

      const action = {
        type: loginUser.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });
    test('loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
    test('loginUser.rejected', () => {
      const rejectedState = {
        ...initialState,
        isAuth: false,
        error: 'Something went wrong'
      };
      const action = {
        type: loginUser.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });
  });
  describe('Sign out', () => {
    test('logoutUser.fulfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: undefined
      };

      expect(getNewState(action)).toEqual(initialState);
    });
  });
  describe('Update User Data', () => {
    test('updateUser.pending', () => {
      const pendingState = {
        ...initialState,
        isAuth: true,
        error: null
      };

      const action = {
        type: updateUser.pending.type,
        payload: updateData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });
    test('updateUser.fulfilled', () => {
      const fulfilledState = {
        ...initialState,
        isAuth: true,
        error: null,
        user: {
          email: 'test@test.com',
          name: 'Ya Practicum'
        }
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: updateData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
    test('updateUser.rejected', () => {
      const rejectedState = {
        ...initialState,
        isAuth: false,
        error: 'Something went wrong'
      };
      const action = {
        type: updateUser.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });
  });
  describe('Get User Api', () => {
    test('getUser.pending', () => {
      const pendingState = {
        ...initialState,
        error: null
      };

      const action = {
        type: getUser.pending.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(pendingState);
    });
    test('getUser.fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: responseData
      };

      expect(getNewState(action)).toEqual(fulfilledState);
    });
    test('getUser.rejected', () => {
      const rejectedState = {
        ...initialState,
        isAuth: false,
        error: 'Something went wrong'
      };
      const action = {
        type: getUser.rejected.type,
        error: errorMessage
      };

      expect(getNewState(action)).toEqual(rejectedState);
    });
  });
});
