import {
  FETCH_ALL_MECHANICS,
  FETCH_ALL_MECHANICS_SUCCESS,
  FETCH_ALL_MECHANICS_FAIL,
  SEARCH_CARD,
  SEARCH_CARD_SUCCESS,
  SEARCH_CARD_FAIL,
  SET_LATEST_SEARCHED_TEXT,
  SET_SEARCH_TO_NULL,
} from '../actions/types';

const INITIAL_STATE = {
  mechanicsLoading: false,
  mechanics: [],
  mechanicsError: null,
  cardsByMechanics: [],
  searchLoading: false,
  searchResults: [],
  searchText: null,
  searchError: null,
  latestSearchText: null,
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
    case SEARCH_CARD:
      return {
        ...state,
        searchLoading: true,
        searchError: null,
        searchResults: [],
      };
    case SEARCH_CARD_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.data,
        searchLoading: false,
        searchText: action.payload.text,
      };
    case SEARCH_CARD_FAIL:
      return {...state, searchLoading: false, searchError: action.payload};
    case SET_LATEST_SEARCHED_TEXT:
      return {...state, latestSearchText: action.payload};
    case SET_SEARCH_TO_NULL:
      return {
        ...state,
        searchText: null,
        latestSearchText: null,
        searchResults: [],
        searchError: null,
      };
    default:
      return state;
  }
};
