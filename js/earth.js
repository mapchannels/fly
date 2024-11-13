
fly.m_initEarthMap = async function ()
{
    const l_earthDiv = eid('earthDiv');

    // Prevent right-click event from being passed to child elements
    l_earthDiv.addEventListener('contextmenu', function (event)
    {
        // event.preventDefault();   // Prevent the default right-click context menu
        // event.stopPropagation();  // Stop the event from bubbling to child elements
        console.log('Right-click detected on earth map parent div');
    });

    const { Map3DElement } = await google.maps.importLibrary("maps3d");

    const pt = { lat: this.m_initialLat, lng: this.m_initialLng, altitude: this.m_initialAltitude };

    const l_earthCamera =
    {
        center: pt,
        heading: 0,
        tilt: 45, // 67.5,
        range: 300
    };

    this.m_earthCamera = l_earthCamera;

    const l_earthMap = new Map3DElement({
        center: pt,
        range: l_earthCamera.range,
        tilt: l_earthCamera.tilt,
        heading: l_earthCamera.heading
    });

    l_earthMap.addEventListener('gmp-click', (event) =>
    {
        console.log("earth map click @ " + event.position);

        // Do something with event.position.
        // whoosh.m_syncEarthPosition(event.position);
    });

    l_earthMap.addEventListener('gmp-centerchange', function (event)
    {
        if (!air.m_animationActive && air.m_focus == air.EARTH)
        {
            // console.log('earth map centre change');
            // air.m_syncPosition();
        }
    });

    l_earthMap.addEventListener('gmp-headingchange', function (event)
    {
        if (!air.m_animationActive && air.m_focus == air.EARTH)
        {
            // console.log('earth map heading change');

            // ???
            // air.m_syncHeading();


        }

        // air.m_displayMetrics();
    });



    l_earthMap.addEventListener('locationClickEvent', (event) =>
    {
        console.log("location click event @ " + event.position);

        // Do something with event.position.

        air.m_syncEarthPosition(event.position);
    });

    l_earthMap.addEventListener('placeClickEvent', (event) =>
    {
        console.log("place click event @ " + event.position);
        console.log("place click event @ " + event.placeId);

        // Do something with event.position.

        air.m_syncEarthPosition(event.position);
    });

    l_earthDiv.append(l_earthMap);

    console.log("Init Earth Map ok");

    this.m_earthMap = l_earthMap;
}