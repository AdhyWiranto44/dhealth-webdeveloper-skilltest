import { useState } from "react";
import RegularButton from "./regularButton";

export default function FieldObatRacikan(props) {
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
  const [namaRacikan, setNamaRacikan] = useState("");
  const defaultRacikanData = {
    "obatalkes_id": 0,
    "obatalkes_nama": "",
    "signa_id": 0,
    "signa_nama": "",
    "qty": 0
  }
  const [racikanData, setRacikanData] = useState(defaultRacikanData);

  const renderObatalkesOption = () => {
    return (
      <>
        <select
          className="form-select"
          value={racikanData.obatalkes_id}
          onChange={(e) => {
            const target = e.target;
            if (target.value !== "") {
              const selectedOption = target.options[target.selectedIndex];

              setRacikanData({
                ...racikanData,
                obatalkes_id: parseInt(selectedOption.value),
                obatalkes_nama: selectedOption.text
              });
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
      </>
    )
  }

  const renderSignaOption = () => {
    return (
      <>
        <select
          className="form-select"
          value={racikanData.signa_id}
          onChange={(e) => {
            const target = e.target;
            if (target.value !== "") {
              const selectedOption = target.options[target.selectedIndex];

              setRacikanData({
                ...racikanData,
                signa_id: parseInt(selectedOption.value),
                signa_nama: selectedOption.text
              });
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
      </>
    )
  }

  const handlePenambahanObatRacikan = () => {
    const dataBuilt = {
      "racikan": {
        "nama_racikan": namaRacikan,
        "obatalkes": [racikanData]
      }
    }

    if (props.fieldData.length < 1) {
      props.setFieldData([
        ...props.fieldData,
        dataBuilt
      ]);
    } else {
      const racikanFoundByName = props.fieldData.findIndex((item) => {
        return Object.keys(item)[0] === "racikan" && item.racikan.nama_racikan === namaRacikan;
      });
      console.log(racikanFoundByName);

      if (racikanFoundByName !== -1) {
        const newFieldData = [...props.fieldData];
        newFieldData[racikanFoundByName].racikan.obatalkes.push(racikanData);
        props.setFieldData([...newFieldData]);
      } else {
        props.setFieldData([
          ...props.fieldData,
          dataBuilt
        ]);
      }
    }
  }

  return (
    <div className="row border p-3 mb-3">
      <div className="col">
        <div className="row border p-3 mb-3">
          <div className="col-md-3 mb-3">
            <label htmlFor="nama_racikan">Nama Racikan</label>
            <input
              type="text"
              className="form-control"
              name="nama_racikan"
              value={namaRacikan}
              onChange={(e) => {
                setNamaRacikan(e.target.value);
              }}
            />
          </div>
          <div className="col-md-9">
            <div className="row border p-3 mb-3">
              <div className="col">
                <div className="row border mb-3">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="nama_obat">Nama Obat</label>
                    {renderObatalkesOption()}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="nama_signa">Nama Signa</label>
                    {renderSignaOption()}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="qty">Kuantitas</label>
                    <input
                      type="number"
                      className="form-control"
                      name="qty"
                      value={racikanData.qty}
                      onChange={(e) => {
                        setRacikanData({
                          ...racikanData,
                          qty: parseFloat(e.target.value)
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <RegularButton
              buttonName="+ Tambah racikan ke resep"
              onClick={(e) => {
                handlePenambahanObatRacikan();

                setRacikanData(defaultRacikanData);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}