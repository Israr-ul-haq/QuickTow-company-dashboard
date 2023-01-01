import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"
import TruckService from "../../services/TrucksService"

const ManageTrucks = () => {
  // SERVICES

  const truckService = new TruckService()

  //State
  const [data, setData] = useState([
    {
      VehicleName: "Mercedez",
      VehicleModel: "FE 2000",
      VehicleType: "FWD",
      VehicleNumber: "AHD 795",
      AssignTo: "Lahaina Grill",
      Status: "Active",
    },
  ])
  const [loader, setLoader] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const columnNames = [
    {
      UserId: 14,
      Name: "jan",
      Email: "jan@gmail.com",
      Phone: "35688",
      Password: "123",
      UserTypeId: 5,
      UserType: "User",
      DeviceId: "1122",
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + "1",
      sortable: true,
      grow: 0,
    },

    {
      name: "Vehicle Name",
      selector: "VehicleName",
      sortable: true,
    },
    {
      name: "Vehicle Model",
      selector: "VehicleModel",
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: "VehicleType",
      sortable: true,
    },
    {
      name: "Vehicle No",
      selector: "VehicleNumber",
      sortable: true,
    },
    {
      name: "Assign To",
      selector: "AssignTo",
      sortable: true,
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to="/ViewTruck" className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to="/EditTruck" className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button type="button" data-toggle="modal" class="tableactions_action" onClick={() => deleteItem()}>
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
        </div>
      ),
      grow: 0,
    },
  ]

  //UseEffect

  //Functions

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Trucks"
    const headers = [["Vehicle Name", "Vehicle Model", "Vehicle Type", "Vehicle No", "Assign To", "Status"]]
    const pdfData = data.map((elt) => {
      return [elt.Name, elt.Email, elt.Phone, elt.Password]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("Trucks.pdf")
  }
  useEffect(() => {
    if (dataCount === 0) {
      getTruck()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const getTruck = async () => {
    setLoader(true)
    const response = await truckService.getTruck()
    setData(response.data.data)
    setLoader(false)
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title">My Trucks</h1>
                <Link to="/AddNewTruck" className="profile-business-accept btn btn-primary btnAddnew">
                  Add
                </Link>
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
                {" "}
                <div className="datatableheading">Export to:</div>
                <div>
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => exportPDF()}>
                    PDF
                  </button>
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames)}>
                    CSV
                  </button>
                </div>
                <input className="tablesearchbox" type="text" placeholder="Search" aria-label="Search Input" />
                <DataTable title="" columns={columns} data={data} pagination />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageTrucks
