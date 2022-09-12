import { useEffect, useState } from "react";
import FieldObatNonRacikan from "../components/fieldObatNonRacikan";
import FieldObatRacikan from "../components/fieldObatRacikan";
import RegularButton from "../components/regularButton";
import objNonRacikan, { getObjNonRacikan } from "../constants/fieldObj/objNonRacikan";
import objRacikan from "../constants/fieldObj/objRacikan";
import MainLayout from "../layouts/main";
import { v4 as uuidv4 } from 'uuid';
import { insertNewTransaction } from "./api/transaction";
import Router, { useRouter } from "next/router";

export default function TambahResep() {
  const [fieldData, setFieldData] = useState([]);
  const [draftResep, setDraftResep] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");

  const renderDraftResep = () => {
    return (
      fieldData.map((field, idx, theFieldData) => {
        if (Object.keys(field)[0] === "non_racikan") {
          return (
            <>
              <tr>
                <th scope="row">{idx + 1}</th>
                <td>-</td>
                <td>{field.non_racikan.obatalkes_nama}</td>
                <td>{field.non_racikan.signa_nama}</td>
                <td>{field.non_racikan.qty}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      setFieldData([
                        ...theFieldData.filter((field, i) => {
                          return i !== idx;
                        })
                      ])

                      setDraftResep(renderDraftResep());
                    }}
                  >Hapus</button>
                </td>
              </tr>
            </>
          )
        } else {
          return (
            field.racikan.obatalkes.map((item, i, theField) => {
              if (i === 0) {
                return (
                  <>
                    <tr>
                      <th rowSpan={field.racikan.obatalkes.length} scope="row">{idx + 1}</th>
                      <td rowSpan={field.racikan.obatalkes.length}>{field.racikan.nama_racikan}</td>
                      <td>{field.racikan.obatalkes[0].obatalkes_nama}</td>
                      <td>{field.racikan.obatalkes[0].signa_nama}</td>
                      <td>{field.racikan.obatalkes[0].qty}</td>
                      <td rowSpan={field.racikan.obatalkes.length}>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => {
                            setFieldData([
                              ...theFieldData.filter((field, i) => {
                                return i !== idx;
                              })
                            ])

                            setDraftResep(renderDraftResep());
                          }}
                        >Hapus</button>
                      </td>
                    </tr>
                  </>
                )
              } else {
                return (
                  <>
                    <tr>
                      <td>{field.racikan.obatalkes[i].obatalkes_nama}</td>
                      <td>{field.racikan.obatalkes[i].signa_nama}</td>
                      <td>{field.racikan.obatalkes[i].qty}</td>
                    </tr>
                  </>
                )
              }
            })
          )
        }
      })
    )
  }

  const handleInsertNewTransaction = async () => {
    const response = await insertNewTransaction(fieldData);
    if (response.success == false) {
      return setMessage("Gagal menambahkan resep");
    }
    router.reload();
  }

  useEffect(() => {
    setDraftResep(renderDraftResep());
  });

  return (
    <MainLayout
      title="Tambah Resep"
      content={
        <div className="container">
          <h1>{message}</h1>
          <div className="row">
            <div className="col-lg-7">
              <form>
                <FieldObatNonRacikan
                  fieldData={fieldData}
                  setFieldData={setFieldData}
                />
                <FieldObatRacikan
                  fieldData={fieldData}
                  setFieldData={setFieldData}
                />
                <div className="row mb-3">
                  <div className="col-md">
                    <RegularButton
                      className={"btn btn-salmon"}
                      buttonName="Order"
                      onClick={(e) => {
                        console.log(fieldData);
                        handleInsertNewTransaction();
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5">
              <h6 className="fw-bold">Draft Resep Obat</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Racikan</th>
                    <th scope="col">Obat</th>
                    <th scope="col">Signa</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {draftResep}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    />
  )
}