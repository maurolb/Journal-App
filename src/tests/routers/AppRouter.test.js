import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { AppRouter } from "../../routers/AppRouter";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { login } from "../../actions/auth";
import { act } from "react-dom/test-utils";
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock("../../actions/auth", () => ({
  login: jest.fn()
}));

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
        id: 'ABC'
    },
    notes: []
}
}

let store = mockStore( initialState );
store.dispatch = jest.fn();


describe('Tests on AppRouter component', () => {
  
  test('should call login if is authenticated', async () => {
    
    let user;

    await act( async () => {

      const auth = getAuth();
      const userCred = await signInWithEmailAndPassword( auth, 'test@testing.com', 'asd123' )
      user = userCred.user
      
      const wrapper = mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );

    })

    expect( login ).toHaveBeenCalledWith('2CWsF6CRjgNkdsFRjXbs9f8RiRH3', null);

  })
  

});
