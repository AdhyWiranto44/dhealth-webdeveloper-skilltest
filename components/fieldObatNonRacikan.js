import { useEffect, useState } from "react";
import { getAllObatalkes } from "../pages/api/obatalkes";
import { getAllSigna } from "../pages/api/signa";
import RegularButton from "./regularButton";

export default function FieldObatNonRacikan(props) {
  const [obatalkes, setObatalkes] = useState([]);
  const [signa, setSigna] = useState([]);
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

  const handleGetObatalkes = async () => {
    const obatalkes = await getAllObatalkes();
    setObatalkes([...obatalkes.data.data]);
  }

  const handleGetSigna = async () => {
    const signa = await getAllSigna();
    setSigna([...signa.data.data]);
  }

  useEffect(() => {
    handleGetObatalkes();
  }, []);

  useEffect(() => {
    handleGetSigna();
  }, []);

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
            if (oba.stok > 0) {
              return (
                <option key={idx} value={oba.obatalkes_id}>{`${oba.obatalkes_nama} (stok: ${oba.stok})`}</option>
              )
            }
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
    <div className="row rounded shadow-sm p-3 mb-3">
      <div className="col">
        <h5 className="fw-bold">Obat non-racikan</h5>
        <div className="row border rounded mb-3">
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
              className={"btn btn-outline-primary w-100"}
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