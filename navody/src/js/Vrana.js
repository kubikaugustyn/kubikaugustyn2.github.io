console.log('Vrana.js...')

var navod = [
    {
        "kostky": "",
        "pocet": "",
        "img": "vysledek"
    },
    {
        "kostky": "cerne/IMG_8986",
        "pocet": "2",
        "img": "IMG_8587"
    },
    {
        "kostky": "cerne/IMG_9008",
        "pocet": "2",
        "img": "IMG_8588"
    },
    {
        "kostky": "cerne/IMG_9001;cerne/IMG_8997",
        "pocet": "1;1",
        "img": "IMG_8589"
    },
    {
        "kostky": "tmaveSede/IMG_8979",
        "pocet": "2",
        "img": "IMG_8590"
    },
    {
        "kostky": "tmaveSede/IMG_8985",
        "pocet": "2",
        "img": "IMG_8591"
    },
    {
        "kostky": "modre/IMG_8899",
        "pocet": "2",
        "img": "IMG_8592"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8593"
    },
    {
        "kostky": "cerne/IMG_8919",
        "pocet": "2",
        "img": "IMG_8594"
    },
    {
        "kostky": "tmaveSede/IMG_8985",
        "pocet": "2",
        "img": "IMG_8595"
    },
    {
        "kostky": "tmaveSede/IMG_2564",
        "pocet": "1",
        "img": "IMG_8596"
    },
    {
        "kostky": "zlate/IMG_8886",
        "pocet": "1",
        "img": "IMG_8597"
    },
    {
        "kostky": "zlate/IMG_8886",
        "pocet": "1",
        "img": "IMG_8598"
    },
    {
        "kostky": "zlate/IMG_8978",
        "pocet": "1",
        "img": "IMG_8599"
    },
    {
        "kostky": "zlate/IMG_8978",
        "pocet": "1",
        "img": "IMG_8600"
    },
    {
        "kostky": "cerne/IMG_9009",
        "pocet": "1",
        "img": "IMG_8601"
    },
    {
        "kostky": "tmaveSede/IMG_8958",
        "pocet": "1",
        "img": "IMG_8602"
    },
    {
        "kostky": "tmaveSede/IMG_8958",
        "pocet": "1",
        "img": "IMG_8603"
    },
    {
        "kostky": "zlate/IMG_8946",
        "pocet": "1",
        "img": "IMG_8604"
    },
    {
        "kostky": "cerne/IMG_9020",
        "pocet": "1",
        "img": "IMG_8605"
    },
    {
        "kostky": "cerne/IMG_9020",
        "pocet": "1",
        "img": "IMG_8606"
    },
    {
        "kostky": "/IMG_",
        "pocet": "1",
        "img": "IMG_8607"
    },
    {
        "kostky": "/IMG_",
        "pocet": "1",
        "img": "IMG_8608"
    },
    {
        "kostky": "modre/IMG_9012",
        "pocet": "1",
        "img": "IMG_8609"
    },
    {
        "kostky": "panaci/IMG_8916",
        "pocet": "1",
        "img": "IMG_8610"
    },
    {
        "kostky": "panaci/IMG_8915",
        "pocet": "1",
        "img": "IMG_8611"
    },
    {
        "kostky": "panaci/IMG_8918",
        "pocet": "1",
        "img": "IMG_8612"
    },
    {
        "kostky": "panaci/IMG_8968",
        "pocet": "1",
        "img": "IMG_8613"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8614"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8615"
    },
    {
        "kostky": "panaci/IMG_8999",
        "pocet": "1",
        "img": "IMG_8616"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8617"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8618"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8619"
    },
    {
        "kostky": "modre/IMG_8925",
        "pocet": "1",
        "img": "IMG_8620"
    },
    {
        "kostky": "modre/IMG_8970",
        "pocet": "3",
        "img": "IMG_8621"
    },
    {
        "kostky": "tmaveSede/IMG_8991",
        "pocet": "1",
        "img": "IMG_8622"
    },
    {
        "kostky": "tmaveSede/IMG_9018",
        "pocet": "1",
        "img": "IMG_8623"
    },
    {
        "kostky": "modre/IMG_8970",
        "pocet": "3",
        "img": "IMG_8624"
    },
    {
        "kostky": "tmaveSede/IMG_8991",
        "pocet": "1",
        "img": "IMG_8625"
    },
    {
        "kostky": "modre/IMG_8926",
        "pocet": "1",
        "img": "IMG_8626"
    },
    {
        "kostky": "modre/IMG_8926",
        "pocet": "1",
        "img": "IMG_8627"
    },
    {
        "kostky": "cerne/IMG_",
        "pocet": "2",
        "img": "IMG_8628"
    },
    {
        "kostky": "tmaveSede/IMG_",
        "pocet": "",
        "img": "IMG_8629"
    },
    {
        "kostky": "svetleSede/IMG_8891",
        "pocet": "2",
        "img": "IMG_8630"
    },
    {
        "kostky": "modre/IMG_8983",
        "pocet": "1",
        "img": "IMG_8631"
    },
    {
        "kostky": "modre/IMG_8983",
        "pocet": "1",
        "img": "IMG_8632"
    },
    {
        "kostky": "svetleSede/IMG_8922",
        "pocet": "1",
        "img": "IMG_8633"
    },
    {
        "kostky": "svetleSede/IMG_8922",
        "pocet": "1",
        "img": "IMG_8634"
    },
    {
        "kostky": "zlate/IMG_8990",
        "pocet": "1",
        "img": "IMG_8635"
    },
    {
        "kostky": "cerne/IMG_9005",
        "pocet": "1",
        "img": "IMG_8636"
    },
    {
        "kostky": "tmaveSede/IMG_8885",
        "pocet": "1",
        "img": "IMG_8637"
    },
    {
        "kostky": "tmaveSede/IMG_8885",
        "pocet": "1",
        "img": "IMG_8638"
    },
    {
        "kostky": "modre/IMG_8898",
        "pocet": "1",
        "img": "IMG_8639"
    },
    {
        "kostky": "svetleSede/IMG_8973",
        "pocet": "1",
        "img": "IMG_8640"
    },
    {
        "kostky": "modre/IMG_8898",
        "pocet": "1",
        "img": "IMG_8641"
    },
    {
        "kostky": "modre/IMG_8898",
        "pocet": "1",
        "img": "IMG_8642"
    },
    {
        "kostky": "bile/IMG_8909",
        "pocet": "2",
        "img": "IMG_8643"
    },
    {
        "kostky": "modre/IMG_8898",
        "pocet": "2",
        "img": "IMG_8644"
    },
    {
        "kostky": "cerne/IMG_8967",
        "pocet": "1",
        "img": "IMG_8645"
    },
    {
        "kostky": "bile/IMG_8909",
        "pocet": "2",
        "img": "IMG_8647"
    },
    {
        "kostky": "modre/IMG_8903",
        "pocet": "1",
        "img": "IMG_8648"
    },
    {
        "kostky": "modre/IMG_8948",
        "pocet": "1",
        "img": "IMG_8652"
    },
    {
        "kostky": "modre/IMG_8948",
        "pocet": "1",
        "img": "IMG_8653"
    },
    {
        "kostky": "modre/IMG_8948",
        "pocet": "1",
        "img": "IMG_8654"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8655"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8656"
    },
    {
        "kostky": "cerne/IMG_8967",
        "pocet": "1",
        "img": "IMG_8657"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8658"
    },
    {
        "kostky": "modre/IMG_8923",
        "pocet": "1",
        "img": "IMG_8659"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8660"
    },
    {
        "kostky": "modre/IMG_8956",
        "pocet": "2",
        "img": "IMG_8661"
    },
    {
        "kostky": "modre/IMG_8949",
        "pocet": "2",
        "img": "IMG_8662"
    },
    {
        "kostky": "modre/IMG_",
        "pocet": "",
        "img": "IMG_8663"
    },
    {
        "kostky": "zlate/IMG_8988",
        "pocet": "2",
        "img": "IMG_8664"
    },
    {
        "kostky": "cerne/IMG_9020",
        "pocet": "2",
        "img": "IMG_8669"
    },
    {
        "kostky": "modre/IMG_8947",
        "pocet": "2",
        "img": "IMG_8670"
    },
    {
        "kostky": "zlate/IMG_9006",
        "pocet": "2",
        "img": "IMG_8671"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8672"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8673"
    },
    {
        "kostky": "",
        "pocet": "",
        "img": "IMG_8674"
    },
]

//8674