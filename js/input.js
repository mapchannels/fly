

// Note - not using as kb code can conflict with default maps ui keys

fly.m_initKeyboard = function ()
{
    var l_vehicle = this.m_userVehicle;

    // Keydown event listener
    document.addEventListener('keydown', kbdownFunc);

    (event) =>
    {
        this.m_pressedKeys[event.code] = true;

        // Handle single-press events here
        switch (event.code)
        {
            case 'Space':
                this.m_flyPaused = !this.m_flyPaused;
                break;
        }
    };

    // Keyup event listener
    document.addEventListener('keyup', kbupFunc);

    function kbdownFunc(event)
    {
        // console.log(event.code);
        switch (event.code)
        {
            case 'KeyW':
                l_vehicle.changeSpeed(0.1);
                air.m_accelerate = true;
                break;
            case 'KeyS':
                l_vehicle.changeSpeed(-0.1);
                air.m_decelerate = true;
                break;
        }
    };

    function kbupFunc(event)
    {
        // console.log(event.code);
        switch (event.code)
        {
            case 'Space':
                air.m_flyPaused = !air.m_flyPaused;
                break;
            case 'KeyW':
                air.m_accelerate = false;
                // l_vehicle.changeSpeed(1);
                break;
            case 'KeyS':
                air.m_decelerate = false;
                // l_vehicle.changeSpeed(-1);
                break;
            case 'KeyA':
                l_vehicle.m_deltaHeading -= 0.1;
                l_vehicle.m_deltaHeading = Math.max(l_vehicle.m_deltaHeading, -1);

                break;

            case 'KeyD':
                l_vehicle.m_deltaHeading += 0.1;
                l_vehicle.m_deltaHeading = Math.min(l_vehicle.m_deltaHeading, 1);

                break;

            case "KeyF":        // fly mode
                air.toggleFly();
                GLOBAL.DotNetReference.invokeMethodAsync("SetFlyMode", air.m_flyMode);
                break;

            case "KeyC":        // controls setting
                GLOBAL.DotNetReference.invokeMethodAsync("ToggleControls");
                break;

            case "KeyL":        // labels setting
                GLOBAL.DotNetReference.invokeMethodAsync("ToggleLabels");
                break;

            case "KeyT":        // tour mode
            case "KeyX":        // explore mode (default)
                GLOBAL.DotNetReference.invokeMethodAsync("ClickMenuItem_Keyboard", event.code);
                break;

            case "KeyE":        // 3D earth map
            case "KeyM":        // 2D Road Map
            case "KeyB":        // Birds Eye Map
            case "KeyV":        // Street View
                GLOBAL.DotNetReference.invokeMethodAsync("ClickMenuItem_Keyboard", event.code);
                break;

            // case 'F1':
            case "KeyQ":
                GLOBAL.DotNetReference.invokeMethodAsync("ToggleMenu");
                break;

            case "KeyH":
                GLOBAL.DotNetReference.invokeMethodAsync('ToggleHelp');
                return false;  // Additional prevention of default behavior


        };
    }

};

fly.m_initMouse = function ()
{
    var l_earthDiv = eid("earthDiv");
    var l_vehicle = this.m_userVehicle;


    l_earthDiv.addEventListener("mouseout", function (event)
    {

        if (air.m_flyMode) // animationActive)
        {
            l_vehicle.m_deltaHeading = 0;
            l_vehicle.m_deltaPitch = 0;
        }
    });


    l_earthDiv.addEventListener("mousemove", function (event)
    {
        // Get the cursor's X and Y coordinates
        let x = event.clientX;      // X position relative to the viewport
        let y = event.clientY - air.m_earthY;      // Y position relative to the viewport

        if (air.m_earthWidth > 0 && air.m_flyMode) // air.m_animationActive)
        {
            l_vehicle.m_deltaHeading = 2 * x / air.m_earthWidth - 1;
            l_vehicle.m_deltaPitch = 2 * y / air.m_earthHeight - 1;


            if (l_vehicle.speed <= 1)
            {
                l_vehicle.m_deltaHeading *= 3;
                l_vehicle.m_deltaPitch *= 3;
            }
            else if (l_vehicle.speed == 2)
            {
                l_vehicle.m_deltaHeading *= 2;
                l_vehicle.m_deltaPitch *= 2;
            }

        }
    });

};