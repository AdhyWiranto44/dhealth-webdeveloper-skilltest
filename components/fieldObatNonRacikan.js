import { useState } from "react";
import RegularButton from "./regularButton";

export default function FieldObatNonRacikan(props) {
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
  const defaultNonRacikanData = {
    "non_racikan": {
      "obatalkes_id": 0,
      "obatalkes_nama": "",
      "signa_id": 0,
      "signa_nama": "",
      "qty": 0
    }
  }
  const [nonRacikanData, setNonRacikanData] = useState(defaultNonRacikanData);

  const renderObatalkesOption = () => {
    return (
      <>
        <select
          className="form-select"
          value={nonRacikanData.non_racikan.obatalkes_id}
          onChange={(e) => {
            const target = e.target;
            if (target.value !== "") {
              const selectedOption = target.options[target.selectedIndex];

              const newNonRacikanData = { ...nonRacikanData };
              newNonRacikanData.non_racikan.obatalkes_id = parseInt(selectedOption.value);
              newNonRacikanData.non_racikan.obatalkes_nama = selectedOption.text;

              setNonRacikanData({ ...newNonRacikanData })
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
          value={nonRacikanData.non_racikan.signa_id}
          onChange={(e) => {
            const target = e.target;
            if (target.value !== "") {
              const selectedOption = target.options[target.selectedIndex];

              const newNonRacikanData = { ...nonRacikanData };
              newNonRacikanData.non_racikan.signa_id = parseInt(selectedOption.value);
              newNonRacikanData.non_racikan.signa_nama = selectedOption.text;

              setNonRacikanData({ ...newNonRacikanData })
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

  return (
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
              value={nonRacikanData.non_racikan.qty}
              onChange={(e) => {
                const newNonRacikanData = { ...nonRacikanData };
                newNonRacikanData.non_racikan.qty = parseFloat(e.target.value);

                setNonRacikanData({ ...newNonRacikanData });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <RegularButton
              buttonName="+ Tambah non-racikan ke resep"
              onClick={(e) => {
                props.setFieldData([...props.fieldData, nonRacikanData]);
                setNonRacikanData(defaultNonRacikanData);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}