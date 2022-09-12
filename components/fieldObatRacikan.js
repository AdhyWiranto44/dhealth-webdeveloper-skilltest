import { useEffect, useState } from "react";
import { getAllObatalkes } from "../pages/api/obatalkes";
import { getAllSigna } from "../pages/api/signa";
import RegularButton from "./regularButton";

export default function FieldObatRacikan(props) {
  const [obatalkes, setObatalkes] = useState([]);
  const [signa, setSigna] = useState([]);
  const [namaRacikan, setNamaRacikan] = useState("");
  const defaultRacikanData = {
    "obatalkes_id": 0,
    "obatalkes_nama": "",
    "signa_id": 0,
    "signa_nama": "",
    "qty": 0
  }
  const [racikanData, setRacikanData] = useState(defaultRacikanData);

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
    <div className="row rounded shadow-sm p-3 mb-3">
      <div className="col">
        <h5 className="fw-bold">Obat racikan</h5>
        <div className="row border rounded p-3 mb-3">
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
            <div className="row border rounded p-3 mb-3">
              <div className="col">
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
              className={"btn btn-outline-primary w-100"}
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