import { useEffect, useState } from "react"
import MainLayout from "../../layouts/main"
import { getAllObatalkes } from "../api/obatalkes"


export default function Index() {
  const [obatalkes, setObatalkes] = useState([]);

  const handleGetObatalkes = async () => {
    const obatalkes = await getAllObatalkes();
    setObatalkes([...obatalkes.data.data]);
  }

  useEffect(() => {
    handleGetObatalkes();
  }, []);

  const renderTableData = () => {
    if (obatalkes.length < 1) {
      return (
        <tr>
          <td colSpan={6}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        obatalkes.map((oa, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}.</th>
              <td>
                {oa.obatalkes_kode || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {oa.obatalkes_nama || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {oa.stok || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {oa.additional_data || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {oa.created_date || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {oa.last_modified_data || <small className="text-muted">[Kosong]</small>}
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
        title="Daftar Obatalkes"
        content={
          <div className="container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <p>Total: <b>{obatalkes.length}</b> Data Ditemukan</p>
                    <table className="table table-bordered table-striped text-center">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Kode</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Stok</th>
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
                          <th scope="col">Stok</th>
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