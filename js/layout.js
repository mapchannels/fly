

fly.m_getWindowSize = function ()
{
    var l_isIE = true;
    if (typeof (window.innerHeight) == "number")
    {
        l_isIE = false;
    }

    if (l_isIE)
    {
        this.m_windowWidth = parseInt(document.documentElement.clientWidth);
        this.m_windowHeight = parseInt(document.documentElement.clientHeight);
    }
    else
    {
        this.m_windowWidth = parseInt(window.innerWidth);
        this.m_windowHeight = parseInt(window.innerHeight);
    }
}

fly.m_resizePanel = function (p_panel, p_visible, x, y, wd, ht)
{
    if (p_panel)
    {
        var l_div = p_panel.m_div;

        if (l_div)
        {
            if (x >= 0 && y >= 0)
            {
                l_div.style.left = x + "px";
                l_div.style.top = y + "px";
            }

            if (wd >= 0 && ht >= 0)
            {
                l_div.style.width = wd + "px";
                l_div.style.height = ht + "px";

                l_div.style.display = p_visible ? "block" : "none";
            }
        }

        p_panel.m_height = ht;
    }
}

fly.m_setFocus = function (a)
{
    // one of : MAP, EARTH, BIRD or STREET  (or zero if none)
    this.m_focus = a;
}

// when user tabs away from page pause the street view animation
fly.blurPage = function ()
{
    if (this.m_animationActive)
    {
        pauseAnimation();
    }
}


fly.m_initLayout = function ()
{
    glog("init layout");

    var l_container = eid("flydiv");
    if (!l_container)
    {
        return;
    }

    this.m_layout = new air.Layout(true, true, true, true);

    l_container.innerHTML = "";         // clear the loading message

    this.m_mapPanel = new air.MapPanel();
    this.m_earthPanel = new air.EarthPanel();

    this.m_mapPanel.m_initialize(l_container);
    this.m_earthPanel.m_initialize(l_container);

    this.resizePage();

    // window.onresize = air.resizePage;
}

function flyResize()
{
    fly.resizePage();
}

fly.resizePage = function ()
{
    var l_containerDiv = eid("flydiv");
    if (!l_containerDiv) return;

    this.m_windowWidth = l_containerDiv.clientWidth;
    this.m_windowHeight = l_containerDiv.clientHeight;

    glog("resize page " + this.m_windowWidth + " x " + this.m_windowHeight);

    if (!eid("mapDiv"))
    {
        glog("no map div found");

        // no map yet
        return;
    }

    // set panel sizes
    this.m_resizePanel(this.m_earthPanel, true, 0, 0, this.m_windowWidth, this.m_windowHeight);
    this.m_resizePanel(this.m_mapPanel, false, 0,0, this.m_windowWidth, this.m_windowHeight);

    // trigger resize events for map and panorama
    if (this.map && l_layout.map)
    {
        google.maps.event.trigger(this.map, "resize");
    }

    this.m_earthWidth = l_earthWidth;
    this.m_earthHeight = l_earthHeight;
}


