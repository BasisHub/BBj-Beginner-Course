# Use BBj's DWC Client for Web Development

## Introduction

This video gives a very brief introduction about what you will learn in this lesson. Watch it first, but don't worry if it's a little short and quick - the step-by-step instructions follow with more explanations in writing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/a33nWuuyX7o" title="DWC Web Development Introduction" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Deploying Your First DWC App

BBj's DWC web client allows you to develop for the Web using BBj's comprehensive, simple language. BBj handles backend and frontend, so you can simply write a BBj program, register events, and run it in the browser. BBj will do the rest.

Any of the programs you wrote in this course can be started in the DWC client. To deploy your program on the web, follow these steps:

1. Start Enterprise Manager: [http://localhost:8888/bbjem/em](http://localhost:8888/bbjem/em)
2. Log in using `admin / admin123` as credentials
3. Navigate to "Web" - "Applications" and hit the "+" Sign
4. In the dialog, give your app a Name, point it to the program file and set the working directory. Check "DWC enabled"

The URL pattern would be `http://localhost:8888/webapp/Sample` for the parameters above.

Try to configure one of your prior sample programs from the prior sessions. Does it run?

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
