import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import MainLayout from "../layouts/main"
import moment from 'moment'
import { useRouter } from "next/router"
import { TIMEOUT_HALF_A_SECOND } from "../constants/timeout"
import notificationWarning from "../helpers/notificationWarning"
import notificationSuccess from "../helpers/notificationSuccess"
import notificationFailed from "../helpers/notificationFailed"
import domain from "../constants/domain"
import ButtonLink from "../components/buttonLink"
import { getAllTransaction } from "./api/transaction"


export default function Index() {
  const [hobbies, setHobbies] = useState([])
  const [total, setTotal] = useState(0)
  const router = useRouter()
  const [transaction, setTransaction] = useState([]);

  const handleGetTransaction = async () => {
    const transaction = await getAllTransaction();
    setTransaction([...transaction.data.data]);
  }

  useEffect(() => {
    handleGetTransaction();
  }, []);

  const renderTableData = () => {
    if (transaction.length < 1) {
      return (
        <tr>
          <td colSpan={5}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        transaction.map((trans, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}.</th>
              <td>
                {trans.resep_kode || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {trans.racikan_nama || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {trans.obatalkes_nama || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {trans.signa_nama || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {trans.jumlah || <small className="text-muted">[Kosong]</small>}
              </td>
            </tr>
          )
        })
      )
    }
  }

  return (
    <>
      <MainLayout
        title="Daftar Resep"
        content={
          <div className="container">
            <ButtonLink
              buttonName={"Tambah Resep"}
              href={"/tambah"}
            />

            <div className="container-fluid">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <p>Total: <b>{total}</b> Data Ditemukan</p>
                    <table className="table table-bordered table-striped text-center">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Kode Resep</th>
                          <th scope="col">Nama Racikan</th>
                          <th scope="col">Nama Obat</th>
                          <th scope="col">Signa</th>
                          <th scope="col">Jumlah</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableData()}
                      </tbody>
                      <tfoot className="tfoot-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Kode Resep</th>
                          <th scope="col">Nama Racikan</th>
                          <th scope="col">Nama Obat</th>
                          <th scope="col">Signa</th>
                          <th scope="col">Jumlah</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}