document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    if (context) {
        context.fillRect(0, 0, 500, 300);
        context.fillStyle = '#a5d8d7';
        context.fillRect(100, 50, 300, 200);
    }
});
