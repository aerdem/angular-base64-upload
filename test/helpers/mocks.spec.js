// contains mock objects/properties/functions used in testing

function FileReaderMock() {
  var self = this;

  var event = {
    target: {
      result: null
    }
  };

  self.result = null;

  self.triggerEvent = function (eventName) {
    if (typeof self[eventName] === 'function') {
      event.target.result = self.result;
      event.type = eventName;
      self[eventName](event);
    }
  };

  self.readAsArrayBuffer = function () {

    if (FileReaderMock.autoTriggerEvents) {
      for (var i = FILE_READER_EVENTS.length - 1; i >= 0; i--) {
        var e = FILE_READER_EVENTS[i];
        self.triggerEvent(e);
      }
    }
    else {
      self.triggerEvent('onload');
    }

  };

  self.abort = function () {
    self.triggerEvent('onabort');
  };
  return self;
}

FileReaderMock.autoTriggerEvents = false;

window._arrayBufferToBase64 = function () {
  return 'base64-mock-string';
};
window.FileReader = FileReaderMock;
var $windowMock = window;

FileMock = {
  type: 'image/jpeg',
  name: 'this-is-an-image-name.jpg',
  size: 500 * 1000, // 500kb
};

FileListMock = [];

for (var i = 10; i >= 0; i--) {
  FileListMock[i] = FileMock;
}

eventMock = {
  type: 'change',
  target: {
    files: FileListMock
  }
};

fileObjectMock = {
  filename: FileMock.name,
  filetype: FileMock.type,
  filesize: FileMock.size,
  base64: $windowMock._arrayBufferToBase64()
};