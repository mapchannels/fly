

air.m_startFlight = function ()
{
    glog("start fly cycle");

    setTimeout("air.flyCycle()", 50);

    this.m_flyCycleCount = 0;
}

air.m_getZoomLevelForSpeed = function (speedKmh)
{
    // Define speed thresholds (in km/h) and their corresponding max zoom levels
    // Higher zoom number = more zoomed in
    const speedZoomMap = [
        { maxSpeed: 5, zoom: 15 },    // Walking/slow cycling - very detailed view
        { maxSpeed: 10, zoom: 14 },    // City driving - neighborhood level
        { maxSpeed: 15, zoom: 13 },    // Urban driving - district level
        { maxSpeed: 25, zoom: 12 },    // Highway driving - city level
        { maxSpeed: 50, zoom: 11 },    // Highway driving - city level
        { maxSpeed: 75, zoom: 10 },   // Fast highway - regional level
        { maxSpeed: 100, zoom: 9 },   // Fast highway - regional level
        { maxSpeed: 200, zoom: 8 },   // Fast highway - regional level
        { maxSpeed: 300, zoom: 7 },   // Fast highway - regional level
        { maxSpeed: 400, zoom: 6 },   // Fast highway - regional level
        { maxSpeed: 600, zoom: 5 },   // Fast highway - regional level
        { maxSpeed: 1000, zoom: 4 },   // Fast highway - regional level
        { maxSpeed: Infinity, zoom: 3 } // Very fast - wide area view
    ];

    // Find the appropriate zoom level based on current speed
    const zoomSetting = speedZoomMap.find(setting => speedKmh <= setting.maxSpeed);
    return zoomSetting.zoom;
}


air.flyCycle = function ()
{
    // glog("fly cycle " + this.m_flyCycleCount);

    

    if (this.m_flyMode && !this.m_flyPaused) 
    {
        var l_vehicle = this.m_userVehicle;

        // apply acceleration / deceleration
        if (this.m_accelerate)
        {
            l_vehicle.changeSpeed(0.1);
        }
        else if (this.m_decelerate)
        {
            l_vehicle.changeSpeed(-0.1);
        }

        l_vehicle.positionUpdate();

        // apply appropriate zoom level for speed
        var z = air.m_getZoomLevelForSpeed(l_vehicle.speed);
        this.map.setZoom(z);


        // update centre of the 2D map and the birds eye map
        this.m_syncPosition();


        if (this.m_flyCycleCount % 5 == 0)
        {
            var l_earthCentre = this.m_earthMap.center;
            this.m_track.addPoint(l_earthCentre.lat, l_earthCentre.lng);
        }

        // adjust zoom
    }

    this.m_displayMetrics();

    this.m_flyCycleCount++;

    setTimeout("air.flyCycle()", 20);
}

air.toggleFly = function ()
{
    this.m_flyMode = !this.m_flyMode;
    this.m_applyFlyMode();
}

air.m_applyFlyMode = function ()
{
    this.m_animationActive = this.m_flyMode; //  !this.m_animationActive;

    var l_vehicle = this.m_userVehicle;

    // level out if diving
    if (this.m_animationActive && l_vehicle &&  l_vehicle.pitch > 0)
    {
        l_vehicle.pitch = 0;
    }

    // halt any animation in progress
    this.m_earthMap.stopCameraAnimation();

    glog("vehicle = " + l_vehicle);
    glog("l_vehicle.pt = " + l_vehicle.pt);

    this.m_syncEarthPosition(l_vehicle.pt);
    this.m_syncHeading();

    // glog("*** MOUSEOUT ***");

    if (l_vehicle)
    {
        l_vehicle.m_deltaHeading = 0;
        l_vehicle.m_deltaPitch = 0;
    }

    // ?
    // show UI when paused
    // this.m_earthMap.defaultUIDisabled = this.m_animationActive;
    // this.m_earthMap.defaultLabelsDisabled = this.m_animationActive;
}
