
export function openModal(modalName:string) {

    const modalRef = document.getElementById(`modal-${modalName}`)
    modalRef!.style.display = 'block'

    /*
    ! OPACITY EFFECTING Z-INDEX
    */
    // modalRef!.style.opacity = '0'

    // var op = 0.01;  // initial opacity
    // var timer = setInterval(function () {

    //     if (op >= 1){
    //         clearInterval(timer);
    //     }
    //     modalRef!.style.opacity = op.toString();
    //     op += 0.01
    //     console.log(op)
    // }, 10);
}

export function switchModals(modalName1:string, modalName2:string) {

    const modalRef1 = document.getElementById(`modal-${modalName1}`)
    const modalRef2 = document.getElementById(`modal-${modalName2}`)

    modalRef1!.style.display = 'none'
    modalRef2!.style.display = 'block'
}