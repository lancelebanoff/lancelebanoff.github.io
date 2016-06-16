var TOAST_TIMEOUT = 1500;

/** This opens the dialog box */
function openDialog(str) {
	/*
	$('.modal-body').text(str);
	$('#myModal').modal('show');
	//console.log(str);
	timeGLOBALS['timeout'] = setTimeout(closeDialog, MODAL_TIMEOUT);
	*/
	toastr.info(str);
}
