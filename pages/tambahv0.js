import { useEffect, useState } from "react";
import FieldObatNonRacikan from "../components/fieldObatNonRacikan";
import FieldObatRacikan from "../components/fieldObatRacikan";
import RegularButton from "../components/regularButton";
import defaultForms from "../constants/defaultForms";
import objNonRacikan from "../constants/fieldObj/objNonRacikan";
import objRacikan from "../constants/fieldObj/objRacikan";
import MainLayout from "../layouts/main";
import { v4 as uuidv4 } from 'uuid';

export default function TambahResepV0() {
  const [obatalkes, setObatalkes] = useState([
    {
      "obatalkes_id": 1,
      "obatalkes_nama": "KASSA NON-XRAY 10 CM X 10 CM"
    },
    {
      "obatalkes_id": 2,
      "obatalkes_nama": "POLYSORB 1 CL905"
    },
    {
      "obatalkes_id": 3,
      "obatalkes_nama": "VICRYL PLUS 2-0 VCP317 TAPER"
    }
  ]);
  const [signa, setSigna] = useState([
    {
      "signa_id": 1,
      "signa_nama": "1X SEHARI 0.5 TABLET (MALAM)"
    },
    {
      "signa_id": 2,
      "signa_nama": "1X SEHARI 0.5 TABLET, SEBELUM MAKAN (MALAM)"
    },
    {
      "signa_id": 3,
      "signa_nama": "5X SEHARI 2 KAPSUL"
    }
  ]);
  const [forms, setForms] = useState([
    objNonRacikan, objRacikan
  ]);
  const [fields, setFields] = useState("");

  const removeField = (fieldIndex) => {
    const newForms = forms.filter((field, i) => {
      return i !== fieldIndex;
    });
    setForms([...newForms]);
  }

  const renderObatalkesOption = (fieldIndex, fieldKeyName) => {
    return (
      <select
        className="form-select"
        onChange={(e) => {
          const target = e.target;
          if (target.value !== "") {
            const newForms = [...forms];
            const selectedOption = target.options[target.selectedIndex];

            if (fieldKeyName === "non_racikan") {
              newForms[fieldIndex][fieldKeyName].obatalkes_id = parseInt(selectedOption.value);
              newForms[fieldIndex][fieldKeyName].obatalkes_nama = selectedOption.text;
              setForms([...newForms]);
            }
          }
        }}
      >
        <option value="">-- Pilih Obatalkes --</option>
        {obatalkes.map((oba, idx) => {
          return (
            <option key={idx} value={oba.obatalkes_id}>{oba.obatalkes_nama}</option>
          )
        })}
      </select>
    )
  }

  const renderSignaOption = (fieldIndex, fieldKeyName) => {
    return (
      <select
        className="form-select"
        onChange={(e) => {
          const target = e.target;
          if (target.value !== "") {
            const newForms = [...forms];
            const selectedOption = target.options[target.selectedIndex];

            if (fieldKeyName === "non_racikan") {
              newForms[fieldIndex][fieldKeyName].signa_id = parseInt(selectedOption.value);
              newForms[fieldIndex][fieldKeyName].signa_nama = selectedOption.text;
              setForms([...newForms]);
            }
          }
        }}
      >
        <option value="">-- Pilih Signa --</option>
        {signa.map((sig, idx) => {
          return (
            <option key={idx} value={sig.signa_id}>{sig.signa_nama}</option>
          )
        })}
      </select>
    )
  }

  const renderForms = () => {
    if (forms.length > 0) {
      return (
        forms.map((field, idx) => {
          const fieldKeyName = Object.keys(field)[0];
          // const uniqueKey = idx;
          const uniqueKey = field[fieldKeyName].uuid;
          return (
            <>
              <div className="d-flex">
                <h4 style={{ marginRight: "10px" }}>{`#${uniqueKey}`}</h4>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeField(uniqueKey);
                    setFields(renderForms());
                  }}
                >
                  Hapus
                </button>
              </div>
              {
                fieldKeyName === "non_racikan"
                  ?
                  <FieldObatNonRacikan
                    key={uniqueKey}
                    index={uniqueKey}
                    forms={forms}
                    setForms={setForms}
                    obatalkes={
                      renderObatalkesOption(uniqueKey, fieldKeyName)
                    }
                    signa={
                      renderSignaOption(uniqueKey, fieldKeyName)
                    }
                  />
                  :
                  <FieldObatRacikan
                    key={uniqueKey}
                    index={uniqueKey}
                    forms={forms}
                    setForms={setForms}
                    obatalkes={
                      renderObatalkesOption(uniqueKey, fieldKeyName)
                    }
                    signa={
                      renderSignaOption(uniqueKey, fieldKeyName)
                    }
                  />
              }
            </>
          )
        })
      )
    } else {
      return "";
    }
  }

  useEffect(() => {
    setFields(renderForms());
  }, []);

  return (
    <MainLayout
      title="Tambah Resep"
      content={
        <div className="container">
          <div className="row">
            <div className="col-md">
              <form>
                <div className="row">
                  <div className="col">
                    <p>Kode: <span>RES0000001</span></p>
                  </div>
                </div>
                {fields}
                <div className="row mb-3">
                  <div className="col-md">
                    <RegularButton
                      buttonName="+ Tambah Obat Racikan"
                      onClick={() => {
                        const newObj = objRacikan;
                        newObj.uuid = uuidv4();
                        setForms([...forms, {
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
                        }]);
                        setFields(renderForms());
                      }}
                    />
                    <RegularButton
                      buttonName="+ Tambah Obat Non-Racikan"
                      onClick={() => {
                        setForms([...forms, {
                          "non_racikan": {
                            "uuid": uuidv4(),
                            "obatalkes_id": 0,
                            "obatalkes_nama": "",
                            "signa_id": 0,
                            "signa_nama": "",
                            "qty": 0
                          }
                        }]);
                        setFields(renderForms());
                      }}
                    />
                    <RegularButton
                      buttonName="Order"
                      onClick={() => {
                        console.log(forms);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    />
  )
}