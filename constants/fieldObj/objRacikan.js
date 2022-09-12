import { v4 as uuidv4 } from 'uuid';

const objRacikan = {
  "racikan": {
    "uuid": uuidv4(),
    "nama_racikan": "",
    "obatalkes": [
      {
        "obatalkes_nama": "",
        "obatalkes_id": 0,
        "signa_nama": "",
        "signa_kode": 0,
        "qty": 0
      },
    ]
  }
}

const getObjRacikan = () => {
  objRacikan.racikan.uuid = uuidv4();
  return objRacikan;
}

module.exports = { getObjRacikan };
export default objRacikan;