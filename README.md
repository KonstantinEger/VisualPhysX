# VisualPhysX
_Simple library for physics animations_

## How to use it
Drawing Shapes and a coordinate system
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Path to the library file, e.g. -->
  <script src="./lib/VisPhX.js"></script>
</head>
<body>

  <div id="parent">
    <!-- canvas is placed here later -->
  </div>

  <script>
    // parameters for the simulation
    const params = {
      // append canvas to div#parent
      parentElement: document.querySelector('#parent'),
      // Coordinate System: x: -5 to 5
      //                    y: -5 to 5
      view: {
        xRange: [-5, 5],
        yRange: [-5, 5]
      },
      // initial state; called once
      setup: (context, simulation) => {
        // make canvas 500x500 pixels
        simulation.size(500, 500);
      },
      // animation loop; called every frame
      update: (ctx, sim) => {
        // draw white background
        // VisPhX.PIXELS means use pixel coordinates
        // VisPhX.COORDINATES (default) use coordinate system
        ctx.fill('white');
        ctx.rect(0, 0, 500, 500, VisPhX.PIXELS);
        // draw coordinate system
        ctx.coord();
        // draw a black rect (x, y, width, height)
        ctx.fill('black');
        ctx.rect(1, 1, 3, 1.5)
      }
    }
    // create the simulation
    const sim = new VisPhX.Simulation();
  </script>
</body>
</html>
````