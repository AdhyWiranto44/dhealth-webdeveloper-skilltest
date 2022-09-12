import { v4 as uuidv4 } from 'uuid';

export const objNonRacikan = {
  "non_racikan": {
    "uuid": uuidv4(),
    "obatalkes_id": 0,
    "obatalkes_nama": "",
    "signa_id": 0,
    "signa_nama": "",
    "qty": 0
  }
}

export const getObjNonRacikan = () => {
  objNonRacikan.non_racikan.uuid = uuidv4();
  return objNonRacikan;
}