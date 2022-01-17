import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);


describe('Tests on LoginScreen component', () => {
  
  beforeEach( () => {
    store = mockStore( initialState );
    jest.clearAllMocks();
  });


  test('should show correctly', () => {

    expect( wrapper ).toMatchSnapshot();

  });


  test('should startGoogleLogin', () => {
    
    wrapper.find('.google-btn').prop('onClick')();

    expect( startGoogleLogin ).toHaveBeenCalled();
    
  });


  test('should startLogin with the arguments', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( startLoginEmailPassword ).toHaveBeenCalledWith('', '');
    
  });
  
  

});
