function arrayBufferToBinaryString(buffer, callback) {
  var blob = new Blob([buffer]);
  var filereader = new FileReader();
  filereader.onload = function(e) {
    callback(null, e.target.result)
  }
  filereader.onerror = callback;
  filereader.readAsText(blob);
}

function binaryStringToArrayBuffer(bin, callback) {
  var blob = new Blob([bin]);
  var filereader = new FileReader();
  filereader.onload = function(e) {
    callback(null, e.target.result)
  }
  filereader.onerror = callback;
  filereader.readAsArrayBuffer(blob);
}

self.addEventListener('message', function (e) {
  arrayBufferToBinaryString(e.data, function (err, data) {
    if (err) {
      throw err;
    }
    var parsed = JSON.parse(data);
    binaryStringToArrayBuffer(JSON.stringify(parsed), function (err, buff){
      if (err) {
        throw err;
      }
      self.postMessage(buff, [buff]);
    })
  });
});
