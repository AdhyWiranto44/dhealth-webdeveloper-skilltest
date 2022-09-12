import { useEffect, useState } from "react"
import MainLayout from "../../layouts/main"
import { getAllSigna } from "../api/signa"


export default function Index() {
  const [signa, setSigna] = useState([]);

  const handleGetSigna = async () => {
    const signa = await getAllSigna();
    setSigna([...signa.data.data]);
  }

  useEffect(() => {
    handleGetSigna();
  }, []);

  const renderTableData = () => {
    if (signa.length < 1) {
      return (
        <tr>
          <td colSpan={6}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        signa.map((sig, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}.</th>
              <td>
                {sig.signa_kode || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {sig.signa_nama || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {sig.additional_data || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {sig.created_date || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {sig.last_modifed_date || <small className="text-muted">[Kosong]</small>}
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
        title="Daftar Signa"
        content={
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <p>Total: <b>{signa.length}</b> Data Ditemukan</p>
                    <table className="table table-bordered table-striped text-center">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Kode</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Keterangan</th>
                          <th scope="col">Ditambahkan Pada</th>
                          <th scope="col">Diubah Pada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableData()}
                      </tbody>
                      <tfoot className="tfoot-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Kode</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Keterangan</th>
                          <th scope="col">Ditambahkan Pada</th>
                          <th scope="col">Diubah Pada</th>
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