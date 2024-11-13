
fly.m_initEarthControls = function () 
{
    function MetricsControl(p_controlDiv) 
    {
        // Set CSS for the control border.
        this.m_controlUI = document.createElement("div");

        this.m_controlUI.style.display = "block";  // initially hidden, only shown when tilt > 0

        this.m_controlUI.style.backgroundColor = "transparent";
        //this.m_controlUI.style.marginTop = "8px";
        //this.m_controlUI.style.marginRight = "8px";
        //this.m_controlUI.style.marginBottom = "8px";

        // this.m_controlUI.style.textAlign = "left";
        // this.m_controlUI.title = "Play";

        p_controlDiv.appendChild(this.m_controlUI);

        // Set CSS for the control interior.
        this.m_controlText = document.createElement("div");
        this.m_controlText.style.color = "yellow";
        this.m_controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        this.m_controlText.style.fontSize = "18px";
        this.m_controlText.style.lineHeight = "20px";
        this.m_controlText.innerHTML = "";
        this.m_controlText.style.textAlign = "left";
        this.m_controlUI.appendChild(this.m_controlText);
    }    


    function HeadingControl(p_controlDiv) 
    {
        // Set CSS for the control border.
        this.m_controlUI = document.createElement("div");

        this.m_controlUI.style.display = "block";  // initially hidden, only shown when tilt > 0

        this.m_controlUI.style.backgroundColor = "transparent";
        //this.m_controlUI.style.marginTop = "0px";
        //this.m_controlUI.style.marginRight = "0px";
        //this.m_controlUI.style.marginBottom = "0px";

        this.m_controlUI.style.textAlign = "center";
        this.m_controlUI.title = "Play";
        p_controlDiv.appendChild(this.m_controlUI);

        // Set CSS for the control interior.
        this.m_controlText = document.createElement("div");
        this.m_controlText.style.color = "white";
        this.m_controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        this.m_controlText.style.fontSize = "18px";
        this.m_controlText.style.lineHeight = "20px";
        this.m_controlText.innerHTML = "";

        this.m_controlUI.appendChild(this.m_controlText);
    }    

    var l_earthDiv = eid("earthDiv");


    // Earth Map
    var l_metricsDiv = document.createElement("div");
    l_metricsDiv.className = "superTitle";
    l_metricsDiv.style.position = "absolute";
    l_metricsDiv.style.left = "4px";
    l_metricsDiv.style.top = "4px";
    l_metricsDiv.style.zIndex = 1999999;

    this.m_metricsControl = new MetricsControl(l_metricsDiv);
    l_earthDiv.append(l_metricsDiv);


    var l_headingDiv = document.createElement("div");
    l_headingDiv.className = "superTitle";
    l_headingDiv.style.position = "absolute";
    l_headingDiv.style.right = "4px";
    l_headingDiv.style.top = "4px";
    l_headingDiv.style.zIndex = 1999999;

    this.m_headingControl = new HeadingControl(l_headingDiv);
    l_earthDiv.append(l_headingDiv);
}

fly.m_displayMetrics = function ()
{
    var l_vehicle = this.m_userVehicle;
    var l_altitude = 0;

    if (l_vehicle)
    {
        l_altitude = parseInt(l_vehicle.pt.altitude);
    }

    var l_metricsText = ""; 

    if (this.m_flyMode) // animationActive)
    {
        l_metricsText += l_altitude + " m<br/>";
        l_metricsText += (Math.round(l_vehicle.speed * 50)) + " km/h";

        if (this.m_flyPaused)
        {
            l_metricsText += " <br/>PAUSED";
        }
    }

    var l_heading = this.m_formatHeading(this.m_earthMap.heading);

    if (this.m_metricsControl && this.m_earthHeadingControl)
    {
        this.m_metricsControl.m_controlText.innerHTML = l_metricsText;
        this.m_headingControl.m_controlText.innerHTML = parseInt(l_heading) + "&deg;";
    }
}

