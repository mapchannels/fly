
air.CreateTrackClass = function ()
{
    const Track = class
    {
        constructor(map)
        {
            this.map = map;
            this.points = [];
            this.polyline = new google.maps.Polyline({
                path: this.points,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: this.map
            });
        };

        addPoint(lat, lng)
        {
            const point = new google.maps.LatLng(lat, lng);
            this.points.push(point);
            this.updatePolyline();
            this.map.setCenter(point);

            var l_flyDistanceDiv = eid("flyDistance");
            if (l_flyDistanceDiv)
            {
                l_flyDistanceDiv.innerHTML = parseInt(this.getTotalDistance()) + " km";
            }
        };

        clearPoints()
        {
            this.points = [];
            this.updatePolyline();
        };

        updatePolyline()
        {
            this.polyline.setPath(this.points);
        };

        // Optional: Get the points array
        getPoints()
        {
            return [...this.points];
        };

        // Optional: Get the total distance in kilometers
        getTotalDistance()
        {
            if (this.points.length < 2) return 0;

            let distance = 0;
            for (let i = 0; i < this.points.length - 1; i++)
            {
                distance += google.maps.geometry.spherical.computeDistanceBetween(
                    this.points[i],
                    this.points[i + 1]
                ) / 1000; // Convert meters to kilometers
            }
            return distance;
        };
    };

    air.Track = Track;

    glog("created track");
};

