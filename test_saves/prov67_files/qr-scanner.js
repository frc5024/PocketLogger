
scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });

scanner.addListener('scan', function (content, image) {
    loadQR( content );
});

Instascan.Camera.getCameras().then(function (cameras) {
    self.cameras = cameras;
    if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id;
        self.scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});