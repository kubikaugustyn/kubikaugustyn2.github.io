const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
app.use(cors());
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.get('/download', (req, res) => {
    var URL = req.query.URL;
    var VideoId  = URL.split("https://www.youtube.com/watch?v=")[1]
    res.header('Content-Disposition', `attachment; filename="${VideoId}.YouTubeVideo.mp4"`);
    res.json({url: URL});
    ytdl(URL, {
        format: 'mp4'
    }).pipe(res);
})
