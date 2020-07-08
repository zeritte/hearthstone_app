import {
  FETCH_ALL_MECHANICS,
  FETCH_ALL_MECHANICS_SUCCESS,
  FETCH_ALL_MECHANICS_FAIL,
} from '../actions/types';
import {act} from 'react-test-renderer';

const INITIAL_STATE = {
  mechanicsLoading: false,
  mechanics: [],
  mechanicsError: null,
  cardsByMechanics: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_MECHANICS:
      return {
        ...state,
        mechanicsLoading: true,
        mechanicsError: null,
        mechanics: [],
        cardsByMechanics: [],
      };
    case FETCH_ALL_MECHANICS_SUCCESS:
      return {
        ...state,
        mechanicsLoading: false,
        mechanics: action.payload.mechanics,
        cardsByMechanics: action.payload.cardsByMechanics,
      };
    case FETCH_ALL_MECHANICS_FAIL:
      return {
        ...state,
        mechanicsLoading: false,
        mechanicsError: action.payload,
      };
    default:
      return state;
  }
};
