# Use BBj's DWC Client for Web Development

## Introduction

This video gives a very brief introduction about what you will learn in this lesson. Watch it first, but don't worry if it's a little short and quick - the step-by-step instructions follow with more explanations in writing.

:::tip Want to go deeper?
For a comprehensive guide to DWC development, see the **[DWC Course](https://basishub.github.io/DWC-Course/)** which covers prerequisites, advanced topics, and more detailed examples.
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/a33nWuuyX7o" title="DWC Web Development Introduction" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Basics

BBj's DWC web client allows to develop for the Web using BBj's comprehensive, simple language. BBj handles backend and frontend, so the developer can simply write a small BBj program, register events, and run it in the browser. BBj will do the rest.

Any of the programs you wrote in this course can be started in the DWC client. To deploy your program in the web follow these steps:

1. Start Enterprise Manager: [http://localhost:8888/bbjem/em](http://localhost:8888/bbjem/em)
2. Log in using `admin / admin123` as credentials
3. Navigate to "Web" - "Applications" and hit the "+" Sign
4. In the dialog, give your app a Name, point it to the program file and set the working directory. Check "DWC enabled"

The URL pattern would be `http://localhost:8888/webapp/Sample` for the parameters above.

Try to configure one of your prior sample programs from the prior sessions. Does it run?

## Developing for the Web

All samples we wrote so far use pixel oriented layout for the x,y positions of the controls and the sizes of everything. Now let's have a look how to use BBj's web client to apply CSS-based layout and styling.

Let's use the following program:

```bbj
wnd! = BBjAPI().openSysGui("X0").addWindow(10,10,800,600,"Hello BBj DWC")

st! = wnd!.addStaticText(wnd!.getAvailableControlID(),10,10,200,20,"Vorname:")
ed_vorname! = wnd!.addEditBox(wnd!.getAvailableControlID(),210,10,200,20,"")

st! = wnd!.addStaticText(wnd!.getAvailableControlID(),10,40,200,20,"Name:")
ed_name! = wnd!.addEditBox(wnd!.getAvailableControlID(),210,40,200,20,"")

btn! = wnd!.addButton(wnd!.getAvailableControlID(),10,70,400,30,"Say Hello")

wnd!.setCallback(BBjAPI.ON_CLOSE,"byebye")
btn!.setCallback(BBjAPI.ON_BUTTON_PUSH,"sayhello")

process_events

byebye:
bye

sayhello:
    vorname$=ed_vorname!.getText()
    name$=ed_name!.getText()
    a=msgbox("Hello "+vorname$+" "+name$,64,"Hello World")
return
```

This program contains two input fields and a button, and uses pixel-oriented layout instructions as we have learned before. Load it into your IDE and try to run it in GUI and in the Web client like we have seen before.

:::tip
The Spiderweb-Button in Eclipse does the deployment steps from the prior chapter for you, but starts the (older) BUI version of the program. You might still find it useful to skip the manual setup in Enterprise Manager and let this button do the work for you.
:::

## Change the Layout Mode for a Window

There is a flag you can set to BBj's `addWindow` method to tell it that you do not want BBj to do the layout with pixels but with CSS. We start with changing the `addWindow` line in our Program as follows:

```bbj
wnd! = BBjAPI().openSysGui("X0").addWindow(10,10,800,600,"Hello BBj DWC",$01101083$)
```

Follow the link above to the [documentation of addWindow](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/bbjwindow/BBjWindow_addWindow.htm) and locate the flags. We set `$01101083$` which combines a few flags. We want the window to have no title bar, and to start maximized, but the important one we need for CSS layout and positioning is `$00100000$` - Automatically arranges all controls and child windows placed in the window to fit.

*(The documentation currently (09/2021) is a little unclear about the meaning for the Web Client, we expect this to become more verbose soon. It's WIP.)*

Change this line in your program and run it. What happens in GUI, what happens as a /webapp?

## Add CSS Layout Instructions

Let's apply a CSS grid layout to our program. If you are not familiar with CSS grid, you may now read about it online, e.g. here: [https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

All we need to do is tell the Window to apply CSS grid layout. In total, we want to set these three properties (read about them on the page behind the link above if you're unsure what they do):

- `display=inline-grid`
- `grid-template-columns=1fr 1fr`
- `gap=5px`

How do we apply them to the Window? In order to understand this step, you need to know that:

- Each `BBjTopLevelWindow` and `BBjChildWindow` creates three nested `<div>` containers in the browser
- You can set Styles directly to these div containers
- You use `setPanelStyle` to directly set style directives to the inner `<div>` container in the DOM

So to set the three properties above to the inner div of the panel, you add the following lines to your program, right after the window is created:

```bbj
wnd!.setPanelStyle("display","inline-grid")
wnd!.setPanelStyle("grid-template-columns","1fr 1fr")
wnd!.setPanelStyle("gap","5px")
```

## Adding CSS to BBj Controls

In order to apply styles to controls, you can use `setStyle`.

For instance, to put the Button into grid column two you would use:

```bbj
btn!.setStyle("grid-column","2")
```

To change the color of the text on the button to red, you would do:

```bbj
btn!.setStyle("color","red")
```

What other CSS properties do you know? Play with them, using `setStyle` on the controls, and `setStyle` and/or `setPanelStyle` on the Window. Do they all work as you would expect?

*(At the time this page was created, the `setPanelStyle` was not yet documented)*

## Setting Style Attributes on Controls

BBj Controls are implemented as HTML5 Web Components (see [https://developer.mozilla.org/en-US/docs/Web/Web_Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for more information and useful links about this standard).

Web Components hide certain implementation details from the outside world, which also is a best-practice for the object oriented paradigm we heard about in the previous lesson. The BBj controls expose certain attributes that can be used for theming and to control certain behaviors. The web components that are shipped with BBj are documented on these pages: [https://basishub.github.io/basis-next/#/dwc/](https://basishub.github.io/basis-next/#/dwc/)

If you look at the docs for the BBj Button you see that it exposes certain attributes, for instance a "theme" and an "expanse". Let's change these two to make it bigger and "green" (in the default BBj theme). Properties can be set with `setAttribute`:

```bbj
btn!.setAttribute("expanse","xl")
btn!.setAttribute("theme","success")
```

**Can you add some margin to the block controls and change the background color window?**

## Adding an external CSS file

The `setStyle` / `setPanelStyle` / `setDockStyle` instructions directly set the style properties in the element tags of the DOM. Now we learn how to add a CSS class to a control and a window panel, and how to define the properties for such a class in an external CSS file.

Let's first create a simple CSS file "sample.css" with the following content:

```css
.mypanel {
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
```

As you see we have now created a CSS class with the grid instructions we had added to the code before. Now the three lines with the according "setStyle" instructions can be changed to the following single line:

```bbj
wnd!.addPanelStyle("mypanel")
```

In the last step we need to tell BBj to use our CSS file with this program. There are various ways to do that, but let's start with adding it in Enterprise Manager to the app directly, in the "Web App Only" section of the Application.

Add it using the "Plus" Button, save the setting and rerun the program from the link in the browser.

You should again see the program with the nice grid layout. Now you can also add more CSS instructions to that CSS file, especially media-queries if you need to do a truly responsive page that adjusts to phones and tablets and wide screens.

:::note
If you deploy the CSS file in Enterprise Manager, it will not be reloaded if you change it on disk unless you redeploy it in Enterprise Manager or restart your service. As soon as we will cover BBj Plug-Ins we will learn about a plug-in that you will find helpful for that problem.
:::

For the time being you can add the following to the beginning of your program (adjust the names for the app link name and the css file to your situation):

```bbj
::BBUtils.bbj::BBUtils.applyCss("Sample", "sample.css", 1)
```

What this does is basically re-register the CSS file with every start. Now after a change in the CSS file, simply reload the app twice (once to execute the statement, then to see the result of the reload) and you're all set.
