

fly.m_createPanelClasses = function ()
{
    const MapPanel = class
    {
        constructor()
        {
            this.m_div = null;
            this.m_visible = true;
        };

        m_initialize(p_container)
        {
            this.m_div = document.createElement("div");

            this.m_div.id = "mapDiv";
            this.m_div.style.position = "absolute";
            this.m_div.style.display = "none";

            // this.m_div.onmouseover = function () { trex.m_focusMap = true; }
            // this.m_div.onmouseout = function () { trex.m_focusMap = false; }

            this.m_div.onmouseover = function () { air.m_setFocus(air.MAP); }
            this.m_div.onmouseout = function () { air.m_setFocus(0); }

            p_container.appendChild(this.m_div);
        };

    };

    const EarthPanel = class
    {
        constructor()
        {
            this.m_div = null;
            this.m_visible = true;
        };

        m_initialize(p_container)
        {
            this.m_div = document.createElement("div");

            this.m_div.id = "earthDiv";
            this.m_div.style.position = "absolute";
            this.m_div.style.display = "none";

            // this.m_div.onmouseover = function () { trex.m_focusMap = true; }
            // this.m_div.onmouseout = function () { trex.m_focusMap = false; }


            this.m_div.onmouseover = function () { air.m_setFocus(air.EARTH); }
            this.m_div.onmouseout = function () { air.m_setFocus(0); }

            p_container.appendChild(this.m_div);
        };

    };


    this.MapPanel = MapPanel;
    this.EarthPanel = EarthPanel;

    glog("created panel classes ok");
}
