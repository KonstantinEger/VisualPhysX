# VisualPhysX
_Simple library for physics animations_

## How to use it
simulate a ball falling
```html
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
    // create the ball
    const ball = new VisPhX.Object({
      pos: new VisPhX.Vec2D([0, 0]) // position (0|0)
      mass: 0.5, // kg
      draw(context) {
        context.fill('black');
        context.circle(ball.x, ball.y, 0.3); // (x, y, r)
      },
      //...
    });
    // create the force
    const gravity = new VisPhX.ForceField({
      x: -5, y: -5, width: 10, height: 10, // only acts in this area
      force: (object) => {
        // Fg=m*g
        return new VisPhX.Vec2D([0, object.mass * (-9.81)]);
      }
    });
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
        // add gravity
        simulation.addForceField(gravity);
        // add the ball to our simulation
        simulation.addObject(ball);
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
        // gravity could also be applied manually
        // const gravity = new VisPhX.Vec2D([0, ball.mass * (-9.81)]);
        // ball.applyForce(gravity);
        // => acts globally; not just in an area like a ForceField
        // would be the better option here

        // draw the ball (function where we created "const ball =...")
        ball.draw(ctx);
      }
    };
    // create the simulation
    const sim = new VisPhX.Simulation(params);

    // start the simulation
    sim.start();
    // to stop => sim.stop();
  </script>
</body>
</html>
```