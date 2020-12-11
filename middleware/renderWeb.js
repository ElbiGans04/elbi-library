module.exports = function (web) {
  // Main
  bodyHtml("table", ["Nama", "Kelas", "tahun"]);
  function bodyHtml(type, coloumn) {
    if (type == "table") {
      let body = `
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">List of library books</h1>
            <div class="actionMenu">
              <!-- Class-->
              <button class="btn btn-primary disableButton" id="modifyClass" type="button" data-toggle="modal" data-target="#modifyClassModal" title="Modify library members" aria-describe="Modify library members"><span class="icon text-white-50"><i class="fas fa-clipboard"></i></span><span class="text">Category</span></button>
              <!-- Add Member-->
              <button class="btn btn-primary disableButton" type="button" data-toggle="modal" data-target="#addMember" title="Add library members" aria-describe="Add library members"><span class="icon text-white-50"><i class="fas fa-book"></i></span><span class="text">Add Book</span></button>
              <!-- End add member-->
              <!-- Remove All-->
              <button class="btn btn-danger" id="deleteModalByButton" type="button" data-toggle="modal" data-target="#removeMember" title="Remove class-based members or based on selected rows" aria-describe="Remove class-based members or based on selected rows"><span class="icon text-white-50"><i class="fas fa-trash"></i></span><span class="text">Delete by</span></button>
              <!-- End of remove all-->
            </div>
          </div>
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">List Book</h6>
              <div class="sorting d-flex justify-content-center align-items-center">
                <h6 class="font-weight-bold text-primary mb-0" id="rowSelect">1 rows selected</h6>
                <select class="custom-select custom-select-sm form-control form-control-sm ml-3" id="inputClass" name="deleteByClass" aria-controls="dataTable">
                  <option value="all">All</option>
                  <option value="12 Rpl 1">12 Rpl 1</option>
                  <option value="12 Rpl 2">12 Rpl 2</option>
                  <option value="12 Rpl 3">12 Rpl 3         </option>
                </select>
              </div>
            </div>
            <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered display" id="example" width="100%" cellspacing="0">
                <thead>
                  <tr>`;
      coloumn.forEach(function(e,i){
        body += `<th>${e}</th>`;

        // Jika terakhir
        if(i == ( coloumn.length - 1)) {
          body += `</tr></thead><tfoot><tr>`
          coloumn.forEach(function(element, index){
            body += `<th>${element}</th>`
            if(index == ( coloumn.length - 1)) {
              body += '</tr></tfoot><tbody></tbody></table></div></div></div>'
            }
          })
        }
      })
      return body
    }
  }

  if (web == "member") {
    let body = ` 
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Library members</h1>
    <div class="actionMenu">
    <!-- Class-->
    <button class="btn btn-primary disableButton" id="modifyClass" type="button" data-toggle="modal" data-target="#modifyClassModal" title="Modify library members" aria-describe="Modify library members"><span class="icon text-white-50"><i class="fas fa-users"></i></span><span class="text">Class</span></button>
    <!-- Add Member-->
    <button class="btn btn-primary disableButton" type="button" data-toggle="modal" data-target="#addMember" title="Add library members" aria-describe="Add library members"><span class="icon text-white-50"><i class="fas fa-user"></i></span><span class="text">Add Member</span></button>
    <!-- End add member-->
    <!-- Remove All-->
    <button class="btn btn-danger" id="deleteModalByButton" type="button" data-toggle="modal" data-target="#removeMember" title="Remove class-based members or based on selected rows" aria-describe="Remove class-based members or based on selected rows"><span class="icon text-white-50"><i class="fas fa-trash"></i></span><span class="text">Delete by</span></button>
    </div>
    </div>
    <div class="card shadow mb-4">
    <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
    <h6 class="m-0 font-weight-bold text-primary">List Member</h6>
    <div class="sorting d-flex justify-content-center align-items-center">
        <h6 class="font-weight-bold text-primary mb-0" id="rowSelect">1 rows selected</h6>
        <select class="custom-select custom-select-sm form-control form-control-sm ml-3" id="inputClass" name="deleteByClass" aria-controls="dataTable">
        <option value="all">All</option>
        <option value="12 Rpl 1">12 Rpl 1</option>
        <option value="12 Rpl 2">12 Rpl 2</option>
        <option value="12 Rpl 3">12 Rpl 3         </option>
        </select>
    </div>
    </div>
    <div class="card-body">
    <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
            <th>No</th>
            <th>Member number</th>
            <th>FullName</th>
            <th>Class</th>
            <th>Date of birth</th>
            <th>Address</th>
            <th>Action</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
            <th>No</th>
            <th>Member number</th>
            <th>FullName</th>
            <th>Class</th>
            <th>Date of birth</th>
            <th>Address</th>
            <th>Action</th>
            </tr>
        </tfoot>
        <tbody>
            <tr>
            <td></td>
            <td class="tableNomorAnggota">67115</td>
            <td class="tableNamaAnggota">Olivia Liang</td>
            <td class="tableClass">12 Rpl 2</td>
            <td class="tableTtlAnggota">Kalimantan, 03 Desember 2003</td>
            <td class="tableAlamatAnggota">5640 Bell Views</td>
            <td class="text-center actionTable">
                <button class="btn btn-primary btn-sm btn-circle edit disableButton" title="Modify related users" aria-describe="Modify related users"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm btn-circle delete disableButton" title="Remove related users" aria-describe="Remove related users"><i class="fas fa-trash"></i></button>
            </td>
            </tr>
            <tr>
            <td></td>
            <td class="tableNomorAnggota">96438</td>
            <td class="tableNamaAnggota">Rhafael</td>
            <td class="tableClass">12 Rpl 1</td>
            <td class="tableTtlAnggota">legok, 03 Desember 2003</td>
            <td class="tableAlamatAnggota">5640 Bell Vis</td>
            <td class="text-center actionTable">
                <button class="btn btn-primary btn-sm btn-circle edit disableButton" title="Modify related users" aria-describe="Modify related users"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm btn-circle delete disableButton" title="Remove related users" aria-describe="Remove related users"><i class="fas fa-trash"></i></button>
            </td>
            </tr>
            <tr>
            <td></td>
            <td class="tableNomorAnggota">65337</td>
            <td class="tableNamaAnggota">Kiel Blick</td>
            <td class="tableClass">12 Rpl 3</td>
            <td class="tableTtlAnggota">Kalimantan, 03 Desember 2003</td>
            <td class="tableAlamatAnggota">5640 Bell Views</td>
            <td class="text-center actionTable">
                <button class="btn btn-primary btn-sm btn-circle edit disableButton" title="Modify related users" aria-describe="Modify related users"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm btn-circle delete disableButton" title="Remove related users" aria-describe="Remove related users"><i class="fas fa-trash"></i></button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
    </div>`;
    let script = [
      "/assets/vendor/datatables/jquery.dataTables.min.js",
      "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
      `/assets/js/member.js`,
    ];
    let css = [`/assets/css/style-global.css`];

    return { body, script, css };
  } else if (web == "book") {
    let body = `
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">List of library books</h1>
          <div class="actionMenu">
            <!-- Class-->
            <button class="btn btn-primary disableButton" id="modifyClass" type="button" data-toggle="modal" data-target="#modifyClassModal" title="Modify library members" aria-describe="Modify library members"><span class="icon text-white-50"><i class="fas fa-clipboard"></i></span><span class="text">Category</span></button>
            <!-- Add Member-->
            <button class="btn btn-primary disableButton" type="button" data-toggle="modal" data-target="#addMember" title="Add library members" aria-describe="Add library members"><span class="icon text-white-50"><i class="fas fa-book"></i></span><span class="text">Add Book</span></button>
            <!-- End add member-->
            <!-- Remove All-->
            <button class="btn btn-danger" id="deleteModalByButton" type="button" data-toggle="modal" data-target="#removeMember" title="Remove class-based members or based on selected rows" aria-describe="Remove class-based members or based on selected rows"><span class="icon text-white-50"><i class="fas fa-trash"></i></span><span class="text">Delete by</span></button>
            <!-- End of remove all-->
          </div>
        </div>
        <div class="card shadow mb-4">
          <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">List Book</h6>
            <div class="sorting d-flex justify-content-center align-items-center">
              <h6 class="font-weight-bold text-primary mb-0" id="rowSelect">1 rows selected</h6>
              <select class="custom-select custom-select-sm form-control form-control-sm ml-3" id="inputClass" name="deleteByClass" aria-controls="dataTable">
                <option value="all">All</option>
                <option value="12 Rpl 1">12 Rpl 1</option>
                <option value="12 Rpl 2">12 Rpl 2</option>
                <option value="12 Rpl 3">12 Rpl 3         </option>
              </select>
            </div>
          </div>
          <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered display" id="example" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th> </th>
                  <th>name</th>
                  <th>position</th>
                  <th>Adress</th>
                  <th>salary</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th> </th>
                  <th>name</th>
                  <th>position</th>
                  <th>Adress</th>
                  <th>salary</th>
                </tr>
              </tfoot>
              <tbody></tbody>
            </table>
          </div>
        </div>
        </div>`;

    let script = [
      "/assets/vendor/datatables/jquery.dataTables.min.js",
      "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
      // `/assets/js/book.js`,
    ];
    let css = [`/assets/css/style-global.css`, "/assets/css/style-book.css"];

    return { body, script, css };
  }
};
