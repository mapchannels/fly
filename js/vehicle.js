
fly.m_createVehicleClass = function ()
{
    const Vehicle = class
    {
        constructor(id, lat, lng, altitude)
        {
            // glog("id = " + id + ", lat = " + lat + " lng = " + lng + ", alt = " + altitude);
            // glog(typeof (lat) + " " + typeof (lng) + " " + typeof (altitude));

            // glog("google.maps.LatLngAltitude = " + google.maps.LatLngAltitude);
            // glog("air.LatLngAltitude = " + air.LatLngAltitude);

            this.id = id;
            this.pt = new google.maps.LatLngAltitude({ lat: lat, lng: lng, altitude: altitude });

            // glog("ok, this.pt = " + this.pt);

            this.heading = 0;
            this.pitch = 0;
            this.roll = 0;
            this.speed = 0;

            this.flyer = true;

            this.m_deltaHeading = 0;
            this.m_deltaPitch = 0;

            // this.m_model = air.m_model;

            glog("vehicle lat = " + this.pt.lat + " lng = " + this.pt.lng);
        };

        // Function to change heading (e.g., when arrow keys are pressed)
        changeHeading(delta)
        {
            this.heading = (this.heading + delta) % 360;
        }

        // Function to change pitch (e.g., for climbing or descending)
        changePitch(delta)
        {
            this.pitch = Math.max(-90, Math.min(90, this.pitch + delta));
        }

        changeSpeed(delta)
        {
            if (!air.m_flyMode && delta > 0)
            {
                return;
            }

            this.speed += delta;

            // when animation is paused then a slow input will stop the vehicle
            if (!air.m_animationActive && delta < 0)
            {
                this.speed = 0;
            }

            if (this.speed <= 0)
            {
                this.speed = 0;
            }

            // update speedometer
            air.m_displayMetrics();

            air.m_animationActive = (this.speed > 0) ? true : false;
        }

        // move the vehicle - once every 1/100 second
        positionUpdate()
        {
            // Modify by the steering deltas
            this.heading += (this.m_deltaHeading);

            if (true) // this.flyer
            {
                this.pitch += (this.m_deltaPitch);
            }

            // Normalize heading and pitch values
            this.heading = (this.heading + 360) % 360;
            this.pitch = Math.max(-90, Math.min(90, this.pitch));

            // Convert heading to radians for spherical computations
            let angleRadians = this.heading * Math.PI / 180;
            let pitchRadians = (-this.pitch) * Math.PI / 180;

            // Calculate the horizontal distance traveled using pitch (how "forward" you move)
            let horizontalSpeed = this.speed * Math.cos(pitchRadians);

            // Compute new LatLng position using spherical geometry
            let newLatLng = google.maps.geometry.spherical.computeOffset(
                new google.maps.LatLng(this.pt.lat, this.pt.lng),
                horizontalSpeed,  // Distance in meters
                this.heading      // Heading in degrees
            );

            // Calculate the change in altitude
            let deltaAltitude = this.speed * Math.sin(pitchRadians);

            // Create the new LatLngAltitude object
            this.pt = new google.maps.LatLngAltitude({
                lat: newLatLng.lat(),
                lng: newLatLng.lng(),
                altitude: this.pt.altitude + deltaAltitude
            });

            // Update the map's position and orientation
            air.m_earthMap.center = new google.maps.LatLngAltitude({
                lat: this.pt.lat,
                lng: this.pt.lng,
                altitude: this.pt.altitude
            });
            air.m_earthMap.heading = this.heading;
            air.m_earthMap.range = air.m_cameraRange;
            air.m_earthMap.tilt = 90 - this.pitch;
        };

        drawVehicle()
        {

        };


    };

    air.Vehicle = Vehicle;
};

fly.m_initVehicle = function ()
{
    glog("init vehicle");

    glog("lat = " + this.m_initialLat + " lng = " + this.m_initialLng + " alt = " + this.m_initialAltitude);

    this.m_userVehicle = new air.Vehicle(1, this.m_initialLat, this.m_initialLng, this.m_initialAltitude);


}

