import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';


jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn()
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn()
}));


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {
    uid: '1',
    name: 'mauro'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: []
}
} 

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);


describe('Tests on Sidebar component', () => {
  
  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('should call startLogout', () => {
    wrapper.find('button').simulate('click', {});
    expect( startLogout ).toHaveBeenCalled();
  });

  test('should call startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click', {});
    expect( startNewNote ).toHaveBeenCalled();
  });

});
