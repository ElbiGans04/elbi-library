// Call the dataTables jQuery plugin
$(document).ready(function() {
  let table = $('#dataTable').DataTable({
    "columnDefs": [
      { "orderable": false, "targets": 1 }
    ]
  });

  table.on( 'order.dt search.dt', function () {
    table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
} ).draw();
});
