let userMarker; // Declare userMarker globally
let destinationMarker; // Declare destinationMarker globally

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.33031740207237, lng: 139.40676857217937 },
        zoom: 15,
        mapId: 'e582376b1751adb1'
    });
    directionsDisplay = new google.maps.DirectionsRenderer({ map });
    // Assuming you have localContextMapView defined somewhere
    localContextMapView = new LocalContextMapView(map); // Replace this line with the actual initialization of localContextMapView

    // Add this line to trigger the search
    localContextMapView.search();
}

if (navigator.geolocation) {
    // Use watchPosition to continuously monitor the user's location
    navigator.geolocation.watchPosition(function (position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        if (userMarker) {
            // If userMarker already exists, update its position
            userMarker.setPosition(userLocation);
        } else {
            // If userMarker doesn't exist, create a new one
            userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "現在地",
                animation: google.maps.Animation.DROP
            });

        const userInfowindow = new google.maps.InfoWindow({
            content: "現在地",
        });

        userMarker.addListener("click", () => {
            userInfowindow.open(map, userMarker);
        });
    }

        // Add a click event listener to the map
        map.addListener("click", (event) => {
            // Get the clicked location's coordinates
            const clickedLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
    
            // Set the destination marker using the red.png icon
            setDestinationMarker(clickedLocation.lat, clickedLocation.lng, "目的地", "red.png");
        });

        // Create markers at the second location
        const secondMarkers = [ // Use the correct variable name 'secondMarkers'
            [
                "茅ヶ崎市立小学校",
                35.328504016188624,
                139.4040428983034,
                "red.png",
                "名前:茅ヶ崎市立小学校<br>説明:<br>所在地:茅ヶ崎市共恵一丁目10-23<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/039/733/chigasakic.pdf"
            ],
            [
                "茅ヶ崎市立松林小学校",
                35.34475284631809,
                139.42786811541995,
                "red.png",
                "名前:茅ヶ崎市立松林小学校<br>所在地:茅ヶ崎市菱沼一丁目1-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/044/syorins.pdf"
            ], 
            [
                "茅ヶ崎市立西浜小学校",
                35.3186266356894,
                139.3957184924802,
                "red.png",
                "名前:ヶ崎市立西浜小学校<br>所在地:茅ヶ崎市南湖六丁目5-8<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/045/nishihamas.pdf"
            ],
            [
                "茅ヶ崎市立小出小学校",
                35.371426700861505,
                139.42450124080932,
                "red.png",
                "名前:茅ヶ崎市立小出小学校<br>所在地:茅ヶ崎市芹沢944<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/046/koides.pdf"
            ],
            [
                "茅ヶ崎市立松浪小学校",
                35.33098227642847,
                139.43255559999744,
                "red.png",
                "名前:茅ヶ崎市立松浪小学校<br>所在地:茅ヶ崎市松浪一丁目1-61<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/047/matunamis.pdf"
            ],
            [
                "茅ヶ崎市立香川小学校",
                35.35353708944174,
                139.40700621050803,
                "red.png",
                "名前:茅ヶ崎市立香川小学校<br>所在地:茅ヶ崎市香川一丁目33-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:<br>https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/048/kagawas.pdf"
            ],
            [
                "茅ヶ崎市立浜須賀小学校",
                35.323068714057,
                139.4239731999947,
                "red.png",
                "名前:茅ヶ崎市立浜須賀小学校<br>所在地:茅ヶ崎市白浜町3-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/049/hamasukas.pdf"
            ],
            [
                "茅ヶ崎市立鶴が台小学校",
                35.34797218716766,
                139.4049905325146,
                "red.png",
                "名前:茅ヶ崎市立鶴が台小学校<br>所在地:茅ヶ崎市鶴が台12-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/050/turugadais.pdf"
            ],
            [
                "茅ヶ崎市立小和田小学校",
                35.343898195036125,
                139.43894062884743,
                "red.png",
                "名前:茅ヶ崎市立小和田小学校<br>所在地:茅ヶ崎市小和田三丁目10-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/051/kowadas.pdf"
            ],
            [
                "茅ヶ崎市立円蔵小学校",
                35.34244386129535,
                139.40764427106527,
                "red.png",
                "名前:茅ヶ崎市立円蔵小学校<br>所在地:茅ヶ崎市円蔵一丁目13-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/052/enzos.pdf"
            ],
            [
                "茅ヶ崎市立室田小学校",
                35.34608469108344,
                139.42056567375008,
                "red.png",
                "名前:茅ヶ崎市立円蔵小学校<br>所在地:茅ヶ崎市室田一丁目1-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/053/murotas.pdf"
            ],
            [
                "茅ヶ崎市立東海岸小学校",
                35.320195877104204,
                139.4138270155128,
                "red.png",
                "名前:茅ヶ崎市立東海岸小学校<br>所在地:茅ヶ崎市東海岸南四丁目10-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/039/986/higashikaiganc.pdf"
            ],
            [
               "茅ヶ崎市立緑が浜小学校",
               35.32330233544516,
               139.43249441696986,
               "red.png",
               "名前:茅ヶ崎市立緑が浜小学校<br>所在地:茅ヶ崎市緑が浜1-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/054/midorigahamas.pdf"
            ],
            [
                "茅ヶ崎市立汐見台小学校",
                35.32122659369651,
                139.43735208656528,
                "red.png",
                "名前:茅ヶ崎市立汐見台小学校<br>所在地:茅ヶ崎市汐見台3-11<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/055/shiomidais.pdf"
            ],
            [
                "茅ヶ崎市立第一中学校",
                35.31992836354486,
                139.41471404230597,
                "red.png",
                "名前:茅ヶ崎市立第一中学校<br>所在地:東海岸南四丁目10-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/039/987/daiichic.pdf"
            ],
            [
                "茅ヶ崎市立松林中学校",
                35.3404539793014,
                139.4207277089047,
                "red.png",
                "名前:茅ヶ崎市立松林中学校<br>所在地:室田三丁目1-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/056/syorinc.pdf"
            ],
            [
                "茅ヶ崎市立西浜中学校",
                35.31888217298398,
                139.39110711539377,
                "red.png",
                "名前:茅ヶ崎市立西浜中学校<br>所在地:茅ヶ崎市南湖六丁目15-3<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/057/nishihamac.pdf"
            ],
            [
                "茅ヶ崎市立松浪中学校",
                35.32925679480089,
                139.43619170000878,
                "red.png",
                "名前:茅ヶ崎市立松浪中学校<br>所在地:茅ヶ崎市松浪二丁目6-47<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/058/matunamic.pdf"
            ],
            [
               "茅ヶ崎市立鶴が台中学校",
               35.34852403802822,
               139.41100939999305,
               "red.png",
               "名前:茅ヶ崎市立鶴が台中学校<br>所在地:鶴が台2-7<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/060/turugadaic.pdf"
            ],
            [
                "茅ヶ崎市立浜須賀中学校",
                35.32646947701363,
                139.42473392884293,
                "red.png",
                "名前:茅ヶ崎市立浜須賀中学校<br>所在地:松が丘二丁目8-54<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/061/hamasukac.pdf"
            ],
            [
                "茅ヶ崎市立北陽中学校",
                35.36609406511969,
                139.40928777115224,
                "red.png",
                "名前:茅ヶ崎市立北陽中学校<br>所在地:茅ヶ崎市下寺尾1660<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/062/hokuyoc.pdf"
            ],
            [
                "茅ヶ崎市立円蔵中学校",
                35.34363899364669,
                139.40887943080276,
                "red.png",
                "名前:茅ヶ崎市立円蔵中学校<br>所在地:茅ヶ崎市円蔵一丁目15-1<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/063/enzoc.pdf"
            ],
            [
                "茅ヶ崎市立赤羽根中学校",
                35.34940433322875,
                139.43731712883925,
                "red.png",
                "名前:茅ヶ崎市立赤羽根中学校<br>所在地:茅ヶ崎市赤羽根3030<br>説明:<br>種別：指定避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/064/akabanec.pdf"
            ],
            [
                "茅ヶ崎市立鶴嶺小学校",
                35.33771125210918,
                139.3898233356017,
                "blue.png",
                "名前:茅ヶ崎市立鶴嶺小学校<br>説明:<br>所在地:茅ヶ崎市浜之郷477<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/039/930/turumines.pdf"
            ],
            [
                "茅ヶ崎市立梅田小学校",
                35.333104525685066,
                139.40103833583413,
                "blue.png",
                "名前:茅ヶ崎市立梅田小学校<br>説明:<br>所在地:茅ヶ崎市茅ヶ崎一丁目6-1<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/072/umedas.pdf"
            ],
            [
                "茅ヶ崎市立柳島小学校",
                35.32396273140081,
                139.3777322597215,
                "blue.png",
                "名前:茅ヶ崎市立柳島小学校<br>説明:<br>所在地:茅ヶ崎市柳島1594<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/073/yanagishimas.pdf"
            ],
            [
                "今宿小学校",
                35.33658659606482,
                139.38553701940836,
                "blue.png",
                "名前:今宿小学校<br>説明:<br>所在地:茅ヶ崎市今宿192<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/074/imajyukus.pdf"
            ],
            [
                "茅ヶ崎市立鶴嶺中学校",
                35.34089417164862,
                139.39006879200255,
                "blue.png",
                "名前:茅ヶ崎市立鶴嶺中学校<br>説明:<br>所在地:茅ヶ崎市浜之郷500<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/076/turuminec.pdf"
            ],
            [
                "茅ヶ崎市立梅田中学校",
                35.33300854950827,
                139.39879229388862,
                "blue.png",
                "名前:茅ヶ崎市立梅田中学校<br>説明:<br>所在地:茅ヶ崎市十間坂三丁目6-25<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/077/umedac.pdf"
            ],
            [
                "茅ヶ崎市立中島中学校",
                35.32515485256144,
                139.37510003950814,
                "blue.png",
                "名前:茅ヶ崎市立中島中学校<br>説明:<br>所在地:茅ヶ崎市中島1469-2<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/078/nakajimac.pdf"
            ],
            [
                "茅ヶ崎市立萩園中学校",
                35.34132064143852,
                139.38142863692104,
                "blue.png",
                "名前:茅ヶ崎市立萩園中学校<br>説明:<br>所在地:茅ヶ崎市萩園2425<br>区分：指定避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止<br>避難所ガイド:https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/040/079/hagisonoc.pdf"
            ],
            [
                "神奈川県立茅ケ崎高等学校",
                35.338603687354805,
                139.41801266438844,
                "yellow.png",
                "名前:神奈川県立茅ケ崎高等学校<br>説明:<br>所在地:茅ヶ崎市本村三丁目4-1<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止"
            ],
            [
                "神奈川県立茅ケ崎北陵高等学校",
                35.36184739471944,
                139.39730060638124,
                "yellow.png",
                "名前:神奈川県立茅ケ崎北陵高等学校<br>説明:<br>所在地:茅ヶ崎市下寺尾128<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止"
            ],
            [
                "神奈川県立鶴嶺高等学校",
                35.344445799499965,
                139.4096599361446,
                "yellow.png",
                "名前:神奈川県立鶴嶺高等学校<br>説明:<br>所在地:茅ヶ崎市円蔵一丁目16-1<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止"
            ],
            [
                "神奈川県立茅ケ崎西浜高等学校",
                35.318696112303456,
                139.38762793771315,
                "yellow.png",
                "名前:神奈川県立茅ケ崎西浜高等学校<br>説明:<br>所在地:茅ヶ崎市南湖七丁目12869-11<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可<br>車での避難：原則禁止"
            ],
            [
                "TOTO 茅ヶ崎工場",
                35.33613065638354,
                139.42062005140156,
                "yellow.png",
                "名前:TOTO 茅ヶ崎工場<br>説明:<br>所在地:茅ヶ崎市本村三丁目4-1<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：禁止<br>車での避難：要配慮者に限る"
            ],
            [
                "平和学園小学校",
                35.32614072442043,
                139.43219548397602,
                "yellow.png",
                "名前:平和学園小学校<br>説明:<br>所在地:茅ヶ崎市富士見町5-2<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "真如苑 湘南支部",
                35.337254597927995,
                139.42443029401662,
                "yellow.png",
                "名前:真如苑 湘南支部<br>説明:<br>所在地:茅ヶ崎市小桜町1-38<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：禁止<br>車での避難：原則禁止 "
            ],
            [
                "文教大学 湘南キャンパス",
                35.36986292683368,
                139.41606004134405,
                "yellow.png",
                "名前:文教大学 湘南キャンパス<br>説明:<br>所在地:茅ヶ崎市行谷1100<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "小出支所",
                35.371047367245446,
                139.42395126408573,
                "yellow.png",
                "名前:小出支所<br>説明:<br>所在地:茅ヶ崎市芹沢888<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "小和田公民館",
                35.33145355865825,
                139.4306624481031,
                "yellow.png",
                "名前:小和田公民館<br>説明:<br>所在地:茅ヶ崎市美住町6-20<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "茅ヶ崎市立松林公民館",
                35.34655487037107,
                139.42169443215738,
                "yellow.png",
                "名前:茅ヶ崎市立松林公民館<br>説明:<br>所在地:茅ヶ崎市室田一丁目3-2<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "南湖公民館",
                35.31913878195643,
                139.3922405415623,
                "yellow.png",
                "名前:南湖公民館<br>説明:<br>所在地:茅ヶ崎市南湖六丁目15-1<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "茅ヶ崎市立図書館 香川分館（香川公民館）",
                35.35152794075754,
                139.4055775554613,
                "yellow.png",
                "名前:茅ヶ崎市立図書館 香川分館（香川公民館）<br>説明:<br> 所在地:茅ヶ崎市香川一丁目11-1<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "茅ヶ崎公園体験学習センター",
                35.321250125869064,
                139.40530083783315,
                "yellow.png",
                "名前:茅ヶ崎公園体験学習センター<br>説明:<br>所在地:茅ヶ崎市中海岸三丁目3-9<br>種別:2次避難所<br>浸水区域：区域外<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],
            [
                "モリタ宮田工業株式会社 茅ヶ崎工場",
                35.329270864712775,
                139.38801156477425,
                "lightblue.png",
                "名前:モリタ宮田工業株式会社 茅ヶ崎工場<br>説明:<br>所在地:茅ヶ崎市下町屋一丁目1-1<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "アルバックテクノ（株） パーツセンター",
                35.339940044921306,
                139.37823914224532,
                "lightblue.png",
                "名前:アルバックテクノ（株） パーツセンター<br>説明:<br>所在地:茅ヶ崎市萩園2609-5<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "株式会社アルバック",
                35.33992024303465,
                139.3791201066094,
                "lightblue.png",
                "名前:株式会社アルバック<br>説明:<br>所在地:茅ヶ崎市萩園2500<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "神奈川県衛生研究所",
                35.3317880897839,
                139.38415579565088,
                "lightblue.png",
                "名前:神奈川県衛生研究所<br>説明:<br>所在地:茅ヶ崎市下町屋一丁目3-1<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可<br>車での避難：原則禁止"
            ],
            [
                "ハマミーナ ",
                35.323423846517514,
                139.38872415602202,
                "lightblue.png",
                "名前:ハマミーナ<br>説明:<br>所在地:茅ヶ崎市浜見平11-1<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：禁止<br>車での避難：原則禁止"
            ],
            [
                "鶴嶺公民館",
                35.341328091585304,
                139.38680197507577,
                "lightblue.png",
                "名前:鶴嶺公民館<br>説明:<br>所在地:茅ヶ崎市萩園2028-55<br>種別:2次避難所<br>浸水想定区域：区域内<br>（注）河川の洪水により浸水するおそれがありますので、できる限り浸水想定区域外の避難所へ避難してください。<br>ペット同行避難：可（場所に限りがあるため、ケージに入れてなるべく公立小・中学校へ避難）<br>車での避難：原則禁止"
            ],   
        ];

        for (let i = 0; i < secondMarkers.length; i++) {
            const currMarker = secondMarkers[i]; // Use 'secondMarkers' array

            const secondMarker = new google.maps.Marker({
                position: { lat: currMarker[1], lng: currMarker[2] },
                map: map,
                title: currMarker[0],
                icon: {
                    url: currMarker[3],
                    scaledSize: new google.maps.Size(38, 31)
                },
            });

            const secondInfowindow = new google.maps.InfoWindow({
                content: currMarker[4],
            });

            secondMarker.addListener("click", () => {
                secondInfowindow.open(map, secondMarker);
            });
        }
    });
} else {
    console.log('Geolocation is not supported by your browser.');
}

// Function to set the destination marker and calculate the route
function setDestinationMarker(lat, lng, title) {
    // Remove existing destination marker if it exists
    if (destinationMarker) {
        destinationMarker.setMap(null);
    }

    // Create a new destination marker
    destinationMarker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: title,
        animation: google.maps.Animation.DROP
    });

    // Calculate and display the route
    calculateAndDisplayRoute();
}

// Function to calculate and display the route
function calculateAndDisplayRoute() {
    if (!userMarker || !destinationMarker) {
        // Either user marker or destination marker is missing, cannot calculate route
        return;
    }

    const directionsService = new google.maps.DirectionsService();
    const start = new google.maps.LatLng(userMarker.getPosition().lat(), userMarker.getPosition().lng());
    const end = new google.maps.LatLng(destinationMarker.getPosition().lat(), destinationMarker.getPosition().lng());

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            console.error('Directions request failed: ' + status);
        }
    });
}