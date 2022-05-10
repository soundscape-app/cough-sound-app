function convertFromStringToDate(responseDate: string) {
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
        timePieces[0], timePieces[1], timePieces[2]))
}

export default {
    convertFromStringToDate,
};
