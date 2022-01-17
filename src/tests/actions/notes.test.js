/**
 * @jest-environment node
 */
 import * as fs from 'fs';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import thunk from "redux-thunk"; 
import configureStore from 'redux-mock-store';
import { db } from "../../firebase/firebase-config";
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';


jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn()
}))


// para testear acciones asincronas necesito crear un mock store
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {
    uid: 'testId'
  },
  notes: {
    active: {
      id: 'NN1YSeMAr35mkoePjFrP',
      title: 'Hola',
      body: 'Mundo'
    }
  }
}
let store = mockStore( initialState );

describe('Tests on actions notes', () => {

  beforeEach( () => {
    store = mockStore( initialState )
  });

  
  test('should create a new note startNewNote', async () => {
    await store.dispatch( startNewNote() );

    const actions  = store.getActions();
    
    expect( actions[0] ).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    expect( actions[1] ).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    // borrar el registro de la base de datos para que no se llene de notes
    const docId = actions[0].payload.id;

    const noteRef = doc( db, `testId/journal/notes/${docId}` );
    await deleteDoc( noteRef );

  });


  test('startLoadingNotes should load the notes', async () => {
    
    await store.dispatch( startLoadingNotes('testId') );
    const actions = store.getActions();

    // console.log(actions);
    expect( actions[0] ).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String ),
      date: expect.any(Number)
    };
    
    expect( actions[0].payload[0] ).toMatchObject( expected );

  });
  
  
  test('startSaveNote should update the note', async() => {
    
    const note = {
      id: 'NN1YSeMAr35mkoePjFrP',
      title: 'updatedTitleTesting',
      body: 'updatedBodyTesting'
    };

    await store.dispatch( startSaveNote( note ) );

    const actions = store.getActions();

    expect( actions[0].type ).toBe( types.notesUpdate );

    const docRef = doc( db, `testId/journal/notes/${note.id}` );
    const docRecived = await getDoc( docRef )
    expect( docRecived.data().title ).toBe( note.title );
  });
  

  test('startUploading should update entry url', async () => {
    
    fileUpload.mockReturnValue('https://hola-mundo.com');
    fs.writeFileSync('foto.jpg', '');

    const file = fs.readFileSync('foto.jpg');
    await store.dispatch(startUploading(file));

    const docRef = doc( db, 'testId/journal/notes/NN1YSeMAr35mkoePjFrP' );
    const docRecived = await getDoc( docRef );
    
    expect(docRecived.data().url).toBe('https://hola-mundo.com');
  });
  
});
