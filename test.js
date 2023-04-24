function myFunction(callback) {
    setTimeout(function() {
      callback('Hello, world!');
    }, 5000);
  }
  
  myFunction(function(result) {
    console.log(result);
  });