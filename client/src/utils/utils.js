// generate unique ID for each message div of bot necessary for typing text effect for that specific reply without unique ID, typing text will work on every element
function generateUniqueId() {
  const timestamp = Date.now(),
    randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `${timestamp}-${hexadecimalString}`;
}

function getTimestamp(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return ` - ${strTime}`;
}

export { generateUniqueId, getTimestamp, }