import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from '../../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}

let store = mockStore( initialState );

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Tests on RegisterScreen component', () => {
  
  // beforeEach( () => {
  //   store = mockStore( initialState );
  //   jest.clearAllMocks();
  // });

  test('should show correctly', () => {

    expect( wrapper ).toMatchSnapshot();

  });
  

  test('should asd', () => {
    
    const emailField = wrapper.find('input[name="email"]'); // seleccion por name

    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    const actions = store.getActions();
    
    expect( actions[0] ).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid'
    });
  });
  

  test('should show error box', () => {
    
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email incorrecto'
      }
    }
    
    const store = mockStore( initialState );
    
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    
    expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
    expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initialState.ui.msgError );

  });
  

});
