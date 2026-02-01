---
sidebar_position: 1
title: "Web Development"
---

# Web Development with DWC

BBj's Dynamic Web Client (DWC) allows BBj programs to run in a web browser with no frontend code required. Any BBj GUI program can be deployed to the web through the BBj Enterprise Manager.

<details>
<summary>Watch the video: DWC Web Development Introduction</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/a33nWuuyX7o" title="DWC Web Development Introduction" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## Deploying Your First DWC App

BBj handles both backend and frontend -- write a BBj program, register events, and run it in the browser. BBj does the rest.

Any of the programs from this course can be deployed to the DWC client. Follow these steps:

1. Start Enterprise Manager: [http://localhost:8888/bbjem/em](http://localhost:8888/bbjem/em)
2. Log in using `admin / admin123` as credentials
3. Navigate to "Web" - "Applications" and hit the "+" Sign
4. In the dialog, give your app a Name, point it to the program file and set the working directory. Check "DWC enabled"

The URL pattern would be `http://localhost:8888/webapp/Sample` for the parameters above.

Deploy one of the programs from the earlier chapters to verify your configuration.

:::tip
The Spiderweb-Button in Eclipse does the deployment steps for you, but starts the (older) BUI version of the program. You might still find it useful to skip the manual setup in Enterprise Manager.
:::

## Next Steps: The DWC Course

Now that you can deploy a basic BBj application to the web, you're ready to learn about CSS layouts, styling, theming, responsive design, and more advanced DWC features.

**Continue your learning with the [DWC Course](https://basishub.github.io/DWC-Course/)**, which covers:

- Browser Developer Tools and CSS
- CSS Custom Properties and Themes
- Flow Layouts and Responsive Design
- DWC Controls and Extended Attributes
- Icon Pools and Control Validation
- Embedding 3rd Party Components
- And much more...
