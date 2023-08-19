
// d3.json('https://raw.githubusercontent.com/Urja1529/Project-3/main/data/met_data.json').then(function(met_data) {
//     // Fetch map data
//     d3.json('https://raw.githubusercontent.com/Urja1529/Project-3/main/data/map_point.json').then(function(map_data) {
//         met_data.forEach(function(item) {
//             var geoCode = item.geoCode;
//             var location = map_data[geoCode];
//             if (location) {
//                 item.latitude = location.latitude;
//                 item.longitude = location.longitude;
//             } else {
//                 console.log('Location not found for geoCode:', geoCode);
//             }
//         });

//         // Group data by team
//         var groupedData = {
//             cat: [],
//             dog: [],
//             both: []
//         };
//         met_data.forEach(function(item) {
//             var team = item.team;
//             groupedData[team].push(item);
//         });

//         // Create the Leaflet map
//         var myMap = L.map('map').setView([40.7128, -74.0059], 11);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(myMap);

//         // Create overlay layers for each group using marker clustering
//         var catCluster = L.markerClusterGroup();
//         var dogCluster = L.markerClusterGroup();
//         var bothCluster = L.markerClusterGroup();

//         // Add markers to overlay layers with marker clustering
//         groupedData.cat.forEach(function(item) {
//             if (item.latitude !== undefined && item.longitude !== undefined) {
//                 var marker = L.marker([item.latitude, item.longitude], { icon: L.icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}) })
//                     .bindPopup(item.title);
//                 catCluster.addLayer(marker);
//             }
//         });
//         groupedData.dog.forEach(function(item) {
//             if (item.latitude !== undefined && item.longitude !== undefined) {
//                 var marker = L.marker([item.latitude, item.longitude], { icon: L.icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}) })
//                     .bindPopup(item.title);
//                 dogCluster.addLayer(marker);
//             }
//         });
//         groupedData.both.forEach(function(item) {
//             if (item.latitude !== undefined && item.longitude !== undefined) {
//                 var marker = L.marker([item.latitude, item.longitude], { icon: L.icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}) })
//                     .bindPopup(item.title);
//                 bothCluster.addLayer(marker);
//             }
//         });

//         // Create overlay control
//         var overlayMaps = {
//             'Cat Group': catCluster,
//             'Dog Group': dogCluster,
//             'Both Group': bothCluster
//         };
//         // Add overlay control to the map
//         L.control.layers(null, overlayMaps).addTo(myMap);
//     });
// });
var myMap = L.map('map').setView([0, 0], 2);

// Define base tile layers
var street_tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var esri_tile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var topo_tile = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Add base layers to the map
var baseLayers = {
    "Street Map": street_tile,
    "ESRI Imagery": esri_tile,
    "Topographic Map": topo_tile
};
street_tile.addTo(myMap);

// Fetch JSON data for MET data
d3.json('https://raw.githubusercontent.com/Urja1529/Project-3/main/data/met_data.json').then(function(met_data) {
    console.log('MET Data:', met_data);

    // Fetch JSON data for map data
    d3.json('https://raw.githubusercontent.com/Urja1529/Project-3/main/data/map_point.json').then(function(map_data) {
        console.log('Map Data:', map_data);

        // Add latitude and longitude information to met_data using the geoCode
        met_data.forEach(function(item) {
            var geoCode = item.geoCode;
            var location = map_data[geoCode];
            if (location) {
                item.latitude = location.latitude;
                item.longitude = location.longitude;
            } else {
                console.log('Location not found for geoCode:', geoCode);
            }
        });

        // Group data by team
        var groupedData = {
            cat: [],
            dog: [],
            both: []
        };
        met_data.forEach(function(item) {
            var team = item.team;
            groupedData[team].push(item);
        });

        console.log('Grouped Data:', groupedData);

        // Define custom icons for Cat, Dog, and Both
        var catIcon = L.icon({
            iconUrl: 'img/cat.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
        var dogIcon = L.icon({
            iconUrl: 'img/dog.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
        var bothIcon = L.icon({
            iconUrl: 'img/cat&dog.jpeg',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        // Create overlay layers for Cat, Dog, and Both
        var catLayer = L.layerGroup();
        var dogLayer = L.layerGroup();
        var bothLayer = L.layerGroup();

        // Loop through each team in the groupedData
        for (var team in groupedData) {
            var teamData = groupedData[team];

            // Loop through the items in the teamData array
            teamData.forEach(function(item) {
                if (item.latitude !== undefined && item.longitude !== undefined) {
                    var latitude = item.latitude;
                    var longitude = item.longitude;
                    var team = item.team;

                    var icon;
                    if (team === 'cat') {
                        icon = catIcon;
                        catLayer.addLayer(L.marker([latitude, longitude], { icon: icon }).bindPopup(`Team: ${team}`));
                    } else if (team === 'dog') {
                        icon = dogIcon;
                        dogLayer.addLayer(L.marker([latitude, longitude], { icon: icon }).bindPopup(`Team: ${team}`));
                    } else {
                        icon = bothIcon;
                        bothLayer.addLayer(L.marker([latitude, longitude], { icon: icon }).bindPopup(`Team: ${team}`));
                    }
                }
            });
        }

        // Define overlay maps
        var overlayMaps = {
            "Cats": catLayer,
            "Dogs": dogLayer,
            "Both": bothLayer
        };

        // Add overlay control
        L.control.layers(baseLayers, overlayMaps).addTo(myMap);
    });
});