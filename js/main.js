

var fly = fly || {};


fly.Initialize = async function (apikey)
{
    glog("Initialize start");

    // prevent overflow
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // constants
    this.MAP = 1;
    this.EARTH = 2;
    this.BIRD = 3;
    this.STREET = 4;

    this.m_initialLat = 43.6425;
    this.m_initialLng = -79.3871;
    this.m_initialAltitude = 4000;
    this.m_cameraRange = 150;

    this.m_vehicle = null;

    this.m_flyMode = false;
    this.m_flyPaused = false;

    this.m_earthY = 0;
    this.m_earthWidth = 0;
    this.m_earthHeight = 0;
    this.m_earthCamera = null;

    this.m_accelerate = false;
    this.m_decelerate = false;


    await this.m_loadGoogleMapsAPI(apikey);

    this.m_createPanelClasses();
    this.m_initLayout();

    this.m_initMap();
    this.m_track = new fly.Track(this.map);

    await this.m_initEarthMap();

    // this.m_initStreetView();

    this.m_createVehicleClass();
    this.m_initVehicle();

    // this.m_initMapControls();


    this.m_initKeyboard();
    this.m_initMouse();

    window.onresize = whooshResize;
    this.resizePage();

    console.log("init ok");

    this.m_displayMetrics();

    this.m_startFlight();
}


fly.m_loadGoogleMapsAPI = function (p_apiKey)
{
    return new Promise((resolve, reject) =>
    {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?v=alpha&loading=async&libraries=maps3d,places,geometry,marker&callback=initGoogleMaps";
        script.src += "&key=" + p_apiKey;
        script.async = true;
        script.defer = true;
        window.initGoogleMaps = () =>
        {
            resolve();
        };
        script.onerror = (error) =>
        {
            reject(error);
        };
        document.head.appendChild(script);
    });
};
