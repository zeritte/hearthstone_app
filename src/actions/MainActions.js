import {
  FETCH_ALL_MECHANICS,
  FETCH_ALL_MECHANICS_SUCCESS,
  FETCH_ALL_MECHANICS_FAIL,
} from './types';
import axios from 'axios';
import {BASE_URL, headers} from '../constants';

export const fetchAllMechanics = () => async dispatch => {
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
