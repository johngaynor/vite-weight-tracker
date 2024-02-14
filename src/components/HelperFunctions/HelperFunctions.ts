export const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    return formattedDate;
  };