import {
  FETCH_ALL_MECHANICS,
  FETCH_ALL_MECHANICS_SUCCESS,
  FETCH_ALL_MECHANICS_FAIL,
  SEARCH_CARD,
  SEARCH_CARD_SUCCESS,
  SEARCH_CARD_FAIL,
  SET_LATEST_SEARCHED_TEXT,
  SET_SEARCH_TEXT_TO_NULL,
} from './types';
import axios from 'axios';
import {BASE_URL, headers, searchHeaders} from '../constants';

export const fetchAllCards = () => async dispatch => {
  dispatch({type: FETCH_ALL_MECHANICS});
  try {
    const {data: rawData} = await axios.get(BASE_URL + 'cards', {headers});
    const mechanics = [];
    const cardsByMechanics = [];
    let mechanicIndex = 0;
    for (const property in rawData) {
      for (let i = 0; i < rawData[property].length; i++) {
        if (
          rawData[property][i].mechanics &&
          Array.isArray(rawData[property][i].mechanics)
        ) {
          for (let j = 0; j < rawData[property][i].mechanics.length; j++) {
            const filterOld = mechanics.filter(
              e => e.name === rawData[property][i].mechanics[j].name,
            );
            if (filterOld.length === 0) {
              mechanics.push({
                id: mechanicIndex,
                name: rawData[property][i].mechanics[j].name,
              });
              cardsByMechanics.push({
                mechanicId: mechanicIndex,
                ...rawData[property][i],
              });
              mechanicIndex++;
            } else {
              const alreadyAddedId = filterOld[0]['id'];
              cardsByMechanics.push({
                mechanicId: alreadyAddedId,
                ...rawData[property][i],
              });
            }
          }
        }
      }
    }
    dispatch({
      type: FETCH_ALL_MECHANICS_SUCCESS,
      payload: {mechanics, cardsByMechanics},
    });
  } catch (e) {
    dispatch({
      type: FETCH_ALL_MECHANICS_FAIL,
      payload: 'Failed to get mechanics',
    });
  }
};

export const searchByCardName = name => async (dispatch, getState) => {
  dispatch({type: SEARCH_CARD});
  try {
    dispatch({type: SET_LATEST_SEARCHED_TEXT, payload: name});
    const {data} = await axios.get(BASE_URL + 'cards/search/' + name, {
      headers: searchHeaders,
    });
    const {latestSearchText} = getState().main;
    if (latestSearchText === name) {
      dispatch({type: SEARCH_CARD_SUCCESS, payload: {data, text: name}});
    }
  } catch (e) {
    dispatch({
      type: SEARCH_CARD_FAIL,
      payload: 'No results',
    });
  }
};

export const setSearchTextToNull = () => dispatch =>
  dispatch({type: SET_SEARCH_TEXT_TO_NULL});
