import moment from "moment";

function toLocaleDateString(date, { inputFormat, outputFormat = "LLL" } = {}) {
    const parsedDate = inputFormat ? moment(date, inputFormat) : moment(date);
    return parsedDate.locale(ForisTranslations.locale).format(outputFormat);
}

export default toLocaleDateString;
