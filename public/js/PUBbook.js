function format ( d ) {
    return  `Pengarang: ${d.book_page_thickness} <br>`+
        `Isbn: ${d.book_isbn} <br>`+
        `Penerbit : ${d.book_publisher}`;
}
 
$(document).ready(function() {
    var dt = $('#example').DataTable( {
        "processing": true,
        // "serverSide": true,
        "ajax": {
            "url" : "/book",
            "method": "post",
        },
        "columns": [ 
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },
            { "data": "book_image.type" },
            { "data": "book_title" },
            { "data": "book_launching" },
            { "data": "book_author" },
            { "data":  null}
            // { "data": "book_penerbit" },
            // { "data": "book_tebalHalaman" },
            // { "data": "book_isbn" },
        ],
        "order": [[1, 'asc']]
    } )
 
    // Array to track the ids of the details displayed rows
    var detailRows = [];
 
    $('#example tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();
 
            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();
 
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );
 
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
} );

// $(document).ready(function() {
//     console.log($('#example'))
//         var dt = $('#example').DataTable( {
//             "processing": true,
//             "ajax": {
//                 "url" : "/data",
//                 "method": "post",
//             },
//             "columns": [ 
//                 {
//                     "class":          "details-control",
//                     "orderable":      false,
//                     "data":           null,
//                     "defaultContent": ""
//                 },
//                 { "data": "book_image.type" },
//                 { "data": "book_judul" },
//                 { "data": "book_peluncuran" },
//                 { "data": "book_pengarang" },
//                 { "data": "book_penerbit" },
//                 { "data": "book_tebalHalaman" },
//                 { "data": "book_isbn" },
//                 { "data":  null}
//             ],
//             "order": [[1, 'asc']]
//         }) 
// })
